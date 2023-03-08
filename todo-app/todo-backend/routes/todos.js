const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });
    res.send(todo);
    await setAsync(
      "added_todos",
      (Number(await getAsync("added_todos")) + 1).toString()
    );
    return;
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
  } catch (e) {
    next();
    return;
  }
  if (!req.todo) return res.sendStatus(404).end();
  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo ?? undefined;
  if (!todo) {
    res.sendStatus(404).end();
    return;
  }
  console.log(todo);
  return res.json(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = req.todo ?? undefined;
  console.log(`req body ${JSON.stringify(req.body)}`);
  console.log(`target todo id ${req.todo._id}`);
  if (
    !todo ||
    typeof req.body.text == undefined ||
    typeof req.body.done == undefined
  ) {
    res.sendStatus(404);
    next();
    return;
  }
  await Todo.updateOne(
    { _id: req.todo._id },
    { done: req.body.done, text: req.body.text }
  );
  return res.json({ done: req.body.done, text: req.body.text });
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;

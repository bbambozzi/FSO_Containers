const router = require("express").Router();
const { getAsync } = require("../redis");

router.get("/", async (req, res) => {
  const value = await getAsync("added_todos");
  res.send({ added_todos: value ?? "0" });
});

module.exports = router;

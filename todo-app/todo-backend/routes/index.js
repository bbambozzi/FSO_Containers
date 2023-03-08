const express = require("express");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
  setAsync("/", getAsync("/") + 1);
});

module.exports = router;

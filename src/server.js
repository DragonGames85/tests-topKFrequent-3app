const express = require("express");
const topKFrequent = require("./topKFrequent/topKFrequent");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  
  if (!req.query.nums) {
    res.status(400).send("`nums` должен быть массивом");
    return;
  }

  const nums = [...req.query.nums].map(Number);
  const k = Number(req.query.k);

  if (!nums.length || nums.length > 105) {
    res
      .status(400)
      .send("Массив `nums` должен содержать от 1 до 105 элементов");
    return;
  } else if (nums.some(num => num < -104 || num > 104)) {
    res.status(400).send("Элементы `nums` должны быть от -104 до 104");
    return;
  } else if (nums.some(num => !Number.isInteger(num))) {
    res.status(400).send("Элементы `nums` должны быть целыми числами");
    return;
  } else if (!Number.isInteger(k)) {
    res.status(400).send("`K` должно быть целым числом");
    return;
  } else if (k <= 0 || k > new Set(nums).size) {
    res
      .status(400)
      .send(
        "`K` должно быть больше 0 и меньше/равно количеству уникальных элементов"
      );
    return;
  } else {
    res.json(topKFrequent(nums, k));
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;

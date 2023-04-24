const express = require("express");
const topKFrequent = require("./src/topKFrequent/topKFrequent");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  if (!req.query.nums) {
    res.status(400).send("`nums` должен быть массивом");
    return;
  }

  const nums = [...req.query.nums.split(",")].map(Number);
  const k = Number(req.query.k);

  if (!nums.length || nums.length > 105) {
    res
      .status(400)
      .send("Массив `nums` должен содержать от 1 до 105 элементов");
    return;
  } else if (nums.some(num => !Number.isInteger(num))) {
    res.status(400).send("Элементы `nums` должны быть целыми числами");
    return;
  } else if (nums.some(num => num < -104 || num > 104)) {
    res.status(400).send("Элементы `nums` должны быть от -104 до 104");
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
    res.set("Content-Type", "text/html");
    res.send(`Ответ: ${topKFrequent(nums, k)}`);
  }
});

// create page with form
app.get("/form", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <title>Top K Frequent</title>
      </head>
      <body>
        <h1>Top K Frequent</h1>
        <form action="/" method="GET">
          <label for="nums">nums</label>
          <input type="text" id="nums" name="nums" placeholder="[1,1,1,2,2,3]">
          <label for="k">k</label>
          <input type="text" id="k" name="k" placeholder="2">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;

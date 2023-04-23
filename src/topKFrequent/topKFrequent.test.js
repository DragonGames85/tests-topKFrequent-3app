const request = require("supertest");
const app = require("../server");
const { describe } = require("node:test");

// ТЕСТЫ СТОИТ ЗАПУСКАТЬ ПО ОТДЕЛЬНОСТИ: npm test topKFrequent

describe("HTTP запросы: решения", () => {
  it("Решение 1", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([1, 2]);
  });

  it("Решение 2", async () => {
    const nums = [1];
    const k = 1;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([1]);
  });

  it("Решение 3", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 3;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([1, 2, 3]);
  });

  it("Решение 4", async () => {
    const nums = [1, 2];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([1, 2]);
  });
});

describe("HTTP запросы: ошибки", () => {
  it("Должен выдавать ошибку 400: `nums` должен быть массивом", async () => {
    const nums = [];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual("`nums` должен быть массивом");
  });

  it("Должен выдавать ошибку 400: `nums` от 1 до 105 элементов", async () => {
    const nums = Array(106).fill(1);
    const k = 1;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual(
      "Массив `nums` должен содержать от 1 до 105 элементов"
    );
  });

  it("Должен выдавать ошибку 400: `nums` должны быть целыми числами", async () => {
    const nums = [1.4, 0, 1.3, 22.2, 22.2, 33.3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual(
      "Элементы `nums` должны быть целыми числами"
    );
  });

  it("Должен выдавать ошибку 400: `nums` должны быть от -104 до 104", async () => {
    const nums = [1, 1, -149, -149, -149, 3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual(
      "Элементы `nums` должны быть от -104 до 104"
    );
  });

  it("Должен выдавать ошибку 400: `K` должно быть целым числом", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = "4$$21412";

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual("`K` должно быть целым числом");
  });

  it("Должен выдавать ошибку 400: 0 < `K` <= кол-во уникальных элементов", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 0;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual(
      "`K` должно быть больше 0 и меньше/равно количеству уникальных элементов"
    );
  });

  it("Должен выдавать ошибку 404: несуществующий URL", async () => {
    const response = await request(app).get("/false");
    expect(response.status).toBe(404);
  });
});

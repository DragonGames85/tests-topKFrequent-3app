const topKFrequent = require("./topKFrequent/topKFrequent");
const request = require("supertest");
const app = require("./server");
const { describe } = require("node:test");

// ТЕСТЫ СТОИТ ЗАПУСКАТЬ ПО ОТДЕЛЬНОСТИ: npm test server

jest.mock("./topKFrequent/topKFrequent.js");

describe("Технические тесты", () => {
  it("Сервер использовал вызов функции topKFrequent", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(topKFrequent).toHaveBeenCalled();
  });

  it("Сервер использовал вызов функции topKFrequent с аргументами nums и k", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(topKFrequent).toHaveBeenCalledWith(nums, k);
  });

  it("Сервер использовал вызов функции topKFrequent не менее 1 раза", async () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = 2;

    const response = await request(app).get("/").query({ nums, k });

    expect(response.status).toBe(200);
    expect(topKFrequent.mock.calls.length).toBeGreaterThanOrEqual(1);
  });
});

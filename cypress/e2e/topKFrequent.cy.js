describe("UI тесты: проверка формы", () => {
  it("Страница с формой открылась", () => {
    cy.visit("http://localhost:3000/form");
    cy.contains("Top K Frequent");
  });

  it("Форма отправляется", () => {
    cy.visit("http://localhost:3000/form");
    cy.wait(1000);
    cy.get("form").submit();
  });

  it("Возвращает ответ после отправки формы", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1,2,3,4,5");
    cy.get("#k").type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Ответ");
  });

  afterEach(() => {
    cy.wait(2000);
  });
});

describe("UI тесты: решения", () => {
  it("Возвращает ответ, если nums содержит только один элемент", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1");
    cy.get("#k").type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Ответ: 1");
  });

  it("Возвращает ответ, если nums содержит несколько одинаковых элементов", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1, 1, 1, 2, 2, 3");
    cy.get("#k").type("2");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Ответ: 1,2");
  });

  it("Возвращает ответ, если nums содержит несколько разных элементов", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("3, 3, 3, 4, 4, 5");
    cy.get("#k").type("3");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Ответ: 3,4,5");
  });

  afterEach(() => {
    cy.wait(3000);
  });
});

describe("UI тесты: ошибки", () => {
  it("Возвращает ошибку, если nums не массив", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#k").type("2");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("`nums` должен быть массивом");
  });

  it("Возвращает ошибку, если nums содержит элементы не из диапазона -104 до 104", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("-105, 0, 105");
    cy.get("#k").type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Элементы `nums` должны быть от -104 до 104");
  });

  it("Возвращает ошибку, если nums содержит не целые числа", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1, 1.5, 2");
    cy.get("#k").type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Элементы `nums` должны быть целыми числами");
  });

  it("Возвращает ошибку, если k не целое число", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1, 2, 3");
    cy.get("#k").type("1.5");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("`K` должно быть целым числом");
  });

  it("Возвращает ошибку, если k меньше 1", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1, 2, 3");
    cy.get("#k").type("0");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains(
      "`K` должно быть больше 0 и меньше/равно количеству уникальных элементов"
    );
  });

  it("Возвращает ошибку, если k больше количества уникальных элементов", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type("1, 2, 3");
    cy.get("#k").type("4");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains(
      "`K` должно быть больше 0 и меньше/равно количеству уникальных элементов"
    );
  });

  it("Возвращает ошибку, если nums больше 105 элементов", () => {
    cy.visit("http://localhost:3000/form");
    cy.get("#nums").type(Array(106).fill("1").join(", "));
    cy.get("#k").type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.contains("Массив `nums` должен содержать от 1 до 105 элементов");
  });

  afterEach(() => {
    cy.wait(3000);
  });
});

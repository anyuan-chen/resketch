import sum from "../index";

describe("sum", () => {
  test("exports", () => {
    expect(sum).toBeTruthy();
  });
  test("works", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});

const { getPercentage } = require("./percentage");

describe("percentage", () => {
  it("should return valid percentage value", async () => {
    expect(getPercentage(100, 50)).toBe(50);
    expect(getPercentage(100, 33)).toBe(33);
  });
});

const { bold, padded } = require("../../utils/string");

describe("string", () => {
  test("bold", () => {
    expect(bold("fruit")).toBe("\x1b[1mfruit\x1b[0m");
    expect(bold(1)).toBe("\x1b[1m1\x1b[0m");
    expect(bold(["one", "two"])).toBe("\x1b[1mone,two\x1b[0m");
  });

  test("padded", () => {
    expect(padded("fruit")).toBe(`\nfruit\n`);
    expect(padded(1)).toBe(`\n1\n`);
    expect(padded(["one", "two"])).toBe(`\none,two\n`);
  });
});

const { list, validate, parse } = require("../../command/index");

describe("command", () => {
  it("formats a list of command options", () => {
    const options = {
      add: {
        cmd: "add",
        description: "Adds value to inventory",
      },
      remove: {
        cmd: "remove",
        description: "Removes value to inventory",
      },
    };

    expect(list(options)).toBe(
      `\n Available commands:\n \x1b[1madd\x1b[0m | Adds value to inventory\n \x1b[1mremove\x1b[0m | Removes value to inventory`
    );
  });

  it("validates user input with regex", () => {
    expect(validate("fruit", /^fruit$/)).toBeTruthy();
    expect(validate("vegetable", /^fruit$/)).toBeFalsy();
  });

  it("parses a command string into values", () => {
    expect(parse(`add "fruit" "vegetable"`)).toStrictEqual([
      "add",
      "fruit",
      "vegetable",
    ]);
    expect(parse(`add`)).toStrictEqual(["add"]);
  });
});

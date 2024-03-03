const { bold } = require("../utils/string");
const errors = require("../utils/errors");

function list(options) {
  // Display bolded commands with descriptive text
  return (
    "\n Available commands:" +
    Object.values(options)
      .map((value) => `\n ${bold(value.cmd)} | ${value.description}`)
      .join("")
  );
}

function validate(input, regex) {
  return regex.test(input);
}

function parse(input) {
  // Split command into array of [action, input1, ...];
  return input
    .split('"')
    .map((entry) => entry.trim()) // Removes trailing spaces
    .filter((entry) => entry.trim()); // Filters out empty values
}

module.exports = { list, validate, parse };

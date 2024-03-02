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

module.exports = { list };

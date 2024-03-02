function bold(text) {
  return `\x1b[1m${text}\x1b[0m`;
}

function padded(line) {
  return `\n${line}\n`;
}

module.exports = { bold, padded };

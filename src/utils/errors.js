const { bold } = require("./string");

module.exports = {
  default: "Whoops! Something went wrong",
  invalidInput: `Sorry, that command is not valid. Type '${bold(
    "help"
  )}' for a list of available commands.`,
  collectionEmpty: "Your collection is empty! Add an album to get started.",
  unplayedEmpty: "You have listened to everything in your collection!",

  albumDuplicate(title) {
    return `An album named "${title}" already exists in your collection.`;
  },
  albumNotFound(title) {
    return `There are no albums named "${title}" in your collection.`;
  },
  artistNotFound(artist) {
    return `There are no albums by "${artist}" in your collection.`;
  },
};

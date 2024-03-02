const regex = {
  add: /^add "(.*)" "(.*)"$/,
  play: /^play "(.*)"$/,
  show: /^(show all)|(show unplayed)|(show all by "(.*)")|(show unplayed by "(.*)")$/,
};

const options = {
  add: {
    cmd: 'add "title" "artist"',
    description: "Add an album",
  },
  play: {
    cmd: 'play "title"',
    description: "Play an album",
  },
  showAll: {
    cmd: "show all",
    description: "Show all albums in your collection",
  },
  showUnplayed: {
    cmd: "show unplayed",
    description: "Show unplayed albums in your collection",
  },
  showAllBy: {
    cmd: 'show all by "artist"',
    description: "Show all albums by an artist",
  },
  showUnplayedBy: {
    cmd: 'show unplayed by "artist"',
    description: "Show unplayed albums by an artist",
  },
  help: {
    cmd: "help",
    description: "List all commands",
  },
  quit: {
    cmd: "quit",
    description: "Exit the program",
  },
};

module.exports = { options, regex };

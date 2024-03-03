const { validate, parse } = require("./command/index");
const { regex } = require("./command/data");
const errors = require("./utils/errors");

module.exports = {
  albums: {},

  add(cmd) {
    if (!validate(cmd, regex.add)) {
      return errors.invalidInput;
    }

    const parsedCommand = parse(cmd);
    const title = parsedCommand[1];
    const artist = parsedCommand[2];

    // Check if album with the same title already exists
    if (this.albums[title]) {
      return errors.albumDuplicate(title);
    }

    // Add album to collection
    this.albums[title] = {
      artist,
      hasPlayed: false,
    };

    return `Added "${title}" by ${artist}`;
  },

  play(cmd) {
    if (!validate(cmd, regex.play)) {
      return errors.invalidInput;
    }

    const parsedCommand = parse(cmd);
    const title = parsedCommand[1];

    if (!this.albums[title]) {
      return errors.albumNotFound(title);
    }

    // Play album
    this.albums[title].hasPlayed = true;

    return `You're listening to "${title}"`;
  },

  show(cmd) {
    if (this.isEmpty(this.albums)) {
      return errors.collectionEmpty;
    }

    if (!validate(cmd, regex.show)) {
      return errors.invalidInput;
    }

    const parsedCommand = parse(cmd);

    switch (parsedCommand[0]) {
      case "show all":
        return this.showAll();
      case "show unplayed":
        return this.showUnplayed();
      case "show all by":
        return this.showAllBy(parsedCommand[1]);
      case "show unplayed by":
        return this.showUnplayedBy(parsedCommand[1]);
      default:
        return errors.default;
    }
  },

  showAll() {
    return Object.entries(this.albums)
      .map(
        ([title, value]) =>
          `"${title}" by ${value.artist} ${this.formatHasPlayed(
            value.hasPlayed
          )}`
      )
      .join("\n");
  },

  showUnplayed() {
    const unplayedTitles = Object.keys(this.albums).filter(
      (title) => !this.albums[title].hasPlayed
    );

    if (this.isEmpty(unplayedTitles)) {
      return errors.unplayedEmpty;
    }

    return unplayedTitles
      .map((title) => `"${title}" by ${this.albums[title].artist}`)
      .join("\n");
  },

  showAllBy(artist) {
    const artistTitles = Object.keys(this.albums).filter(
      (title) => this.albums[title].artist === artist
    );

    if (this.isEmpty(artistTitles)) {
      return errors.artistNotFound(artist);
    }

    return artistTitles
      .map(
        (title) =>
          `"${title}" by ${this.albums[title].artist} ${this.formatHasPlayed(
            this.albums[title].hasPlayed
          )}`
      )
      .join("\n");
  },

  showUnplayedBy(artist) {
    // All titles from artist
    const artistTitles = Object.keys(this.albums).filter(
      (title) => this.albums[title].artist === artist
    );

    if (this.isEmpty(artistTitles)) {
      return errors.artistNotFound(artist);
    }

    // All unplayed titles from artist
    const artistUnplayedTitles = artistTitles.filter(
      (title) => !this.albums[title].hasPlayed
    );

    if (this.isEmpty(artistUnplayedTitles)) {
      return errors.unplayedEmpty;
    }

    return artistUnplayedTitles
      .map((title) => `"${title}" by ${this.albums[title].artist}`)
      .join("\n");
  },

  isEmpty(collection) {
    return Object.keys(collection).length === 0;
  },

  formatHasPlayed(hasPlayed) {
    return hasPlayed ? "(played)" : "(unplayed)";
  },
};

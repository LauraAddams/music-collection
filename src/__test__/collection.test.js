const collection = require("../collection");

describe("collection", () => {
  beforeEach(() => {
    collection.albums = {
      "New Blue Sun": {
        artist: "André 3000",
        hasPlayed: false,
      },
      "Whack World": {
        artist: "Tierra Whack",
        hasPlayed: false,
      },
      Blonde: {
        artist: "Frank Ocean",
        hasPlayed: true,
      },
      "Channel Orange": {
        artist: "Frank Ocean",
        hasPlayed: false,
      },
    };
  });

  test("add", () => {
    collection.add(`add "Pink Tape" "f(x)"`);
    expect(collection.albums["Pink Tape"]).toBeDefined();
    expect(collection.albums["Pink Tape"].artist).toBe("f(x)");
    expect(collection.albums["Pink Tape"].hasPlayed).toBeFalsy();

    expect(collection.add(`add "Pink Tape" "not f(x)"`)).toBe(
      `An album named "Pink Tape" already exists in your collection.`
    );

    expect(collection.add(`add "Red Light"`)).toBe(
      `Sorry, that command is not valid. Type '\x1b[1mhelp\x1b[0m' for a list of available commands.`
    );
  });

  test("play", () => {
    collection.play(`play "New Blue Sun"`);
    expect(collection.albums["New Blue Sun"].hasPlayed).toBeTruthy();

    expect(collection.play(`play "Lemonade"`)).toBe(
      `There are no albums named "Lemonade" in your collection.`
    );
  });

  test("show", () => {
    expect(collection.show("show albums")).toBe(
      `Sorry, that command is not valid. Type '\x1b[1mhelp\x1b[0m' for a list of available commands.`
    );

    collection.albums = {};
    expect(collection.show("show all")).toBe(
      `Your collection is empty! Add an album to get started.`
    );
  });

  test("showAll", () => {
    expect(collection.showAll()).toBe(
      `"New Blue Sun" by André 3000 (unplayed)\n"Whack World" by Tierra Whack (unplayed)\n"Blonde" by Frank Ocean (played)\n"Channel Orange" by Frank Ocean (unplayed)`
    );
  });

  test("showUnplayed", () => {
    expect(collection.showUnplayed()).toBe(
      `"New Blue Sun" by André 3000\n"Whack World" by Tierra Whack\n"Channel Orange" by Frank Ocean`
    );

    collection.play(`play "New Blue Sun"`);
    collection.play(`play "Whack World"`);
    collection.play(`play "Channel Orange"`);
    expect(collection.showUnplayed()).toBe(
      `You have listened to everything in your collection!`
    );
  });

  test("showAllBy", () => {
    expect(collection.showAllBy("Frank Ocean")).toBe(
      `"Blonde" by Frank Ocean (played)\n"Channel Orange" by Frank Ocean (unplayed)`
    );

    expect(collection.showAllBy("f(x)")).toBe(
      `There are no albums by "f(x)" in your collection.`
    );
  });

  test("showUnplayedBy", () => {
    expect(collection.showUnplayedBy("Frank Ocean")).toBe(
      `"Channel Orange" by Frank Ocean`
    );

    collection.play(`play "Channel Orange"`);
    expect(collection.showUnplayedBy("Frank Ocean")).toBe(
      `You have listened to everything in your collection!`
    );

    expect(collection.showUnplayedBy("f(x)")).toBe(
      `There are no albums by "f(x)" in your collection.`
    );
  });

  test("isEmpty", () => {
    expect(collection.isEmpty([])).toBeTruthy();
    expect(collection.isEmpty(["one"])).toBeFalsy();
  });

  test("formatHasPlayed", () => {
    expect(collection.formatHasPlayed(true)).toBe("(played)");
    expect(collection.formatHasPlayed(false)).toBe("(unplayed)");
  });
});

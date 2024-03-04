const {
  albumDuplicate,
  albumNotFound,
  artistNotFound,
} = require("../../utils/errors");

describe("Error message functions", () => {
  test("albumDuplicate", () => {
    expect(albumDuplicate("fruit")).toBe(
      'An album named "fruit" already exists in your collection.'
    );
  });

  test("albumNotFound", () => {
    expect(albumNotFound("fruit")).toBe(
      'There are no albums named "fruit" in your collection.'
    );
  });

  test("artistNotFound", () => {
    expect(artistNotFound("fruit")).toBe(
      'There are no albums by "fruit" in your collection.'
    );
  });
});

const authenticator = require("../middleware/authinticator");
const expect = require("chai").expect;
const { APIError } = require("../models/shared/messages");

it("should throw error if now auth header is pereset", function () {
  const req = {
    get: function () {
      return null;
    },
  };
  expect(authenticator.bind(this, req, {}, () => {})).to.equal(
    // APIError.errNoAutHeader()
    { Unauthorized: "No authorization header" }
  );
});

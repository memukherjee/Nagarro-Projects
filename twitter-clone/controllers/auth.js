const passport = require("passport");
module.exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

module.exports.authenticateGoogleCallback = passport.authenticate("google", { successRedirect: "/homePage", failureRedirect: "/" })

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./dbConfig");
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      },
      function (accessToken, refreshToken, profile, cb) {
        db.searchByValue({
          table: "user",
          searchAttribute: "googleId",
          searchValue: profile.id,
          attributes: ["*"],
        })
          .then((result) => {
            // console.log(result);
            const userData = result.data;
            if (userData.length > 0) {
              return cb(null, userData[0]);
            } else {


              db.insert({
                table: "user",
                records: [{
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                }],
              }).then((result) => {
                // console.log(result);
                return cb(null, {id: result.data.inserted_hashes[0]});
              })
              .catch((err) => {
                console.log(err);
                return cb(err, null);
              });


            }
          })
          .catch((err) => {
            console.log(err);
            return cb(err, null);
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    console.log("deserializeUser");
    db.searchByHash(
      {
        table: "user",
        hashValues: [id],
        attributes: ["*"],
      },
      function (err, user) {
        done(err, user);
      }
    );
  });
};

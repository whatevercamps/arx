const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const mu = require("./mongoUtils")();
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log("hola");

      mu.connect()
        .then((client) => mu.getUsersByEmail(client, username))
        .then((resp) => {
          console.log("resp", resp);
          if (resp && resp.length) {
            const user = resp[0];
            console.log("user", user);

            bcrypt
              .compare(password, user.password)
              .then((isMatch) => {
                console.log("res bycript", isMatch);

                if (isMatch) {
                  done(null, user);
                } else {
                  done(null, false);
                }
              })
              .catch((err) => done(err));
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          console.log("eeror consulting db in login", err);

          done(err);
        });
    })
  );

  //hola
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:
          "https://arx-speeddating-app.herokuapp.com/auth/facebook/callback", //jkasdjkadkjakjdkjakjda
        profileFields: ["id", "displayName", "email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        const prevUser = { ...profile._json };
        let user = {};
        if (prevUser && prevUser.id) {
          user["facebookId"] = prevUser.id;
          user["name"] = (prevUser && prevUser.name) || "";
          user["email"] = (prevUser && prevUser.email) || "";
          mu.connect()
            .then((client) =>
              mu.findOrCreateUser(client, { facebookId: prevUser.id }, user)
            )
            .then((resp) => {
              console.log("user founded in line 58", resp);
              if (resp && resp.value) return cb(null, resp.value);
              else if (
                resp &&
                resp.lastErrorObject &&
                resp.lastErrorObject.upserted
              )
                return cb(null, resp.lastErrorObject.upserted);
              //si akgo falla ese upserted
              else return cb(new Error("User not found"));
            })
            .catch((err) => {
              return cb(err, null);
            });
        } else {
          return cb(new Error("no facebook info provided"), null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("serializing user", user);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

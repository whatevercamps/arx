// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

const FacebookStrategy = require("passport-facebook").Strategy;
// const ModelGenerator = require("../models/user");
// const model = ModelGenerator();

module.exports = function (passport) {
  // const cookieExtractor = function (req) {
  //   var token = null;
  //   if (req && req.cookies) {
  //     token = req.cookies["jwt"];
  //   }
  //   console.log("token", token);
  //   return token || ExtractJwt.fromAuthHeaderWithScheme("jwt");
  // };

  // let opts = {};
  // opts.jwtFromRequest = cookieExtractor;
  // opts.secretOrKey = process.env.SECRET || "";

  // passport.use(
  //   new JwtStrategy(opts, (jwt_payload, done) => {
  //     model
  //       .connect()
  //       .then((client) => model.getUserById(client, jwt_payload._id))
  //       .then((users) => {
  //         if (users && users.length) {
  //           return done(null, users[0]);
  //         } else {
  //           return done(null, false);
  //         }
  //       });
  //   })
  // );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3001/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log("authenticated", profile._json);
        return cb(null, profile._json);
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

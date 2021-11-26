const passport = require('koa-passport');

const properties = require('../properties');
const service = require('../services').user;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: properties.JWT_SECRET, 
  issuer: properties.JWT_ISSUER
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  const id = await service.getUserById(jwt_payload.id);

  if(id) {
    return done(null, id);
  } 

  return done(null, false);
}));

module.exports = passport;

const service = require('../services').user;
const jwt = require('jsonwebtoken');
const properties = require('../properties');

const respondWith = require('../services').utils.respondWith;

const login = async (ctx) => {
  const tag = ctx.request.body.tag;

  if (!tag) {
    return respondWith(ctx, 400, "Username was not found");
  }

  let user;
  if (await service.getUserByTag(tag)) {
    user = await service.getUserById(ctx.request.body.id);

    if (!user) {
      return respondWith(ctx, 400, "Username already in use");
    }
  } else {
    user = await service.createUser(ctx.request.body);
  }

  return respondWith(ctx, 200, jwt.sign(JSON.stringify({ id: user.id, iss: properties.JWT_ISSUER }), properties.JWT_SECRET));
};

const updatePreferences = async (ctx) => {
  await service.updatePreferences(ctx.session.passport.user, ctx.request.body.input_lang, ctx.request.body.output_lang);
  return respondWith(ctx, 200, "Updated");
}

const logout = async (ctx) => {
  service.logout(ctx.session.passport.user);
  ctx.session = null;
  ctx.body = { message: 'Logged out' };
};

module.exports = {
  login,
  updatePreferences,
  logout
};

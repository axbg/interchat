const service = require('../services').user;
const jwt = require('jsonwebtoken');
const properties = require('../properties');
const curateInstance = require('../services/utils').curateInstance;

const respondWith = require('../services').utils.respondWith;

const login = async (ctx) => {
  const tag = ctx.request.body.tag;

  if (!tag) {
    return respondWith(ctx, 400, "Tag field was not provided");
  }

  let user = await service.getUserByTag(tag)
  if (user) {
    const secret = ctx.request.body.secret;
    if (!secret || user.secret !== secret) {
      return respondWith(ctx, 400, "Tag already in use");
    }
  } else {
    const userInfo = curateInstance(ctx.request.body);
    delete userInfo.secret;
    user = await service.createUser(userInfo);
  }

  const token = jwt.sign(JSON.stringify({ id: user.id, iss: properties.JWT_ISSUER }), properties.JWT_SECRET);
  return respondWith(ctx, 200, { token: token, secret: user.secret });
};

const updatePreferences = async (ctx) => {
  await service.updatePreferences(ctx.session.passport.user, ctx.request.body);
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

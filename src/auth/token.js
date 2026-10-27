const jwt = require('jsonwebtoken');

const TOKEN_TTL_SECONDS = 5 * 60;

function getConfiguration() {
  const { AUTH_TOKEN_SECRET } = process.env;

  if (!AUTH_TOKEN_SECRET) {
    return null;
  }

  return { secret: AUTH_TOKEN_SECRET };
}

function createAccessToken(username, secret) {
  return jwt.sign({ sub: username }, secret, { expiresIn: TOKEN_TTL_SECONDS });
}

function verifyAccessToken(token, secret) {
  try {
    const claims = jwt.verify(token, secret);
    return typeof claims === 'object' && typeof claims.sub === 'string';
  } catch {
    return false;
  }
}

module.exports = {
  TOKEN_TTL_SECONDS,
  getConfiguration,
  createAccessToken,
  verifyAccessToken
};

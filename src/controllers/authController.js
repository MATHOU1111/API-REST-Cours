const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  createAccessToken,
  getConfiguration,
  TOKEN_TTL_SECONDS
} = require('../auth/token');

async function createToken(request, response, next) {
  const configuration = getConfiguration();
  if (!configuration) {
    return response.status(503).json({ error: "L'authentification n'est pas configurée." });
  }

  const { username, password } = request.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return response.status(400).json({
      error: "Les champs 'username' et 'password' sont obligatoires."
    });
  }

  try {
    const user = await User.findOne({ username, active: true });
    const passwordMatches = user && await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return response.status(401).json({ error: 'Identifiants invalides.' });
    }

    return response.status(200).json({
      access_token: createAccessToken(user.username, configuration.secret),
      token_type: 'Bearer',
      expires_in: TOKEN_TTL_SECONDS
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createToken };

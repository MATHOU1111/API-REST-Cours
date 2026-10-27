const { getConfiguration, verifyAccessToken } = require('../auth/token');

function requireAuth(request, response, next) {
  const configuration = getConfiguration();
  const authorization = request.get('authorization');
  const match = authorization && authorization.match(/^Bearer\s+(\S+)$/i);

  if (!configuration || !match || !verifyAccessToken(match[1], configuration.secret)) {
    return response.status(401).json({
      error: 'Un jeton Bearer valide est requis.'
    });
  }

  next();
}

module.exports = requireAuth;

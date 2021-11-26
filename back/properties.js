module.exports = {
    PROD: !!+process.env.PROD,
    PORT: process.env.PORT || 8080,
    DB_URI: process.env.DB_URI,
    ALLOW_CORS: !!+process.env.ALLOW_CORS,
    COOKIE_KEYS: [process.env.COOKIE_KEY],
    JWT_SECRET: process.env.JWT_SECRET || 'very_hard_to_guess_secret',
    JWT_ISSUER: process.env.JWT_ISSUER || 'very_secret_issuer',
    SESSION_CONFIG: {
        key: 'koa:sess',
        maxAge: process.env.COOKIE_MAX_AGE,
        autoCommit: true,
        overwrite: true,
        httpOnly: !!+process.env.PROD,
        signed: true,
        rolling: false,
        renew: true,
        secure: !!+process.env.PROD,
        sameSite: !!+process.env.PROD,
    },
}

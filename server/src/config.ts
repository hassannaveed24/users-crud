export default () => ({
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://127.0.0.1:27017/users-crud',
  },
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN || '60s',
    secret: process.env.JWT_SECRET || 'secretKey',
  },
});

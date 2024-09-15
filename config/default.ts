export default {
  port: 3000,
  mongoDB: process.env.MONGODB_URI,
  accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,
  accessTokenExpiresIn: 120,
  refreshTokenExpiresIn: 720,
};

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../constants");

const createAccessToken = (register) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    register_id: register._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};
const createRefreshToken = (register) => {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);
  const payload = {
    token_type: "refresh",
    register_id: register._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token) => {
  return jwt.decode(token, JWT_SECRET_KEY, true);
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
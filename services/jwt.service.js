const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    (this.accessKey = accessKey),
      (this.refreshKey = refreshKey),
      (this.accessTime = accessTime),
      (this.refreshTime = refreshTime);
  }
  generateToken(payload) {
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    return {
      refreshToken,
      accessToken,
    };
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

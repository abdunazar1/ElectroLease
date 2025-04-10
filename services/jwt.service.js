const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  // Token yaratish
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

  // Access tokenni tekshirish
  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessKey);
    } catch (error) {
      throw new Error("Access token noto'g'ri yoki muddatdan o'tgan");
    }
  }

  // Refresh tokenni tekshirish
  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshKey);
    } catch (error) {
      throw new Error("Refresh token noto'g'ri yoki muddatdan o'tgan");
    }
  }
}

module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

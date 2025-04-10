const config = require("config");
const jwt = require("jsonwebtoken");

class JwtOwnerService {
  constructor(
    accessOwnerKey,
    refreshOwnerKey,
    accessOwnerTime,
    refreshOwnerTime
  ) {
    this.accessOwnerKey = accessOwnerKey;
    this.refreshOwnerKey = refreshOwnerKey;
    this.accessOwnerTime = accessOwnerTime;
    this.refreshOwnerTime = refreshOwnerTime;
  }

  generateToken(payload) {
    const refreshOwnerToken = jwt.sign(payload, this.refreshOwnerKey, {
      expiresIn: this.refreshOwnerTime,
    });
    const accessOwnerToken = jwt.sign(payload, this.accessOwnerKey, {
      expiresIn: this.accessOwnerTime,
    });
    return {
      refreshOwnerToken,
      accessOwnerToken,
    };
  }

  async verifyAccessOwnerToken(token) {
    try {
      return jwt.verify(token, this.accessOwnerKey);
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  async verifyRefreshOwnerToken(token) {
    try {
      return jwt.verify(token, this.refreshOwnerKey);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}


module.exports = new JwtOwnerService(
  config.get("access_key_owner"),
  config.get("refresh_key_owner"),
  config.get("access_time_owner"),
  config.get("refresh_time_owner")
);

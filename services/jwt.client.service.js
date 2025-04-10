const config = require("config");
const jwt = require("jsonwebtoken");

class JwtClientService {
  constructor(
    accessClientKey,
    refreshClientKey,
    accessClientTime,
    refreshClientTime
  ) {
    this.accessClientKey = accessClientKey;
    this.refreshClientKey = refreshClientKey;
    this.accessClientTime = accessClientTime;
    this.refreshClientTime = refreshClientTime;
  }

  generateToken(payload) {
    const refreshClientToken = jwt.sign(payload, this.refreshClientKey, {
      expiresIn: this.refreshClientTime,
    });
    const accessClientToken = jwt.sign(payload, this.accessClientKey, {
      expiresIn: this.accessClientTime,
    });
    return {
      refreshClientToken,
      accessClientToken,
    };
  }

  async verifyAccessClientToken(token) {
    try {
      return jwt.verify(token, this.accessClientKey);
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  async verifyRefreshClientToken(token) {
    try {
      return jwt.verify(token, this.refreshClientKey);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}


module.exports = new JwtClientService(
  config.get("access_key_client"),
  config.get("refresh_key_client"),
  config.get("access_time_client"),
  config.get("refresh_time_client")
);

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static unauthorized(msg) {
    return new ApiError(401, msg);
  }

  static forbidden(msg) {
    return new ApiError(403, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }

  static internal(msg = "Internal server error") {
    return new ApiError(500, msg);
  }

  toJson() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

module.exports = ApiError;

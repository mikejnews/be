class APIError extends Error {
  constructor(ok, name, message, status, properties, internalProperties) {
    super();
    this.ok = ok;
    this.name = name;
    this.message = message;
    this.status = status;
  }
  publicVersion() {
    return new PublicError(this);
  }
  static errNotFound(properties, internalProperties) {
    return new APIError(
      false,
      "Resource not found",
      "The specified Resource does not exist",
      404,
      properties,
      internalProperties
    );
  }
  static errInvalidQueryParameter(properties, internalProperties) {
    return new APIError(
      false,
      "Invalid Query Parameter",
      "One of the query parameters specified is invalid",
      400,
      properties,
      internalProperties
    );
  }
  static errMissingBody(properties, internalProperties) {
    return new APIError(
      false,
      "Missing Body",
      "Missing Data in Request Body.",
      400,
      properties,
      internalProperties
    );
  }
  static errServerError(properties, internalProperties) {
    return new APIError(
      false,
      "Internal Server Error",
      "Request could not be carried out.",
      500,
      properties,
      internalProperties
    );
  }
  static errUnauthorizedError(properties, internalProperties) {
    return new APIError(
      false,
      "Unauthorized",
      "Client Authorization Failed.",
      401,
      properties,
      internalProperties
    );
  }
  static errNoAutHeader(properties, internalProperties) {
    return new APIError(
      false,
      "Unauthorized",
      "No authorization header",
      401,
      properties,
      internalProperties
    );
  }
}

class PublicError {
  constructor(err, name, message, status, properties) {
    this.name = err.name;
    this.message = err.message;
    this.status = err.status;
    this.properties = err.properties;
  }
}

class PublicInfo {
  constructor(ok, message, status, properties) {
    this.ok = ok;
    this.message = message;
    this.status = status;
    this.properties = properties;
  }
  static infoDeleted(properties) {
    console.log(properties);
    return new PublicInfo(true, "Resource Deleted", 204, properties);
  }
  static infoCreated(properties) {
    return new PublicInfo(true, "Resource Created", 201, properties);
  }
  static infoUpdated(properties) {
    return new PublicInfo(true, "Resource Updated", 201, properties);
  }
  static infoLoggedInSuccess(properties) {
    return new PublicInfo(true, "User Logged in", 200, properties);
  }
  static infoRetrieved(properties) {
    return new PublicInfo(true, "Recourse fetched", 200, properties);
  }
}

module.exports = { PublicInfo, PublicError, APIError };

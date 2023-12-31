enum ResponseStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 401,
    NOT_AUTHORIZED = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    TOO_MANY_REQUESTS = 429,
  }
  
  export default ResponseStatus;
  
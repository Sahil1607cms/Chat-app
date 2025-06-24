class ApiError extends Error {
  //statusCode and error are custom properties of apierror class
  //message is default parameter of constructor of Error class
  constructor(statusCode, message = "Failed ", stack, error) {
    super(message);
    this.statusCode = statusCode;
    // this.message = message; already handled by the error class
    this.success = false;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
        //telling to start the trace from this.constructor and skip the trace before it 
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

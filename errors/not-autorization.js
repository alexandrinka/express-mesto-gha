class NotAutorization extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default NotAutorization;

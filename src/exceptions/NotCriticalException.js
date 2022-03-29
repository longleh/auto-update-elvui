class NotCriticalException extends Error {
    constructor(...params) {
        super(...params);
            if(Error.captureStackTrace) {
          Error.captureStackTrace(this, NotCriticalException);
        }
        this.name = 'NotCriticalException';
        this.date = new Date();
      }
}

export default NotCriticalException
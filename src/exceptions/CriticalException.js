class CriticalException extends Error {
    constructor(...params) {
        super(...params);
            if(Error.captureStackTrace) {
          Error.captureStackTrace(this, CriticalException);
        }
        this.name = 'CriticalException';
        this.date = new Date();
      }
}

export default CriticalException
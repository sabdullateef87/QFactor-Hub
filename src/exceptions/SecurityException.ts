export default class SecurityException extends Error {
    constructor(public message: string, public httpCode: number, public status: string) {
        super();
        this.httpCode = httpCode;
        this.status = status;
        this.message = message;
    }
}
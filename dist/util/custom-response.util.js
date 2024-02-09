"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }
    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }
    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }
    send(res) {
        const result = {
            status: this.type,
            message: this.message,
            response: this.data,
        };
        if (this.statusCode) {
            if (this.type === 'success') {
                return res.status(this.statusCode).json(result);
            }
            return res.status(this.statusCode).json({
                status: this.type,
                message: this.message,
            });
        }
    }
}
exports.default = CustomResponse;

import { Response } from 'express';

class CustomResponse {
    statusCode: null | number;
    type: null | string;
    data: null | any;
    message: null | string;
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode: number, message: string, data: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    setError(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }

    send(res: Response) {
        const result = {
            status: this.type,
            message: this.message,
            data: this.data,
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

export default CustomResponse;

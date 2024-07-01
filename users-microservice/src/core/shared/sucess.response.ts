export class SuccessResponse {
    constructor(data: { data: any, message?: string }) {
        return {
            success : true,
            message: data.message,
            data: data.data,
            
        }
    }
}
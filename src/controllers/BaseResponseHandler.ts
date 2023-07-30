import ResponseMessage, {ResponseMessageDataInterface} from "../messages/ResponseMessage";

abstract class BaseResponseHandler {

    protected responseMessage: ResponseMessage;

    constructor() {
        this.responseMessage = new ResponseMessage();
    }

    protected sendSimpleSuccessResponse(res, metaData: any = {}) {
        const messageData = this.responseMessage.SUCCESS;
        if (res.upgrade_required) {
            metaData.upgrade_required = res.upgrade_required;
        }
        if (Object.keys(metaData).length > 0) {
            return res.json(Object.assign({}, messageData, metaData));
        } else {
            return res.json(messageData);
        }
    }

    protected sendErrorResponse(res, messageData: ResponseMessageDataInterface = this.responseMessage.ERROR, metaData = {}, status = 400) {
        return res.status(status).json(Object.assign({}, messageData, metaData));
    }


    protected logAndSendErrorResponseObject( res, err, responseMessage: ResponseMessageDataInterface, statusCode: number) {
        const message = {message: responseMessage.message, success: false, error_code: responseMessage.error_code};
        return this.sendErrorResponse(res, message, {}, statusCode);
    }

}

export default BaseResponseHandler;

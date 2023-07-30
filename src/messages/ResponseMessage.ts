
class ResponseMessage {
    public ERROR_MESSAGE = "an error occurred";
    public FORGOT_PASSWORD_MESSAGE = "a password reset code will be sent to your email if account exists";
    public CHANGE_EMAIL_REQUEST_MESSAGE = "an email reset code will be sent to your email if account exists";
    public USER_NOT_FOUND_MESSAGE = "user not found";
    public INVALID_CODE_MESSAGE = "invalid code";
    public DUPLICATE_EMAIL_MESSAGE = "Please try a different email";
    public DUPLICATE_PHONE_MESSAGE = "please try a different phone number";
    public UNABLE_TO_SAVE_MESSAGE = "Unable to save";
    public UNABLE_TO_COMPLETE_REQUEST_MESSAGE = "Unable to complete request";
    public INVALID_REQUEST_MESSAGE = "Invalid request";
    public INVALID_LOGIN_MESSAGE = "Invalid email or password";
    public ACCOUNT_BLOCKED_MESSAGE = "Account may have been blocked. Contact administrator";
    public INVALID_TOKEN_MESSAGE = "Invalid token";
    public UPDATE_NOT_PERMITTED_MESSAGE = "Direct Update not permited on a restricted field";
    public ACCOUNT_ACTIVATION_REQUIRED_MESSAGE = "Account activation required";
    public EMPTY_MESSAGE = "Not found";
    public ID_EXISTS_MESSAGE = "ID exists";
    public SUBSCRIPTION_REQUIRED_MESSAGE = "Please upgrade your membership";
    public PROFILE_PHOTO_LIMIT_MESSAGE = `You cannot add more than ${process.env.MAX_PROFILE_PHOTO} profile photos`;
    public NOT_FOUND_MESSAGE = "Not found";
    public INVITATION_CODE_NOT_USED="Invitation code not used"
    public SUCCESS = {success: true};
    public ERROR: ResponseMessageDataInterface = {success: false, error_code: 1, message: this.ERROR_MESSAGE};
    public UNABLE_COMPLETE_REQUEST: ResponseMessageDataInterface = {success: false, error_code: 6, message: this.UNABLE_TO_COMPLETE_REQUEST_MESSAGE};

    public createErrorMessage(message: string, error = {}) {
        const data = {};
        data[MESSAGE_KEYS.MESSAGE] = message;
        if (Object.keys(error).length) {
            data["error"] = error;
        }
        return data;
    }
}


export interface ResponseMessageDataInterface {
    success: boolean;
    error_code: number;
    message: string;
}

export const MESSAGE_KEYS = {
    ERROR_MESSAGE: "error_message",
    MESSAGE: "message"
};

export default ResponseMessage;

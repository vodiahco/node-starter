import * as express from 'express';
import BaseResponseHandler from "./BaseResponseHandler";

abstract class BaseController extends BaseResponseHandler {

    public router;

    constructor() {
        super();
        //early initializations
        // to be implemented by children classes
        this.init();
        this.router = express.Router();
        //services that are needed by children controllers
        // to be implemented by children classes
        this.initServices();
        //middlewares that are needed by children controllers
        // to be implemented by children classes
        this.initMiddleware();
        //routes that are needed by children controllers
        // to be implemented by children classes
        this.registerRoutes();
    }

    protected init() {}

    protected initMiddleware() {}

    protected initServices() {}

    protected abstract registerRoutes();
}

export default BaseController;

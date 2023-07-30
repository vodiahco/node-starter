import BaseController from "./BaseController";

class MyExampleController extends BaseController {

    protected registerRoutes() {
        this.getUserRoute();
    }

    /**
     * getUserRoute
     * @private
     */
    private getUserRoute() {
        //setup the endpoint on the express router which was defined on the base class BaseController
        this.router.get('/', (req, res) => {
            // enter code implementation here
            return this.sendSimpleSuccessResponse(res, {data: {name: 'Von', 'id': 1}});
        })
    }
}

export default MyExampleController;

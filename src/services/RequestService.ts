class RequestService {

    private router;
    // @ts-ignore
    private request;
    // @ts-ignore
    private response;

    constructor(router: any) {
        this.router = router;
       // if (!this.request) {
            this.router.use((req: any, res: any, next: () => void) => {
                this.request = req;
                this.response = res;
                next();
            })
      //  }
    }

    updateRequest(key: string, value: string, baseName = "custom") {
        if (!this.request[baseName]) {
            this.request[baseName] = {};
        }
        this.request[baseName][key] = value;
    }

    getOrCreateNewObject(key: string, baseName = "custom") {
        if (!this.request[baseName]) {
            this.request[baseName] = {};
        }
        if (!this.request[baseName][key]) {
            this.request[baseName][key] = {};
        }
        return this.request[baseName][key];
    }

    getDataBag() {
        return this.getOrCreateNewObject('data-bag');
    }
    getApplication() {
        return this.response.locals.application;
    }

    addToDataBag(key: string | number, value: any) {
       // const bag = this.getOrCreateNewObject('data-bag');
       // bag[key] = value;
        this.response.locals[key] = value;
    }

    getFromDataBag(key: string | number) {
        return this.response.locals[key];
    }

    getUser() {
        return this.response.locals.user;
    }

    hasUser() {
        const bag = this.getOrCreateNewObject('data-bag');
        return (bag.user);
    }

    getUserSession() {
        return this.response.locals.user_session;
    }
}

export default RequestService;

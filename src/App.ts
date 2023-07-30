import express from 'express';
import * as bodyParser from "body-parser";
import cors from "cors";
import MyExampleController from "./controllers/MyExampleController";

const apiVersion = process.env.API_VERSION || 'v1';
const API_PATH = `/api/${apiVersion}`;

class App {
    public app;

    constructor() {
        this.app = express();
        this.initRoutes();
    }

    private initRoutes() {
        this.app.use(cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));


        this.app.get("/", (req, res) => {
            const now = Date.now();
            return res.json({status: "success", request_time: now});
        });

        this.app.get(API_PATH, (req, res) => {
            const now = Date.now();
            return res.json({status: "success", request_time: now, version: process.env.API_VERSION});
        });

        //mount controller endpoints
        //example controller
        this.app.use(`${API_PATH}/my-endpoint`, new MyExampleController().router);
    }
}

export default App;

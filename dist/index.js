"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cluster_1 = __importDefault(require("cluster"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const morgan_1 = __importDefault(require("morgan"));
process.on('unhandledRejection', (rejectionErr) => {
    console.log('unhandledRejection Err::', rejectionErr);
    console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr));
});
process.on('uncaughtException', (uncaughtExc) => {
    console.log('uncaughtException Err::', uncaughtExc);
    console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc));
});
const app = (0, express_1.default)();
let workers = [];
class App extends router_1.default {
    constructor() {
        super();
    }
    /**
    * Setup number of worker processes to share port which will be defined while setting up the server
    */
    setupWorkerProcesses() {
        let numCores = require('os').cpus().length;
        console.log('Master cluster setting up ' + numCores + ' workers');
        // iterate on number of cores need to be utilized by an application
        // current example will utilize all of them
        for (let i = 0; i < numCores; i++) {
            // creating workers and pushing reference in an array
            // these references can be used to receive messages from workers
            workers.push(cluster_1.default.fork());
            //to receive messages from worker process
            workers[i].on('message', (msg) => {
                console.log(msg);
            });
        }
        // process is clustered on a core and process id is assigned
        cluster_1.default.on('online', (worker) => {
            console.log('Worker ' + worker.process.pid + ' is listening');
        });
        // if any of the worker process dies then start a new one by simply forking another one
        cluster_1.default.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            workers.push(cluster_1.default.fork());
            // to receive messages from worker process
            workers[workers.length - 1].on('message', function (message) {
                console.log(message);
            });
        });
    }
    /**
    * Setup an express server and define port to listen all incoming requests for this application
    */
    setUpExpress() {
        // parse application/json
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.disable('x-powered-by');
        // cross origin configuration
        app.use((0, cors_1.default)());
        // logger
        app.use((0, morgan_1.default)("combined"));
        // routes
        app.use('/api/v1', ...super.route());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '127.0.0.1');
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method == 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
        });
        app.use('/public', express_1.default.static('./public'));
        // start server
        app.listen(process.env.PORT, () => {
            console.log(`Started server on => http://localhost:${process.env.PORT} for Process Id ${process.pid}`);
        });
        // in case of an error
        app.on('error', (parent) => {
            console.error('app error', parent.stack);
            // console.error('on url', parent.);
            // console.error('with headers', parent.req.headers);
        });
    }
    /**
     * this function is to start cron job and running every second
     * every task of cronjob is goes to here
     */
    setUpCronJob() { }
    setUpSockets(port) { }
    ;
    /**
     * Setup server either with clustering or without it
     * @param isClusterRequired Boolean
     * @constructor
     */
    setupServer(isClusterRequired) {
        // if it is a master process then call setting up worker process
        if (isClusterRequired && cluster_1.default.isPrimary) {
            this.setupWorkerProcesses();
        }
        else {
            // to setup server configurations and share port address for incoming requests
            this.setUpExpress();
        }
    }
}
// run the server
new App().setupServer(process.env.NODE_ENV === "test" ? false : true);

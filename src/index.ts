import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cluster, { Cluster, Worker } from 'cluster';
require('dotenv').config();
import cors from 'cors';
import Routes from './router';
import morgan from 'morgan';

process.on('unhandledRejection', (rejectionErr) => {
    console.log('unhandledRejection Err::', rejectionErr);
    console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr))
})

process.on('uncaughtException', (uncaughtExc) => {
    console.log('uncaughtException Err::', uncaughtExc);
    console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc));
})

const app = express();
let workers: Worker[] = [];


class App extends Routes {
    constructor() {
        super()
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
            workers.push(cluster.fork());
            //to receive messages from worker process
            workers[i].on('message', (msg) => {
                console.log(msg)
            })
        }

        // process is clustered on a core and process id is assigned
        cluster.on('online', (worker) => {
            console.log('Worker ' + worker.process.pid + ' is listening')
        })

        // if any of the worker process dies then start a new one by simply forking another one
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            workers.push(cluster.fork());
            // to receive messages from worker process
            workers[workers.length - 1].on('message', function (message) {
                console.log(message);
            });
        })
    }

    /**
    * Setup an express server and define port to listen all incoming requests for this application
    */
    setUpExpress() {
        // parse application/json
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.disable('x-powered-by')

        
        // cross origin configuration
        app.use(cors());

        // logger
        app.use(morgan("combined"))
        
        // routes
        app.use('/api/v1', ...super.route())
        
        
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '127.0.0.1');
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if (req.method == 'OPTIONS') {
                return res.sendStatus(200);
            }

            next();
        });
        app.use('/public', express.static('./public'));

        // start server
        app.listen(process.env.PORT, () => {
            console.log(`Started server on => http://localhost:${process.env.PORT} for Process Id ${process.pid}`);
        });


        // in case of an error
        app.on('error', (parent: Application) => {
            console.error('app error', parent.stack);
            // console.error('on url', parent.);
            // console.error('with headers', parent.req.headers);
        });
    }


    /**
     * this function is to start cron job and running every second
     * every task of cronjob is goes to here
     */
    setUpCronJob() {}

    setUpSockets(port: number) {};

    /**
     * Setup server either with clustering or without it
     * @param isClusterRequired Boolean
     * @constructor
     */
    setupServer(isClusterRequired: boolean) {
        // if it is a master process then call setting up worker process
        if (isClusterRequired && cluster.isPrimary) {
            this.setupWorkerProcesses();
        } else {
            // to setup server configurations and share port address for incoming requests
            this.setUpExpress();
        }
    }
}

// run the server
new App().setupServer(process.env.NODE_ENV === "test" ? false : true);
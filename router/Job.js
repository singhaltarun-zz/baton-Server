const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var app = express();
const PROTO_PATH = './Job.proto';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const job = grpc.loadPackageDefinition(packageDefinition).com.mindtickle.baton.pb.munimG;

var client = new job.Jobs("localhost" + ":" + "9090",
    grpc.credentials.createInsecure());

var jsonParser = bodyParser.json({ type: 'application/json' } );
router.post('/',jsonParser,(req,res,next)=> {
    var  getRequests = req.body;
    try{
        client.GetJob(getRequests , (error, response) => {
            res.status(200).json(response);
            // console.log(response);
        });
    }catch(e){
        console.log(e);
    }
})


module.exports = router;
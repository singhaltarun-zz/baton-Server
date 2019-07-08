const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var app = express();
var protobuf = require('protobufjs');
var proto = require('../model');
const UCC_PROTO_PATH = './Processor.proto';
// const client = new grpc.Client('localhost:80', grpc.credentials.createInsecure());
// function passThrough(argument) {
//   return argument;
// }
// const rpcImpl = function(method, request, callback) {
//   /* Conventionally in gRPC, the request path looks like 
//      "/package.names.ServiceName/MethodName/", 
//      so getPath would generate that from the method */
// //   const path = getPath(method);
// //   console.log(path);
//   // Using passThrough as the serialize and deserialize functions
//   client.makeUnaryRequest(method, passThrough, passThrough, request, callback);
// };
// var uccServiceClient = proto.com.mindtickle.baton.pb.batonRegistry.Processors.create(rpcImpl);
var packageDefinition = protoLoader.loadSync(
    UCC_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const ucc = grpc.loadPackageDefinition(packageDefinition).com.mindtickle.baton.pb.batonRegistry;

var uccServiceClient = new ucc.Processors("localhost" + ":" + "80",
    grpc.credentials.createInsecure());
router.get('/',(req,res,next)=> {
    var  getRequests = {}
    console.log("geting");
    try{
        uccServiceClient.ListProcessor(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){
        console.log(e);
    }
})

var jsonParser = bodyParser.json({ type: 'application/json' } );
router.delete('/',jsonParser,(req,res,next)=> {
    var  getRequests = req.body;
    console.log("del");
    try{
        uccServiceClient.DeleteProcessor(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){
    }
})


router.post('/',jsonParser,(req,res, next)=> {
    var getRequests = req.body;
    console.log("post");
    try{
        uccServiceClient.CreateProcessor(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){
        console.log(e);
    }
})

router.put('/',jsonParser,(req,res,next)=> {
    var getRequests = req.body;
    try{
        uccServiceClient.UpdateProcessor(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})
module.exports = router;
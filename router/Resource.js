const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var app = express();
const PROTO_PATH = './Resource.proto';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const resource = grpc.loadPackageDefinition(packageDefinition).com.mindtickle.baton.pb.batonRegistry;
var client = new resource.Resources("localhost" + ":" + "80",
    grpc.credentials.createInsecure());

router.get('/',(req,res,next)=> {
    var  getRequests = {}
    try{
        client.ListResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

var jsonParser = bodyParser.json({ type: 'application/json' } );
router.delete('/',jsonParser,(req,res,next)=> {
    var  getRequests = req.body;
    try{
        client.DeleteResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){
    }
})


router.post('/',jsonParser,(req,res, next)=> {
    var getRequests = req.body;
    console.log("post");
    try{
        client.CreateResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

router.put('/',jsonParser,(req,res,next)=> {
    var getRequests = req.body;
    try{
        client.UpdateResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})
module.exports = router;
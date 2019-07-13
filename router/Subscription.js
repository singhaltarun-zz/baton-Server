const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var app = express();
const PROTO_PATH = './Subscription.proto';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const subscription = grpc.loadPackageDefinition(packageDefinition).com.mindtickle.baton.pb.batonRegistry;
var client = new subscription.Subscriptions("localhost" + ":" + "80",
    grpc.credentials.createInsecure());

router.get('/',(req,res,next)=> {
    var  getRequests = {}
    try{
        client.ListSubscription(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

var jsonParser = bodyParser.json({ type: 'application/json' } );
router.delete('/',jsonParser,(req,res,next)=> {
    var  getRequests = req.body;
    try{
        client.DeleteSubscription(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})


router.post('/',jsonParser,(req,res, next)=> {
    var getRequests = req.body;
    try{
        client.CreateSubscription(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

router.put('/',jsonParser,(req,res,next)=> {
    var getRequests = req.body;
    try{
        client.UpdateSubscription(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})
module.exports = router;
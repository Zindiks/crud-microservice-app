import { Router, Request, Response } from "express";
import { moviesProxyMiddleware, ordersProxyMiddleware } from "../proxy";
import { Publish } from "../models/rabbitmq";


const router = Router()
const publish = new Publish

router.post('/', async(req:Request, res:Response)=>{
    try{
        await publish.sendToBillingQueue(req.body)
        res.status(200).send("Message sent to queue")
    }catch(error){
        res.status(500).send("Failed to send message to queue")
    }
})

router.get('/', ordersProxyMiddleware)





export default router
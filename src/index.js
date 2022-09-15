import express from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import dotenv from "dotenv";

import * as dotenv from 'dotenv'
import db from "./database/db.js";
import { STATUS_CODE } from "./enums/statusCode.js";
import { COLLECTION } from "./enums/collections.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use(authRouter);

app.get('/',async(req,res)=>{
  try{
    const products = await db.collection(COLLECTION.PRODUCTS).find().toArray();
    return res.status(STATUS_CODE.OK).send(products);
  } catch(error){
    return res.status(STATUS_CODE.SERVER_ERROR);
  }
})

app.post('/', async(req,res)=>{
  console.log(req.body);
  const selectedProducts= req.body;
  console.log(selectedProducts);
  try {
    await db.collection(COLLECTION.SELECTED_PRODUCTS).insertOne(selectedProducts);
    return res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }


})


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
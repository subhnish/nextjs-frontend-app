import Cors from 'cors'
import  mongoose from "mongoose"
import { databaseConnect, linkSchemaV2 } from "../../../../middleware/mongoose/connectDatabase"

const cors = Cors({
  methods: ['GET', 'HEAD'],
})


async function runMiddleware() {
    try{
  await databaseConnect('mongodb+srv://subhnish:diPlyB334KhS7uOB@cluster0.f3pkb.mongodb.net/stockRoms?retryWrites=true&w=majority')
    } catch(err) {
      if(err) {
          throw err
      }
      return err
    }
}


export default async function handler(req, res) {
  try {
 let { brand, codename } = req.query
 brand = String(brand).toLowerCase()
 codename = String(codename).toLowerCase()
 runMiddleware()
mongoose.models = {}
 let codenameCollection = mongoose.model(brand, linkSchemaV2);
 let result = await codenameCollection.find({ codename: codename }, (err) => {
   if (err) throw errors
 })
 .sort({"ota.date": "desc", "fastboot.date": "desc"});
 res.send(result)
}
 catch(err) {
  console.error(err);
  res.send([])
}
}
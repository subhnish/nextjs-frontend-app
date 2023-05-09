import Cors from 'cors'
import  mongoose from "mongoose"
import { databaseConnect, brandSchema  } from "../../../middleware/mongoose/connectDatabase"

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


export async function getBrands() {
 await runMiddleware()
mongoose.models = {}
 let brandCollection = mongoose.model("brands", brandSchema);
 let result = await brandCollection.find({}, (err) => {
   if (err) throw errors
 })
 return result
}

export default async function handler(req, res) {
    let result = await getBrands()
    res.send(result)
}
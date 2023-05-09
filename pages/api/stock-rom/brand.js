import Cors from 'cors'
import  mongoose from "mongoose"
import { databaseConnect, phoneSchema  } from "../../../middleware/mongoose/connectDatabase"

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


export default async function getBrandPhones(params) {
 let { brand } = params
 brand = String(brand).toLowerCase()
 runMiddleware()
mongoose.models = {}
 let brandPhonesCollection = mongoose.model(`${brand}Phones`, phoneSchema);
 let result = await brandPhonesCollection.find({}, (err) => {
   if (err) throw errors
 })
 return result
}
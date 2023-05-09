import Cors from "cors";
import mongoose from "mongoose";
import {
  databaseConnect,
  linkSchemaV2,
} from "../../../../../middleware/mongoose/connectDatabase";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function runMiddleware() {
  try {
    await databaseConnect('mongodb+srv://subhnish:diPlyB334KhS7uOB@cluster0.f3pkb.mongodb.net/stockRoms?retryWrites=true&w=majority');
  } catch (err) {
    if (err) {
      throw err;
    }
    return err;
  }
}

export default async function getVersion(params) {
  try {
  let { brand, codename, version } = params
  brand = String(brand).toLowerCase();
  codename = String(codename).toLowerCase();
  version = String(version).toUpperCase();
  runMiddleware();
  mongoose.models = {};
  let versionCollection = mongoose.model(brand, linkSchemaV2);
  let result = await versionCollection
    .find({ romVersion: version }, (err) => {
      if (err) throw errors;
    })
  return result;
  }
  catch(err) {
    console.error(err);
    return []
  }
}

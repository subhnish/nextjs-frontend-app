import mongoose from "mongoose";

async function databaseConnect(databaseURI) {
  try {
    if (mongoose.connection.readyState === 1) {
      return 
    }
    mongoose.pluralize(null);
    await mongoose.connect(
      databaseURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        else console.log("Database Connected....");
      }
    );

    // return databaseConnect(databaseURI);
  } catch (err) {
    console.error(err);
  }
}

let phoneSchema = mongoose.Schema({
  phoneName: { type: String, required: true },
  codename: { type: String, required: true },
  imageUrl: { type: String, default: "https://i.imgur.com/83hs8AY.png" },
});

let linkSchemaV2 = mongoose.Schema({
  codename: { type: String, required: true },
  romVersion: { type: String, required: true },
  region: { type: String, required: true },
  android: { type: String, required: true },
  phoneName: { type: String, required: true },
  skinVersion: { type: String, required: true },
  status: { type: String, default: "Stable" },
  isOtaUpdated: { type: Boolean, default: false },
  isFastbootUpdated: { type: Boolean, default: false },
  changelog: { type: String },
  ota: {
    link: { type: String, required: true, default: false },
    size: { type: String, required: true, default: false },
    packageName: { type: String, required: true, default: false },
    date: {
      type: Date,
      required: true,
      default: new Date().toISOString().slice(0, 10),
    },
  },

  fastboot: {
    link: { type: String, required: true, default: false },
    packageName: { type: String, required: true, default: false },
    size: { type: String, required: true, default: false },
    date: {
      type: Date,
      required: true,
      default: new Date().toISOString().slice(0, 10),
    },
  },
});

let brandSchema = mongoose.Schema({
    brand: {type: String, required: true}
})

module.exports = { databaseConnect, phoneSchema, linkSchemaV2, brandSchema };

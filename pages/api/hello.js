// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url =
  "mongodb+srv://y2:19890526aA_@y2.ljytwyr.mongodb.net/ziyi?retryWrites=true&w=majority";
export default async (req, res) => {
  await mongoose.connect(url);

  const schema = new Schema({
    id: Schema.ObjectId,
    v: String,
  });

  const MyModel =
    mongoose.models.phone || mongoose.model("phone", schema, "phone");
  const instance = new MyModel();
  const data = await MyModel.find({});

  res.statusCode = 200;
  res.json({ name: data });
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url =
  "mongodb+srv://y2:19890526aA_@y2.ljytwyr.mongodb.net/ziyi?retryWrites=true&w=majority";

const schemaMember = new Schema({
  name: String,
  usedScore: String,
  totalMoney: String,
  phone: String,
  addDate: String,
  editDate: String,
  buyTimes: String,
});

const schemaSpendRecord = new Schema({
  desc: String,
  phone: String,
  money: String,
  addDate: String,
  editDate: String,
});

const schemaExchangeRecord = new Schema({
  money: String,
  phone: String,
  addDate: String,
  editDate: String,
});

export default async (req, res) => {
  const m = await mongoose.connect(url);
  const { member, spendRecord, exchangeRecord } = req.body;

  // 将member写入
  const ModelMember =
    mongoose.models.member || mongoose.model("member", schemaMember, "member");
  await ModelMember.deleteMany({});
  member.forEach((v, index) => {
    const a = {
      name: v.name,
      phone: v.phone,
      addDate: v.addDate,
      editDate: v.editDate,
      usedScore: "",
      totalMoney: "",
      buyTimes: "",
    };
    console.log(a, "aaa");
    const _model = new ModelMember(a);
    _model.save();
  });

  // 将spendRecord写入
  const ModelSpendRecord =
    mongoose.models.spendRecord ||
    mongoose.model("spendRecord", schemaSpendRecord, "spendRecord");
  await ModelSpendRecord.deleteMany({});
  spendRecord.forEach((v, index) => {
    const _model = new ModelSpendRecord({
      desc: v.desc,
      phone: v.phone,
      addDate: v.addDate,
      editDate: v.editDate,
      money: v.money,
    });
    _model.save();
  });

  // 将exchangeRecord写入
  const ModelExchangeRecord =
    mongoose.models.exchangeRecord ||
    mongoose.model("exchangeRecord", schemaExchangeRecord, "exchangeRecord");
  await ModelExchangeRecord.deleteMany({});
  exchangeRecord.forEach((v, index) => {
    const _model = new ModelExchangeRecord({
      phone: v.phone,
      addDate: v.addDate,
      editDate: v.editDate,
      money: v.money,
    });
    _model.save();
  });

  res.statusCode = 200;
  res.json({ msg: "备份成功" });
};

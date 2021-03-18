import { connect } from '../../../../utils/database'


export default async function (req, res) {
  console.log(req.body, 'body', req.body.value)
  const { db } = await connect();
  const rst = await db.collection('ziyi.member').find().toArray()
  
  res.status(200)
  res.json(rst.filter(item=>item.name.indexOf(req.body.value) > -1 || item.phone.indexOf(req.body.value) > -1))
}
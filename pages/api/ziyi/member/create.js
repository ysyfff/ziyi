import {connect} from '../../../../utils/database'

export default async function(req, res){
  console.log(req.body, 'body')
  const {db} = await connect();
  const rst = await db.collection('ziyi.member').insertOne(req.body)

  res.status(200)
  res.json({})
}
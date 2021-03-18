import {connect} from '../../../../utils/database'

export default async function(req, res){

  const {db} = await connect();
  const rst = await db.collection('ziyi.member').find(req.body).toArray()

  res.status(200)
  res.json(rst)
}
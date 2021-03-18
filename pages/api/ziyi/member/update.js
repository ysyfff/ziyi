import {connect} from '../../../../utils/database'
import {ObjectId} from 'mongodb'
export default async function(req, res){
  console.log(req.body, 'body')
  const {_id, ...data} = req.body;
  const {db} = await connect();
  const rst = await db.collection('ziyi.member').updateOne({_id: new ObjectId(_id)}, {$set:data})
  res.status(200)
  res.json({})
}
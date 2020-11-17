const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	const good = (await db.collection('goods').where({
		_id:event.id
	}).get()).data;
	if(good.length!=0){
		return good[0]
	}
	return null;
}
const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	return await db.collection('order').where({
		_id:_.in(event.ids)
	}).remove();
}
const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	const list = (await db.collection('goods').field({
		title:true,
		price:true,
		origin:true,
		img:true
	}).get()).data;
	return list;
}
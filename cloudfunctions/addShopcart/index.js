const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	let data = event.data;
	data.openid = event.userInfo.openId;
	data.type = 0;
	const good = (await db.collection('goods').where({
		_id:data.commodityId
	}).field({
		title:true,
		price:true,
		img:true
	}).get()).data;
	if(good.length!=0){
		data.title = good[0].title;
		data.price = good[0].price;
		data.img = good[0].img;
		const res = await db.collection('order').add({
			data:data
		});
		return res._id;
	}
	else{
		return null;
	}
    
}
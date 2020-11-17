const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	let query = {};
	if(event.ids!=null){
		query._id=_.in(event.ids);
	}
	else{
		if(event.cart==false){
			if(event.done==0){
				query.type = _.in([1,2]);
			}
			else{
				query.type = 3;
			}
		}
		else{
			query.type=0;
		}
	}
	return (await db.collection('order').where(query).get()).data;
}
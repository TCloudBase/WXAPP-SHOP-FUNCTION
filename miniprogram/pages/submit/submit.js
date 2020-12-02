const app = getApp();
var that = null;
Page({
	data: {
		deliveryCost: 0,
		deliveryType: 'fast',
		addressData: {
			name: '张三',
			phone: '18912345678',
			address: "深圳市南山区"
		}
	},
	onDeliveryTypeChange(e) {
		this.setData({
			deliveryType: e.detail.value
		})
	},
	getremark(e) {
		that.remark = e.detail.value;
	},

	onLoad() {
		that = this;
		let ids = wx.getStorageSync('ids');
		app.getBillList({
			ids: ids,
			success(list) {
				const totalAmount = list.reduce((amount, good) => {
					return (amount + good.number * good.price);
				}, 0);
				that.setData({
					ids: ids,
					billNum: list.length,
					billList: list,
					totalAmount
				})
			}
		});
	},
	submitorder() {
		wx.requestSubscribeMessage({
			tmplIds: ['Wf8wTrm0qtXgSOcSF0i57b-24fYxFld70_Q61qut_mo','Xw4e3cMQ3Bp2Fm2B4xaPZ213BicUK1CeozGoBUrcBDA'],
			success (res) {
				console.log(res)
				app.submitorder({
					ids: that.data.ids,
					deliveryType: that.data.deliveryType,
					addressData: that.data.addressData,
					remark: that.remark,
					success() {
						wx.switchTab({
							url: '../order/order',
						})
					}
				})
			}
		})
	}
})
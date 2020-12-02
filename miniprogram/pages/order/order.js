const app = getApp();
var that = null;
Page({
	data: {
		orderNum: 0,
		orderList: [],
		statusType: ["进行中", "已完成"],
		currentType: 0,
		tabClass: ["", "", "", "", ""],
		payButtonClicked: false,
	},
	onLoad() {
		that = this;
	},
	statusTap: function (e) {
		const curType = e.currentTarget.dataset.index;
		this.data.currentType = curType
		this.setData({
			currentType: curType
		});
		this.onShow();
	},
	onShow() {
		wx.showNavigationBarLoading();
		this.getOrderList();
	},
	getOrderList() {
		wx.showNavigationBarLoading();
		app.getShopCart({
			cart: false,
			done: that.data.currentType,
			success(list) {
				that.setData({
					orderList: list
				});
				wx.hideNavigationBarLoading();
			}
		})
	},
	toPayTap(e) {
		wx.showModal({
			title: '模拟付款',
			content: '是否付款，付款不可回退，请确认',
			success(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '付款中',
					});
					app.toPayTap({
						ids: [e.currentTarget.dataset.id],
						success(res) {
							wx.hideLoading();
							that.onShow();
						}
					})
				}
			}
		})
	},
	toDoneOrder(e) {
		wx.showModal({
			title: '确认收货',
			content: '请确认货物是否收到？',
			success(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '确认中',
					});
					app.toDoneOrder({
						ids: [e.currentTarget.dataset.id],
						success(res) {
							wx.hideLoading()
							that.onShow();
						}
					})
				}
			}
		})
	},
	cancelOrderTap(e) {
		wx.showModal({
			title: '确认删除',
			content: '删除后将不可以找回，请确认操作',
			success(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '删除中',
					});
					app.delShopCart({
						ids: [e.currentTarget.dataset.id],
						success(res) {
							wx.hideLoading();
							that.onShow();

						}
					})
				}
			}
		})
	}
})
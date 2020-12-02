const app = getApp();
var that = null;
Page({
	data: {
		autoplay: true,
		interval: 5000,
		duration: 1000,
		loading: true,
		detail: {},
		buyNumMin: 1,
		buyNumMax: 5,
		billNum: 0,
		bill: {
			number: 1
		},
		shopType: '',
		hideShopPopup: true,
		imgheight: 0
	},
	onLoad: function (options) {
		that = this;
		app.getGoodSDetail({
			id: options.id,
			success: function (res) {
				that.setData({
					loading: false,
					detail: res
				})
			}
		})
	},
	goShopCart() {
		wx.switchTab({
			url: '/pages/cart/cart'
		})
	},
	addShopCart() {
		if (this.data.bill.options == null) {
			wx.showToast({
				title: "请选择类型",
				icon: 'none'
			})
			return
		}
		this.renderBillOptionToList();
		wx.showLoading({
			title: '加入购物车中',
		})
		app.addShopCart({
			data: Object.assign({}, this.data.bill, {
				commodityId: this.data.detail._id
			}),
			cart: true,
			success() {
				that.closePopupTap();
				wx.hideLoading();
				wx.showToast({
					title: '添加购物车成功',
				})
			},
			fail() {
				wx.showModal({
					title: "抱歉",
					content: "购物车加入失败，请稍后再试",
					showCancel: false
				})
			}
		});
	},
	buyNow() {
		if (this.data.bill.options == null) {
			wx.showToast({
				title: "请选择类型",
				icon: 'none'
			})
			return
		}
		this.renderBillOptionToList();
		app.addShopCart({
			data: Object.assign({}, this.data.bill, {
				commodityId: this.data.detail._id
			}),
			cart: false,
			success() {
				that.closePopupTap();
				wx.navigateTo({
					url: '../submit/submit',
				})
			},
			fail() {
				wx.showModal({
					title: "抱歉",
					content: "购物车加入失败，请稍后再试",
					showCancel: false
				})
			}
		});
	},
	toAddShopCart() {
		this.setData({
			shopType: 'addShopCart',
			hideShopPopup: false
		})
	},

	toBuy() {
		this.setData({
			shopType: 'buy',
			hideShopPopup: false
		})
	},

	closePopupTap() {
		this.setData({
			hideShopPopup: true
		})
	},

	labelItemTap(e) {
		let dataset = e.target.dataset || {}
		let options = Object.assign({}, this.data.bill.options)
		options[dataset.key] = dataset.idx
		this.setData({
			"bill.options": options
		})
	},

	numMinusTap() {
		if (this.data.bill.number > this.data.buyNumMin) {
			this.setData({
				'bill.number': --this.data.bill.number
			})
		}
	},

	numAddTap() {
		if (this.data.bill.number < this.data.buyNumMax) {
			this.setData({
				'bill.number': ++this.data.bill.number
			})
		}
	},

	renderBillOptionToList() {
		let optionList = []
		let options = this.data.bill.options
		Object.keys(options).forEach(key => {
			this.data.detail.options.forEach(option => {
				if (option.key === key) {
					optionList.push({
						name: option.name,
						value: option.value[options[key]]
					})
				}
			})
		})
		this.setData({
			'bill.options': optionList
		})
	},
	imgload(e) {
		let height = e.detail.height / e.detail.width * 750;
		this.setData({
			imgheight: height
		})
	}
})
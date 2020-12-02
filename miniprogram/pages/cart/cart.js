const app = getApp();
var that = null;
Page({
	data: {
		billList: [],
		buyNumMin: 1,
		buyNumMax: 5,
		saveHidden: true,
		totalPrice: 0,
		selectedList: []
	},
	onLoad() {
		that = this;
	},
	onShow() {
		wx.showNavigationBarLoading();
		app.getShopCart({
			success(list) {
				wx.hideNavigationBarLoading()
				that.setData({
					billList: list
				});
			}
		})
	},
	updateBillList() {
		this.data.billList.forEach(bill => {
			if (this.data.selectedList.includes(bill._id)) bill.active = true
			else bill.active = false
		})
		this.setData({
			'billList': this.data.billList
		})
	},
	updateTotalPrice() {
		let res = 0;
		this.data.billList.forEach(bill => {
			if (this.data.selectedList.includes(bill._id)) res += Number(bill.price) * Number(bill.number)
		});
		this.setData({
			totalPrice: res
		})
	},
	onAllSelect() {
		let currentSelectedList = []
		if (this.data.selectedList.length === this.data.billList.length) {
			// do nothing
		} else {
			currentSelectedList = this.data.billList.map(({
				_id
			}) => _id)
		}
		this.setData({
			'selectedList': currentSelectedList
		}, () => {
			this.updateBillList()
			this.updateTotalPrice()
		})
	},
	selectTap(e) {
		let id = e.currentTarget.dataset.id;
		if (this.data.selectedList.includes(id)) {
			let idx = this.data.selectedList.indexOf(id);
			this.data.selectedList.splice(idx, 1);
		} else {
			this.data.selectedList.push(id);
		}
		this.setData({
			'selectedList': this.data.selectedList
		}, () => {
			this.updateBillList()
			this.updateTotalPrice()
		})
	},
	minusBtnTap(e) {
		let id = e.currentTarget.dataset.id;
		this.data.billList.forEach(bill => {
			if (bill._id === id) {
				if (bill.number > this.data.buyNumMin) bill.number--
			}
		})
		this.setData({
			'billList': this.data.billList
		})

	},
	addBtnTap(e) {
		let id = e.currentTarget.dataset.id;
		this.data.billList.forEach(bill => {
			if (bill._id === id) {
				if (bill.number < this.data.buyNumMax) bill.number++
			}
		})
		this.setData({
			'billList': this.data.billList
		})
	},
	editTap() {
		this.setData({
			saveHidden: false
		})
	},
	saveTap() {
		this.setData({
			saveHidden: true
		})
	},
	toPayOrder() {
		wx.setStorageSync('ids', this.data.selectedList);
		wx.navigateTo({
			url: '/pages/submit/submit'
		})
	},
	deleteSelected() {
		const selectedList = this.data.selectedList;
		let currentBillList = this.data.billList.filter(bill => !selectedList.includes(bill._id));
		this.setData({
			'billList': currentBillList,
			'selectedList': []
		});
		app.delShopCart({
			list: currentBillList,
			ids: selectedList
		});
	}
})
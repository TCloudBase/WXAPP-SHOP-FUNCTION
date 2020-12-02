const app = getApp();
var that = null;
Page({
  data: {
    goods: [],
    loading: true
  },
  onLoad() {
    that = this;
    app.getGoodSList({
      success: function (list) {
        that.setData({
          goods: list,
          loading: false
        })
      }
    })
  },
  todetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  }
})
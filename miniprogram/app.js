App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:'master-58y92'
      })
    }
  },
  /**
   * 获取商品列表
   * @param {*} obj 
   */
  getGoodSList: function (obj) {
    wx.cloud.callFunction({
      name:'getGoodlist',
      success:function(res){
        if (obj != null && obj.success != null) {
          obj.success(res.result);
        }
      }
    });
  },
  /**
   * 获取商品详情
   * @param {*} obj 
   */
  getGoodSDetail: function (obj) {
    wx.cloud.callFunction({
      name:'getGooddetail',
      data:{
        id:obj.id
      },
      success:function(res){
        if (obj != null && obj.success != null) {
          obj.success(res.result);
        }
      }
    });
  },
  /**
   * 添加商品到购物车
   * @param {*} obj 
   */
  addShopCart: function (obj) {
    let data = obj.data;
    wx.cloud.callFunction({
      name:"addShopcart",
      data:{data},
      success(res){
        if(obj.cart==false){
          wx.setStorageSync('ids',[res.result]);
        }
        obj.success();
      }
    });
  },
  /**
   * 获取购物车列表
   * @param {*} obj 
   */
  getShopCart:function(obj){
    wx.cloud.callFunction({
      name:"getShopcart",
      data:{
        cart:obj.cart,
        done:obj.done
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success(res.result);
        }
      }
    });
  },
  /**
   * 删除购物车内容（强更新）
   * @param {*} obj 
   */
  delShopCart:function(obj){
    wx.cloud.callFunction({
      name:'delShopcart',
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success();
        }
      }
    });
  },
  /**
   * 为商品付款（模拟支付逻辑）
   * @param {*} obj 
   */
  toPayTap:function(obj){
    wx.cloud.callFunction({
      name:'payShopcart',
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success();
        }
      }
    });
  },
  /**
   * 订单完成（收货成功）
   * @param {+} obj 
   */
  toDoneOrder:function(obj){
    wx.cloud.callFunction({
      name:'doneShopcart',
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success();
        }
      }
    });
  },
  /**
   * 获得结算订单列表
   * @param {*} obj 
   */
  getBillList:function(obj){
    wx.cloud.callFunction({
      name:"getShopcart",
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success(res.result);
        }
      }
    });
  },
  /**
   * 提交结算订单到付款状态
   * @param {*} obj 
   */
  submitorder:function(obj){
    wx.cloud.callFunction({
      name:'submitShopcart',
      data:{
        ids:obj.ids,
        deliveryType:obj.deliveryType,
        remark:obj.remark,
        addressData:obj.addressData
      },
      success(res){
        if (obj != null && obj.success != null) {
          obj.success();
        }
      }
    });
  }
})
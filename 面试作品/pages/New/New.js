// pages/New/New.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      array:[],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      method:'GET',
      data:{},
      url: 'http://localhost/New/newsdata.php',
      header: { 
        'content-type': 'application/json'
       },
       success:function(res)
       {
           that.processdata(res.data);
       },
    })
  },

  processdata:function(data)
  {
    this.setData({
        array:data
    })
  },
   
  onbannertap:function(event)
  {
    var newid=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'new-detail/new-detail?id='+newid,
    })

  },

  onnewtap:function(event)
  {
      
      var newid=event.currentTarget.dataset.id;
      wx.navigateTo({
        url: 'new-detail/new-detail?id='+newid,
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
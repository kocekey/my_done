// pages/New/new-detail/new-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newdetaildata:[],
    collected:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      var newid=options.id;
      wx.request({
        method:'GET',
        url: 'http://localhost/New/newsdata.php',
        header: { 
          'content-type': 'application/json'
         },
         success:function(res){
            var newdata=res.data[newid-1];
            that.processdata(newdata,newid);
         }
      })
      this.getcollected();
  },
   
    getcollected:function()
    {
      var collectionclick=this.data.newdetaildata.collectionclick;
      this.setData({
        collected:collectionclick
      }) 
    }, 

    processdata:function(res,res1)
    {
      this.setData(
        {
            newdetaildata:res,
            newid:res1
        }
      )
    },

   oncollectiontap:function()
   {
     var that=this;
     wx.request({
      method:'GET',
      data:{
        newid:this.data.newid
      },
       url: 'http://localhost/New/collected.php',
       header: { 
        'content-type': 'application/json'
       },
       success:function(res)
       {
         that.setData({
          collected:res.data,
         })
        wx.showToast({
          title: '成功收藏',
          icon:'success',
        })
       }
     })
   },

   onincollectiontap:function()
   {
    var that=this;
    wx.request({
     method:'GET',
     data:{
       newid:this.data.newid
     },
      url: 'http://localhost/New/incollected.php',
      header: { 
       'content-type': 'application/json'
      },
      success:function(res)
      {
        that.setData({
         collected:res.data,
        })
       wx.showToast({
         title: '取消收藏',
         icon:'success',
       })
      }
    })
   },
   
   onsharetap:function(event)
   {
     wx.showActionSheet({
       itemList: [
         "分享到微信好友",
         "分享到朋友圈",
         "分享到QQ空间"
       ],
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
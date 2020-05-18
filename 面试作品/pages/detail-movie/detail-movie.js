// pages/detail-movie/detail-movie.js
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
     movieid:'',
     datas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var id=options.id;
     var that=this;
     wx.request({
       method:'GET',
       data:{
         id:id
       },
       url: 'http://localhost/Movie/dataingdetail.php',
       header:{
         "Content-Type":""
       },
       success:(res)=>
       {
          that.processdata(res)
       }
     })
  },
// 做数据处理
  processdata:function(res)
  {
    var datas=[];
    for(var idx in res.data)
    {
      var moviedataing=res.data[idx];
      var temp={
        moviename:moviedataing.moviename,
        movieid:moviedataing.movieid,
        movieimg:moviedataing.movieimg,
        moviescore:moviedataing.moviescore,
        moviescorearray:util.starsprocess(moviedataing.moviescore),
      }
      datas.push(temp);
    }
    this.setData({
      datas:datas
    })
  },
  checkimgtap:function(e)
  {
    var url=e.currentTarget.dataset.img;
    wx.previewImage({
      urls:[url],
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
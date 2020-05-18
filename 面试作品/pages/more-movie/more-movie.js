// pages/more-movie/more-movie.js
var app=getApp();
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalcount:9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var datas=[];
    var that=this;
    var dataurl="";
    var type=options.type;
    this.typename(type);
    switch(type)
    {
      case"正在热映":
        dataurl=app.globalData.httpBase+'dataing.php';
        this.data.dataUrl=dataurl;
      break;
      case"评分排行":
        dataurl=app.globalData.httpBase+'scoredata.php';
        this.data.dataUrl=dataurl;
      break;
    }
    wx.request({
      method:'GET',
      data:{
        total:9
      },
      url:dataurl,
      header:{
        "Content-Type":""
      },
      success:function(res)
      {
         that.onloaddata(res);
      }
    })
  },

  typename:function(type)
  {
    wx.setNavigationBarTitle({
      title:type,
    })
  },

  onloaddata:function(res)
  {
    var datas=[];
     for(var idx in res.data)
     {
       var moviedataing=res.data[idx];
       var moviename=moviedataing.moviename;
       if(moviename.length>=6)
       {
        moviename=moviename.substring(0,6)+'...';
       }
       var temp={
         moviename:moviename,
         movieid:moviedataing.movieid,
         movieimg:moviedataing.movieimg,
         moviescore:moviedataing.moviescore,
         moviescorearray:util.starsprocess(moviedataing.moviescore),
       }
       datas.push(temp);
     }
     this.data.totalcount+=9;
     this.setData({
        datas:datas
     })
  },
  ondetailtap:function(res)
  {
    var id=res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail-movie/detail-movie?id='+id,
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
    var that=this;
      wx.request({
        method:'GET',
        data:{
          total:9
        },
        url:this.data.dataUrl,
        header:{
          "Content-Type":""
        },
        success:function(res)
        {
          that.onloaddata(res);
        }
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    wx.request({
      method:'GET',
      data:{
        total:this.data.totalcount
      },
      url:this.data.dataUrl,
      header:{
        "Content-Type":""
      },
      success:function(res)
      { 
        that.onloaddata(res);
      }
    })
    wx.showToast({
      icon:'loading',
      duration:400
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
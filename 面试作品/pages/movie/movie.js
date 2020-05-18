 var app=getApp();
 var util=require("../../utils/util.js");
// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hoting:{},
     score:{},
     searchresult:{},
     containershow:true,
     searchpanelshow:false,
     cancelshow:false,
     inputvalue:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var hoting=app.globalData.httpBase+"dataing3.php";
     var score=app.globalData.httpBase+"scoredata3.php";
     this.getmovielistdata(hoting,"hoting","正在热映");
     this.getmovielistdata(score,"score","评分排行");
  },
     
  getmovielistdata:function(url,setkey,type){
    var that=this;
    wx.request({
      url: url,
      method:'GET',
      header:{
        "Content-Type":""
      },
      success:function(res)
      {
        that.processdata(res,setkey,type)
      }
    })
  },
   
  processdata:function(res,setkey,type)
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
     var array={};
     array[setkey]={
       datas:datas,
       movietype:type
     };
     this.setData(array);
  },
  
  onmoretap:function(event)
  { 
    var type=event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../more-movie/more-movie?type='+type,
    })
  },
  onbindfocus:function()
  {
   this.setData({
    containershow:false,
    searchpanelshow:true,
    cancelshow:true
   }) 
  },
  onbindconfirm:function(e)
  {
    var text=e.detail.value;
    var that=this;
    wx.request({
      method:'GET',
      data:{
        text:text
      },
      url: app.globalData.httpBase+'search.php',
      header:{
        "Content-Type":''
      },
      success:function(res)
      {
        that.processdata(res,"searchresult","")
      }
    })
    
  },
  cancelontap:function()
  {
    this.setData({
      containershow:true,
      searchpanelshow:false,
      cancelshow:false,
      inputvalue:'',
      searchresult:""
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
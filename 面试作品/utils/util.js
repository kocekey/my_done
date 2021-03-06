const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function starsprocess(starnum)
{
   var num=starnum/2;
   var array=[];
   for(var i=1;i<=5;i++)
   {
     if(i<=num)
     {
       array.push(1);
     }
     else{
       array.push(0);
     }
   }
    return array;  
}


module.exports = {
  formatTime: formatTime,
  starsprocess:starsprocess
}

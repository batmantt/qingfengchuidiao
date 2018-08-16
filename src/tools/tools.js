const tools = {
  // checkWxBrowser(){
  //   let ua = navigator.userAgent.toLowerCase()
  //   let isWeiXin = ua.indexOf('micromessenger') !==-1
  //   if(isWeiXin){
  //     this.fromWx = 'wx'
  //     this.wxAppId = ''
  //   }
  // }
  // judgephone(){
  //   var u = navigator.userAgent;
  //   // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  //   // alert('是否是Android：'+isAndroid);
  //  return isiOS
  // },
  // changetitle(mytitle){
    // let isiOS  = tools.judgephone();
    // if(isiOS){
    //   window.setDocumentTitle = function(title) {
    //   var i = document.createElement('iframe');
    //   i.src = src;
    //   i.style.display = 'none';
    //   i.onload = function() {
    //       setTimeout(function(){
    //           i.remove();
    //       }, 9)
    //   }
    //   document.body.appendChild(i); 
    //   }
    // }else{
      // document.title = mytitle;
    // }
  // },
   getStroageData(key){
      return  localStorage.getItem(key)
   },
   sortRepeat(list){
    let newList = []
    if(list.length > 0) {
      newList = [list[0]]
      for (let i = 1; i < list.length; i ++) {
        let flag = true
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].id === list[i].id) {
            newList[j].count += list[i].count
            flag = false
          }
        }
        if (flag) {
          newList.push({
            id: list[i].id,
            count: list[i].count
          })
        }
      }
    }
    return newList
  }
}


export default tools
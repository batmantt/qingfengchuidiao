/**
 * 设置rem
 * @param pwidth
 * @param prem
 */
export default function getRem(pwidth, prem) {
  var html = document.getElementsByTagName('html')[0]
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth
    html.style.fontSize = oWidth / pwidth * prem + 'px'
    window.onresize = function () {
        oWidth = document.body.clientWidth || document.documentElement.clientWidth
        html.style.fontSize = oWidth / pwidth * prem + 'px'
    }
}
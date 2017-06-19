/**功能点1：获取上一个页面传递的登录用户名**/
var loginName=sessionStorage.loginName;
console.log(loginName);
/**功能点2：修改页头**/
if(loginName) {
    $('#welcome').html('欢迎回来：'+loginName )//修改页头上的欢迎消息
}
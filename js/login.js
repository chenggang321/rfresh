//功能：登录验证
$("#l_btn").click(function(){
    var inputData=$('#l_form').serialize();
    console.log(inputData);
    $.ajax({
        url:'data/1_login.php',
        data:inputData,
        success:function(txt,msg,xhr){
            //登录用户保存
            sessionStorage.loginName=$('#uname').val();
            //    模态框收放
            if(txt=='ok'){
                $('#welcome').html('欢迎回来：'+sessionStorage.loginName+'!');
                location.href='index.html';
            }else{
                $('#err').html('<span>登录失败</span>');
            }
        }
    });
});
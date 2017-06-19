//功能：注册
$("#btn").click(function(){
    console.log('click');
    var inputData=$('#re_form').serialize();
    console.log(inputData);
    $.ajax({
        type:'post',
        url:'data/7_register.php',
        data:inputData,
        success:function(txt,msg,xhr){
            if(txt.code=='1'){
                $('#err').html('注册成功!');
            }else{
                $('#err').html('<span>注册失败</span>');
            }
        }
    });
});
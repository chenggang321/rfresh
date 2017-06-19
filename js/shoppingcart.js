/**功能点1：获取上一个页面传递的登录用户名**/
var loginName=sessionStorage.loginName;
console.log(loginName);
/**功能点2：修改页头**/
if(loginName) {
    $('#welcome').html('欢迎回来：'+loginName )//修改页头上的欢迎消息
}
//加载购物车
$.ajax({
    url:'data/4_cart_detail.php?uname='+loginName,
    success:function(data){
        if(data=='[]'){
            html='';
            html+=`
                    <tr>
                        <td colspan="6">购物车为空</td>
                    </tr>
                `
        }else{
            data=JSON.parse(data);
            console.log(data);
            html='';
            $.each(data,function(i,p){
                html+=`
                <tr>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="${p.did}" />
                    </td>
                    <td></label><img src="${p.pic}"/>${p.phead}${p.pname}</td>
                    <td>￥<span class="price">${p.price}</span></td>
                    <td class="changeNum of">
                        <button class="lf">-</button>
                        <input type="text" value="${p.count}" class="lf inputNum"/>
                        <button class="lf">+</button>
                    </td>
                    <td class="t_red">￥<span class="psum">${(p.price*p.count).toFixed(2)}</span></td>
                    <td class="t_delete"><a href="${p.did}">X</a></td>
                </tr>
                `;
            });
        }
        $('table tbody').html(html);
    }
});
//加减按钮绑定事件
$('tbody').on('click','button',function(){
    var count= $(this).siblings('input').val();
    var price=$(this).parent().siblings(':nth-child(3)').children('.price').html();
    console.log(count,price);
    if($(this).html()==='-'){
        if(count>0){
            count--;
            $(this).siblings('input').val(count);
            var psum=(price*count).toFixed(2);
        }
    }else if($(this).html()==='+'){
        count++;
        $(this).siblings('input').val(count);
        var psum=(price*count).toFixed(2);
    }
    $(this).parent().siblings('td').children('.psum').html(psum);
    var did=$(this).parent().siblings(':nth-child(1)').children(':hidden').val();
    $.ajax({
        url:'data/5_cart_detail_update.php',
        data:{"did":did,"count":count},
        success:function(data){
            console.log(data);
            if(data=='ok'){
                //alert('ok');
            }

        }
    });
});

//改变input加载到数据库
$('tbody').on('change','.inputNum',function(){
    var count=$(this).val();
    var did=$(this).parent().siblings(':nth-child(1)').children(':hidden').val();
    var price=$(this).parent().siblings(':nth-child(3)').children('.price').html();
    var psum=(price*count).toFixed(2);
    $(this).parent().siblings('td').children('.psum').html(psum);
    $.ajax({
        url:'data/5_cart_detail_update.php?did='+did+"&count="+count,
        success:function(data){
            if(data=='ok'){
                //alert('ok');
            }
        }
    });
});
//点击删除更新页面修改数据库
$('tbody').on('click','.t_delete a',function(e){
    e.preventDefault();
    console.log('ok');
    $(this).parent().parent().hide();
    var did=$(this).attr('href')
    console.log(did);
    $.ajax({
        url:'data/6_cart_detail_delete.php?did='+did,
        success:function(data){
            //alert(data);
        }
    });
});
var zoom={
    MSIZE:175,//����mask�Ĵ�С
    MAXLEFT:175,MAXTOP:175,//����mask���õ��������
    init:function(){
        //ΪidΪsuperMask��div���hover�¼�,�л�mask����ʾ������,�ٰ�����ƶ��¼�ΪmoveMask
        $("#superMask").hover(this.toggle,this.toggle)
            .mousemove(
            this.moveMask.bind(this));
    },
    moveMask:function(e){
        var x=e.offsetX;//����������ڸ�Ԫ�ص�x
        var y=e.offsetY;//����������ڸ�Ԫ�ص�y
        //����mask��left: x-MSIZE/2
        var left=x-this.MSIZE/2;
        //����mask��top: y-MSIZE/2
        var top=y-this.MSIZE/2;
        //���leftԽ�磬Ҫ�Ļر߽�ֵ
        left=left<0?0:
            left>this.MAXLEFT?this.MAXLEFT:
                left;
        //���topԽ�磬Ҫ�Ļر߽�ֵ
        top=top<0?0:
            top>this.MAXTOP?this.MAXTOP:
                top;
        //����idΪmask��Ԫ�ص�leftΪleft,topΪtop
        $("#mask").css({left:left,top:top});
        //����idΪlargeDiv�ı���ͼƬλ��:
        $("#largeDiv").css(
            "backgroundPosition",
            -left*16/7+"px "+-top*16/7+"px");
    },
    toggle:function(){//�л�mask����ʾ������
        $("#mask").toggle();
        $("#largeDiv").toggle();
    }
}
window.onload=function(){
    zoom.init();
};
/**功能点1：获取上一个页面传递的登录用户名**/
var loginName=sessionStorage.loginName;
console.log(loginName);
/**功能点2：修改页头**/
if(loginName) {
    $('#welcome').html('欢迎回来：'+loginName )//修改页头上的欢迎消息
}
//加载页面
$.ajax({
    url:'data/8_getproductbypid.php',
    data:{'pid':sessionStorage.pid},
    success:function(data){
        console.log(data);
        var html='';
        html=`
            <img id="mImg" src="${data.pic}"/>
        `
        $('#img_box').html(html);
    }
});
$.ajax({
    url:'data/8_getproductbypid.php',
    data:{'pid':sessionStorage.pid},
    success:function(data){
        console.log(data);
        var html='';
        html=`
               <h1>${data.phead}${data.pname}</h1>
                    <ul>
                        <ol>型号：${data.pname}</ol>
                        <ol>功能：${data.pfunc}</ol>
                        <ol>噪音：${data.pnoise}</ol>
                        <ol>风量：${data.pwind}㎥/小时</ol>
                        <ol>适用对象：${data.psuit}</ol>
                        <ol>适用面积:${data.parea}</ol>
                        <ol>空气净化能效等级：${data.pclass}</ol>
                    </ul>
                    <div>价格：<span>￥</span><b>${data.price}</b></div>
                    <div class="addCart"><a href="#"></a></div>
        `
        $('.i_detail').html(html);
    }
});

//绑定加入购物车
$('.i_detail').on('click','a',function(e){
    e.preventDefault();
    $.ajax({
        url: 'data/3_cart_add.php',
        data: {uname:sessionStorage.loginName,pid:sessionStorage.pid},
        success: function(obj){
            alert('添加成功！该商品已购买的数量：'+obj.count);
        }
    });
})

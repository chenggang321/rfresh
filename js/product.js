/**功能点1：获取上一个页面传递的登录用户名**/
var loginName=sessionStorage.loginName;
console.log(loginName);
/**功能点2：修改页头**/
if(loginName) {
    $('#welcome').html('欢迎回来：'+loginName )//修改页头上的欢迎消息
}
/**功能点3：页面加载完成后，异步请求产品列表**/
$(function(){
    loadProductByPage(1);
});

///**功能点4：用户点击分页条中的页号时，实现数据的异步加载**/
$('.pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadProductByPage(pageNum){
    $.ajax({
        url: 'data/2_product_select.php?pageNum='+pageNum,
        success: function(pager) {
            console.log("1111");
            console.log(pager.data);
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            $.each(pager.data,function(i,p){
                //html +=`
                //     <li>
                //        <a href="#"><img src="${p.pic}" alt=""/></a>
                //        <div>
                //            <ul class="of">
                //                <ol><p>${p.pname}</p><span>${p.pintro}</span></ol>
                //                <ol><a href="${p.pid}" id="getDetail">查看详情</a></ol>
                //            </ul>
                //        </div>
                //    </li>
                //    `

                html+='<li>' +
                    '<a href="#"><img src="'+p.pic+'"/></a>' +
                    '<div>' +
                    '<ul class="of">' +
                    '<ol><p>'+p.pname+'</p><span>'+p.pintro+'</span></ol>' +
                    '<ol><a href="'+p.pid+'" id="getDetail">查看详情</a></ol>' +
                    '</ul>' +
                    '</div>' +
                    '</li>';
                });
            $('#plist ul').html(html);
            //根据返回的分页数据，动态创建分页条内容
            pageNum=parseInt(pageNum);
            console.log(typeof (pageNum));
            var html = '';
            if(pageNum-2>0){
                //html += `<li><a href="${pageNum-2}">${pageNum-2} </a></li> `;
                html += '<li><a href="'+(pageNum-2)+'">'+(pageNum-2)+'</a></li> ';
            }
            if(pageNum-1>0){
                //html += `<li><a href="${pageNum-1}">${pageNum-1} </a></li> `;
                html += '<li><a href="'+(pageNum-1)+'">'+(pageNum-1)+' </a></li> ';
            }
            //html += `<li class="active"><a href="#">${pageNum} </a></li> `;
            html += '<li class="active"><a href="#">'+pageNum+'</a></li> ';
            if(pageNum+1<=pager.pageCount){
                //html += `<li><a href="${pageNum+1}">${pageNum+1} </a></li> `;
                html += '<li><a href="'+(pageNum+1)+'">'+(pageNum+1)+' </a></li> ';
            }
            if(pageNum+2<=pager.pageCount){
                //html += `<li><a href="${pageNum+2}">${pageNum+2} </a></li> `;
                html += '<li><a href="'+(pageNum+2)+'">'+(pageNum+2)+' </a></li> ';
            }
            $('.pager').html(html);
        }
    });
     //功能5：点击详情跳转详情页
    $('#plist ul').on('click','#getDetail',function(e){
        e.preventDefault();
        sessionStorage.pid=$(this).attr('href');
        location.href='product_detail.html';

    });
}
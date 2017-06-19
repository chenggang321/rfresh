<?php
//���ݸ�ʽ
//{"pic":"images/phone/phone_01.jpg","pname":"С�� Note","price":"1199.00","count":"1"}
header("Countent-Type:application/json;charset=utf-8");

$uname=$_REQUEST["uname"];


#�������ݿ�
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

//���1
$sql="set names utf8";
mysqli_query($conn,$sql);
//���2
$sql="select uid from rf_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$uid=intval($row['uid']);//�û�id

//���3
$sql="select cid from rf_cart where userID='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$cid=intval($row['cid']);

//���4
$sql="select pic,pname,phead,price,did,count from rf_product,rf_detail where pid=productID and cartID='$cid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($row);

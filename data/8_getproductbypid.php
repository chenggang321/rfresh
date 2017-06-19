<?php
header('Content-Type:application/json;charset:utf-8');

$pid=$_REQUEST['pid'];

include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

$sql="set names utf8";
mysqli_query($conn,$sql);

$sql="select * from rf_product where pid='$pid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

echo json_encode($row);
<?php
header('Content-Type:text/plain;charset=utf-8');

$did=$_REQUEST['did'];
$count=$_REQUEST['count'];

//�������ݿ�
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

//sql���1
$sql="set names utf8";
mysqli_query($conn,$sql);

//sql���2

$sql="update rf_detail set count='$count' where did='$did'";
$result=mysqli_query($conn,$sql);
if($result){
  echo 'ok';
}else{
  echo 'err';
}
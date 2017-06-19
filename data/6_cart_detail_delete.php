<?php
header('Content-Type:text/plain;charset=utf-8');

$did=$_REQUEST['did'];

//�������ݿ�
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

//���1
$sql="set names utf8";
mysqli_query($conn,$sql);

//���2
$sql="delete from rf_detail where did='$did'";
$result=mysqli_query($conn,$sql);
if($result){
  echo 'ok';
}else{
  echo 'err';
}
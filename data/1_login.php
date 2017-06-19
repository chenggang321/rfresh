<?php
header('Content-Type:text/plain');
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];

include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

$sql="set names utf8";
mysqli_query($conn,$sql);

$sql="select * from rf_user where uname='$uname' and upwd='$upwd'";
$result=mysqli_query($conn,$sql);

if($result===false){
  echo 'sqlerr';
}else{
  $row=mysqli_fetch_assoc($result);
  if($row){
    echo 'ok';
  }else{
    echo 'err';
  }
}
<?php
header('Content-Type:application/json;charset:utf-8');

$pageNum=$_REQUEST['pageNum'];

/*?????????*/
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

/*??????????*/
$pageDate=[
  'recordCount'=>0,//??????
  'pageSize'=>6,//????С
  'pageCount'=>0,//?????
  'pageNum'=>$pageNum,//??????
  'data'=>null
];

/*??????*/
$sql="set names utf8";
mysqli_query($conn,$sql);

$sql="select count(*) from rf_product";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pageDate['recordCount']=intval($row['count(*)']);
$pageDate['pageCount']=ceil($pageDate['recordCount']/$pageDate['pageSize']);

/*?????????????*/
$start=($pageDate['pageNum']-1)*$pageDate['pageSize'];
$count=$pageDate['pageSize'];
$sql="select * from rf_product limit $start,$count";
$result=mysqli_query($conn,$sql);

$pageDate['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($pageDate);
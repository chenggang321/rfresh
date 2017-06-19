<?php
header('Content-Type:application/json;charset=utf-8');

$uname=$_REQUEST['uname'];
$pid=$_REQUEST['pid'];

#δ�ύ����
if(!$uname||!$pid){
  echo '{}';
  return;
}

#�ͻ��˶���
$output=[
  'msg'=>null,
  'uid'=>0,
  'cid'=>0,
  'pid'=>intval($pid),
  'count'=>0
];

#���ӷ�����
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);

#sql���1���ñ����ʽ
$sql="set names utf8";
mysqli_query($conn,$sql);

#sql���2����uname��ѯuid
$sql="select uid from rf_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$uid=intval($row['uid']);
$output['uid']=$uid;

#sql���3����uid��ѯ���ﳵ���û�������
$sql="select cid from rf_cart where userID='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
 $cid=intval($row['cid']);
}else{
  $sql="insert into rf_cart values(null,'$uid')";
  $result=mysqli_query($conn,$sql);
  $cid=mysqli_insert_id($conn);
}
 $output['cid']=$cid;

 #sql���cid��pid��ѯ�Ƿ������Ʒû����������һ
 $sql="select * from rf_detail where cartID='$cid'and productID='$pid'";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_assoc($result);
 if($row){//�м�һ
    $count=intval($row['count']);
    $count++;
    $sql="update rf_detail set count='$count' where cartID='$cid'and productID='$pid'";
    $result=mysqli_query($conn,$sql);
 }else{//û�����
    $sql="insert into rf_detail values(null,$cid,$pid,1)";
    mysqli_query($conn,$sql);
    $count=1;
 }
 $output['count']=$count;


echo json_encode($output);
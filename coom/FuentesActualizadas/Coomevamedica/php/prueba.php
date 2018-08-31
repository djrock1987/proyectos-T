<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



switch($_POST['service']){
  case 'deptos':
    $con = mysqli_connect("localhost","root","root","colombia");
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $response = array();
    $result= mysqli_query($con,"SELECT * FROM departamentos");
    while ($obj = mysqli_fetch_object($result)){
        array_push($response, $obj);
    }
    echo json_encode($response);
    
  break;
  
  case 'cities':
    $con = mysqli_connect("localhost","root","root","colombia");
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $response = array();
   $result = mysqli_query($con,"SELECT * FROM municipios WHERE departamento_id = ".$_POST['id_depto']);
    while ($obj = mysqli_fetch_object($result)){
        array_push($response, $obj);
    }
    echo json_encode($response);
    
  break;
 
}

?>
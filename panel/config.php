<?php 


$servername = "localhost";
$username = "vmagzir_bandari";
$password = "qti.#nOw1J~9";
$dbname="vmagzir_bandari";
$landingName="mehdi-bandari";

try {

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
  // set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";
  return $pdo;
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
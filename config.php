<?php
// Database configuration
$host = "localhost"; 
$username = "root";     // Default XAMPP username
$password = "";         // Default XAMPP password (empty)
$database = "fluxfashion"; // Database name

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
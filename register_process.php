<?php
// Start session
session_start();

// Include database connection
require_once 'config.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $confirm_password = mysqli_real_escape_string($conn, $_POST['confirm_password']);
    
    // Basic validation
    if (empty($fullname) || empty($email) || empty($phone) || empty($password) || empty($confirm_password)) {
        header("Location: login.html?error=All fields are required&tab=register");
        exit();
    }
    
    // Check if passwords match
    if ($password != $confirm_password) {
        header("Location: login.html?error=Passwords do not match&tab=register");
        exit();
    }
    
    // Check if email already exists
    $check_query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($result) > 0) {
        header("Location: login.html?error=Email already exists&tab=register");
        exit();
    }
    
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user into database
    $insert_query = "INSERT INTO users (fullname, email, phone, password, created_at) 
                    VALUES ('$fullname', '$email', '$phone', '$hashed_password', NOW())";
    
    if (mysqli_query($conn, $insert_query)) {
        // Registration successful
        header("Location: login.html?success=Registration successful! Please login&tab=login");
        exit();
    } else {
        // Registration failed
        header("Location: login.html?error=Registration failed: " . mysqli_error($conn) . "&tab=register");
        exit();
    }
} else {
    // If not POST request, redirect to register page
    header("Location: login.html?tab=register");
    exit();
}

// Close database connection
mysqli_close($conn);
?>
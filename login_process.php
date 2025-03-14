<?php
// Start session
session_start();

// Include database connection
require_once 'config.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // Basic validation
    if (empty($email) || empty($password)) {
        header("Location: login.html?error=Email and password are required");
        exit();
    }
    
    // Check if user exists
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, start a new session
            session_regenerate_id();
            
            // Store user data in session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['fullname'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['logged_in'] = true;
            
            // Redirect to homepage or dashboard
            header("Location: index.html");
            exit();
        } else {
            // Password is incorrect
            header("Location: login.html?error=Invalid email or password&tab=login");
            exit();
        }
    } else {
        // User does not exist
        header("Location: login.html?error=Invalid email or password&tab=login");
        exit();
    }
} else {
    // If not POST request, redirect to login page
    header("Location: login.html");
    exit();
}

// Close database connection
mysqli_close($conn);
?>
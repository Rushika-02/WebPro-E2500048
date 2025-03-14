<?php
// Start session
session_start();

// Include database connection
require_once 'config.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    
    // Basic validation
    if (empty($email)) {
        header("Location: forgot_password.php?error=Email is required");
        exit();
    }
    
    // Check if email exists in the database
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) == 1) {
        // Generate reset token
        $token = bin2hex(random_bytes(32)); // Generates a secure random token
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token expires in 1 hour
        
        // Store token in database
        // First, check if a token already exists for this user
        $check_token_query = "SELECT * FROM password_resets WHERE email = '$email'";
        $token_result = mysqli_query($conn, $check_token_query);
        
        if (mysqli_num_rows($token_result) > 0) {
            // Update existing token
            $update_query = "UPDATE password_resets SET token = '$token', expires_at = '$expires' WHERE email = '$email'";
            mysqli_query($conn, $update_query);
        } else {
            // Insert new token
            $insert_query = "INSERT INTO password_resets (email, token, expires_at) VALUES ('$email', '$token', '$expires')";
            mysqli_query($conn, $insert_query);
        }
        
        // In a production environment, you would send an email with the reset link
        // For demonstration, we'll just redirect to the reset page with the token
        
        // Simulate email sending
        $reset_link = "http://localhost/fluxfashion/reset_password.php?email=$email&token=$token";
        
        // For demonstration purposes only - in production, send actual email
        // This is where you would integrate with an email sending service
        
        // Display success message
        header("Location: forgot_password.php?success=Password reset link has been sent to your email. Check your inbox.");
        exit();
        
    } else {
        // Email not found
        header("Location: forgot_password.php?error=Email not found in our records");
        exit();
    }
} else {
    // If not POST request, redirect to forgot password page
    header("Location: forgot_password.php");
    exit();
}

// Close database connection
mysqli_close($conn);
?>
<?php
// Include session check
require_once 'session_check.php';

// Require login for this page
requireLogin();

// Get user info
$user = getCurrentUser();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile - FluxFashion</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="style.css">
    <style>
        .profile-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 30px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
        }

        .profile-header h1 {
            color: #088178;
            margin: 0;
        }

        .profile-section {
            margin-bottom: 30px;
        }

        .profile-section h2 {
            color: #088178;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .profile-info p {
            margin: 10px 0;
            line-height: 1.6;
        }

        .profile-info strong {
            display: inline-block;
            width: 120px;
        }

        .btn {
            display: inline-block;
            background-color: #088178;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            margin-right: 10px;
        }

        .btn:hover {
            background-color: #076e66;
        }

        .btn-danger {
            background-color: #d9534f;
        }

        .btn-danger:hover {
            background-color: #c9302c;
        }
    </style>
</head>

<body>
    <section id="header">
        <a href="index.html"><img src="Assets/Log.PNG" class="logo" alt=""></a>
        <div>
            <ul id="navbar">
                <li><a href="index.html">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li id="lg-bag"><a href="cart.html"><i class="far fa-shopping-bag"></i></a></li>
                <li><a class="active" href="profile.php">My Account</a></li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>
        <div id="mobile">
            <a href="cart.html"><i class="far fa-shopping-bag"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>

    <section class="section-p1">
        <div class="profile-container">
            <div class="profile-header">
                <h1>My Profile</h1>
            </div>

            <div class="profile-section">
                <h2>Account Information</h2>
                <div class="profile-info">
                    <p><strong>Name:</strong> <?php echo htmlspecialchars($user['name']); ?></p>
                    <p><strong>Email:</strong> <?php echo htmlspecialchars($user['email']); ?></p>
                </div>
            </div>

            <div class="profile-actions">
                <a href="edit_profile.php" class="btn">Edit Profile</a>
                <a href="change_password.php" class="btn">Change Password</a>
                <a href="logout.php" class="btn btn-danger">Logout</a>
            </div>
        </div>
    </section>

    <footer class="section-p1">
        <div class="col">
            <img class="logo" src="Assets/Log.PNG" alt="">
            <h4>Contact</h4>
            <p><strong>Address: Gyaneshwor,Kathmandu</strong> </p>
            <p><strong>Phone: +977 9810660211</strong></p>
            <p><strong>Hours: 9.00am to 6.00pm</strong></p>
        </div>
        <div class="col">
            <h4>About Us</h4>
            <a href="#">About Us</a>
        </div>
        <div class="col install">
            <p>Secured Gateways</p>
            <img src="Assets/pay.png" alt="">
        </div>

        <div class="copyright">
            <p>&COPY; 2025 FluxFashion </p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>
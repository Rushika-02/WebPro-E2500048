<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - FluxFashion</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="style.css">
    <style>
        .form-container {
            max-width: 450px;
            margin: 50px auto;
            padding: 30px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        .form-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #088178;
        }

        .form-container p {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #666;
        }

        .input-field {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid #e1e1e1;
            border-radius: 4px;
            font-size: 15px;
        }

        .form-btn {
            width: 100%;
            background-color: #088178;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }

        .form-btn:hover {
            background-color: #076e66;
        }

        .form-footer {
            text-align: center;
            margin-top: 20px;
        }

        .form-footer a {
            color: #088178;
            text-decoration: none;
        }

        .form-message {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            text-align: center;
        }

        .error {
            background-color: #ffebee;
            color: #c62828;
        }

        .success {
            background-color: #e8f5e9;
            color: #2e7d32;
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
                <li><a class="active" href="login.html">Login</a></li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>
        <div id="mobile">
            <a href="cart.html"><i class="far fa-shopping-bag"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>

    <section class="section-p1">
        <div class="form-container">
            <h2>Reset Password</h2>
            
            <p>Enter your email address below and we'll send you a link to reset your password.</p>
            
            <?php if(isset($_GET['error'])): ?>
                <div class="form-message error">
                    <?php echo htmlspecialchars($_GET['error']); ?>
                </div>
            <?php endif; ?>
            
            <?php if(isset($_GET['success'])): ?>
                <div class="form-message success">
                    <?php echo htmlspecialchars($_GET['success']); ?>
                </div>
            <?php endif; ?>
            
            <form action="password_reset.php" method="post">
                <input type="email" name="email" class="input-field" placeholder="Email Address" required>
                <button type="submit" class="form-btn">Send Reset Link</button>
            </form>
            
            <div class="form-footer">
                <p>Remember your password? <a href="login.html">Back to Login</a></p>
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
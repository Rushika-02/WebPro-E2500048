document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            const formId = this.getAttribute('data-form');
            document.getElementById(`${formId}-form`).classList.add('active');
        });
    });
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Create message elements if they don't exist
    const loginForm = document.getElementById('login-form');
    if (!loginForm.querySelector('.form-message')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        loginForm.insertBefore(messageDiv, loginForm.querySelector('.form-group'));
    }
    
    const registerForm = document.getElementById('register-form');
    if (!registerForm.querySelector('.form-message')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        registerForm.insertBefore(messageDiv, registerForm.querySelector('.form-group'));
    }
    
    // Style for form messages
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            margin-bottom: 20px;
        }
        .form-message .error {
            background-color: #fff2f2;
            color: #e74c3c;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #e74c3c;
            font-size: 14px;
        }
        .form-message .success {
            background-color: #f0fff0;
            color: #2ecc71;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #2ecc71;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loginMessage = loginForm.querySelector('.form-message');
        
        // Create form data
        const formData = new FormData();
        formData.append('email', document.getElementById('login-email').value);
        formData.append('password', document.getElementById('login-password').value);
        
        // Show loading state
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        // Send AJAX request
        fetch('Backend/login_handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display message
            loginMessage.innerHTML = `<div class="${data.success ? 'success' : 'error'}">${data.message}</div>`;
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // If login successful, redirect
            if (data.success && data.redirect) {
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginMessage.innerHTML = '<div class="error">An error occurred. Please try again.</div>';
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
    
    // Registration form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const registerMessage = registerForm.querySelector('.form-message');
        
        // Validate passwords match
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            registerMessage.innerHTML = '<div class="error">Passwords do not match.</div>';
            return;
        }
        
        // Create form data
        const formData = new FormData();
        formData.append('name', document.getElementById('register-name').value);
        formData.append('email', document.getElementById('register-email').value);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        
        // Show loading state
        const submitBtn = registerForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        // Send AJAX request
        fetch('Backend/register_handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display message
            registerMessage.innerHTML = `<div class="${data.success ? 'success' : 'error'}">${data.message}</div>`;
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // If registration successful, reset form and switch to login tab
            if (data.success) {
                registerForm.reset();
                setTimeout(() => {
                    document.querySelector('.tab-btn[data-form="login"]').click();
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            registerMessage.innerHTML = '<div class="error">An error occurred. Please try again.</div>';
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});
// FluxFashion Notification System
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .flux-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 350px;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transform: translateX(400px);
            opacity: 0;
            transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        .flux-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .flux-notification.success {
            background-color: #e8f5e9;
            border-left: 4px solid #088178;
            color: #088178;
        }
        
        .flux-notification.error {
            background-color: #ffebee;
            border-left: 4px solid #c62828;
            color: #c62828;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            flex: 1;
        }
        
        .notification-icon {
            margin-right: 15px;
            font-size: 20px;
        }
        
        .notification-message {
            font-size: 14px;
            font-weight: 500;
        }
        
        .notification-close {
            cursor: pointer;
            font-size: 16px;
            margin-left: 15px;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            transform-origin: left;
        }
        
        .flux-notification.success .notification-progress {
            background-color: #088178;
        }
        
        .flux-notification.error .notification-progress {
            background-color: #c62828;
        }
        
        @keyframes progressShrink {
            from { width: 100%; }
            to { width: 0%; }
        }
    `;
    document.head.appendChild(style);
    
    // Notification function
    window.showNotification = function(message, type = 'success', duration = 4000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `flux-notification ${type}`;
        
        // Create notification content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        // Create icon
        const icon = document.createElement('span');
        icon.className = 'notification-icon';
        icon.innerHTML = type === 'success' 
            ? '<i class="far fa-check-circle"></i>' 
            : '<i class="far fa-exclamation-circle"></i>';
        
        // Create message
        const messageElement = document.createElement('span');
        messageElement.className = 'notification-message';
        messageElement.textContent = message;
        
        // Create close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '<i class="far fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Create progress bar
        const progressBar = document.createElement('span');
        progressBar.className = 'notification-progress';
        
        // Append elements
        content.appendChild(icon);
        content.appendChild(messageElement);
        notification.appendChild(content);
        notification.appendChild(closeBtn);
        notification.appendChild(progressBar);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
            
            // Animate progress bar
            progressBar.style.animation = `progressShrink ${duration}ms linear forwards`;
            
            // Auto close after duration
            setTimeout(() => {
                closeNotification(notification);
            }, duration);
        }, 10);
        
        return notification;
    };
    
    function closeNotification(notification) {
        // Hide notification
        notification.classList.remove('show');
        
        // Remove from DOM after transition
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 400); // match transition duration
    }
    
    // Check URL parameters for PHP redirects
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('success')) {
        const successMessage = urlParams.get('success');
        showNotification(decodeURIComponent(successMessage), 'success');
        
        // Clean URL
        const url = new URL(window.location);
        url.searchParams.delete('success');
        window.history.replaceState({}, '', url);
    }
    
    if (urlParams.has('error')) {
        const errorMessage = urlParams.get('error');
        showNotification(decodeURIComponent(errorMessage), 'error');
        
        // Clean URL but keep tab parameter if present
        const url = new URL(window.location);
        url.searchParams.delete('error');
        window.history.replaceState({}, '', url);
    }
    
    // Hook into tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        const originalClick = btn.onclick;
        btn.onclick = function(e) {
            // Call original handler if it exists
            if (typeof originalClick === 'function') {
                originalClick.call(this, e);
            }
            
            // Hide any visible form messages when switching tabs
            const formMessages = document.querySelectorAll('.form-message');
            formMessages.forEach(msg => {
                msg.style.display = 'none';
            });
        };
    });
    
    // Enhance the login form submission for better UX
    const loginForm = document.querySelector('#login-tab form');
    if (loginForm) {
        const originalSubmit = loginForm.onsubmit;
        loginForm.onsubmit = function(e) {
            // Only if the form doesn't have AJAX handling already
            if (!e.defaultPrevented) {
                e.preventDefault();
                
                // Get form data
                const email = loginForm.querySelector('input[name="email"]').value;
                const password = loginForm.querySelector('input[name="password"]').value;
                
                // Basic validation
                if (!email || !password) {
                    showNotification("Please fill in all fields", "error");
                    return false;
                }
                
                // Submit the form
                this.submit();
            }
            
            // Call original handler if it exists
            if (typeof originalSubmit === 'function') {
                return originalSubmit.call(this, e);
            }
        };
    }
    
    // Enhance the register form submission
    const registerForm = document.querySelector('#register-tab form');
    if (registerForm) {
        const originalSubmit = registerForm.onsubmit;
        registerForm.onsubmit = function(e) {
            // Only if the form doesn't have AJAX handling already
            if (!e.defaultPrevented) {
                e.preventDefault();
                
                // Get form data
                const fullname = registerForm.querySelector('input[name="fullname"]').value;
                const email = registerForm.querySelector('input[name="email"]').value;
                const phone = registerForm.querySelector('input[name="phone"]').value;
                const password = registerForm.querySelector('input[name="password"]').value;
                const confirmPassword = registerForm.querySelector('input[name="confirm_password"]').value;
                
                // Basic validation
                if (!fullname || !email || !phone || !password || !confirmPassword) {
                    showNotification("Please fill in all fields", "error");
                    return false;
                }
                
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification("Please enter a valid email address", "error");
                    return false;
                }
                
                // Validate password match
                if (password !== confirmPassword) {
                    showNotification("Passwords do not match", "error");
                    return false;
                }
                
                // Submit the form
                this.submit();
            }
            
            // Call original handler if it exists
            if (typeof originalSubmit === 'function') {
                return originalSubmit.call(this, e);
            }
        };
    }
});
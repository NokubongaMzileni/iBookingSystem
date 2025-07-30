document.addEventListener('DOMContentLoaded', function() {
    // Registration Form Validation
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');
            
            let isValid = true;
            
            // Validate full name
            if (fullName.value.trim() === '') {
                fullName.classList.add('is-invalid');
                isValid = false;
            } else {
                fullName.classList.remove('is-invalid');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // Validate phone (simple validation)
            if (phone.value.trim() === '' || phone.value.length < 10) {
                phone.classList.add('is-invalid');
                isValid = false;
            } else {
                phone.classList.remove('is-invalid');
            }
            
            // Validate password
            if (password.value.length < 8) {
                password.classList.add('is-invalid');
                isValid = false;
            } else {
                password.classList.remove('is-invalid');
            }
            
            // Validate confirm password
            if (confirmPassword.value !== password.value) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else {
                confirmPassword.classList.remove('is-invalid');
            }
            
            // Validate terms
            if (!terms.checked) {
                terms.classList.add('is-invalid');
                isValid = false;
            } else {
                terms.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Simulate registration success
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            
            let isValid = true;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // Validate password
            if (password.value === '') {
                password.classList.add('is-invalid');
                isValid = false;
            } else {
                password.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Simulate login success
                // In a real app, you would check credentials against a database
                alert('Login successful! Redirecting to dashboard...');
                
                // Check if it's admin (for demo purposes)
                if (email.value === 'admin@ibookingsystem.com') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'user-dashboard.html';
                }
            }
        });
    }
    
    // Focusout validation for registration form
    if (registrationForm) {
        const fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('focusout', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        
                        // Additional validation for specific fields
                        if (field === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(this.value)) {
                                this.classList.add('is-invalid');
                            }
                        }
                        
                        if (field === 'password' && this.value.length < 8) {
                            this.classList.add('is-invalid');
                        }
                        
                        if (field === 'confirmPassword' && this.value !== document.getElementById('password').value) {
                            this.classList.add('is-invalid');
                        }
                    }
                });
            }
        });
    }
    
    // Focusout validation for login form
    if (loginForm) {
        const fields = ['loginEmail', 'loginPassword'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('focusout', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        
                        // Additional validation for email
                        if (field === 'loginEmail') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(this.value)) {
                                this.classList.add('is-invalid');
                            }
                        }
                    }
                });
            }
        });
    }
});
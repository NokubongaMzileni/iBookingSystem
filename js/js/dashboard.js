document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    
    if (menuToggle && wrapper) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }
    
    // Dashboard navigation
    const sections = {
        'bookTicketBtn': 'bookTicketSection',
        'myBookingsBtn': 'myBookingsSection',
        'myTripsBtn': 'myTripsSection',
        'paymentDetailsBtn': 'paymentDetailsSection',
        'accountSettingsBtn': 'accountSettingsSection'
    };
    
    // Check URL hash on page load
    const hash = window.location.hash.substring(1);
    if (hash && sections[hash]) {
        showSection(sections[hash], hash);
    }
    
    Object.keys(sections).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const section = document.getElementById(sections[btnId]);
        
        if (btn && section) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showSection(section.id, btnId);
                
                // Update URL hash without page reload
                history.pushState(null, null, `#${btnId}`);
            });
        }
    });
    
    function showSection(sectionId, btnId) {
        // Hide all sections
        document.querySelectorAll('.row.mb-4').forEach(sec => {
            sec.classList.add('d-none');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.remove('d-none');
        
        // Update active nav item
        document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.getElementById(btnId).classList.add('active');
    }
    
    // Booking form logic
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = ['transportType', 'tripType', 'fromLocation', 'toLocation', 'departureDate', 'passengers', 'classType'];
            
            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                if (element.value.trim() === '' || element.value === null) {
                    element.classList.add('is-invalid');
                    isValid = false;
                } else {
                    element.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Simulate booking process
                alert('Searching for available tickets...');
                
                // In a real app, this would redirect to search results or show available options
                // For demo purposes, we'll show the myBookings section
                showSection('myBookingsSection', 'myBookingsBtn');
            }
        });
        
        // Enable/disable return date based on trip type
        const tripType = document.getElementById('tripType');
        const returnDate = document.getElementById('returnDate');
        
        if (tripType && returnDate) {
            tripType.addEventListener('change', function() {
                if (this.value === 'round-trip') {
                    returnDate.disabled = false;
                    returnDate.required = true;
                } else {
                    returnDate.disabled = true;
                    returnDate.required = false;
                    returnDate.value = '';
                }
            });
        }
    }
    
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
        });
    }
    
    // Password form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword');
            const newPassword = document.getElementById('newPassword');
            const confirmNewPassword = document.getElementById('confirmNewPassword');
            
            let isValid = true;
            
            // Simple validation
            if (currentPassword.value.trim() === '') {
                currentPassword.classList.add('is-invalid');
                isValid = false;
            } else {
                currentPassword.classList.remove('is-invalid');
            }
            
            if (newPassword.value.trim() === '' || newPassword.value.length < 8) {
                newPassword.classList.add('is-invalid');
                isValid = false;
            } else {
                newPassword.classList.remove('is-invalid');
            }
            
            if (confirmNewPassword.value !== newPassword.value) {
                confirmNewPassword.classList.add('is-invalid');
                isValid = false;
            } else {
                confirmNewPassword.classList.remove('is-invalid');
            }
            
            if (isValid) {
                alert('Password changed successfully!');
                passwordForm.reset();
            }
        });
    }
    
    // Initialize ticket details modal
    const ticketModal = new bootstrap.Modal(document.getElementById('ticketDetailsModal'));
    const viewTicketButtons = document.querySelectorAll('.btn-primary .fa-eye');
    
    viewTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            ticketModal.show();
        });
    });
    
    // Simulate downloading a ticket as PDF
    const downloadButtons = document.querySelectorAll('.btn-success .fa-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Generating PDF ticket...');
            // In a real app, this would generate and download a PDF
            // For demo, we'll use the jsPDF library
            if (typeof jsPDF !== 'undefined') {
                const doc = new jsPDF();
                doc.text('iBookingSystem - Ticket Receipt', 10, 10);
                doc.text('Booking ID: #IB12345', 10, 20);
                doc.text('Route: New York to Boston', 10, 30);
                doc.text('Date: 15 Jun 2023', 10, 40);
                doc.text('Time: 08:30 AM', 10, 50);
                doc.text('Passenger: John Doe', 10, 60);
                doc.text('Seat: B12', 10, 70);
                doc.text('Amount: $125.00', 10, 80);
                doc.save('iBookingSystem-Ticket-IB12345.pdf');
            }
        });
    });
    
    // Focusout validation for booking form
    if (bookingForm) {
        const requiredFields = ['transportType', 'tripType', 'fromLocation', 'toLocation', 'departureDate', 'passengers', 'classType'];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('focusout', function() {
                    if (this.value.trim() === '' || this.value === null) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                    }
                });
            }
        });
    }
});
// Add this to your dashboard.js file
document.addEventListener('DOMContentLoaded', function() {
    // Create home button dynamically if needed
    const homeBtn = document.createElement('a');
    homeBtn.href = '../index.html';
    homeBtn.className = 'btn btn-outline-primary btn-sm ms-2';
    homeBtn.innerHTML = '<i class="fas fa-home me-1"></i> Home';
    
    // Insert in navbar (alternative to hardcoding)
    const navbar = document.querySelector('.navbar .container-fluid');
    if (navbar) {
        navbar.insertBefore(homeBtn, navbar.querySelector('.navbar-nav'));
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const adminMenuToggle = document.getElementById('adminMenuToggle');
    const wrapper = document.getElementById('wrapper');
    
    if (adminMenuToggle && wrapper) {
        adminMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }
    
    // Admin dashboard navigation
    const adminSections = {
        'adminBookingsBtn': 'adminBookingsSection',
        'adminRoutesBtn': 'adminRoutesSection',
        'adminSchedulesBtn': 'adminSchedulesSection',
        'adminVehiclesBtn': 'adminVehiclesSection',
        'adminCustomersBtn': 'adminCustomersSection',
        'adminPaymentsBtn': 'adminPaymentsSection',
        'adminReportsBtn': 'adminReportsSection',
        'adminSettingsBtn': 'adminSettingsSection'
    };
    
    Object.keys(adminSections).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const section = document.getElementById(adminSections[btnId]);
        
        if (btn && section) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide all sections
                document.querySelectorAll('.row.mb-4').forEach(sec => {
                    sec.classList.add('d-none');
                });
                
                // Show selected section
                section.classList.remove('d-none');
                
                // Update active nav item
                document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                this.classList.add('active');
                
                // Load data if needed
                if (section.id === 'adminReportsSection') {
                    initCharts();
                }
            });
        }
    });
    
    // Initialize charts
    function initCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [4500, 5200, 4800, 5600, 6200, 7000, 7500, 8000, 7700, 8500, 9000, 9500],
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(220, 53, 69, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
        // Transport Pie Chart
        const transportCtx = document.getElementById('transportPieChart').getContext('2d');
        const transportChart = new Chart(transportCtx, {
            type: 'doughnut',
            data: {
                labels: ['Train', 'Bus'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: ['#dc3545', '#28a745'],
                    hoverBackgroundColor: ['#c82333', '#218838'],
                    hoverBorderColor: 'rgba(234, 236, 244, 1)',
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                cutout: '80%',
            }
        });
    }
    
    // Initialize charts on page load if on reports section
    if (window.location.pathname.endsWith('admin-dashboard.html')) {
        initCharts();
    }
    
    // Add Booking Modal
    const addBookingBtn = document.getElementById('addBookingBtn');
    const addBookingModal = new bootstrap.Modal(document.getElementById('addBookingModal'));
    
    if (addBookingBtn) {
        addBookingBtn.addEventListener('click', function() {
            addBookingModal.show();
        });
    }
    
    // Add Route Modal
    const addRouteBtn = document.getElementById('addRouteBtn');
    
    if (addRouteBtn) {
        addRouteBtn.addEventListener('click', function() {
            alert('Add Route functionality would open a modal here');
        });
    }
    
    // Add Schedule Modal
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', function() {
            alert('Add Schedule functionality would open a modal here');
        });
    }
    
    // Sample data loading for tables
    function loadTableData(tableId, data) {
        const table = document.getElementById(tableId);
        if (table) {
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            
            data.forEach(item => {
                const row = document.createElement('tr');
                
                Object.values(item).forEach(value => {
                    const cell = document.createElement('td');
                    
                    if (typeof value === 'object' && value !== null) {
                        // Handle objects (like status badges)
                        if (value.type === 'badge') {
                            const badge = document.createElement('span');
                            badge.className = `badge bg-${value.color}`;
                            if (value.textColor) {
                                badge.classList.add(`text-${value.textColor}`);
                            }
                            badge.textContent = value.text;
                            cell.appendChild(badge);
                        }
                    } else {
                        cell.textContent = value;
                    }
                    
                    row.appendChild(cell);
                });
                
                // Add actions cell
                const actionsCell = document.createElement('td');
                actionsCell.innerHTML = `
                    <button class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                `;
                row.appendChild(actionsCell);
                
                tbody.appendChild(row);
            });
        }
    }
    
    // Load sample data for bookings table
    if (document.getElementById('bookingsTable')) {
        const bookingsData = [
            {
                id: '#IB12845',
                customer: 'John Smith',
                transport: { type: 'badge', text: 'Train', color: 'info' },
                route: 'New York to Boston',
                date: '15 Jul 2023',
                passengers: 2,
                amount: '$125.00',
                status: { type: 'badge', text: 'Confirmed', color: 'success' }
            },
            {
                id: '#IB12844',
                customer: 'Sarah Johnson',
                transport: { type: 'badge', text: 'Bus', color: 'warning', textColor: 'dark' },
                route: 'Boston to Washington',
                date: '14 Jul 2023',
                passengers: 1,
                amount: '$85.50',
                status: { type: 'badge', text: 'Confirmed', color: 'success' }
            },
            {
                id: '#IB12843',
                customer: 'Michael Brown',
                transport: { type: 'badge', text: 'Train', color: 'info' },
                route: 'Washington to Philadelphia',
                date: '13 Jul 2023',
                passengers: 3,
                amount: '$110.00',
                status: { type: 'badge', text: 'Pending', color: 'warning', textColor: 'dark' }
            },
            {
                id: '#IB12842',
                customer: 'Emily Davis',
                transport: { type: 'badge', text: 'Bus', color: 'warning', textColor: 'dark' },
                route: 'Philadelphia to New York',
                date: '12 Jul 2023',
                passengers: 1,
                amount: '$75.25',
                status: { type: 'badge', text: 'Cancelled', color: 'danger' }
            }
        ];
        
        loadTableData('bookingsTable', bookingsData);
    }
    
    // Load sample data for routes table
    if (document.getElementById('routesTable')) {
        const routesData = [
            {
                id: 'RT001',
                from: 'New York',
                to: 'Boston',
                distance: '215 miles',
                duration: '3h 45m',
                transport: 'Train',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'RT002',
                from: 'Boston',
                to: 'Washington',
                distance: '440 miles',
                duration: '6h 30m',
                transport: 'Bus',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'RT003',
                from: 'Washington',
                to: 'Philadelphia',
                distance: '140 miles',
                duration: '2h 15m',
                transport: 'Train',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'RT004',
                from: 'Philadelphia',
                to: 'New York',
                distance: '95 miles',
                duration: '1h 45m',
                transport: 'Bus',
                status: { type: 'badge', text: 'Maintenance', color: 'warning', textColor: 'dark' }
            }
        ];
        
        loadTableData('routesTable', routesData);
    }
    
    // Load sample data for schedules table
    if (document.getElementById('schedulesTable')) {
        const schedulesData = [
            {
                id: 'SC001',
                route: 'New York to Boston',
                departure: '08:30 AM',
                arrival: '12:15 PM',
                frequency: 'Daily',
                vehicle: 'Train #T101',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'SC002',
                route: 'Boston to Washington',
                departure: '02:15 PM',
                arrival: '08:45 PM',
                frequency: 'Daily',
                vehicle: 'Bus #B205',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'SC003',
                route: 'Washington to Philadelphia',
                departure: '10:45 AM',
                arrival: '01:00 PM',
                frequency: 'Weekdays',
                vehicle: 'Train #T102',
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'SC004',
                route: 'Philadelphia to New York',
                departure: '05:30 PM',
                arrival: '07:15 PM',
                frequency: 'Weekends',
                vehicle: 'Bus #B206',
                status: { type: 'badge', text: 'Inactive', color: 'secondary' }
            }
        ];
        
        loadTableData('schedulesTable', schedulesData);
    }
    
    // Load sample data for customers table
    if (document.getElementById('customersTable')) {
        const customersData = [
            {
                id: 'CU001',
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '+1 (123) 456-7890',
                joinDate: '15 Jan 2023',
                bookings: 8,
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'CU002',
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '+1 (234) 567-8901',
                joinDate: '20 Feb 2023',
                bookings: 5,
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'CU003',
                name: 'Michael Brown',
                email: 'michael.b@example.com',
                phone: '+1 (345) 678-9012',
                joinDate: '05 Mar 2023',
                bookings: 3,
                status: { type: 'badge', text: 'Active', color: 'success' }
            },
            {
                id: 'CU004',
                name: 'Emily Davis',
                email: 'emily.d@example.com',
                phone: '+1 (456) 789-0123',
                joinDate: '12 Apr 2023',
                bookings: 2,
                status: { type: 'badge', text: 'Inactive', color: 'secondary' }
            }
        ];
        
        loadTableData('customersTable', customersData);
    }
});
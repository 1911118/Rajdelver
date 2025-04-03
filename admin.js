// Admin credentials (hashed for better security)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    // This is a hashed version of 'admin123'
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
};

// Hash function for password
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Get menu items from localStorage or use default items
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella cheese and fresh basil",
        price: 299,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Chicken Burger",
        description: "Grilled chicken patty with lettuce, tomato, and special sauce",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Pasta Alfredo",
        description: "Creamy Alfredo sauce with fettuccine pasta and parmesan cheese",
        price: 249,
        image: "https://images.unsplash.com/photo-1645112411341-6c1f3c1c5c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Chicken Wings",
        description: "Crispy chicken wings with your choice of sauce",
        price: 399,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const adminContent = document.getElementById('adminContent');
const loginSection = document.getElementById('loginSection');
const logoutBtn = document.getElementById('logoutBtn');
const addItemForm = document.getElementById('addItemForm');
const menuItemsList = document.getElementById('menuItemsList');
const ordersList = document.getElementById('ordersList');
const imagePreview = document.getElementById('imagePreview');
const itemImageInput = document.getElementById('itemImage');
const totalProducts = document.getElementById('totalProducts');
const totalOrders = document.getElementById('totalOrders');
const totalRevenue = document.getElementById('totalRevenue');

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    loginSection.style.display = 'block';
    adminContent.style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    loginSection.style.display = 'none';
    adminContent.style.display = 'block';
    initializeAdmin();
}

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const hashedPassword = await hashPassword(password);

    if (username === ADMIN_CREDENTIALS.username && hashedPassword === ADMIN_CREDENTIALS.passwordHash) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        showToast('Invalid credentials', 'danger');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    showLoginForm();
});

// Initialize the admin panel
function initializeAdmin() {
    displayMenuItems();
    displayOrders();
    updateDashboardStats();
    setupEventListeners();
}

// Display menu items
function displayMenuItems() {
    menuItemsList.innerHTML = menuItems.map(item => `
        <div class="menu-item-admin">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-7">
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                    <p class="text-primary">₹${item.price}</p>
                </div>
                <div class="col-md-3 text-end">
                    <button class="btn btn-primary mb-2" onclick="editItem(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display orders
function displayOrders() {
    ordersList.innerHTML = orders.map(order => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Order #${order.id}</h5>
                <p><strong>Customer:</strong> ${order.customerName}</p>
                <p><strong>Phone:</strong> ${order.customerPhone}</p>
                <p><strong>Address:</strong> ${order.deliveryAddress}</p>
                <p><strong>Items:</strong></p>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
                    `).join('')}
                </ul>
                <p><strong>Total:</strong> ₹${order.total}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <div class="mt-2">
                    <button class="btn btn-success btn-sm" onclick="updateOrderStatus(${order.id}, 'Completed')">
                        Mark Completed
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="updateOrderStatus(${order.id}, 'Cancelled')">
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update dashboard stats
function updateDashboardStats() {
    totalProducts.textContent = menuItems.length;
    totalOrders.textContent = orders.length;
    const revenue = orders.reduce((total, order) => total + order.total, 0);
    totalRevenue.textContent = `₹${revenue}`;
}

// Setup event listeners
function setupEventListeners() {
    // Add item form submission
    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewItem();
    });

    // Image preview
    itemImageInput.addEventListener('input', (e) => {
        const imageUrl = e.target.value;
        if (imageUrl) {
            imagePreview.src = imageUrl;
            imagePreview.classList.remove('d-none');
        } else {
            imagePreview.classList.add('d-none');
        }
    });
}

// Add new item
function addNewItem() {
    const newItem = {
        id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        price: parseInt(document.getElementById('itemPrice').value),
        image: document.getElementById('itemImage').value
    };

    menuItems.push(newItem);
    saveMenuItems();
    displayMenuItems();
    updateDashboardStats();
    addItemForm.reset();
    imagePreview.classList.add('d-none');
    showToast('Item added successfully!');
}

// Edit item
function editItem(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemDescription').value = item.description;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemImage').value = item.image;
        
        // Update preview
        imagePreview.src = item.image;
        imagePreview.classList.remove('d-none');
        
        // Change form submit behavior
        addItemForm.onsubmit = (e) => {
            e.preventDefault();
            updateItem(itemId);
        };
        
        // Scroll to form
        addItemForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update item
function updateItem(itemId) {
    const index = menuItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        menuItems[index] = {
            ...menuItems[index],
            name: document.getElementById('itemName').value,
            description: document.getElementById('itemDescription').value,
            price: parseInt(document.getElementById('itemPrice').value),
            image: document.getElementById('itemImage').value
        };
        
        saveMenuItems();
        displayMenuItems();
        updateDashboardStats();
        addItemForm.reset();
        imagePreview.classList.add('d-none');
        
        // Reset form submit behavior
        addItemForm.onsubmit = (e) => {
            e.preventDefault();
            addNewItem();
        };
        
        showToast('Item updated successfully!');
    }
}

// Delete item
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== itemId);
        saveMenuItems();
        displayMenuItems();
        updateDashboardStats();
        showToast('Item deleted successfully!');
    }
}

// Update order status
function updateOrderStatus(orderId, status) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders();
        showToast(`Order #${orderId} status updated to ${status}`);
    }
}

// Save menu items to localStorage
function saveMenuItems() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast position-fixed bottom-0 end-0 m-3 bg-${type} text-white`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-header bg-${type} text-white">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Initialize the admin panel when the page loads
document.addEventListener('DOMContentLoaded', checkAuth); 
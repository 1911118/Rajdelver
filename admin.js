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

// Default menu items that will always be available
const DEFAULT_MENU_ITEMS = [
    {
        id: 1,
        name: "MILK - blue color",
        description: "170ml sangum milk",
        price: 28,
        image: "https://5.imimg.com/data5/SELLER/Default/2021/12/MI/CM/OC/3823480/sangam-milk-blue-500x500.jpg"
    },
    {
        id: 2,
        name: "MILK - Red color",
        description: "500ml #Red color",
        price: 35,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/9/RW/EM/BI/3823480/sangam-milk-red.jpg"
    },
    {
        id: 3,
        name: "Curd",
        description: "small",
        price: 10,
        image: "https://5.imimg.com/data5/SELLER/Default/2021/12/UY/ON/MY/3823480/sangam-curd-500x500.jpg"
    },
    {
        id: 4,
        name: "Butter Milk",
        description: "200ml fresh buttermilk",
        price: 15,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/1/ZG/VM/WC/3823480/buttermilk-500x500.jpg"
    },
    {
        id: 5,
        name: "Lassi",
        description: "Sweet lassi 200ml",
        price: 25,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/1/DK/DN/OJ/3823480/lassi-500x500.jpg"
    }
];

// Initialize menu items with default items, then merge with localStorage if any exist
let menuItems = [...DEFAULT_MENU_ITEMS];
const storedItems = JSON.parse(localStorage.getItem('menuItems')) || [];

// Merge stored items with default items, avoiding duplicates by ID
storedItems.forEach(storedItem => {
    const exists = menuItems.some(item => item.id === storedItem.id);
    if (!exists) {
        menuItems.push(storedItem);
    }
});

// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Reset to default items function
function resetToDefaultItems() {
    if (confirm('Are you sure you want to reset to default items? This will remove all custom items.')) {
        menuItems = [...DEFAULT_MENU_ITEMS];
        saveMenuItems();
        displayMenuItems();
        updateDashboardStats();
        showToast('Menu reset to default items');
    }
}

// Add reset button to the admin panel
function addResetButton() {
    const adminHeader = document.querySelector('.card-header');
    if (adminHeader) {
        const resetButton = document.createElement('button');
        resetButton.className = 'btn btn-warning float-end';
        resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset to Default Items';
        resetButton.onclick = resetToDefaultItems;
        adminHeader.appendChild(resetButton);
    }
}

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
    addResetButton(); // Add the reset button
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
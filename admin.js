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

// DOM Elements
const addItemForm = document.getElementById('addItemForm');
const menuItemsList = document.getElementById('menuItemsList');
const imagePreview = document.getElementById('imagePreview');
const itemImageInput = document.getElementById('itemImage');

// Initialize the admin panel
function initializeAdmin() {
    displayMenuItems();
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
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
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
    addItemForm.reset();
    imagePreview.classList.add('d-none');
    showToast('Item added successfully!');
}

// Delete item
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== itemId);
        saveMenuItems();
        displayMenuItems();
        showToast('Item deleted successfully!');
    }
}

// Save menu items to localStorage
function saveMenuItems() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
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
document.addEventListener('DOMContentLoaded', initializeAdmin); 
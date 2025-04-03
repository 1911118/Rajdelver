// Get menu items from localStorage
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderId = 1;

// DOM Elements
const menuItemsContainer = document.getElementById('menuItems');
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const orderForm = document.getElementById('orderForm');
const showTutorialBtn = document.getElementById('showTutorialBtn');
const tutorialModal = new bootstrap.Modal(document.getElementById('tutorialModal'));
const useCurrentLocation = document.getElementById('useCurrentLocation');
    const locationStatus = document.getElementById('locationStatus');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Initialize the page
function initializePage() {
    displayMenuItems();
    updateCart();
    setupEventListeners();
}

// Display menu items
function displayMenuItems(filteredItems = null) {
    const items = filteredItems || menuItems;
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="col-md-3 mb-4">
            <div class="product-card">
                <img src="${item.image}" class="product-image" alt="${item.name}">
                <div class="product-details">
                    <h3 class="product-title">${item.name}</h3>
                    <p class="product-description">${item.description}</p>
                    <div class="product-price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, (getCartItemQuantity(${item.id}) - 1))">-</button>
                        <input type="number" value="${getCartItemQuantity(item.id)}" min="0" readonly>
                        <button onclick="updateQuantity(${item.id}, (getCartItemQuantity(${item.id}) + 1))">+</button>
                    </div>
                    <button class="btn btn-primary w-100" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get cart item quantity
function getCartItemQuantity(itemId) {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
}

// Search functionality
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        displayMenuItems();
        return;
    }

    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    
    displayMenuItems(filteredItems);
}

// Add item to cart
function addToCart(itemId) {
        const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const cartItem = cart.find(cartItem => cartItem.id === itemId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCart();
        showToast('Item added to cart!');
    }
}

// Update cart display
function updateCart() {
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-8">
                <h6>${item.name}</h6>
                    <p class="mb-0">₹${item.price} x ${item.quantity}</p>
                </div>
                <div class="col-4 text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;

    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update quantity inputs in menu
    displayMenuItems();
}

// Update item quantity in cart
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
    cart = cart.filter(item => item.id !== itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        } else {
            const menuItem = menuItems.find(item => item.id === itemId);
            if (menuItem) {
                cart.push({ ...menuItem, quantity: newQuantity });
            }
        }
    }
    updateCart();
}

// Setup event listeners
function setupEventListeners() {
    // Cart button click
    cartBtn.addEventListener('click', () => {
        cartPanel.classList.add('active');
    });

    // Close cart button click
    closeCartBtn.addEventListener('click', () => {
        cartPanel.classList.remove('active');
    });

    // Order form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
    });

    // Tutorial button click
    showTutorialBtn.addEventListener('click', () => {
        showTutorial();
    });

    // Current location checkbox
    useCurrentLocation.addEventListener('change', () => {
        if (useCurrentLocation.checked) {
            getCurrentLocation();
        } else {
            locationStatus.textContent = '';
        }
    });

    // Search functionality
    searchInput.addEventListener('input', searchProducts);
    searchButton.addEventListener('click', searchProducts);
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }

    const order = {
        id: orderId++,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerEmail: document.getElementById('customerEmail').value,
        deliveryAddress: document.getElementById('deliveryAddress').value,
        doorNumber: document.getElementById('doorNumber').value,
        landmark: document.getElementById('landmark').value,
        deliveryInstructions: document.getElementById('deliveryInstructions').value,
        status: 'Pending',
        date: new Date().toISOString()
    };

    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    updateCart();
    cartPanel.classList.remove('active');
    orderForm.reset();

    showToast('Order placed successfully!', 'success');
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        locationStatus.textContent = 'Getting location...';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // In a real application, you would use a geocoding service to get the address
                document.getElementById('deliveryAddress').value = `${latitude}, ${longitude}`;
                locationStatus.textContent = 'Location obtained successfully!';
            },
            (error) => {
                locationStatus.textContent = 'Error getting location: ' + error.message;
            }
        );
    } else {
        locationStatus.textContent = 'Geolocation is not supported by your browser';
    }
}

// Show tutorial
function showTutorial() {
    const tutorialSteps = [
        {
            title: 'Welcome to Delvery!',
            content: 'Let us show you how to order delicious food from our menu.'
        },
        {
            title: 'Browse the Menu',
            content: 'Scroll through our menu to see all available items. Each item shows its description and price.'
        },
        {
            title: 'Add to Cart',
            content: 'Click the "Add to Cart" button on any item you want to order. You can add multiple items.'
        },
        {
            title: 'View Your Cart',
            content: 'Click the cart icon in the top right to view your order. You can adjust quantities or remove items.'
        },
        {
            title: 'Place Your Order',
            content: 'Fill in your delivery details and click "Place Order" to complete your purchase.'
        }
    ];

    let currentStep = 0;
    const tutorialStepsContainer = document.getElementById('tutorialSteps');
    const prevStepBtn = document.getElementById('prevStep');
    const nextStepBtn = document.getElementById('nextStep');
    const finishBtn = document.getElementById('finishTutorial');

    function showStep(step) {
        tutorialStepsContainer.innerHTML = `
            <h4>${tutorialSteps[step].title}</h4>
            <p>${tutorialSteps[step].content}</p>
        `;

        prevStepBtn.style.display = step === 0 ? 'none' : 'inline-block';
        nextStepBtn.style.display = step === tutorialSteps.length - 1 ? 'none' : 'inline-block';
        finishBtn.style.display = step === tutorialSteps.length - 1 ? 'inline-block' : 'none';
    }

    prevStepBtn.onclick = () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    };

    nextStepBtn.onclick = () => {
        if (currentStep < tutorialSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    };

    finishBtn.onclick = () => {
        tutorialModal.hide();
    };

    showStep(currentStep);
    tutorialModal.show();
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

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', initializePage); 
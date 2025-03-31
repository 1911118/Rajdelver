// Menu Items Data
const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
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

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const menuContainer = document.getElementById('menuItems');
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const orderForm = document.getElementById('orderForm');

// Location State
let currentLocation = null;

// Location Functions
function getCurrentLocation() {
    const locationStatus = document.getElementById('locationStatus');
    locationStatus.innerHTML = '<div class="text-primary"><i class="fas fa-spinner fa-spin"></i> Getting your location...</div>';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                locationStatus.innerHTML = '<div class="text-success"><i class="fas fa-check-circle"></i> Location captured successfully!</div>';
            },
            (error) => {
                locationStatus.innerHTML = '<div class="text-danger"><i class="fas fa-exclamation-circle"></i> Error getting location. Please enter address manually.</div>';
                console.error('Error getting location:', error);
            }
        );
    } else {
        locationStatus.innerHTML = '<div class="text-danger"><i class="fas fa-exclamation-circle"></i> Geolocation is not supported by your browser.</div>';
    }
}

// Initialize Menu
function initializeMenu() {
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="col-md-4 mb-4">
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">₹${item.price}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2" id="quantity-${item.id}">0</span>
                        <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${item.id})" id="addToCartBtn-${item.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update quantity function
function updateQuantity(itemId, change) {
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    const currentQuantity = parseInt(quantitySpan.textContent) || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    quantitySpan.textContent = newQuantity;
    
    // Update Add to Cart button state
    const addToCartBtn = document.getElementById(`addToCartBtn-${itemId}`);
    if (addToCartBtn) {
        addToCartBtn.disabled = newQuantity === 0;
        addToCartBtn.style.opacity = newQuantity === 0 ? '0.6' : '1';
    }
}

// Cart Functions
function addToCart(itemId) {
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).textContent);
    if (quantity > 0) {
        const item = menuItems.find(item => item.id === itemId);
        const cartItem = cart.find(item => item.id === itemId);
        
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({
                ...item,
                quantity: quantity
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        updateCartDisplay();
        showToast('Item added to cart!');
        
        // Reset quantity
        document.getElementById(`quantity-${itemId}`).textContent = '0';
        const addToCartBtn = document.getElementById(`addToCartBtn-${itemId}`);
        if (addToCartBtn) {
            addToCartBtn.disabled = true;
            addToCartBtn.style.opacity = '0.6';
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h6>${item.name}</h6>
                <small>₹${item.price} x ${item.quantity}</small>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-outline-primary ms-2" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total;
}

function updateCartQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity = Math.max(0, cartItem.quantity + change);
        if (cartItem.quantity === 0) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function toggleCart() {
    // On mobile, toggle the cart visibility
    if (window.innerWidth <= 768) {
        cartPanel.classList.toggle('active');
        document.body.classList.toggle('cart-open');
    }
}

function closeCart() {
    // Only close on mobile
    if (window.innerWidth <= 768) {
        cartPanel.classList.remove('active');
        document.body.classList.remove('cart-open');
    }
}

// WhatsApp Integration
function sendWhatsAppOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const doorNumber = document.getElementById('doorNumber').value;
    const landmark = document.getElementById('landmark').value;
    const deliveryInstructions = document.getElementById('deliveryInstructions').value;
    
    const orderDetails = cart.map(item => 
        `${item.name} x ${item.quantity} @ ₹${item.price}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = `New Order Received:\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${customerPhone}\n`;
    if (customerEmail) message += `Email: ${customerEmail}\n`;
    message += `\nDelivery Address:\n`;
    message += `${deliveryAddress}\n`;
    message += `Door/Apt: ${doorNumber}\n`;
    if (landmark) message += `Landmark: ${landmark}\n`;
    if (deliveryInstructions) message += `Instructions: ${deliveryInstructions}\n`;
    if (currentLocation) {
        message += `\nLocation: https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}\n`;
    }
    message += `\nOrder Details:\n${orderDetails}\n\n`;
    message += `Total Amount: ₹${total}`;
    
    const whatsappUrl = `https://wa.me/917569226048?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    updateCartCount();
    updateCartDisplay();
    
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        sendWhatsAppOrder();
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        closeCart();
        orderForm.reset();
    });
    
    const useCurrentLocationCheckbox = document.getElementById('useCurrentLocation');
    if (useCurrentLocationCheckbox) {
        useCurrentLocationCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                getCurrentLocation();
            } else {
                currentLocation = null;
                document.getElementById('locationStatus').innerHTML = '';
            }
        });
    }
}); 
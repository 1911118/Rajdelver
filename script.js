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
let cart = [];

// DOM Elements
const menuContainer = document.getElementById('menuItems');
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const orderForm = document.getElementById('orderForm');

// Tutorial State
let currentStep = 0;
const tutorialSteps = [
    {
        title: "Welcome to Delvery!",
        content: "Let's take a quick tour of how to use our website to order delicious food.",
        target: null,
        icon: "fas fa-utensils"
    },
    {
        title: "Browse Our Menu",
        content: "Scroll down to see our delicious menu items. Each item shows its description and price.",
        target: "#menu",
        icon: "fas fa-list"
    },
    {
        title: "Select Your Items",
        content: "Use the + and - buttons to select the quantity of each item you want to order.",
        target: ".quantity-selector",
        icon: "fas fa-plus-minus"
    },
    {
        title: "Add to Cart",
        content: "Click the 'Add to Cart' button to add your selected items to your cart.",
        target: ".menu-item .btn-primary",
        icon: "fas fa-cart-plus"
    },
    {
        title: "View Your Cart",
        content: "Click the cart icon in the top right to view your selected items and total.",
        target: "#cartBtn",
        icon: "fas fa-shopping-cart"
    },
    {
        title: "Place Your Order",
        content: "Fill in your details and click 'Place Order' to send your order via WhatsApp.",
        target: "#orderForm",
        icon: "fas fa-paper-plane"
    }
];

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
                    <button class="btn btn-primary" onclick="buyNow(${item.id})" id="buyNowBtn-${item.id}">
                        <i class="fas fa-shopping-cart"></i> Buy Now
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
    
    // Update Buy Now button state
    const buyNowBtn = document.getElementById(`buyNowBtn-${itemId}`);
    if (buyNowBtn) {
        buyNowBtn.disabled = newQuantity === 0;
        buyNowBtn.style.opacity = newQuantity === 0 ? '0.6' : '1';
    }
}

// Cart Functions
function incrementQuantity(itemId) {
    const input = document.getElementById(`quantity-${itemId}`);
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity(itemId) {
    const input = document.getElementById(`quantity-${itemId}`);
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCart(itemId) {
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
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
        
        updateCartCount();
        showToast('Item added to cart!');
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
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total;
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
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
        message += `\nLocation:\n`;
        message += `Latitude: ${currentLocation.latitude}\n`;
        message += `Longitude: ${currentLocation.longitude}\n`;
        message += `Google Maps: https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}\n`;
    }
    
    message += `\nItems Ordered:\n${orderDetails}\n\n`;
    message += `Total: ₹${total}`;
    
    const whatsappUrl = `https://wa.me/7569226048?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Toast Notification
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

// Event Listeners
cartBtn.addEventListener('click', () => {
    updateCartDisplay();
    toggleCart();
});

closeCartBtn.addEventListener('click', closeCart);

// Close cart when clicking outside (mobile only)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        cartPanel.classList.contains('active') && 
        !cartPanel.contains(e.target) && 
        !cartBtn.contains(e.target)) {
        closeCart();
    }
});

// Update cart display on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        cartPanel.classList.remove('active');
        document.body.classList.remove('cart-open');
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    sendWhatsAppOrder();
    cart = [];
    updateCartCount();
    closeCart();
    orderForm.reset();
});

// Tutorial Functions
function initializeTutorial() {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
        showTutorial();
    }
}

function showTutorial() {
    currentStep = 0;
    const tutorialModal = new bootstrap.Modal(document.getElementById('tutorialModal'));
    tutorialModal.show();
    updateTutorialStep();
}

function updateTutorialStep() {
    const step = tutorialSteps[currentStep];
    const tutorialStepsContainer = document.getElementById('tutorialSteps');
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    const finishButton = document.getElementById('finishTutorial');

    // Update content
    tutorialStepsContainer.innerHTML = `
        <div class="text-center">
            <div class="tutorial-icon mb-3">
                <i class="${step.icon} fa-3x"></i>
            </div>
            <h4>${step.title}</h4>
            <p class="lead">${step.content}</p>
            <div class="tutorial-progress mb-3">
                Step ${currentStep + 1} of ${tutorialSteps.length}
            </div>
            ${step.target ? `<div class="tutorial-highlight" data-target="${step.target}"></div>` : ''}
        </div>
    `;

    // Update buttons
    prevButton.style.display = currentStep > 0 ? 'block' : 'none';
    nextButton.style.display = currentStep < tutorialSteps.length - 1 ? 'block' : 'none';
    finishButton.style.display = currentStep === tutorialSteps.length - 1 ? 'block' : 'none';

    // Highlight target element if exists
    if (step.target) {
        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a pulsing effect to the target element
            targetElement.classList.add('tutorial-pulse');
        }
    }
}

function nextStep() {
    if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        updateTutorialStep();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateTutorialStep();
    }
}

function finishTutorial() {
    localStorage.setItem('hasSeenTutorial', 'true');
    const tutorialModal = bootstrap.Modal.getInstance(document.getElementById('tutorialModal'));
    tutorialModal.hide();
    showToast('Tutorial completed! You can view it again anytime by clicking "How to Use" in the menu.');
}

// Add tutorial event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    updateCartCount();
    initializeTutorial();

    // Show admin link if user is admin
    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('adminNavItem').style.display = 'block';
    }

    // Tutorial button event listeners
    document.getElementById('nextStep').addEventListener('click', nextStep);
    document.getElementById('prevStep').addEventListener('click', prevStep);
    document.getElementById('finishTutorial').addEventListener('click', finishTutorial);
    document.getElementById('showTutorialBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showTutorial();
    });

    // Location checkbox event listener
    document.getElementById('useCurrentLocation').addEventListener('change', (e) => {
        if (e.target.checked) {
            getCurrentLocation();
        } else {
            currentLocation = null;
            document.getElementById('locationStatus').innerHTML = '';
        }
    });
});

// Buy Now Function
function buyNow(id) {
    const quantity = parseInt(document.getElementById(`quantity-${id}`).textContent) || 0;
    if (quantity === 0) {
        showToast('Please select quantity first!');
        return;
    }

    const item = menuItems.find(item => item.id === id);
    if (item) {
        // Add item to cart with selected quantity
        const existingItem = cart.find(cartItem => cartItem.id === id);
        if (existingItem) {
            existingItem.quantity = quantity; // Use selected quantity
        } else {
            cart.push({
                ...item,
                quantity: quantity
            });
        }
        
        // Update cart count and display
        updateCartCount();
        updateCartDisplay();
        
        // Show cart panel
        toggleCart();
        
        // Show success message
        showToast('Item added to cart!');
        
        // Reset quantity
        document.getElementById(`quantity-${id}`).textContent = '0';
        const buyNowBtn = document.getElementById(`buyNowBtn-${id}`);
        if (buyNowBtn) {
            buyNowBtn.disabled = true;
            buyNowBtn.style.opacity = '0.6';
        }
    }
} 
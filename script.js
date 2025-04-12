// API endpoints
const API_URL = 'http://localhost:3000/api';

// Menu items will be fetched from server
let menuItems = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderId = 1;
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Get menu items from server
async function fetchMenuItems() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        menuItems = await response.json();
        displayMenuItems();
    } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Error loading products. Please try again later.', 'danger');
    }
}

// Initialize the page
async function initializePage() {
    await fetchMenuItems();
    updateCart();
    setupEventListeners();
    updateUserProfile();
}

// Update user profile in the navigation
function updateUserProfile() {
    const userNameElement = document.getElementById('userName');
    const signInLink = document.getElementById('signInLink');
    const signUpLink = document.getElementById('signUpLink');
    const signOutLink = document.getElementById('signOutLink');
    const profileLink = document.getElementById('profileLink');
    const dropdownDivider = document.getElementById('dropdownDivider');
    
    if (currentUser) {
        userNameElement.textContent = currentUser.fullName;
        signInLink.style.display = 'none';
        signUpLink.style.display = 'none';
        dropdownDivider.style.display = 'block';
        profileLink.style.display = 'block';
        signOutLink.style.display = 'block';
    } else {
        userNameElement.textContent = 'Sign In';
        signInLink.style.display = 'block';
        signUpLink.style.display = 'block';
        dropdownDivider.style.display = 'none';
        profileLink.style.display = 'none';
        signOutLink.style.display = 'none';
    }
}

// Sign out function
function signOut() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUserProfile();
    showToast('You have been signed out successfully', 'success');
}

// Add new product (for admin use)
async function addProduct(productData) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        
        const newProduct = await response.json();
        menuItems.push(newProduct);
        displayMenuItems();
        showToast('Product added successfully!', 'success');
    } catch (error) {
        console.error('Error adding product:', error);
        showToast('Error adding product. Please try again.', 'danger');
    }
}

// Update product (for admin use)
async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        
        const updatedProduct = await response.json();
        const index = menuItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            menuItems[index] = updatedProduct;
            displayMenuItems();
        }
        showToast('Product updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating product:', error);
        showToast('Error updating product. Please try again.', 'danger');
    }
}

// Delete product (for admin use)
async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        
        menuItems = menuItems.filter(item => item.id !== productId);
        displayMenuItems();
        showToast('Product deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Error deleting product. Please try again.', 'danger');
    }
}

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
const categoryButtons = document.querySelectorAll('.category-filters .btn');
const signOutLink = document.getElementById('signOutLink');

let currentCategory = 'all';
let searchTerm = '';

// Display menu items
function displayMenuItems() {
    let filteredItems = menuItems;
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    menuItemsContainer.innerHTML = filteredItems.map(item => `
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
    searchTerm = searchInput.value.toLowerCase().trim();
    displayMenuItems();
}

// Category filter functionality
function filterByCategory(category) {
    currentCategory = category;
    categoryButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    displayMenuItems();
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
        document.body.style.overflow = 'hidden';
    });

    // Close cart button click
    closeCartBtn.addEventListener('click', () => {
        cartPanel.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target === cartPanel) {
            cartPanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Order form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder(e);
    });

    // Tutorial button click
    showTutorialBtn.addEventListener('click', () => {
        showTutorial();
    });

    // Use current location checkbox
    useCurrentLocation.addEventListener('change', () => {
        if (useCurrentLocation.checked) {
            getCurrentLocation();
        } else {
            locationStatus.textContent = '';
        }
    });

    // Search button click
    searchButton.addEventListener('click', searchProducts);

    // Search input enter key
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Category filter buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByCategory(btn.dataset.category);
        });
    });

    // Sign out link
    if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
            e.preventDefault();
            signOut();
        });
    }
}

// Calculate total price of cart
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Function to send WhatsApp message
async function sendWhatsAppMessage(orderDetails) {
    const phoneNumber = '917569226048'; // WhatsApp number without + symbol
    const message = `New Order Details:
Order ID: ${orderDetails.orderId}
Customer: ${orderDetails.customerName}
Phone: ${orderDetails.customerPhone}
Address: ${orderDetails.deliveryAddress}
Items:
${orderDetails.items.map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('\n')}
Total Amount: ₹${orderDetails.totalAmount}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Place order function
async function placeOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }

    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const doorNumber = document.getElementById('doorNumber').value;
    const landmark = document.getElementById('landmark').value;
    const deliveryInstructions = document.getElementById('deliveryInstructions').value;

    // Validate required fields
    if (!customerName || !customerPhone || !deliveryAddress || !doorNumber) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }

    // Create order object
    const order = {
        orderId: orderId++,
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: `${deliveryAddress}, Door/Apt: ${doorNumber}${landmark ? `, Landmark: ${landmark}` : ''}`,
        deliveryInstructions,
        items: cart,
        totalAmount: calculateTotal(),
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    // Send order details via WhatsApp
    await sendWhatsAppMessage(order);

    // Clear cart and show success message
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    cartPanel.classList.remove('show');
    
    showToast('Order placed successfully! We will contact you shortly.', 'success');
    orderForm.reset();
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
            title: 'Welcome to Delvery! 🎉',
            content: 'Let us show you how to order delicious food from our menu.',
            highlight: null
        },
        {
            title: 'Browse the Menu 🍽️',
            content: 'Scroll through our menu to see all available items. Each item shows its description and price. You can also use the search bar to find specific items.',
            highlight: '#menu'
        },
        {
            title: 'Add to Cart 🛒',
            content: 'Click the "Add to Cart" button on any item you want to order. You can adjust the quantity using the + and - buttons.',
            highlight: '.product-card'
        },
        {
            title: 'View Your Cart 📋',
            content: 'Click the cart icon in the top right to view your order. You can adjust quantities or remove items.',
            highlight: '#cartBtn'
        },
        {
            title: 'Place Your Order 📝',
            content: 'Fill in your delivery details and click "Place Order" to complete your purchase. You can also use your current location for faster delivery.',
            highlight: '#orderForm'
        },
        {
            title: 'Track Your Order 🚚',
            content: 'After placing your order, you\'ll receive a confirmation with your order details and estimated delivery time.',
            highlight: null
        }
    ];

    let currentStep = 0;
    const tutorialStepsContainer = document.getElementById('tutorialSteps');
    const prevStepBtn = document.getElementById('prevStep');
    const nextStepBtn = document.getElementById('nextStep');
    const finishBtn = document.getElementById('finishTutorial');

    function showStep(step) {
        // Remove previous highlight
        const previousHighlight = document.querySelector('.tutorial-highlight');
        if (previousHighlight) {
            previousHighlight.classList.remove('tutorial-highlight');
        }

        // Add new highlight if specified
        if (tutorialSteps[step].highlight) {
            const elementToHighlight = document.querySelector(tutorialSteps[step].highlight);
            if (elementToHighlight) {
                elementToHighlight.classList.add('tutorial-highlight');
                elementToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        tutorialStepsContainer.innerHTML = `
            <div class="tutorial-step-content">
                <h4 class="tutorial-title">${tutorialSteps[step].title}</h4>
                <p class="tutorial-text">${tutorialSteps[step].content}</p>
                <div class="tutorial-progress">
                    Step ${step + 1} of ${tutorialSteps.length}
                </div>
            </div>
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
        // Remove highlight
        const highlight = document.querySelector('.tutorial-highlight');
        if (highlight) {
            highlight.classList.remove('tutorial-highlight');
        }
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
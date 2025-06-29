// Product data (embedded directly in the script)
const menuItems = [
  {
    "id": 1,
    "name": "Tomato",
    "description": "1kg",
    "price": 30,
    "category": "vegetables",
    "image": "https://th.bing.com/th/id/OIP.-mikoRBfcR8SxPMcYdIezwHaHa?w=119&h=104&c=7&bgcl=9f92d2&r=0&o=6&dpr=1.5&pid=13.1"
  },
  {
    "id": 2,
    "name": "Green Chilli",
    "description": "1kg",
    "price": 60,
    "category": "vegetables",
    "image": " https://th.bing.com/th/id/R.a844ff9d69e5a8f987a8360b9d27f526?rik=M7L4PmlGJiywjQ&riu=http%3a%2f%2fseed2plant.in%2fcdn%2fshop%2fproducts%2fbiggreenchilliseeds.jpg%3fv%3d1606738066&ehk=PmAZm8fxrZP8pqdF5zn76dT4oHSy0B3bFInXgI4OehI%3d&risl=&pid=ImgRaw&r=0pr=1.5&pid=SANGAM"
  },
  {
    "id": 3,
    "name": "Milk",
    "description": "450ml",
    "price": 36,
    "category": "dairy",
    "image": " https://www.bing.com/th/id/OIP.VWW1dsvpxAuCNRSvVerRWwHaHa?w=174&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    "id": 4,
    "name": "Curd",
    "description": "170ml",
    "price": 10,
    "category": "dairy",
    "image": " https://dayli.in/cdn/shop/files/12_e6032000-0c92-4c86-bb1d-a28656af2235.png?v=1699873114&width=1080"
  },
  {
    "id": 5,
    "name": "Good Day",
    "description": "1 biscuit pack",
    "price": 10,
    "category": "snacks",
    "image": " https://m.media-amazon.com/images/I/91g3Q7R0m1L._SX679_.jpg "
  },
  {
    "id": 6,
    "name": "Edle (Idli)",
    "description": "1 plate (3-4 idlis)",
    "price": 20,
    "category": "ready-to-eat",
    "image": "https://th.bing.com/th/id/R.2eb760074dfb276bedd63ba15868a53c?rik=kEQESCz7zfjBxw&riu=http%3a%2f%2fwww.alchemybuzz.com%2fcontent%2f2022%2f01%2fthe-humble-idli.jpg&ehk=nDijTxXRDa1zi5m6%2boP5yEbdvQVT6gPDMdLXeS4iu1c%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    "id": 7,
    "name": "Drumstick",
    "description": "1 stick",
    "price": 15,
    "category": "vegetables",
    "image": " https://syncwithnature.in/wp-content/uploads/2020/07/drumstick.png "
  },
  {
    "id": 8,
    "name": "Coriander",
    "description": "1 bunch (~100g)",
    "price": 5,
    "category": "vegetables",
    "image": "https://img.freepik.com/free-photo/bunch-coriander-leaves-isolated-white-surface_34152-2280.jpg?w=2000"
  },
  {
    "id": 9,
    "name": "Surfxcell (Surf Excel detergent)",
    "description": "1 pack",
    "price": 35,
    "category": "household",
    "image": " https://m.media-amazon.com/images/I/51DbzXMb4jL._AC_UL480_FMwebp_QL65_.jpg "
  },
  {
    "id": 10,
    "name": "E nadu News Pepper",
    "description": "single copy sale",
    "price": 8,
    "category": "Newspapers",
    "image": "https://th.bing.com/th/id/OIP.GY17HXxGVpdNQzxvt5gXiAAAAA?rs=1&pid=ImgDetMain"
  },
  {
    "id": 11,
    "name": "Sleep well (mosquito repellent)",
    "description": "per piece",
    "price": 15,
    "category": "household",
    "image": " https://5.imimg.com/data5/SELLER/Default/2020/9/GH/LA/WW/54315936/new-product-250x250.jpeg "
  },
  {
    "id": 12,
    "name": "Jeera",
    "description": "1kg",
    "price": 700,
    "category": "spices",
    "image": "https://cdn.shopify.com/s/files/1/1462/9838/products/com1807851585567Poshtik_Cumin_eee0a743-a579-4da9-834b-f5ef2c2c322c_580x @2x.png?v=1526694532"
  },
  {
    "id": 13,
    "name": "Onion",
    "description": "1kg",
    "price": 25,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Yellow_onions_with_white_background.jpg/1200px-Yellow_onions_with_white_background.jpg "
  },
  {
    "id": 14,
    "name": "Potato",
    "description": "1kg",
    "price": 20,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Potato_roseval.jpg/1200px-Potato_roseval.jpg "
  },
  {
    "id": 15,
    "name": "Carrot",
    "description": "1kg",
    "price": 40,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Whole_carrots_and_carrot_sticks.jpg/1200px-Whole_carrots_and_carrot_sticks.jpg "
  },
  {
    "id": 16,
    "name": "Cabbage",
    "description": "1 piece",
    "price": 25,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Cabbage_and_cross_section_on_white.jpg/1200px-Cabbage_and_cross_section_on_white.jpg "
  },
  {
    "id": 17,
    "name": "Capsicum",
    "description": "1kg",
    "price": 80,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Red_yellow_green_peppers.jpg/1200px-Red_yellow_green_peppers.jpg "
  },
  {
    "id": 18,
    "name": "Cauliflower",
    "description": "1 piece",
    "price": 30,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cauliflower_Bundle.jpg/1200px-Cauliflower_Bundle.jpg "
  },
  {
    "id": 19,
    "name": "Brinjal",
    "description": "1kg",
    "price": 35,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Eggplant_-_whole_and_sliced.jpg/1200px-Eggplant_-_whole_and_sliced.jpg "
  },
  {
    "id": 20,
    "name": "Cucumber",
    "description": "1 piece",
    "price": 15,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Cucurbita_pepo_var._sativus_%28fruit%29.jpg/1200px-Cucurbita_pepo_var._sativus_%28fruit%29.jpg "
  },
  {
    "id": 21,
    "name": "Bitter Gourd",
    "description": "1kg",
    "price": 45,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Bitter_gourd_karela.jpg/1200px-Bitter_gourd_karela.jpg "
  },
  {
    "id": 22,
    "name": "Radish",
    "description": "1kg",
    "price": 25,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Daikon_radish.jpg/1200px-Daikon_radish.jpg "
  },
  {
    "id": 23,
    "name": "Beetroot",
    "description": "1kg",
    "price": 30,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Beets_bundle.jpg/1200px-Beets_bundle.jpg "
  },
  {
    "id": 24,
    "name": "French Beans",
    "description": "1kg",
    "price": 60,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/French_beans_close_up.jpg/1200px-French_beans_close_up.jpg "
  },
  {
    "id": 25,
    "name": "Garlic",
    "description": "1kg",
    "price": 100,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Garlic_bulbs_and_cloves.jpg/1200px-Garlic_bulbs_and_cloves.jpg "
  },
  {
    "id": 26,
    "name": "Ginger",
    "description": "1kg",
    "price": 120,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Ginger_root_at_market.jpg/1200px-Ginger_root_at_market.jpg "
  },
  {
    "id": 27,
    "name": "Spinach",
    "description": "1 bunch",
    "price": 15,
    "category": "vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Spinach_on_display_in_a_supermarket.jpg/1200px-Spinach_on_display_in_a_supermarket.jpg "
  },
  {
    "id": 28,
    "name": "Banana",
    "description": "1 dozen",
    "price": 40,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Banana_and_cross_section.jpg/1200px-Banana_and_cross_section.jpg "
  },
  {
    "id": 29,
    "name": "Apple",
    "description": "1kg",
    "price": 120,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/1200px-Red_Apple.jpg "
  },
  {
    "id": 30,
    "name": "Orange",
    "description": "1kg",
    "price": 80,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Oranges.jpg/1200px-Oranges.jpg "
  },
  {
    "id": 31,
    "name": "Mango",
    "description": "1kg",
    "price": 60,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mangifera_indica_-_mango_fruits.jpg/1200px-Mangifera_indica_-_mango_fruits.jpg "
  },
  {
    "id": 32,
    "name": "Guava",
    "description": "1kg",
    "price": 50,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Guava_and_cross_section.jpg/1200px-Guava_and_cross_section.jpg "
  },
  {
    "id": 33,
    "name": "Grapes",
    "description": "1kg",
    "price": 90,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Grapes_on_white_background.jpg/1200px-Grapes_on_white_background.jpg "
  },
  {
    "id": 34,
    "name": "Watermelon",
    "description": "1 piece",
    "price": 40,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Watermelon_1.jpg/1200px-Watermelon_1.jpg "
  },
  {
    "id": 35,
    "name": "Papaya",
    "description": "1kg",
    "price": 45,
    "category": "fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Papaya_opened.jpg/1200px-Papaya_opened.jpg "
  },
  {
    "id": 36,
    "name": "Coconut Water",
    "description": "1 packet",
    "price": 20,
    "category": "beverages",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Coconut_water.jpg/1200px-Coconut_water.jpg "
  },
  {
    "id": 37,
    "name": "Tea Bags",
    "description": "1 pack",
    "price": 50,
    "category": "beverages",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Teabag_in_teacup.jpg/1200px-Teabag_in_teacup.jpg "
  },
  {
    "id": 38,
    "name": "Coffee Powder",
    "description": "1kg",
    "price": 200,
    "category": "beverages",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Coffee_powder.jpg/1200px-Coffee_powder.jpg "
  },
  {
    "id": 39,
    "name": "Salt",
    "description": "1kg",
    "price": 20,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Salt_crystals.jpg/1200px-Salt_crystals.jpg "
  },
  {
    "id": 40,
    "name": "Sugar",
    "description": "1kg",
    "price": 45,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sugar_refined.jpg/1200px-Sugar_refined.jpg "
  },
  {
    "id": 41,
    "name": "Turmeric",
    "description": "1kg",
    "price": 150,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Turmeric_powder.jpg/1200px-Turmeric_powder.jpg "
  },
  {
    "id": 42,
    "name": "Mustard Seeds",
    "description": "500g",
    "price": 60,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Black_mustard_seeds.jpg/1200px-Black_mustard_seeds.jpg "
  },
  {
    "id": 43,
    "name": "Pepper",
    "description": "1kg",
    "price": 500,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Black_pepper_seeds.jpg/1200px-Black_pepper_seeds.jpg "
  },
  {
    "id": 44,
    "name": "Chili Powder",
    "description": "500g",
    "price": 80,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Chili_powder.jpg/1200px-Chili_powder.jpg "
  },
  {
    "id": 45,
    "name": "Garam Masala",
    "description": "500g",
    "price": 100,
    "category": "spices",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Garam_masala_spice_mix.jpg/1200px-Garam_masala_spice_mix.jpg "
  },
  {
    "id": 46,
    "name": "Oil",
    "description": "1 liter",
    "price": 150,
    "category": "cooking essentials",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Olive_oil_in_jug.jpg/1200px-Olive_oil_in_jug.jpg "
  },
  {
    "id": 47,
    "name": "Ghee",
    "description": "1kg",
    "price": 500,
    "category": "cooking essentials",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Ghee_in_pot.jpg/1200px-Ghee_in_pot.jpg "
  },
  {
    "id": 48,
    "name": "Wheat Flour",
    "description": "1kg",
    "price": 40,
    "category": "cooking essentials",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Wheat_flour.jpg/1200px-Wheat_flour.jpg "
  },
  {
    "id": 49,
    "name": "Rice",
    "description": "1kg",
    "price": 60,
    "category": "cooking essentials",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/White_rice.jpg/1200px-White_rice.jpg "
  },
  {
    "id": 50,
    "name": "Urad Dal",
    "description": "1kg",
    "price": 100,
    "category": "cooking essentials",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Urad_dal.jpg/1200px-Urad_dal.jpg "
  } 
];

// Cart and user data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderId = 1;
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// API endpoints
const API_URL = '/api';

// Menu items will be fetched from server
//let menuItems = [];

// Get menu items from server
async function fetchMenuItems() {
    try {
        // Use the embedded menuItems array directly
        displayMenuItems();
    } catch (error) {
        console.error('Error loading products:', error);
        showToast('Error loading products. Please try again later.', 'danger');
    }
}

// Initialize the page
async function initializePage() {
    // Try to load products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        try {
            menuItems = JSON.parse(savedProducts);
        } catch (error) {
            console.error('Error loading products from localStorage:', error);
        }
    }
    
    displayMenuItems();
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
    const adminMenuItems = document.querySelectorAll('.admin-only');
    
    if (currentUser) {
        userNameElement.textContent = currentUser.fullName;
        signInLink.style.display = 'none';
        signUpLink.style.display = 'none';
        dropdownDivider.style.display = 'block';
        profileLink.style.display = 'block';
        signOutLink.style.display = 'block';
        
        // Show admin menu items if user is admin
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn') === 'true';
        adminMenuItems.forEach(item => {
            item.style.display = isAdmin ? 'block' : 'none';
        });
    } else {
        userNameElement.textContent = 'Sign In';
        signInLink.style.display = 'block';
        signUpLink.style.display = 'block';
        dropdownDivider.style.display = 'none';
        profileLink.style.display = 'none';
        signOutLink.style.display = 'none';
        
        // Hide admin menu items for non-logged in users
        adminMenuItems.forEach(item => {
            item.style.display = 'none';
        });
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

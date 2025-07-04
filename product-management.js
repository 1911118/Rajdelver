// Product data (embedded directly in the script)
let products = [
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

// API endpoints
const API_URL = '/api';

// DOM Elements
const productForm = document.getElementById('productForm');
const productsList = document.getElementById('productsList');
const imagePreview = document.getElementById('imagePreview');
const productImageInput = document.getElementById('productImage');

// Load products from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    // Try to load products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        try {
            products = JSON.parse(savedProducts);
        } catch (error) {
            console.error('Error loading products from localStorage:', error);
        }
    }
    
    loadProducts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Product form submission
    productForm.addEventListener('submit', handleProductSubmit);

    // Image preview
    productImageInput.addEventListener('input', () => {
        const imageUrl = productImageInput.value;
        if (imageUrl) {
            imagePreview.src = imageUrl;
            imagePreview.classList.remove('d-none');
        } else {
            imagePreview.classList.add('d-none');
        }
    });
}

// Load all products
async function loadProducts() {
    try {
        // Use the embedded products array directly
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        showToast('Error loading products. Please try again.', 'danger');
    }
}

// Display products in the list
function displayProducts(products) {
    productsList.innerHTML = products.map(product => `
        <div class="product-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-width: 100px;">
                </div>
                <div class="col-md-7">
                    <h5>${product.name}</h5>
                    <p class="mb-1">${product.description}</p>
                    <p class="mb-1"><strong>Price:</strong> ₹${product.price}</p>
                    <p class="mb-1"><strong>Category:</strong> ${product.category}</p>
                </div>
                <div class="col-md-3 text-end">
                    <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle product form submission
async function handleProductSubmit(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value
    };

    try {
        if (productId) {
            // Update existing product
            await updateProduct(productId, productData);
            showToast('Product updated successfully!', 'success');
        } else {
            // Add new product
            await addProduct(productData);
            showToast('Product added successfully!', 'success');
        }

        resetForm();
        loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showToast('Error saving product. Please try again.', 'danger');
    }
}

// Add new product
async function addProduct(productData) {
    try {
        // Generate a new ID
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        // Create new product
        const newProduct = {
            id: newId,
            ...productData
        };
        
        // Add to products array
        products.push(newProduct);
        
        // Save to localStorage for persistence
        localStorage.setItem('products', JSON.stringify(products));
        
        return newProduct;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
    }
}

// Update existing product
async function updateProduct(productId, productData) {
    try {
        // Find product index
        const index = products.findIndex(p => p.id === productId);
        
        if (index === -1) {
            throw new Error('Product not found');
        }
        
        // Update product
        products[index] = {
            ...products[index],
            ...productData,
            id: productId // Ensure ID doesn't change
        };
        
        // Save to localStorage for persistence
        localStorage.setItem('products', JSON.stringify(products));
        
        return products[index];
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
}

// Delete product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        // Filter out the product
        const updatedProducts = products.filter(p => p.id !== productId);
        
        // Update products array
        products.length = 0;
        products.push(...updatedProducts);
        
        // Save to localStorage for persistence
        localStorage.setItem('products', JSON.stringify(products));
        
        showToast('Product deleted successfully!', 'success');
        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Error deleting product. Please try again.', 'danger');
    }
}

// Edit product
async function editProduct(productId) {
    try {
        // Find product
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        // Fill form with product data
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productImage').value = product.image;
        
        // Show image preview
        imagePreview.src = product.image;
        imagePreview.classList.remove('d-none');

        // Scroll to form
        document.querySelector('.product-form').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading product:', error);
        showToast('Error loading product. Please try again.', 'danger');
    }
}

// Reset form
function resetForm() {
    productForm.reset();
    document.getElementById('productId').value = '';
    imagePreview.classList.add('d-none');
}

// Show toast notification
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

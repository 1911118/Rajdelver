// API endpoints
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const productForm = document.getElementById('productForm');
const productsList = document.getElementById('productsList');
const imagePreview = document.getElementById('imagePreview');
const productImageInput = document.getElementById('productImage');

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
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
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
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

    return response.json();
}

// Update existing product
async function updateProduct(productId, productData) {
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

    return response.json();
}

// Delete product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

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
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const product = await response.json();
        
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
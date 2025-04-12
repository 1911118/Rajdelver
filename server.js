const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Data file path
const productsFile = path.join(__dirname, 'data', 'products.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
}

// Initialize products file if it doesn't exist
async function initializeProductsFile() {
    try {
        await fs.access(productsFile);
    } catch {
        const initialProducts = [
            {
                id: 1,
                name: "Fresh Tomatoes",
                description: "Ripe, juicy tomatoes perfect for salads and cooking",
                price: 40,
                image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "vegetables"
            },
            {
                id: 2,
                name: "Milk",
                description: "Fresh, pasteurized milk",
                price: 60,
                image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "dairy"
            },
            {
                id: 3,
                name: "Chicken Breast",
                description: "Fresh, boneless chicken breast",
                price: 250,
                image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "meat"
            },
            {
                id: 4,
                name: "Toor Dal",
                description: "Premium quality toor dal",
                price: 120,
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "pulses"
            },
            {
                id: 5,
                name: "Basmati Rice",
                description: "Premium long-grain basmati rice",
                price: 180,
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "grains"
            },
            {
                id: 6,
                name: "Turmeric Powder",
                description: "Pure turmeric powder",
                price: 45,
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "spices"
            },
            {
                id: 7,
                name: "Potato Chips",
                description: "Crispy potato chips",
                price: 30,
                image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "snacks"
            },
            {
                id: 8,
                name: "Olive Oil",
                description: "Extra virgin olive oil",
                price: 350,
                image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "oils"
            },
            {
                id: 9,
                name: "Dish Soap",
                description: "Effective dish cleaning soap",
                price: 75,
                image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "cleaning"
            },
            {
                id: 10,
                name: "Incense Sticks",
                description: "Aromatic incense sticks for puja",
                price: 50,
                image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "puja"
            },
            {
                id: 11,
                name: "Daily Newspaper",
                description: "Latest daily newspaper",
                price: 10,
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "newspapers"
            },
            {
                id: 12,
                name: "Wooden Chair",
                description: "Comfortable wooden chair",
                price: 1500,
                image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "furniture"
            },
            {
                id: 13,
                name: "Almonds",
                description: "Premium quality almonds",
                price: 200,
                image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "dryfruits"
            }
        ];
        await fs.writeFile(productsFile, JSON.stringify(initialProducts, null, 2));
    }
}

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile(productsFile, 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error reading products' });
    }
});

// Add new product
app.post('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile(productsFile, 'utf8');
        const products = JSON.parse(data);
        
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...req.body
        };
        
        products.push(newProduct);
        await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const data = await fs.readFile(productsFile, 'utf8');
        let products = JSON.parse(data);
        
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        products[productIndex] = {
            ...products[productIndex],
            ...req.body,
            id: productId
        };
        
        await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
        
        res.json(products[productIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const data = await fs.readFile(productsFile, 'utf8');
        let products = JSON.parse(data);
        
        const productId = parseInt(req.params.id);
        products = products.filter(p => p.id !== productId);
        
        await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Initialize server
async function initializeServer() {
    await ensureDataDir();
    await initializeProductsFile();
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

initializeServer(); 
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES: PRODUCTS ---

// Listar todos
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear uno
app.post('/api/products', async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar uno
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;
    try {
        const result = await db.query(
            'UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category=$5 WHERE id=$6 RETURNING *',
            [name, description, price, stock, category, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Borrar uno
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: VENDORS ---

// Listar todos
app.get('/api/vendors', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM vendors ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear uno
app.post('/api/vendors', async (req, res) => {
    const { name, contact_name, email, phone, category } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO vendors (name, contact_name, email, phone, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, contact_name, email, phone, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar uno
app.put('/api/vendors/:id', async (req, res) => {
    const { id } = req.params;
    const { name, contact_name, email, phone, category } = req.body;
    try {
        const result = await db.query(
            'UPDATE vendors SET name=$1, contact_name=$2, email=$3, phone=$4, category=$5 WHERE id=$6 RETURNING *',
            [name, contact_name, email, phone, category, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Borrar uno
app.delete('/api/vendors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM vendors WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

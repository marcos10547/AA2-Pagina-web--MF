-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin'
);

-- Tabla de Proveedores
CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    category VARCHAR(100)
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(100),
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE SET NULL
);

-- Datos iniciales de prueba
INSERT INTO vendors (name, contact_name, email, phone, category) 
VALUES 
('Distribuidora Láctea S.A.', 'Juan Pérez', 'juan@lactea.com', '600111222', 'Lácteos'),
('Panificadora Central', 'Marta García', 'marta@pancentral.com', '600333444', 'Panadería')
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (name, description, price, stock, category)
VALUES 
('Café Espresso', 'Café intenso de tueste natural', 1.50, 100, 'Cafés'),
('Croissant Recreo', 'Mantequilla pura y masa hojaldrada', 2.20, 30, 'Bollería'),
('Tarta de Queso', 'Receta casera estilo New York', 4.50, 12, 'Postres')
ON CONFLICT DO NOTHING;

-- Usuario Admin por defecto (Password: admin123)
INSERT INTO users (name, email, password, role)
VALUES ('Administrador', 'admin@cafeteria.com', '$2a$10$Xm27IubV8bVjB2x0A/7SreY7b9P9F7J.N.L6Y3vPzX8f/9xO4u6ay', 'admin')
ON CONFLICT (email) DO NOTHING;

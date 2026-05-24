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
VALUES ('Administrador', 'admin@cafeteria.com', '$2b$10$UJvNbMBrcaTumvwiJw6Xp.LXXI3I2yRlqbKNqEdI2XHWtREYppEmi', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    date VARCHAR(20) NOT NULL,
    time VARCHAR(10) NOT NULL,
    guests INTEGER NOT NULL DEFAULT 2,
    status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    notes TEXT
);

-- Datos iniciales de reservas
INSERT INTO reservations (customer_name, phone, date, time, guests, status, notes)
VALUES
('María López', '612345678', '2026-05-05', '13:00', 4, 'pendiente', 'Mesa junto a la ventana'),
('Carlos Ruiz', '698765432', '2026-05-05', '14:30', 2, 'confirmada', ''),
('Ana Martínez', '611223344', '2026-05-06', '20:00', 6, 'pendiente', 'Cumpleaños, traer tarta'),
('Pedro Sánchez', '655667788', '2026-05-04', '12:00', 3, 'cancelada', 'Cancelado por el cliente')
ON CONFLICT DO NOTHING;

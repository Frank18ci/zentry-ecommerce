DROP DATABASE db_zentry_eccomerce;
CREATE DATABASE IF NOT EXISTS db_zentry_eccomerce;
USE db_zentry_eccomerce;

-- Tabla de roles
CREATE TABLE roles (
    id_rol BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Direcciones
CREATE TABLE direcciones (
    id_direccion BIGINT AUTO_INCREMENT PRIMARY KEY,
    direccion TEXT NOT NULL,
    ciudad VARCHAR(100),
    provincia VARCHAR(100),
    codigo_postal VARCHAR(10),
    pais VARCHAR(100)
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_rol BIGINT NOT NULL,
    id_direccion BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_direccion) REFERENCES direcciones(id_direccion)
);

-- Categorías
CREATE TABLE categorias (
    id_categoria BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Subcategorías
CREATE TABLE subcategorias (
    id_subcategoria BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_categoria BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Productos
CREATE TABLE productos (
    id_producto BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_subcategoria BIGINT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria)
);

-- Tallas
CREATE TABLE tallas (
    id_talla BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

-- Colores
CREATE TABLE colores (
    id_color BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    codigo_hex VARCHAR(7)
);

-- Variantes de productos
CREATE TABLE producto_variantes (
    id_variante BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_producto BIGINT NOT NULL,
    id_talla BIGINT NOT NULL,
    id_color BIGINT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_talla) REFERENCES tallas(id_talla),
    FOREIGN KEY (id_color) REFERENCES colores(id_color),
    UNIQUE (id_producto, id_talla, id_color)
);

-- Imágenes de productos
CREATE TABLE imagenes_productos (
    id_imagen BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_producto BIGINT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    es_principal BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Carritos (relación 1:1 con usuarios)
CREATE TABLE carritos (
    id_carrito BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL UNIQUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'procesado') DEFAULT 'activo',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Items del carrito
CREATE TABLE carrito_items (
    id_item BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_carrito BIGINT NOT NULL,
    id_variante BIGINT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    FOREIGN KEY (id_carrito) REFERENCES carritos(id_carrito),
    FOREIGN KEY (id_variante) REFERENCES producto_variantes(id_variante),
    UNIQUE (id_carrito, id_variante)
);

-- Órdenes
CREATE TABLE ordenes (
    id_orden BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    fecha_orden DATETIME DEFAULT CURRENT_TIMESTAMP,
    direccion_envio TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Ítems de la orden
CREATE TABLE orden_items (
    id_item BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_orden BIGINT NOT NULL,
    id_variante BIGINT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
    FOREIGN KEY (id_variante) REFERENCES producto_variantes(id_variante)
);

-- Pagos
CREATE TABLE pagos (
    id_pago BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_orden BIGINT NOT NULL,
    metodo_pago ENUM('tarjeta_credito', 'paypal', 'transferencia', 'contra_entrega') NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('completado', 'fallido', 'pendiente') DEFAULT 'completado',
    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden)
);

-- Comentarios de productos
CREATE TABLE comentarios_productos (
    id_comentario BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);



-- Insertando categorias

INSERT INTO categorias (nombre, descripcion) VALUES 
('Electrónica', 'Dispositivos y aparatos electrónicos'),
('Ropa', 'Prendas de vestir y accesorios'),
('Hogar', 'Artículos para el hogar y cocina');

-- Insertando subcategorias

INSERT INTO subcategorias (id_categoria, nombre, descripcion) VALUES 
(1, 'Teléfonos', 'Smartphones y teléfonos móviles'),
(1, 'Laptops', 'Computadoras portátiles'),
(2, 'Camisetas', 'Camisetas de algodón y poliéster'),
(2, 'Pantalones', 'Pantalones casuales y formales'),
(3, 'Cocina', 'Utensilios de cocina'),
(3, 'Decoración', 'Objetos decorativos para el hogar');

-- Insertando subcategorias

INSERT INTO productos (id_subcategoria, nombre, descripcion, precio, estado) VALUES 
(1, 'Xiaomi Redmi Note 11', 'Smartphone con buena relación calidad-precio', 899.99, 'activo'),
(1, 'Motorola G60', 'Smartphone gama media con gran batería', 999.90, 'activo'),
(1, 'Realme 8', 'Teléfono Android con buen rendimiento', 849.00, 'activo'),
(1, 'iPhone SE 2022', 'Modelo compacto de Apple', 1799.99, 'activo'),
(1, 'Huawei P40 Lite', 'Smartphone potente sin servicios Google', 1299.00, 'inactivo'),
(2, 'Dell XPS 13', 'Laptop compacta y potente para profesionales', 6499.99, 'activo'),
(2, 'HP Pavilion 15', 'Laptop ideal para uso diario', 3199.00, 'activo'),
(2, 'Lenovo IdeaPad 3', 'Laptop económica y confiable', 2499.00, 'activo'),
(2, 'Acer Aspire 5', 'Laptop con procesador Intel i5', 2999.99, 'inactivo'),
(2, 'Asus ZenBook 14', 'Ultrabook liviano con gran batería', 4299.90, 'activo'),
(3, 'Camiseta blanca', 'Camiseta básica de algodón talla L', 44.90, 'activo'),
(3, 'Camiseta azul', 'Camiseta color azul con estampado', 54.90, 'activo'),
(3, 'Camiseta deportiva', 'Diseñada para entrenamiento', 65.00, 'activo'),
(3, 'Camiseta manga larga', 'Ideal para clima frío', 59.99, 'inactivo'),
(3, 'Camiseta cuello V', 'Camiseta ajustada moderna', 49.99, 'activo'),
(4, 'Pantalón jean', 'Jean clásico azul', 99.99, 'activo'),
(4, 'Pantalón jogger', 'Pantalón cómodo para deporte', 89.00, 'activo'),
(4, 'Pantalón corto', 'Short casual de verano', 69.90, 'activo'),
(4, 'Pantalón cargo', 'Diseño urbano con bolsillos', 109.90, 'inactivo'),
(4, 'Pantalón formal', 'Ideal para eventos o trabajo', 129.99, 'activo'),
(5, 'Sartén antiadherente', 'Sartén de 24 cm con recubrimiento cerámico', 45.50, 'activo'),
(5, 'Juego de cuchillos', 'Set de cuchillos de cocina profesionales', 89.90, 'activo'),
(5, 'Tabla de picar', 'Tabla de bambú para cocina', 29.99, 'activo'),
(5, 'Tetera eléctrica', 'Tetera de acero con apagado automático', 99.99, 'activo'),
(5, 'Exprimidor manual', 'Para jugo de naranja y limón', 39.90, 'inactivo'),
(6, 'Lámpara de mesa', 'Lámpara LED para escritorio', 75.00, 'activo'),
(6, 'Alfombra decorativa', 'Alfombra moderna para sala o dormitorio', 199.00, 'activo'),
(6, 'Espejo redondo', 'Espejo decorativo de pared', 149.50, 'activo'),
(6, 'Florero de cerámica', 'Florero artístico para centros de mesa', 89.90, 'activo'),
(6, 'Portarretratos doble', 'Marco decorativo para dos fotos', 35.00, 'inactivo'),
(1, 'Nokia G21', 'Smartphone resistente con Android 12', 1099.00, 'activo'),
(1, 'Sony Xperia 10 III', 'Smartphone con pantalla OLED', 2399.00, 'activo'),
(2, 'MSI GF63', 'Laptop gamer con GPU dedicada', 5699.00, 'activo'),
(2, 'Apple MacBook Pro M2', 'Laptop de alto rendimiento', 8999.99, 'activo'),
(3, 'Camiseta rayas', 'Diseño casual con rayas verticales', 55.00, 'activo'),
(4, 'Pantalón deportivo', 'Para entrenamiento de alto rendimiento', 74.99, 'activo'),
(5, 'Freidora de aire', 'Cocina sin aceite fácilmente', 399.99, 'activo'),
(5, 'Cafetera italiana', 'Estilo clásico para café espresso', 110.00, 'activo'),
(6, 'Reloj de pared', 'Moderno y silencioso', 99.90, 'activo'),
(6, 'Cortina para sala', 'Tela decorativa de 2m', 129.00, 'activo'),
(6, 'Velas aromáticas', 'Pack de 3 velas de vainilla', 69.90, 'activo'),
(6, 'Macetero colgante', 'Ideal para plantas pequeñas', 49.90, 'activo'),
(6, 'Organizador de pared', 'Con ganchos para llaves y cartas', 59.00, 'activo');


-- Insertando roles 

INSERT INTO roles (nombre) VALUES 
('cliente'),
('admin');
-- Insertando direcciones

INSERT INTO direcciones (direccion, ciudad, provincia, codigo_postal, pais) VALUES
('Av. Arequipa 1234', 'Lima', 'Lima', '15046', 'Perú'),
('Jr. Ayacucho 456', 'Cusco', 'Cusco', '08002', 'Perú'),
('Av. Bolognesi 789', 'Arequipa', 'Arequipa', '04001', 'Perú'),
('Calle Bolívar 321', 'Trujillo', 'La Libertad', '13001', 'Perú'),
('Av. Grau 654', 'Piura', 'Piura', '20001', 'Perú'),
('Calle Tarapacá 987', 'Iquitos', 'Loreto', '16001', 'Perú'),
('Av. Alfonso Ugarte 111', 'Chiclayo', 'Lambayeque', '14001', 'Perú'),
('Jr. Junín 222', 'Puno', 'Puno', '21001', 'Perú'),
('Av. Universitaria 333', 'Huancayo', 'Junín', '12001', 'Perú'),
('Calle Los Olivos 444', 'Tacna', 'Tacna', '23001', 'Perú');

--

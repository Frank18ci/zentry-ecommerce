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
-- Usuarios (sin id_rol, ahora N:N)
CREATE TABLE usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_direccion BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_direccion) REFERENCES direcciones(id_direccion)
);

-- Tabla intermedia para relación many-to-many usuario <-> rol
CREATE TABLE usuario_roles (
    id_usuario BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);


-- Estados para productos
CREATE TABLE estados_productos (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
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
    id_estado BIGINT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria),
    FOREIGN KEY (id_estado) REFERENCES estados_productos(id_estado)
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

-- Estados de carrito
CREATE TABLE estados_carritos (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

-- Carritos (1:1 con usuarios)
CREATE TABLE carritos (
    id_carrito BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL UNIQUE,
    id_estado BIGINT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados_carritos(id_estado)
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

-- Estados de órdenes
CREATE TABLE estados_ordenes (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

-- Órdenes
CREATE TABLE ordenes (
    id_orden BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    id_estado BIGINT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_orden DATETIME DEFAULT CURRENT_TIMESTAMP,
    direccion_envio TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados_ordenes(id_estado)
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

-- Métodos de pago
CREATE TABLE metodos_pago (
    id_metodo BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Estados de pago
CREATE TABLE estados_pago (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

-- Pagos
CREATE TABLE pagos (
    id_pago BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_orden BIGINT NOT NULL,
    id_metodo BIGINT NOT NULL,
    id_estado BIGINT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo),
    FOREIGN KEY (id_estado) REFERENCES estados_pago(id_estado)
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

INSERT INTO roles (nombre) VALUES 
('cliente'), ('admin'), ('vendedor'), ('soporte'), ('superadmin'),
('marketing'), ('finanzas'), ('logistica'), ('analista'), ('editor'),
('moderador'), ('revisor'), ('gerente'), ('comprador'), ('tester'),
('invitado'), ('desarrollador'), ('auditor'), ('recursos humanos'), ('asistente');

INSERT INTO direcciones (direccion, ciudad, provincia, codigo_postal, pais) VALUES 
('Av. Siempre Viva 742', 'Springfield', 'Massachusetts', '01101', 'USA'),
('Calle Falsa 123', 'Madrid', 'Madrid', '28080', 'España'),
('Rua das Flores 45', 'Lisboa', 'Lisboa', '1000-001', 'Portugal'),
('Main Street 101', 'New York', 'NY', '10001', 'USA'),
('Calle 8 #45', 'Bogotá', 'Cundinamarca', '110111', 'Colombia'),
('Av. Paulista 1500', 'São Paulo', 'SP', '01310-200', 'Brasil'),
('Boulevard Haussmann 20', 'París', 'Île-de-France', '75009', 'Francia'),
('Shibuya 1-2-3', 'Tokio', 'Tokio', '150-0002', 'Japón'),
('Alexanderplatz 3', 'Berlín', 'Berlín', '10178', 'Alemania'),
('Oxford Street 200', 'Londres', 'Inglaterra', 'W1D 1LT', 'Reino Unido'),
('Plaza Mayor 1', 'Salamanca', 'Castilla y León', '37001', 'España'),
('Las Heras 1234', 'Buenos Aires', 'CABA', 'C1127', 'Argentina'),
('Vía Roma 24', 'Roma', 'Lazio', '00100', 'Italia'),
('Rue de Rivoli 5', 'París', 'Île-de-France', '75001', 'Francia'),
('Queen St 88', 'Toronto', 'Ontario', 'M5H 2N2', 'Canadá'),
('George St 101', 'Sídney', 'NSW', '2000', 'Australia'),
('Karl Johans gate 10', 'Oslo', 'Oslo', '0154', 'Noruega'),
('Norr Mälarstrand 15', 'Estocolmo', 'Estocolmo', '11220', 'Suecia'),
('Mahatma Gandhi Rd', 'Mumbai', 'Maharashtra', '400001', 'India'),
('Av. Reforma 350', 'Ciudad de México', 'CDMX', '06600', 'México');

INSERT INTO usuarios (id_direccion, nombre, apellido, correo_electronico, contraseña, telefono, direccion) VALUES 
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '12345678', '+34123456789', 'Av. Siempre Viva 742'),
(2, 'Ana', 'López', 'ana.lopez@example.com', 'clave123', '+34987654321', 'Calle Falsa 123'),
(3, 'Carlos', 'Santos', 'carlos.santos@example.com', 'passw0rd', '+351912345678', 'Rua das Flores 45'),
(4, 'Emily', 'Johnson', 'emily.johnson@example.com', 'securepwd', '+12125551234', 'Main Street 101'),
(5, 'Maria', 'Gomez', 'maria.gomez@example.com', 'qwerty123', '+571234567890', 'Calle 8 #45'),
(6, 'Pedro', 'Silva', 'pedro.silva@example.com', 'silva2025', '+5511998765432', 'Av. Paulista 1500'),
(7, 'Claire', 'Dupont', 'claire.dupont@example.com', 'bonjour123', '+33123456789', 'Boulevard Haussmann 20'),
(8, 'Takeshi', 'Kobayashi', 'takeshi.k@example.com', 'nipponpass', '+819012345678', 'Shibuya 1-2-3'),
(9, 'Hans', 'Schmidt', 'hans.schmidt@example.com', 'berlin123', '+4930123456', 'Alexanderplatz 3'),
(10, 'Lucy', 'Brown', 'lucy.brown@example.com', 'londonpwd', '+442012345678', 'Oxford Street 200'),
(11, 'Diego', 'Martínez', 'diego.martinez@example.com', 'diegopass', '+34123400001', 'Plaza Mayor 1'),
(12, 'Sofia', 'Fernández', 'sofia.fernandez@example.com', 'fernandez22', '+541134567890', 'Las Heras 1234'),
(13, 'Luca', 'Rossi', 'luca.rossi@example.com', 'italiapass', '+39061234567', 'Vía Roma 24'),
(14, 'Jean', 'Martin', 'jean.martin@example.com', 'paris2024', '+33122334455', 'Rue de Rivoli 5'),
(15, 'Emma', 'Wilson', 'emma.wilson@example.com', 'canadapass', '+14161234567', 'Queen St 88'),
(16, 'Liam', 'Smith', 'liam.smith@example.com', 'aussie2025', '+61298765432', 'George St 101'),
(17, 'Erik', 'Hansen', 'erik.hansen@example.com', 'norwaypass', '+4741234567', 'Karl Johans gate 10'),
(18, 'Sara', 'Andersson', 'sara.andersson@example.com', 'swedenpass', '+46812345678', 'Norr Mälarstrand 15'),
(19, 'Arjun', 'Patel', 'arjun.patel@example.com', 'indiapass', '+912212345678', 'Mahatma Gandhi Rd'),
(20, 'Luis', 'Ramírez', 'luis.ramirez@example.com', 'mexicopass', '+525512345678', 'Av. Reforma 350');

INSERT INTO usuario_roles (id_usuario, id_rol) VALUES 
(1, 1), (2, 1), (3, 1), (4, 2), (5, 3),
(6, 2), (7, 4), (8, 1), (9, 3), (10, 1),
(11, 5), (12, 6), (13, 1), (14, 1), (15, 7),
(16, 2), (17, 8), (18, 1), (19, 1), (20, 2);

INSERT INTO estados_productos (nombre) VALUES 
('disponible'),
('agotado'),
('en oferta'),
('nuevo'),
('descontinuado'),
('preventa'),
('próximamente'),
('liquidación'),
('destacado'),
('reservado'),
('en revisión'),
('bloqueado'),
('error de stock'),
('borrador'),
('reacondicionado'),
('en devolución'),
('retirado'),
('por confirmar'),
('con defecto'),
('edición limitada');

INSERT INTO categorias (nombre, descripcion) VALUES 
('Ropa', 'Prendas de vestir para todas las edades y géneros'),
('Tecnología', 'Gadgets, dispositivos electrónicos y accesorios'),
('Hogar', 'Productos para el hogar y decoración'),
('Deportes', 'Equipamiento y ropa deportiva'),
('Belleza', 'Cosméticos y productos de cuidado personal'),
('Juguetes', 'Juguetes y juegos para niños'),
('Libros', 'Literatura y libros educativos'),
('Alimentos', 'Productos comestibles y bebidas'),
('Automóviles', 'Accesorios y herramientas para vehículos'),
('Mascotas', 'Productos para el cuidado de mascotas'),
('Salud', 'Artículos médicos y de bienestar'),
('Oficina', 'Material de oficina y útiles escolares'),
('Videojuegos', 'Juegos, consolas y accesorios'),
('Fotografía', 'Cámaras y equipos fotográficos'),
('Moda', 'Ropa y accesorios de moda'),
('Música', 'Instrumentos y discos'),
('Jardinería', 'Herramientas y productos para el jardín'),
('Electrodomésticos', 'Pequeños y grandes aparatos'),
('Bebés', 'Productos para recién nacidos y bebés'),
('Ferretería', 'Herramientas y materiales de construcción');

INSERT INTO subcategorias (id_categoria, nombre, descripcion) VALUES 
(1, 'Camisas', 'Camisas formales e informales para hombre y mujer'),
(1, 'Pantalones', 'Pantalones de vestir, jeans y más'),
(2, 'Smartphones', 'Teléfonos móviles inteligentes de distintas marcas'),
(2, 'Laptops', 'Portátiles para oficina, estudio y gaming'),
(3, 'Muebles', 'Sillas, mesas, armarios y más'),
(4, 'Calzado deportivo', 'Zapatillas y calzado para deporte'),
(5, 'Maquillaje', 'Bases, labiales, sombras, etc.'),
(6, 'Muñecos', 'Muñecos y figuras coleccionables'),
(7, 'Novelas', 'Libros de ficción y entretenimiento'),
(8, 'Snacks', 'Galletas, papas, barras energéticas'),
(9, 'Herramientas', 'Llaves, taladros, destornilladores'),
(10, 'Accesorios para perros', 'Collares, correas, juguetes'),
(11, 'Vitaminas', 'Suplementos alimenticios'),
(12, 'Papelería', 'Cuadernos, hojas, carpetas'),
(13, 'Consolas', 'Consolas de videojuegos'),
(14, 'Cámaras', 'Cámaras réflex, compactas y drones'),
(15, 'Bolsos', 'Carteras, mochilas y bolsos de mano'),
(16, 'Guitarras', 'Guitarras acústicas, eléctricas y bajos'),
(17, 'Macetas', 'Macetas de barro, plástico y decorativas'),
(18, 'Licuadoras', 'Licuadoras, batidoras y exprimidores'),
(19, 'Pañales', 'Pañales desechables y ecológicos'),
(20, 'Pinturas', 'Pintura para interiores y exteriores');

INSERT INTO productos (id_subcategoria, id_estado, nombre, descripcion, precio) VALUES 
(1, 1, 'Camisa blanca formal', 'Camisa de algodón para oficina', 29.99),
(2, 3, 'Jeans Slim Fit', 'Pantalón de mezclilla azul oscuro', 39.90),
(3, 1, 'iPhone 14 Pro', 'Smartphone de alta gama, 128GB', 1099.00),
(4, 6, 'Laptop ASUS Zenbook', 'Portátil ultraligera con SSD de 512GB', 899.99),
(5, 5, 'Silla ergonómica', 'Ideal para oficina o estudio en casa', 120.00),
(6, 1, 'Zapatillas Nike Air Max', 'Comodidad y estilo para correr', 85.00),
(7, 1, 'Kit de maquillaje L’Oréal', 'Incluye base, rubor y sombras', 49.90),
(8, 4, 'Muñeco de acción Marvel', 'Figura de colección edición limitada', 25.00),
(9, 1, 'Libro: El Alquimista', 'Novela de Paulo Coelho', 15.99),
(10, 1, 'Barra de cereal natural', 'Ideal para merienda o deporte', 1.99),
(11, 1, 'Set de destornilladores', '10 piezas con mango ergonómico', 14.50),
(12, 2, 'Collar de cuero para perro', 'Tamaño mediano, resistente al agua', 12.00),
(13, 1, 'Multivitamínico Centrum', 'Complejo vitamínico completo', 19.99),
(14, 1, 'Cuaderno de anillas', '100 hojas rayadas, tamaño A4', 2.99),
(15, 1, 'Nintendo Switch', 'Consola híbrida para juegos', 299.00),
(16, 1, 'Cámara Canon EOS', 'Cámara réflex digital para principiantes', 450.00),
(17, 1, 'Bolso de cuero', 'Modelo cruzado color marrón', 69.90),
(18, 1, 'Guitarra eléctrica Fender', 'Incluye funda y correa', 320.00),
(19, 1, 'Maceta de cerámica', 'Decorada a mano, 25cm', 18.50),
(20, 1, 'Licuadora Oster 10v', 'Vaso de vidrio y motor potente', 75.00);

INSERT INTO tallas (nombre) VALUES 
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');

INSERT INTO colores (nombre, codigo_hex) VALUES 
('Negro', '#000000'),
('Blanco', '#FFFFFF'),
('Rojo', '#FF0000'),
('Azul', '#0000FF'),
('Verde', '#008000'),
('Gris', '#808080');

INSERT INTO producto_variantes (id_producto, id_talla, id_color, stock) VALUES
(1, 3, 1, 10),  
(1, 4, 2, 5),   
(2, 3, 3, 8),   
(2, 4, 6, 12),  
(3, 5, 2, 7),   
(3, 5, 4, 6),   
(4, 4, 5, 9),   
(5, 2, 3, 14),  
(5, 3, 1, 11),  
(6, 2, 4, 4);   

INSERT INTO imagenes_productos (id_producto, url_imagen, es_principal) VALUES
(1, 'https://cdn.zentry.com/products/1a.jpg', TRUE),
(1, 'https://cdn.zentry.com/products/1b.jpg', FALSE),
(2, 'https://cdn.zentry.com/products/2a.jpg', TRUE),
(3, 'https://cdn.zentry.com/products/3a.jpg', TRUE),
(4, 'https://cdn.zentry.com/products/4a.jpg', TRUE),
(5, 'https://cdn.zentry.com/products/5a.jpg', TRUE),
(6, 'https://cdn.zentry.com/products/6a.jpg', TRUE);

INSERT INTO estados_carritos (nombre) VALUES 
('activo'),
('procesado');

INSERT INTO carritos (id_usuario, id_estado) VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 1),
(5, 2);

INSERT INTO carrito_items (id_carrito, id_variante, cantidad) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 4, 3),
(3, 3, 1),
(4, 5, 2),
(4, 6, 1),
(5, 7, 1);

INSERT INTO estados_ordenes (nombre) VALUES 
('pendiente'),
('pagado'),
('enviado'),
('entregado'),
('cancelado');

INSERT INTO ordenes (id_usuario, id_estado, total, direccion_envio) VALUES 
(1, 2, 199.98, 'Calle Luna 123, Lima, Perú'),
(2, 3, 89.90, 'Av. Sol 456, Arequipa, Perú'),
(3, 5, 59.99, 'Jr. Mar 789, Cusco, Perú'),
(4, 1, 120.00, 'Calle Río 321, Trujillo, Perú'),
(5, 4, 45.50, 'Av. Bosque 222, Chiclayo, Perú');

INSERT INTO orden_items (id_orden, id_variante, cantidad, precio_unitario) VALUES
(1, 1, 2, 49.99),
(1, 2, 1, 99.99),
(2, 4, 1, 89.90),
(3, 3, 1, 59.99),
(4, 5, 2, 60.00),
(5, 6, 1, 45.50);

INSERT INTO metodos_pago (nombre) VALUES 
('tarjeta_credito'),
('paypal'),
('transferencia'),
('contra_entrega');

INSERT INTO estados_pago (nombre) VALUES 
('completado'),
('fallido'),
('pendiente');

INSERT INTO pagos (id_orden, id_metodo, id_estado, monto) VALUES 
(1, 1, 1, 199.98),
(2, 2, 1, 89.90),
(3, 3, 2, 59.99),
(4, 4, 3, 120.00),
(5, 1, 1, 45.50);

INSERT INTO comentarios_productos (id_usuario, id_producto, calificacion, comentario) VALUES 
(1, 1, 5, 'Muy buena calidad, recomendado.'),
(2, 2, 4, 'Buena prenda, aunque un poco ajustada.'),
(3, 3, 3, 'Cumple lo que promete.'),
(4, 4, 5, 'Perfecta para el clima.'),
(5, 5, 4, 'Bonito diseño, volvería a comprar.'),
(6, 6, 2, 'No me gustó el material.'),
(7, 1, 4, 'Buena compra en general.'),
(8, 2, 5, 'Excelente, talla perfecta.'),
(9, 3, 5, 'Recomendado para correr.'),
(10, 4, 3, 'Esperaba más del producto.');

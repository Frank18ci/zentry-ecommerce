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
/*CREATE TABLE estados_carritos (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);
*/
/*
-- Carritos (1:1 con usuarios)
CREATE TABLE carritos (
    id_carrito BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL UNIQUE,
    id_estado BIGINT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados_carritos(id_estado)
);
*/
/*
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
*/
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
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

INSERT INTO roles (nombre) VALUES 
('cliente'), ('admin');

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


INSERT INTO estados_productos (nombre) VALUES 
('disponible'),
('agotado'),
('en oferta'),
('nuevo'),
('descontinuado'),
('próximamente'),
('liquidación'),
('en revisión'),
('edición limitada');

INSERT INTO categorias (nombre, descripcion) VALUES 
('Ropa para Hombre', 'Prendas de vestir para hombre'),
('Ropa para Mujer', 'Prendas de vestir para mujer'),
('Ropa para Niños', 'Prendas de vestir para niños y bebés'),
('Calzado', 'Zapatillas, zapatos y botas'),
('Accesorios', 'Accesorios de vestir para todas las edades'),
('Ropa Deportiva', 'Prendas deportivas para diferentes actividades'),
('Ropa Interior', 'Ropa interior para hombre, mujer y niños'),
('Abrigos y Chaquetas', 'Prendas para climas fríos y de entretiempo'),
('Pijamas', 'Prendas para dormir y descanso');

INSERT INTO subcategorias (id_categoria, nombre, descripcion) VALUES 
-- ROPA PARA HOMBRE
(1, 'Polos', 'Polos de algodón, casuales y formales'),
(1, 'Chalecos', 'Chalecos de vestir y casuales'),
(1, 'Ropa de playa', 'Bañadores y camisas hawaianas'),
(1, 'Ropa casual', 'Prendas para uso diario'),
(1, 'Ropa formal', 'Sacos, trajes y camisas elegantes'),

-- ROPA PARA MUJER
(2, 'Tops', 'Camisetas cortas, crop tops y más'),
(2, 'Monos', 'Monos y enterizos de moda'),
(2, 'Ropa de playa', 'Bikinis, trajes de baño y pareos'),
(2, 'Ropa casual', 'Ropa cómoda y moderna para diario'),
(2, 'Ropa formal', 'Prendas para eventos y oficina'),

-- ROPA PARA NIÑOS
(3, 'Ropa Escolar', 'Uniformes, camisas y pantalones escolares'),
(3, 'Bebés (0-24m)', 'Bodies, enterizos y accesorios'),
(3, 'Niños (2-8 años)', 'Prendas para niños pequeños'),
(3, 'Pre-adolescentes (9-12 años)', 'Moda para chicos y chicas'),
(3, 'Ropa de invierno', 'Prendas abrigadoras y cómodas'),

-- CALZADO
(4, 'Tenis', 'Tenis casuales y deportivos'),
(4, 'Botines', 'Botines de moda para hombre y mujer'),
(4, 'Sandalias', 'Sandalias planas, con taco y de playa'),
(4, 'Zapatos escolares', 'Calzado para niños en edad escolar'),

-- ACCESORIOS
(5, 'Bufandas', 'Bufandas de lana y moda'),
(5, 'Lentes de sol', 'Lentes de sol de varias marcas'),
(5, 'Relojes', 'Relojes análogos y digitales'),
(5, 'Joyas', 'Collares, aretes y pulseras'),

-- ROPA DEPORTIVA
(6, 'Tops deportivos', 'Tops para gym, yoga y running'),
(6, 'Pantalones deportivos', 'Joggers, pants y shorts'),
(6, 'Ropa térmica', 'Ropa especial para climas fríos'),
(6, 'Sudaderas deportivas', 'Sudaderas con y sin gorro'),

-- ROPA INTERIOR
(7, 'Ropa interior térmica', 'Interior especial para invierno'),
(7, 'Lencería', 'Conjuntos sensuales y cómodos'),
(7, 'Ropa interior infantil', 'Interior para niños y niñas'),
(7, 'Medias y calcetines', 'Deportivos, casuales y de vestir'),

-- ABRIGOS Y CHAQUETAS
(8, 'Casacas de cuero', 'Abrigos elegantes y modernos'),
(8, 'Abrigos largos', 'Prendas largas para frío extremo'),
(8, 'Cazadoras', 'Chaquetas ligeras y modernas'),
(8, 'Impermeables', 'Ropa resistente al agua y viento'),

-- PIJAMAS
(9, 'Batas', 'Batas suaves para invierno o spa'),
(9, 'Pijamas infantiles', 'Conjuntos para niños y bebés'),
(9, 'Pijamas de dos piezas', 'Camiseta y pantalón o short'),
(9, 'Pijamas tipo mono', 'Prendas completas y divertidas');


INSERT INTO productos (id_subcategoria, id_estado, nombre, descripcion, precio) VALUES 
(1, 1, 'Camisa blanca formal', 'Camisa de algodón para oficina', 29.99),
(2, 1, 'Jeans Slim Fit', 'Pantalón de mezclilla azul oscuro', 39.90),
(6, 1, 'Zapatillas Nike Air Max', 'Comodidad y estilo para correr', 85.00),
(15, 1, 'Bolso de cuero', 'Modelo cruzado color marrón', 69.90),
(8, 1, 'Sudadera estampada', 'Sudadera con diseño urbano', 45.00),
(1, 1, 'Camisa Oxford Azul', 'Camisa formal de algodón', 32.50),
(2, 1, 'Pantalón Chino Beige', 'Pantalón casual de gabardina', 40.00),
(6, 1, 'Zapatillas Adidas Run', 'Zapatillas deportivas para correr', 79.90),
(15, 1, 'Mochila Urbana Negra', 'Mochila de tela impermeable', 55.00),
(8, 1, 'Casaca Denim Hombre', 'Chaqueta de mezclilla azul', 65.00),
(1, 1, 'Camisa Cuadros Rojo', 'Camisa casual a cuadros', 28.00),
(2, 1, 'Pantalón Jogger Negro', 'Pantalón deportivo casual', 35.90),
(6, 1, 'Zapatillas Puma Classic', 'Zapatillas clásicas urbanas', 74.50),
(15, 1, 'Bolso Cruzado Cuero', 'Bolso de cuero sintético marrón', 62.00),
(8, 1, 'Casaca Rompevientos', 'Chaqueta ligera impermeable', 50.00);


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
(1, 3, 1, 10),  -- Camisa blanca formal, M, Negro
(1, 4, 2, 5),   -- Camisa blanca formal, L, Blanco
(2, 3, 3, 8),   -- Jeans, M, Rojo
(2, 4, 6, 12),  -- Jeans, L, Gris
(3, 2, 4, 7),   -- Zapatillas, S, Azul
(3, 3, 1, 6),   -- Zapatillas, M, Negro
(4, 2, 5, 9),   -- Bolso de cuero, S, Verde
(5, 3, 4, 14),  -- Sudadera, M, Azul
(5, 4, 6, 11), -- Sudadera, L, Gris
(6, 3, 1, 10),
(6, 4, 2, 8),
(7, 2, 6, 5),
(7, 3, 3, 7),
(8, 2, 4, 6),
(8, 3, 1, 9),
(9, 2, 5, 12),
(9, 3, 6, 11),
(10, 2, 2, 13),
(10, 3, 1, 8),
(11, 3, 4, 10),
(11, 4, 2, 9),
(12, 2, 3, 7),
(12, 3, 6, 5),
(13, 3, 1, 11),
(13, 4, 5, 8),
(14, 2, 2, 14),
(14, 3, 4, 12),
(15, 3, 3, 6),
(15, 4, 5, 9);


INSERT INTO imagenes_productos (id_producto, url_imagen, es_principal) VALUES
(1, '/images/1_CamisaBlancaFormal_Negro.webp', TRUE),
(1, '/images/1_CamisaBlancaFormal_Blanco.webp', FALSE),
(2, '/images/2_JeansSlimFit_Rojo.webp', TRUE),
(2, '/images/2_JeansSlimFit_Gris.webp', FALSE),
(3, '/images/3_ZapatillasNikeAirMax_Azul.webp', TRUE),
(3, '/images/3_ZapatillasNikeAirMax_Negro.webp', FALSE),
(4, '/images/4_BolsoDeCuero_Verde.webp', TRUE),
(5, '/images/5_SudaderaEstampada_Azul.webp', TRUE),
(5, '/images/5_SudaderaEstampada_Gris.webp', FALSE),
(6, '/images/6_CamisaOxfordAzul_Negro.webp', TRUE),
(6, '/images/6_CamisaOxfordAzul_Blanco.webp', FALSE),
(7, '/images/7_PantalonChinoBeige_Gris.webp', TRUE),
(7, '/images/7_PantalonChinoBeige_Rojo.webp', FALSE),
(8, '/images/8_ZapatillasAdidasRun_Azul.webp', TRUE),
(8, '/images/8_ZapatillasAdidasRun_Negro.webp', FALSE),
(9, '/images/9_MochilaUrbanaNegra_Verde.webp', TRUE),
(9, '/images/9_MochilaUrbanaNegra_Gris.webp', FALSE),
(10, '/images/10_CasacaDenimHombre_Azul.webp', TRUE),
(10, '/images/10_CasacaDenimHombre_Negro.webp', FALSE),
(11, '/images/11_CamisaCuadrosRojo_Azul.webp', TRUE),
(11, '/images/11_CamisaCuadrosRojo_Gris.webp', FALSE),
(12, '/images/12_PantalonJoggerNegro_Rojo.webp', TRUE),
(12, '/images/12_PantalonJoggerNegro_Negro.webp', FALSE),
(13, '/images/13_ZapatillasPumaClassic_Azul.webp', TRUE),
(13, '/images/13_ZapatillasPumaClassic_Gris.webp', FALSE),
(14, '/images/14_BolsoCruzadoCuero_Marron.webp', TRUE),
(14, '/images/14_BolsoCruzadoCuero_Negro.webp', FALSE),
(15, '/images/15_CasacaRompevientos_Gris.webp', TRUE),
(15, '/images/15_CasacaRompevientos_Negro.webp', FALSE);


/*
INSERT INTO estados_carritos (nombre) VALUES 
('activo'),
('procesado');
*/

INSERT INTO estados_ordenes (nombre) VALUES 
('pendiente'),
('pagado'),
('enviado'),
('entregado'),
('cancelado');


INSERT INTO metodos_pago (nombre) VALUES 
('tarjeta_credito'),
('paypal'),
('transferencia'),
('contra_entrega');

INSERT INTO estados_pago (nombre) VALUES 
('completado'),
('fallido'),
('pendiente');
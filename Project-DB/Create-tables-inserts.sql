--Create database in case an error appears, first execute create database and then go down
CREATE DATABASE project_asj;

GO
--use database
USE project_asj;

--Table countries
CREATE TABLE countries (
	id_country INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	count_name VARCHAR(60) NOT NULL
);

--Table provinces
CREATE TABLE provinces (
	id_province INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	prov_name VARCHAR(60) NOT NULL,
	id_country INT NOT NULL,
	FOREIGN KEY(id_country) REFERENCES countries (id_country)
);

--Table cities
CREATE TABLE cities (
	id_city INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	city_name VARCHAR(60) NOT NULL,
	id_province INT NOT NULL,
	FOREIGN KEY(id_province) REFERENCES provinces (id_province)
);

--Table vat_conditions
CREATE TABLE vat_conditions (
	id_vat INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	vat_condition VARCHAR(50) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

--Table sectors
CREATE TABLE sectors (
	id_sector INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	sector_name VARCHAR(30) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME 
);

--Table suppliers
CREATE TABLE suppliers (
	id_supplier INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	supp_code VARCHAR(15) NOT NULL,
	supp_logo VARCHAR(1024),
	supp_name VARCHAR(30) NOT NULL,
	id_sector INT NOT NULL,
	FOREIGN KEY(id_sector) REFERENCES sectors (id_sector),
	supp_cuit VARCHAR(11) NOT NULL,
	supp_web VARCHAR(1024),
	supp_email VARCHAR(1024),
	supp_phone BIGINT,
	supp_street VARCHAR(25) NOT NULL,
	supp_snumber INT NOT NULL,
	supp_zip VARCHAR(15) NOT NULL,
	id_city INT NOT NULL,
	FOREIGN KEY (id_city) REFERENCES cities (id_city),
	id_vat INT NOT NULL,
	FOREIGN KEY (id_vat) REFERENCES vat_conditions (id_vat),
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

--Table categories
CREATE TABLE categories (
	id_category INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	cat_name VARCHAR(40) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME 
);

--Table products
CREATE TABLE products (
	id_product INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	prod_sku VARCHAR(60) NOT NULL,
	prod_name VARCHAR(30) NOT NULL,
	id_supplier INT NOT NULL,
	FOREIGN KEY (id_supplier) REFERENCES suppliers (id_supplier),
	id_category INT NOT NULL,
	FOREIGN KEY (id_category) REFERENCES categories (id_category),
	prod_desc VARCHAR(1024) NOT NULL,
	prod_price FLOAT NOT NULL,
	prod_stock INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

--Table products_images
CREATE TABLE product_images (
    id_image INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    id_product INT NOT NULL,
	FOREIGN KEY (id_product) REFERENCES products (id_product),
    image_path VARCHAR(1024) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
);

--Table statuses
CREATE TABLE statuses (
	id_status INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	status_name VARCHAR(20) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

--Table orders
CREATE TABLE orders (
	id_order INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	id_supplier INT NOT NULL,
	FOREIGN KEY (id_supplier) REFERENCES suppliers (id_supplier),
	order_created DATETIME NOT NULL,
	order_expected DATETIME NOT NULL,
	id_status INT NOT NULL,
	FOREIGN KEY (id_status) REFERENCES statuses (id_status),
	order_info VARCHAR(1024) NOT NULL,
	order_total FLOAT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

--Table orders_details
CREATE TABLE orders_details (
	id_details INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	id_order INT NOT NULL,
	FOREIGN KEY (id_order) REFERENCES orders (id_order),
	id_product INT NOT NULL,
	FOREIGN KEY (id_product) REFERENCES products (id_product),
	det_quantity INT NOT NULL,
	det_price FLOAT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

INSERT INTO countries VALUES 
	('Argentina'),
	('Brasil'),
	('Bolivia'),
	('Paraguay'),
	('Chile'),
	('Uruguay');

INSERT INTO provinces VALUES
	('Buenos Aires', 1),
	('Cordoba', 1),
	('Sao Paulo', 2),
	('Rio de Janeiro', 2),
	('La Paz', 3),
	('Asuncion', 4),
	('Region Metropolitana de Santiago', 5),
	('Region de Valparaiso', 5),
	('Montevideo', 6);

INSERT INTO cities VALUES
	('San Miguel',1),
	('La Plata',1),
	('Cordoba ciudad',2),
	('Sao Paulo',3),
	('Petropolis',4),
	('Laja',5),
	('San Lorenzo',6),
	('Alto Jahuel',7),
	('Algarrobo',8),
	('Canelones',9);

INSERT INTO vat_conditions VALUES
	('IVA Responsable Inscripto','2024-01-10 12:30:00',null),
	('IVA Responsable no Inscripto','2023-05-11 10:20:00','2023-08-11 12:50:00'),
	('IVA no Responsable','2010-01-10 08:20:00',null),
	('Proveedor del Exterior','2024-01-10 10:40:00',null),
	('Monotributista Social','2022-09-14 15:18:00',null);

INSERT INTO sectors VALUES
	('Technology','2024-01-10 12:30:00',null),
	('Vehicles','2023-05-11 10:20:00','2023-08-11 12:50:00'),
	('Foods','2010-01-10 08:20:00',null),
	('Drinks','2024-01-10 10:40:00','2024-08-11 16:30:00'),
	('Clothes','2022-09-14 15:18:00',null),
	('Others','2022-02-14 15:17:00',null);

INSERT INTO suppliers VALUES
	('SUP001','www.logoGolosinas.com', 'El rey Golosina', 3, '20445042774', 'www.proveedor2.com', 'rey@gmail.com', 123456789, 'Almagro', 12, 'B0011', 1, 1, '2024-01-10 12:30:00', NULL),
	('SUP002',null, 'Nvdia', 1, '20505042974', 'www.nvidia.com', 'nvdia@gmail.com', 123456789, 'Irigoin', 940, 'B1663', 2, 4, '2024-01-10 12:30:00', NULL),
	('SUP003','www.logoamd.com', 'AMD', 1, '20245342774', null, 'amd@gmail.com', 543516856118, 'Calen', 23, 'SIP004', 3, 4, '2024-01-10 12:30:00', NULL),
	('SUP004',null, 'Ferrari', 2, '20445042574', 'www.proveedor4.com', 'ferrari@gmail.com', 123456789, 'Avellaneda', 10, 'T020', 1, 4, '2024-01-10 12:30:00', NULL),
	('SUP005',null, 'Fernet Branca', 4, '20345032774', null, 'fernet@proveedor1.com', 123456789, 'Rivadavia', 10, 'B992', 4, 4, '2024-01-10 12:30:00', NULL);

INSERT INTO categories VALUES
	('Alfajores', '2024-01-10 12:30:00', NULL),
	('Perifericos', '2023-05-11 10:20:00', NULL),
	('Mouses', '2024-01-10 12:30:00', NULL),
	('Super carro', '2024-01-10 12:30:00', NULL),
	('Aperitivo', '2023-05-11 10:20:00', NULL),
	('Other', '2023-05-11 10:20:00', NULL);

INSERT INTO products VALUES
	('SKU001', 'Mouse Gamer', 2, 3, 'Mouse de alta precision para juegos', 49.99,20, '2024-01-10 12:30:00', NULL),
	('SKU002', 'Alfajor de Chocolate', 1, 1, 'Delicioso alfajor con relleno de dulce de leche', 2.50,30, '2023-05-11 10:20:00', NULL),
	('SKU003', 'Laptop de Alta Gama', 3, 2, 'Potente laptop para profesionales y gamers', 1500.00,10, '2010-01-10 08:20:00', NULL),
	('SKU004', 'Fernet', 5, 5, 'Bebida mas preciada del mundo', 29.99,12, '2024-01-10 10:40:00', NULL),
	('SKU005', 'Ferrari F40', 4, 4, 'Super auto mega rapido', 1455.99,15, '2022-09-14 15:18:00', NULL),
	('SKU006', 'Ferrari 910', 4, 4, 'Super auto', 1455598.99,15, '2022-09-14 15:18:00', NULL);

INSERT INTO product_images VALUES
	(1, '/images/product1/image1.jpg', '2024-01-10 12:30:00', NULL),
	(1, '/images/product1/image2.jpg', '2024-01-11 09:45:00', NULL),
	(2, '/images/product2/image1.jpg', '2024-01-11 09:45:00', NULL),
	(3, '/images/product3/image1.jpg', '2024-01-11 09:45:00', NULL),
	(4, '/images/product4/image1.jpg', '2024-01-12 14:20:00', NULL);

INSERT INTO statuses VALUES
	('In process', '2024-01-10 12:30:00', NULL),
	('Pending', '2023-05-11 10:20:00', NULL),
	('Aprobate', '2010-01-10 08:20:00', NULL),
	('Cancel', '2024-01-10 10:40:00', NULL),
	('Delivered', '2022-09-14 15:18:00', NULL);


INSERT INTO orders VALUES
	(1, '2024-01-10 12:30:00', '2024-01-15 15:00:00', 1, 'Pedido de productos de confiteria', 49.99, '2024-01-10 12:30:00', NULL),
	(2, '2023-05-11 10:20:00', '2023-05-20 14:30:00', 2, 'Pedido de mouses', 2.50, '2023-05-11 10:20:00', NULL),
	(3, '2010-01-10 08:20:00', '2010-01-20 12:00:00', 3, 'Pedido de laptops para el departamento de IT', 3000.00, '2010-01-10 08:20:00', NULL),
	(4, '2024-01-10 10:40:00', '2024-01-18 11:45:00', 4, 'Pedido de fernets evento corporativo', 29.99, '2024-01-10 10:40:00', NULL),
	(4, '2024-01-10 10:40:00', '2024-01-18 11:45:00', 4, 'Pedido de fernets para un barco', 29.99, '2024-01-10 10:40:00', NULL),
	(5, '2022-09-14 15:18:00', '2022-09-20 16:30:00', 5, 'Pedidos de autodep. para concecionaria', 2912653.97, '2022-09-14 15:18:00', NULL);


INSERT INTO orders_details VALUES
	(1, 1, 1, 49.99, '2024-01-10 12:30:00', NULL),
	(2, 2, 1, 2.50, '2024-01-10 12:30:00', NULL),
	(3, 3, 2, 3000.00, '2023-05-11 10:20:00', NULL),
	(4, 4, 1, 29.99, '2010-01-10 08:20:00', NULL),
	(5, 5, 1, 1455.99, '2024-01-10 12:30:00', NULL),
	(5, 6, 2, 2911197.98, '2024-01-10 10:40:00', NULL);
	

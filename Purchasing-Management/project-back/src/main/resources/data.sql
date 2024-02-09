INSERT INTO countries(count_name) VALUES ('Argentina');
INSERT INTO countries(count_name) VALUES ('Brasil');
INSERT INTO countries(count_name) VALUES ('Bolivia');
INSERT INTO countries(count_name) VALUES ('Paraguay');
INSERT INTO countries(count_name) VALUES ('Chile');
INSERT INTO countries(count_name) VALUES ('Uruguay');

INSERT INTO provinces(prov_name,country_id) VALUES ('Buenos Aires', 1);
INSERT INTO provinces(prov_name,country_id) VALUES ('Cordoba', 1);
INSERT INTO provinces(prov_name,country_id) VALUES ('Sao Paulo', 2);
INSERT INTO provinces(prov_name,country_id) VALUES ('La Paz', 3);
INSERT INTO provinces(prov_name,country_id) VALUES ('Asuncion', 4);
INSERT INTO provinces(prov_name,country_id) VALUES ('Region Metropolitana de Santiago', 5);
INSERT INTO provinces(prov_name,country_id) VALUES ('Region de Valparaiso', 5);
INSERT INTO provinces(prov_name,country_id) VALUES ('Montevideo', 6);

INSERT INTO vat_conditions(vat_condition,created_at,updated_at,is_deleted) VALUES ('IVA Responsable Inscripto','2024-01-10 12:30:00',null,FALSE);
INSERT INTO vat_conditions(vat_condition,created_at,updated_at,is_deleted) VALUES ('IVA no Responsable','2010-01-10 08:20:00',null,FALSE);
INSERT INTO vat_conditions(vat_condition,created_at,updated_at,is_deleted) VALUES ('Proveedor del Exterior','2024-01-10 10:40:00',null,FALSE);
INSERT INTO vat_conditions(vat_condition,created_at,updated_at,is_deleted) VALUES ('Monotributista Social','2022-09-14 15:18:00',null,FALSE);

INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Technology','2024-01-10 12:30:00',null,FALSE);
INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Vehicles','2023-05-11 10:20:00','2023-08-11 12:50:00',FALSE);
INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Foods','2010-01-10 08:20:00',null,FALSE);
INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Drinks','2024-01-10 10:40:00','2024-08-11 16:30:00',FALSE);
INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Clothes','2022-09-14 15:18:00',null,FALSE);
INSERT INTO sectors (sector_name,created_at,updated_at,is_deleted) VALUES ('Others','2022-02-14 15:17:00',null,FALSE);

INSERT INTO contacts (first_name, last_name, phone_number, email, role, created_at, updated_at)
VALUES ('John', 'Doe', '123456789', 'john@example.com', 'Manager', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO contacts (first_name, last_name, phone_number, email, role, created_at, updated_at)
VALUES ('Jane', 'Tesk', '987654321', 'jane@example.com', 'Employee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO suppliers (supp_code, supp_logo, supp_name, supp_cuit, web, email, phone, street, snumber, zip, city, created_at, updated_at, is_deleted, vat_id, sector_id, province_id, contact_id)
VALUES ('SUP001', 'https://th.bing.com/th/id/R.5c9ac9b6ffb1dc3d82471746047a5451?rik=KowRz4U1DFLOVQ&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2016%2f11%2fcoca-cola-emblem.jpg&ehk=oCRNNGPmRI0Ip5p4pqw3T38bl8ECsPu%2bdsknO%2bI5%2fAg%3d&risl=&pid=ImgRaw&r=0', 'Coca Cola', '12345678901', 'http://www.cocacola.com', 'proveedor@coca.com', '123456789', 'Calle Principal', '123', '1234AB', 'San Miguel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 1, 1, 1);
INSERT INTO suppliers (supp_code, supp_logo, supp_name, supp_cuit, web, email, phone, street, snumber, zip, city, created_at, updated_at, is_deleted, vat_id, sector_id, province_id, contact_id)
VALUES ('NVD001', 'https://logodix.com/logo/21837.jpg', 'Nvidia', '12345658901', 'https://www.nvidia.com', 'info@nvidia.com', '12345678923', '123 Graphics Street', '1A', '12345', 'Silicon Valley', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 1, 1, 2);

INSERT INTO categories (cat_name, created_at, updated_at, is_deleted) 
VALUES ('Soda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO categories (cat_name, created_at, updated_at, is_deleted) 
VALUES ('TVs', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO categories (cat_name, created_at, updated_at, is_deleted) 
VALUES ('Video card', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO products (sku, prod_name, prod_desc, prod_price, created_at, updated_at, is_deleted, supplier_id, category_id)
VALUES ('COC001C', 'Coca-Cola Classic', 'Refresco de cola tradicional', 1.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 1);

INSERT INTO products (sku, prod_name, prod_desc, prod_price, created_at, updated_at, is_deleted, supplier_id, category_id)
VALUES ('COC002C', 'Sprite', 'Refresco de lima-limón', 1.49, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 1);

INSERT INTO products (sku, prod_name, prod_desc, prod_price, created_at, updated_at, is_deleted, supplier_id, category_id)
VALUES ('NVD001K', 'GeForce RTX 3080', 'Tarjeta gráfica para juegos de alta gama', 699.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2, 2);

INSERT INTO products (sku, prod_name, prod_desc, prod_price, created_at, updated_at, is_deleted, supplier_id, category_id)
VALUES ('NVD002K', 'Nvidia Shield TV Pro', 'Reproductor multimedia y consola de juegos', 199.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2, 3);

INSERT INTO products_images (image_path, created_at, updated_at, is_deleted, product_id)
VALUES ('https://www.clickndrink.co.uk/wp-content/uploads/2020/11/52110023x.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1);

INSERT INTO products_images (image_path, created_at, updated_at, is_deleted, product_id)
VALUES ('https://i5.walmartimages.com/asr/1267a56f-0cc1-497e-8c2e-2264177f1be6.57af8af07648772234f02377d6c78865.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2);


INSERT INTO products_images (image_path, created_at, updated_at, is_deleted, product_id)
VALUES ('https://cdn.mos.cms.futurecdn.net/NqeqXvavNVP6FBjN4RN42F.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 3);

INSERT INTO products_images (image_path, created_at, updated_at, is_deleted, product_id)
VALUES ('https://th.bing.com/th/id/OIP.iC9RHFVUkjBfgcqXHNQvUAHaEK?rs=1&pid=ImgDetMain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 4);

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (1, '2024-01-31 17:18:16.078054', FALSE, 'Cancel', '2024-01-31 17:18:16.078054');

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (2, '2024-01-31 17:21:18.718335', FALSE, 'Approved', '2024-01-31 17:21:18.718335');

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (3, '2024-01-31 17:22:53.51504', FALSE, 'Pending', '2024-01-31 17:22:53.51504');

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (4, '2024-01-31 17:23:08.533567', FALSE, 'In Process', '2024-01-31 17:23:08.533567');

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (5, '2024-01-31 17:23:28.880404', FALSE, 'Received', '2024-01-31 17:23:28.880404');

INSERT INTO statuses (status_id, created_at, is_deleted, status_name, updated_at) 
VALUES (6, '2024-01-31 17:29:15.21799', FALSE, 'Closed', '2024-01-31 17:29:15.21799');

INSERT INTO orders (order_created, order_expected, order_info, order_total, created_at, updated_at, is_deleted, supplier_id, status_id)
VALUES ('2024-02-09', '2024-02-14', 'Order 1', 3.48, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 2);

INSERT INTO orders (order_created, order_expected, order_info, order_total, created_at, updated_at, is_deleted, supplier_id, status_id)
VALUES ('2024-02-09', '2024-02-15', 'Order 2', 1299.96, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2, 3);

INSERT INTO orders_details (det_quantity, det_price, created_at, updated_at, is_deleted, order_id, product_id)
VALUES (3, 199.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2, 4);

INSERT INTO orders_details (det_quantity, det_price, created_at, updated_at, is_deleted, order_id, product_id)
VALUES (1, 699.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 2, 3);

INSERT INTO orders_details (det_quantity, det_price, created_at, updated_at, is_deleted, order_id, product_id)
VALUES (1, 1.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 1);

INSERT INTO orders_details (det_quantity, det_price, created_at, updated_at, is_deleted, order_id, product_id)
VALUES (1, 1.49, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 1, 2);

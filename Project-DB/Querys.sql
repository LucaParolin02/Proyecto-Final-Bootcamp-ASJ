-- 1) Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.

SELECT p.prod_name as 'Product Name',
c.cat_name as category,
s.supp_name as 'Supplier name',
s.supp_code as 'Supplier code',
p.prod_price as 'Product price'
FROM products p
INNER JOIN categories c on c.id_category = p.id_category
INNER JOIN suppliers s on s.id_supplier = p.id_supplier

-- 2) En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".

SELECT p.prod_name as 'Product Name',
c.cat_name as category,
s.supp_name as 'Supplier name',
s.supp_code as 'Supplier code',
p.prod_price as 'Product price',
CASE 
      WHEN pi.image_path IS NOT NULL THEN pi.image_path
      ELSE '-'
END AS 'Product image path'
FROM products p
INNER JOIN categories c on c.id_category = p.id_category
INNER JOIN suppliers s on s.id_supplier = p.id_supplier
LEFT JOIN 
    product_images pi ON p.id_product = pi.id_product;

-- 3) Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.

SELECT p.prod_name,s.supp_name,c.cat_name,p.prod_desc,p.prod_price,prod_stock
FROM products p
INNER JOIN categories c on c.id_category = p.id_category
INNER JOIN suppliers s on s.id_supplier = p.id_supplier
WHERE p.id_product = 2

-- 4) Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.

SELECT s.supp_code as 'Supp Code',
s.supp_name as 'Supp Name',
sec.sector_name as 'Supp Sector',
s.supp_cuit as 'Supp cuit',
s.supp_web as 'Supp web',
s.supp_email as 'Supp email',
s.supp_phone as 'Supp phone',
s.supp_street as 'Supp street',
s.supp_snumber as 'Supp street Number',
s.supp_zip as 'Supp ZIP',
c.city_name as 'Supp city',
v.vat_condition as 'Vat condition'
FROM suppliers s
INNER JOIN sectors sec on sec.id_sector = s.id_sector
INNER JOIN vat_conditions v on v.id_vat = s.id_vat
INNER JOIN cities c on c.id_city = s.id_city
WHERE CONVERT(VARCHAR(25), s.supp_phone) LIKE '54351%';

--5) Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y 
--fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.

SELECT s.supp_code as 'Supp Code',
s.supp_logo as 'Supp logo',
s.supp_name as 'Supp Name',
sec.sector_name as 'Supp Sector',
s.supp_cuit as 'Supp cuit',
s.supp_web as 'Supp web',
s.supp_email as 'Supp email',
s.supp_phone as 'Supp phone',
s.supp_street as 'Supp street',
s.supp_snumber as 'Supp street Number',
s.supp_zip as 'Supp ZIP',
c.city_name as 'Supp city',
s.created_at as 'Created at'
FROM suppliers s
INNER JOIN sectors sec on sec.id_sector = s.id_sector
INNER JOIN vat_conditions v on v.id_vat = s.id_vat
INNER JOIN cities c on c.id_city = s.id_city
ORDER BY sec.sector_name ASC,s.supp_code ASC,s.created_at ASC

-- 6) Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.

SELECT s.supp_code as 'Supp Code',
s.supp_logo as 'Supp logo',
s.supp_name as 'Supp Name',
s.supp_web as 'Supp web',
s.supp_email as 'Supp email',
s.supp_phone as 'Supp phone',
s.supp_street as 'Supp street',
s.supp_snumber as 'Supp street Number',
c.city_name as 'Supp city'
FROM suppliers s
INNER JOIN sectors sec on sec.id_sector = s.id_sector
INNER JOIN vat_conditions v on v.id_vat = s.id_vat
INNER JOIN cities c on c.id_city = s.id_city
WHERE s.id_supplier = ( SELECT TOP 1 id_supplier FROM orders GROUP BY id_supplier ORDER BY COUNT (*) DESC);

-- 7) Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.

SELECT o.order_created as 'created date',o.id_order as 'N° Order', s.supp_name as 'Supp name', s.supp_code as 'Supp code',COUNT(od.id_order) AS 'Products quantity'
FROM orders o
INNER JOIN suppliers s on s.id_supplier = o.id_supplier
INNER JOIN orders_details od on od.id_order = o.id_order
GROUP BY 
o.order_created, o.id_order, s.supp_name, s.supp_code

-- 8) En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.

SELECT o.order_created as 'created date',
o.id_order as 'N° Order',
s.supp_name as 'Supp name', 
s.supp_code as 'Supp code',
o.order_total as 'Total',
sta.status_name as 'Status',
COUNT(od.id_order) AS 'Products quantity'
FROM orders o
INNER JOIN suppliers s on s.id_supplier = o.id_supplier
INNER JOIN orders_details od on od.id_order = o.id_order
INNER JOIN statuses sta on sta.id_status = o.id_status
GROUP BY 
o.order_created, o.id_order, s.supp_name, s.supp_code,o.order_total,sta.status_name

--9) Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.

SELECT p.prod_sku as 'SKU',
p.prod_name as 'Product name',
od.det_quantity as 'Quantity',
od.det_price as 'Subtotal'
FROM products p
INNER JOIN orders_details od on od.id_product = p.id_product
INNER JOIN orders o on o.id_order = od.id_order
WHERE o.id_supplier = 3

--10) Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.

UPDATE orders
SET 
    id_status = (SELECT id_status FROM statuses WHERE status_name = 'Cancel'),
    updated_at = GETDATE()
WHERE 
    id_order = 4;

--11) Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)

DELETE FROM products WHERE id_product = 1;

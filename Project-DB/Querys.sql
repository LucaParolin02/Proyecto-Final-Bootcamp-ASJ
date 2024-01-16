-- 1) Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y código proveedor), precio.

SELECT 
    p.prod_name as 'Product Name',
    c.cat_name as category,
    s.supp_name as 'Supplier name',
    s.supp_code as 'Supplier code',
    p.prod_price as 'Product price'
FROM 
    products p
INNER JOIN 
    categories c on c.category_id = p.category_id
INNER JOIN 
    suppliers s on s.supplier_id = p.supplier_id;

-- 2) En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Si no tiene imagen, mostrar "-".

SELECT 
    p.prod_name as 'Product Name',
    c.cat_name as category,
    s.supp_name as 'Supplier name',
    s.supp_code as 'Supplier code',
    p.prod_price as 'Product price',
    COALESCE(pi.image_path, '-') AS 'Product image path'
FROM 
    products p
INNER JOIN 
    categories c on c.category_id = p.category_id
INNER JOIN 
    suppliers s on s.supplier_id = p.supplier_id
LEFT JOIN 
    product_images pi ON p.product_id = pi.product_id;

-- 3) Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.

SELECT 
    p.prod_name,
    s.supp_name,
    c.cat_name,
    p.prod_desc,
    p.prod_price,
    p.prod_stock
FROM 
    products p
INNER JOIN 
    categories c on c.category_id = p.category_id
INNER JOIN 
    suppliers s on s.supplier_id = p.supplier_id
WHERE 
    p.product_id = 2;

-- 4) Listar todos los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.

WITH Top3Provinces AS (
    SELECT TOP 3 p.province_id
    FROM 
        suppliers s
    INNER JOIN 
        cities c ON c.city_id = s.city_id
    INNER JOIN 
        provinces p ON p.province_id = c.province_id
    GROUP BY 
        p.province_id
    ORDER BY 
        COUNT(s.supp_code) DESC
)

SELECT 
    s.supp_code as 'Supp Code',
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
FROM 
    suppliers s
INNER JOIN 
    sectors sec on sec.sector_id = s.sector_id
INNER JOIN 
    vat_conditions v on v.vat_id = s.vat_id
INNER JOIN 
    cities c on c.city_id = s.city_id 
INNER JOIN 
    provinces p on p.province_id = c.province_id
WHERE 
    s.supp_phone LIKE '54351%' 
    OR p.province_id IN (SELECT province_id FROM Top3Provinces);

--5) Traer un listado de todos los proveedores que no hayan sido eliminados, y ordenados por razón social, código proveedor y fecha en que se dio de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.

SELECT 
    s.supp_code as 'Supp Code',
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
FROM 
    suppliers s
INNER JOIN 
    sectors sec on sec.sector_id = s.sector_id
INNER JOIN 
    vat_conditions v on v.vat_id = s.vat_id
INNER JOIN 
    cities c on c.city_id = s.city_id
ORDER BY 
    sec.sector_name ASC, s.supp_code ASC, s.created_at ASC;

-- 6) Obtener razón social, código proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.

SELECT 
    s.supp_code as 'Supp Code',
    s.supp_logo as 'Supp logo',
    s.supp_name as 'Supp Name',
    s.supp_web as 'Supp web',
    s.supp_email as 'Supp email',
    s.supp_phone as 'Supp phone',
    s.supp_street as 'Supp street',
    s.supp_snumber as 'Supp street Number',
    c.city_name as 'Supp city'
FROM 
    suppliers s
INNER JOIN 
    sectors sec on sec.sector_id = s.sector_id
INNER JOIN 
    vat_conditions v on v.vat_id = s.vat_id
INNER JOIN 
    cities c on c.city_id = s.city_id
WHERE 
    s.supplier_id = (SELECT TOP 1 supplier_id FROM orders GROUP BY supplier_id ORDER BY COUNT (*) DESC);

-- 7) Mostrar la fecha emisión, n de orden, razón social y código de proveedor, y la cantidad de productos de cada orden.

SELECT 
    o.order_created as 'created date',
    o.order_id as 'N� Order',
    s.supp_name as 'Supp name',
    s.supp_code as 'Supp code',
    COUNT(od.details_id) AS 'Products quantity'
FROM 
    orders o
INNER JOIN 
    suppliers s on s.supplier_id = o.supplier_id
INNER JOIN 
    orders_details od on od.order_id = o.order_id
GROUP BY 
    o.order_created, o.order_id, s.supp_name, s.supp_code;

-- 8) En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.

SELECT 
    o.order_created as 'created date',
    o.order_id as 'N Order',
    s.supp_name as 'Supp name',
    s.supp_code as 'Supp code',
    o.order_total as 'Total',
    sta.status_name as 'Status',
    COUNT(od.details_id) AS 'Products quantity'
FROM 
    orders o
INNER JOIN 
    suppliers s on s.supplier_id = o.supplier_id
INNER JOIN 
    orders_details od on od.order_id = o.order_id
INNER JOIN 
    statuses sta on sta.status_id = o.status_id
GROUP BY 
    o.order_created, o.order_id, s.supp_name, s.supp_code, o.order_total, sta.status_name;

--9) Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.

SELECT 
    p.prod_sku as 'SKU',
    p.prod_name as 'Product name',
    od.det_quantity as 'Quantity',
    od.det_price as 'Subtotal'
FROM 
    products p
INNER JOIN 
    orders_details od on od.product_id = p.product_id
INNER JOIN 
    orders o on o.order_id = od.order_id
WHERE 
    o.supplier_id = 3;

--10) Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.

UPDATE 
    orders
SET 
    status_id = (SELECT status_id FROM statuses WHERE status_name = 'Cancel'),
    updated_at = GETDATE()
WHERE 
    order_id = 4;

--11) Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SOLO MOSTRAR SENTENCIA)

UPDATE products
SET is_deleted = 1
WHERE product_id = 1;

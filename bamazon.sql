CREATE DATABASE bamazon;
use bamazon;

create table products (
item_id integer auto_increment not null, 
product_name varchar(100) not null, 
department varchar(100) not null,
price decimal(10,4) not null, 
stock_quantity integer(10) not null, 
primary key (item_id)
);

INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Record Player", "Electronics", 99.99, 100),
("Desk", "Furniture", 49.85, 200),
("Balloons", "Toys", 5.95, 100),
("iPhone", "Electronics", 999.99, 140),
("Bone", "Pet supplies", 12.95, 111),
("Remote", "Electronics", 29.95, 120),
("Socks", "Apparel", 5.95, 140),
("Ring", "Jewelry", 99.99, 130),
("Phone Case", "Electronics", 15.99, 60),
("Pants", "Apparel", 49.95, 125);



SELECT * FROM products;
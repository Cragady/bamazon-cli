DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
   item_id INT NOT NULL AUTO_INCREMENT,
   product_name VARCHAR(45),
   department_name VARCHAR(30),
   price DECIMAL(16,2),
   stock_quantity INTEGER,
   PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Game Boy', 'Electronics', 50.00, 10),
('International Space Station', 'Electronics', 3.50, 1),
('Alarm Clock', 'Electronics', 5000000000.00, 500),
('How to Spend Money and Go Broke', 'Books', 9580.00, 15),
('The Adventures of Leinhelm the Great', 'Books', 15.00, 20),
('Cookbook for the Phobics', 'Books', 80.00, 4),
('Pokeball Replica', 'Toys', 25.00, 3),
('Anime Figurine', 'Toys', 450.00, 80),
('Macklemore T-Shirt', 'Clothing', 50.00, 4),
('Left Shoe', 'Clothing', 0.50, 50),
('Right Shoe', 'Clothing', 500.00, 50);

--SELECT * FROM bamazon.products;--
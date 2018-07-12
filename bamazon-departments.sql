USE bamazon;

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45),
    over_head_costs INTEGER,
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ('Electronics', 400.00),
('Books', 3000000.00),
('Toys', 3.50),
('Clothing', 8540.00);

--SELECT * FROM bamazon.departments;--
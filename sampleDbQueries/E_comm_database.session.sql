DESCRIBE users;

SELECT * FROM users;

DELETE FROM users
WHERE user_id = 7;

CREATE TABLE userQueries (
  query_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  username VARCHAR(35),
  email VARCHAR(35),
  contactNo VARCHAR(35),
  issueType VARCHAR(35),
  issueMessage VARCHAR(1000),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) AUTO_INCREMENT = 1000;

DESCRIBE userQueries;

SELECT * FROM userQueries;

TRUNCATE userQueries;

CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address VARCHAR(255),
  payment_method VARCHAR(50),
  total_amount DECIMAL(10,2),
  placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Pending','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE order_items (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  title VARCHAR(255),
  price DECIMAL(10,2),
  quantity INT,
  image TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

DESCRIBE orders;
DESCRIBE order_items;

SELECT * FROM orders;

SELECT * FROM order_items;

TRUNCATE orders;

DROP TABLE order_items;
DROP TABLE orders;
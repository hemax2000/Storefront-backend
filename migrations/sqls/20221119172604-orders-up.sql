CREATE TYPE stat AS ENUM ('active', 'complete');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    user_id INTEGER,
    status stat NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);
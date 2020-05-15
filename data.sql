DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS plateforms;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS cdKey;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT,
    dateOfBirth DATE,
    balance NUMERIC
);

CREATE TABLE IF NOT EXISTS plateforms(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS games(
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    slug TEXT,
    quantity INTEGER,
    price NUMERIC,
    discount INTEGER,
    plateform_id INTEGER,
    FOREIGN KEY (plateform_id) REFERENCES plateforms(id)
);

CREATE TABLE IF NOT EXISTS carts(
    user_id INTEGER,
    game_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS marks(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    game_id INTEGER,
    mark INTEGER,
    review TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS cdKey(
    id SERIAL PRIMARY KEY,
    game_id INTEGER,
    cdKey TEXT,
    isUsed BOOLEAN,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    dateOfSale DATE,
    state INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    game_id INTEGER,
    key_id INTEGER,
    price NUMERIC,
    discount INTEGER,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (key_id) REFERENCES cdKey(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
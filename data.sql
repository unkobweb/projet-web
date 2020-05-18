DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plateforms CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS marks CASCADE;
DROP TABLE IF EXISTS cdKey CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    date_of_birth DATE,
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

CREATE TABLE IF NOT EXISTS cdKeys(
    id SERIAL PRIMARY KEY,
    game_id INTEGER,
    cd_Key TEXT,
    is_Used BOOLEAN,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    date_Of_Sale DATE,
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
    FOREIGN KEY (key_id) REFERENCES cdKeys(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
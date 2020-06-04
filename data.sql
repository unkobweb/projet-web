DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plateforms CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS marks CASCADE;
DROP TABLE IF EXISTS cdKey CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    date_of_birth DATE,
    balance NUMERIC DEFAULT 0,
    role INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS plateforms(
    id SERIAL PRIMARY KEY,
    name TEXT,
    slug TEXT
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
    user_id TEXT,
    game_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS marks(
    id SERIAL PRIMARY KEY,
    user_id TEXT,
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
    user_id TEXT,
    date_Of_Sale TIMESTAMP,
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


INSERT INTO games (title, description, slug, quantity, price, discount, plateform_id) VALUES
('Cyberpunk 2077', E'Cyberpunk 2077 pour PC est un jeu de tir à la première personne, mais avec une différence. Dans un État libre dystopique de Californie, les règles de la nation et de l\'Etat ne s\'appliquent plus. Au lieu de cela, jouant comme un mercenaire nommé V, le joueur doit travailler sur le chemin qu\'il emprunte autour de la ville, atteignant ses buts et se battant contre des ennemis qui apparaissent au fur et à mesure du jeu.', 'cyberpunk_2077',20,69.99,20,2),
('Cyberpunk 2077', E'Cyberpunk 2077 pour PC est un jeu de tir à la première personne, mais avec une différence. Dans un État libre dystopique de Californie, les règles de la nation et de l\'Etat ne s\'appliquent plus. Au lieu de cela, jouant comme un mercenaire nommé V, le joueur doit travailler sur le chemin qu\'il emprunte autour de la ville, atteignant ses buts et se battant contre des ennemis qui apparaissent au fur et à mesure du jeu.', 'cyberpunk_2077',20,69.99,20,4),
('Dead by Daylight',E'Il y a à proprement parler deux façons de jouer : quatre joueurs en ligne joignent leurs forces contre un seul tueur, qui est aussi un joueur en ligne. Vous pouvez donc être désigné comme le tueur ou être parmi les 4 personnes chargées de le vaincre. Ce qui met rapidement la pression !','dead_by_daylight',40,20.00,60,1),
('Dead by Daylight',E'Il y a à proprement parler deux façons de jouer : quatre joueurs en ligne joignent leurs forces contre un seul tueur, qui est aussi un joueur en ligne. Vous pouvez donc être désigné comme le tueur ou être parmi les 4 personnes chargées de le vaincre. Ce qui met rapidement la pression !','dead_by_daylight',40,20.00,60,2),
('Death Stranding',E'Sam Bridges affronte un monde totalement transformé par le Death Stranding. Transportant les vestiges dissociés de notre futur, il s\'embarque dans une aventure pour reconstruire un monde détruit.','death_stranding',80,60.00,10,2);
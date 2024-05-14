CREATE TABLE gastypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    standid INTEGER,
    model VARCHAR(60),
    year INTEGER,
    mileage FLOAT,
    price FLOAT,
    availability BOOLEAN,
    description VARCHAR(250),
    gastypeid INTEGER REFERENCES gastypes(id),
    brandid INTEGER REFERENCES brands(id)
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    vehicleid INTEGER NOT NULL REFERENCES vehicles(id),
    url VARCHAR(255) NOT NULL
);

INSERT INTO gastypes (name) VALUES ('Gasoline');
INSERT INTO gastypes (name) VALUES ('Diesel');
INSERT INTO gastypes (name) VALUES ('Electric');
INSERT INTO gastypes (name) VALUES ('Hybrid');

INSERT INTO brands (name) VALUES ('Audi');
INSERT INTO brands (name) VALUES ('BMW');
INSERT INTO brands (name) VALUES ('Mercedes');
INSERT INTO brands (name) VALUES ('Volkswagen');
INSERT INTO brands (name) VALUES ('Volvo');
INSERT INTO brands (name) VALUES ('Ford');
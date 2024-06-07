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
    consume FLOAT,
    description VARCHAR(250),
    gastypeid INTEGER,
    brandid INTEGER,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE favorites(
    userid INTEGER,
    vehicleid INTEGER REFERENCES vehicles(id),
    PRIMARY KEY (userid, vehicleid)

    
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    vehicleid INTEGER REFERENCES vehicles(id),
    url VARCHAR(255) NOT NULL
);

CREATE TABLE testdrives (
    id SERIAL PRIMARY KEY,
    vehicleid INTEGER NOT NULL REFERENCES vehicles(id),
    date DATE NOT NULL,
    username VARCHAR(100) NOT NULL    
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
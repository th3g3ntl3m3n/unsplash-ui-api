DROP DATABASE unsplash_turing_db;
CREATE DATABASE unsplash_turing_db;

\c unsplash_turing_db;

DROP TABLE IF EXISTS lists, photos,list_photo_rel;

CREATE TABLE lists (
    id serial primary key,
    name varchar(100) unique 
);

CREATE TABLE photos (
    id text unique,
    photo_url text unique,
    likes integer
);

CREATE TABLE list_photo_rel (
    list_id integer,
    photo_id text,
    PRIMARY KEY (list_id, photo_id),
    CONSTRAINT fk_list FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE,
    CONSTRAINT fk_photo FOREIGN KEY(photo_id) REFERENCES photos(id) 
);

CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers
(
    id int not null auto_increment PRIMARY KEY,
    burger_name varchar(255) NOT NULL,
    devoured boolean NOT NULL default 0, 
    date_created timestamp
)
CREATE DATABASE IF NOT EXISTS address_book;

USE address_book;

CREATE TABLE IF NOT EXISTS address (
    id          INTEGER        NOT NULL    AUTO_INCREMENT,
    line_1      VARCHAR(255)   NOT NULL,
    line_2      VARCHAR(255),
    city        VARCHAR(255),
    postal_code VARCHAR(16),
    state       VARCHAR(64),
    country     VARCHAR(64),
    created_on    DATETIME       NOT NULL,
    updated_on    DATETIME       NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS contact (
    id            INTEGER        NOT NULL    AUTO_INCREMENT,
    first_name    VARCHAR(255)   NOT NULL,
    last_name     VARCHAR(255)   NOT NULL,
    organization  VARCHAR(255),
    phone_number  VARCHAR(32)    NOT NULL,
    email         VARCHAR(255),
    address_id    INTEGER        NOT NULL,
    created_on    DATETIME       NOT NULL,
    updated_on    DATETIME       NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email),
    FOREIGN KEY (address_id) REFERENCES address(id)
);

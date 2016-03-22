CREATE DATABASE IF NOT EXISTS blog;

USE blog;

CREATE TABLE IF NOT EXISTS authors (
    id            INTEGER        NOT NULL    AUTO_INCREMENT,
    first_name    VARCHAR(255)   NOT NULL,
    last_name     VARCHAR(255)   NOT NULL,
    organization  VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS posts (
    id            INTEGER        NOT NULL    AUTO_INCREMENT,
    author_id     INTEGER        NOT NULL,
    title         VARCHAR(255)   NOT NULL,
    abstract      MEDIUMTEXT,
    body          TEXT           NOT NULL,
    publish_date  DATETIME       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

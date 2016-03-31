CREATE DATABASE IF NOT EXISTS blog;

USE blog;

CREATE TABLE IF NOT EXISTS authors (
    id            INTEGER        NOT NULL    AUTO_INCREMENT,
    email         VARCHAR(255)   NOT NULL,
    first_name    VARCHAR(255)   NOT NULL,
    last_name     VARCHAR(255)   NOT NULL,
    organization  VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE KEY (email)
);

CREATE TABLE IF NOT EXISTS posts (
    id            INTEGER        NOT NULL    AUTO_INCREMENT,
    author_id     INTEGER        NOT NULL,
    title         VARCHAR(255)   NOT NULL,
    abstract      MEDIUMTEXT,
    body          TEXT           NOT NULL,
    publish_date  DATETIME       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FULLTEXT (title, abstract, body)
);

CREATE TABLE IF NOT EXISTS tags (
    id            INTEGER       NOT NULL    AUTO_INCREMENT,
    tag           VARCHAR(255)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (tag)
);

CREATE TABLE IF NOT EXISTS posts_tags (
    post_id       INTEGER       NOT NULL,
    tag_id        INTEGER       NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

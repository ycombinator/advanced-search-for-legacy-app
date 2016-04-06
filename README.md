# Advanced Search for your Legacy Application - Phase 0

This is the initial "legacy" phase of the blog application. The application
has three tiers: a single page application that runs in the user's browser,
an API server, and a MySQL database server. Each of these tiers is detailed below.

## Single page application

The single page application runs in users' browsers and lets them list the latest blog posts and add new blog posts.

This tier is implemented using Angular JS, HTML and CSS.

## HTTP API server

There are two HTTP APIs — to list the latest blog posts and to create a new blog post. These are called by the single page application.

This tier is implemented using Node.js with Hapi.js.

To serve the single page application and start the HTTP API server, run:

    npm start

The code implementing the APIs talks to a MySQL database server (on localhost).

## MySQL database server

It is assumed that an instance of the MySQL database server is running on `localhost`.

In this instance, there is a database named `blog`, which contains four tables:
 - `authors`: authors of blog posts
 - `posts`: blog posts
 - `tags`: tags for blog posts
 - `posts_tags`: many-to-many relationship between `posts` and `tags`

An author can have 0 or more posts. A post must have exactly one author.

A post can have 0 or more tags. A tag may belong to 0 or more blog posts.

More details on this schema can be found in [data/schema.sql](data/schema.sql). To create the `blog` database and the tables in it, run:

    mysql -u root < data/schema.sql

## Next Step

The next step is Phase 1. In this phase we will add a search box to the index page and add a corresponding search results page. The search results page will simply list out the blog posts that match the search query entered in the search box on the index page.

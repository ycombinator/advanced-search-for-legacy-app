# Advanced Search for your Legacy Application
## Phase 0: Legacy Application

This is the initial "legacy" phase of the **address book** application. The
application has three tiers: a single page application that runs in the
user's browser, an API server, and a MySQL database server. Each of these
tiers is detailed below.

### Single page application

The single page application runs in users' browsers. It allows users to:
- list the contacts in the address book
- create a new contact
- update a contact
- delete a contact

This tier is implemented using Angular JS, HTML and CSS.

### HTTP API server

The single page application calls the following HTTP APIs:
- list contacts: `GET /api/contacts`
- create a new contact: `POST /api/contacts`
- retrieve a contact: `GET /api/contacts/{contact_id}`
- update a contact: `PUT /api/contacts/{contact_id}`
- delete a contact: `DELETE /api/contacts/{contact_id}`

This tier is implemented using Node.js with Hapi.js. The code implementing the APIs talks to a MySQL database server (on localhost).

To serve the single page application and start the HTTP API server, run:

    npm start

### MySQL database server

It is assumed that an instance of the MySQL database server is running on `localhost`.

In this instance, there is a database named `address_book`, which contains four tables:
 - `contact`: contacts
 - `address`: addresses of contacts

A contact must have exactly one address. An address can be shared between multiple contacts. The DDL for the schema can be found in [data/schema.sql](data/schema.sql).

To create the `address_book` database and the tables in it, run:

    mysql -u root < data/schema.sql

To seed the tables with some inital data, run:

    ./data/init.sh

(This will prompt you for the [database password](api/mysql_connection.js#L6)).

## Next Step

The next step is [Phase 1](../../tree/phase-1-es). In this phase we will install Elasticsearch and run it.

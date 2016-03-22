# Advanced Search for your Legacy Application - Phase 0

This is the initial "legacy" phase of the blog application.

In this phase, the node.js application serves a single page that lets
users search for blog posts. The application will auto-complete search
terms as users type them out in the search box. When the search terms are
entered, the application shows the results along with some facets for
navigation.

Each of the three capablities - auto-complete, search, and faceted
navitation - are implemented as a HTTP API endpoint. The single page in
the browser calls these APIs.

Additionally there are two more HTTP APIs — to create/update a blog post
and to delete a blog post. These may be used by an admin UI, which is not
implemented in this demo.

The server-side code implementing the APIs talks to a MySQL database
server (on localhost).

There is a database named `blog`, which contains two tables, 
`authors` and `posts`. An author can have 0 or more posts. A post must
have exactly one author. More details on this schema can be found in 
[schema.sql](schema.sql).

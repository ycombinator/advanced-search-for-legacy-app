# Advanced Search for your Legacy Application
## Step 2: Fork writes to MySQL and Elasticsearch

In this step you will change the application code to send writes to both MySQL and Elasticsearch. This will ensure that all new writes in the application are propagated to Elasticsearch (in addition to MySQL).

## Communicating with Elasticsearch
First, your application will need a way to communicate with Elasticsearch.

As you saw at the end of Step 1, a running Elasticsearch node exposes a
REST API, by default at [`http://localhost:9200`](http://localhost:9200).
So you _could_ use a generic HTTP client for your application's programming language to make calls to Elasticsearch's REST API and communicate with Elasticsearch. It is recommended, however, that you use the Elasticsearch client for your application's language instead.

Our sample address book application is written in Javascript (Node.js). So we will be using the elasticsearch Javascript client for Node.js. To install it, run:

    $ npm install --save elasticsearch

## Sending writes to Elasticsearch
There are three APIs in the application that perform writes:
- create a new contact: `POST /api/contacts`
- update a contact: `PUT /api/contacts/{contact_id}`
- delete a contact: `DELETE /api/contacts/{contact_id}`

### Changes to `POST /api/contacts` code
The `POST /api/contacts` code creates a new contact by `INSERT`ing a row in the `contact` table and, if required, a row in the `address` table in MySQL.

In this step, we augment this code so the new contact is _also_ indexed in Elasticsearch.

### Changes to `PUT /api/contacts/{contact_id}` code
The `PUT /api/contacts/{contact_id}` code updates a contact by `UPDATE`ing its row in the `contact` table and, if required, `INSERT`ing a row in the `address` table in MySQL.

In this step, we augment this code so the contact is _also_ updated in Elasticsearch.

### Changes to `DELETE /api/contacts/{contact_id}` code
The `DELETE /api/contacts/{contact_id}` code updates a contact by `DELETE`ing its row in the `contact` table in MySQL.

In this step, we augment this code so the contact is _also_ deleted from Elasticsearch.

#### One Caveat
Notice that we are not only forking inserts but also updates and deletes. This works well for contacts that are inserted after the code changes in this step are put into effect.

However, for contacts that were inserted before these code changes are put into effect, updates and deletes in Elasticsearch could be problematic because the contact being updated or deleted will not exist in Elasticsearch!

First, lets consider updates on non-existent contacts in Elasticsearch. This is not going to cause an error because Elasticsearch will simply treat this as an insert.

Next, lets consider deletes on non-existent contacts in Elasticsearch. This will result in a HTTP 404 response from Elasticsearch. To get around this issue, we must add transient code to ignore this 404. We will remove this transient code in step 6.

## Next Step

The next step is [Step 3](../../tree/step-2-fork-writes). In this step we will augment our application's API code to send writes (inserts, updates, deletes) to Elasticsearch in addition to sending them to MySQL.

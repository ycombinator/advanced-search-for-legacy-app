# Advanced Search for your Legacy Application
## Step 1: Install and run Elasticsearch

In this step you will run a single-node Elasticsearch cluster.

First, download the latest version of Elasticsearch from https://www.elastic.co/downloads/elasticsearch. For portability across
different operating systems, we will assume you are downloading the zip file.

Next, unzip the downloaded file. You can do this wherever you think is
appropriate for your system; we will refer to this path from this point onwards as `$ES_HOME`.

Finally, start Elasticsearch!

    $ $ES_HOME/bin/elasticsearch

This will start a single node of Elasticsearch. At this point you have a 1-node Elasticsearch cluster running!

Elasticsearch exposes a REST API, by default on [`http://localhost:9200`](http://localhost:9200). Your application will communicate with Elasticsearch via this REST API.

## Next Step

The next step is [Step 2](../../tree/step-2-fork-writes). In this step we will augment our application's API code to send writes (inserts, updates, deletes) to Elasticsearch in addition to sending them to MySQL.

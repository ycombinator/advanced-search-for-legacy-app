# Advanced Search for your Legacy Application
## Step 3: Backfill older data

Once the changes in step 2 took effect, all _new_ contacts were being
inserted into MySQL and indexed into Elasticsearch. However, there are
contacts in MySQL that were created before the changes in step 2 took
effect. In this step you will backfill those contacts from MySQL into
Elasticsearch.

## Logstash
Rather than write code to `SELECT` older contacts from MySQL and index
them into Elasticsearch, we will use a tool called Logstash to perform this one-time backfill work.

### Install and run Logstash
First, download the latest version of Logstash from  https://www.elastic.co/downloads/logstash. For portability across
different operating systems, we will assume you are downloading the zip file.

Next, unzip the downloaded file. You can do this wherever you think is
appropriate for your system; we will refer to this path from this point onwards as `$LS_HOME`.

Before running Logstash, we need to create a config file for it. This config file is where we tell Logstash how to get older contacts from MySQL and index them into Elasticsearch. We will use [backfill.conf](backfill.conf) as our Logstash config file.

Finally, run Logstash, specifying the config file:

    $ $LS_HOME/bin/logstash --allow-env --config backfill.conf

## Next Step

The next step is [Step 4](../../tree/step-4-search). In this step we will add search (UI and API) to your application.

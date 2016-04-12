# Advanced Search for your Legacy Application
## Step 5: Cleanup transient code

In step 2 we added [a very small bit of code](/blob/step-2-fork-writes/api/delete_contact.js#L23)
to ignore 404 errors when `DELETE`ing contacts from Elasticsearch. This code is only necessary
until we have backfilled older data from MySQL into Elasticsearch, which we did in step 3.

In this step we simply remove this bit of transient code.

## Next Step

There is no next step! We have successfully added search to our application!

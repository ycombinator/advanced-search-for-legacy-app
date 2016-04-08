#!/bin/bash

# This script loads the initial set of data into the database. It will clear
# out any existing data.
DATA_DIR=$(pwd)/$(dirname $0)

mysqlimport \
  address_book \
  $DATA_DIR/address.csv \
  $DATA_DIR/contact.csv \
  --user app_user \
  --password \
  --fields-terminated-by=,

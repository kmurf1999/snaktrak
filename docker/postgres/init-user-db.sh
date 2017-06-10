#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER "snaktrak" WITH PASSWORD 'password' CREATEDB;
    CREATE DATABASE snaktrak_dev;
    GRANT ALL PRIVILEGES ON DATABASE snaktrak_dev TO "snaktrak";
EOSQL

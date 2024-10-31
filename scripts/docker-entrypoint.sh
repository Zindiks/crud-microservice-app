#!/bin/sh
set -e

if [ -z "$(ls -A "$PGDATA")" ]; then
    su-exec postgres initdb

    su-exec postgres pg_ctl -D "$PGDATA" -w start

    su-exec postgres psql --command "CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '$POSTGRES_PASSWORD';"

    su-exec postgres createdb -O "$POSTGRES_USER" "$POSTGRES_DB"

    su-exec postgres pg_ctl -D "$PGDATA" stop
fi

echo "listen_addresses = '*'" >> "$PGDATA/postgresql.conf"
echo "host all $POSTGRES_USER 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"

exec su-exec postgres "$@"
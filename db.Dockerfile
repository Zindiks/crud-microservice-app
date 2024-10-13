# use Alpina as the base image
FROM alpine:3.20

# install required packages
RUN apk update && \
    apk add --no-cache \
    postgresql \
    postgresql-contrib \
    su-exec \
    tzdata && \
    mkdir -p /var/lib/pgsql/16/data /run/postgresql && \
    chown -R postgres:postgres /var/lib/pgsql /run/postgresql

# set environment variable    
ENV PGDATA /var/lib/pgsql/16/data

# set port
EXPOSE 5432

# copy the entrypoint script from scripts folder
COPY scripts/docker-entrypoint.sh /user/local/bin

# change execute permission for script
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# run script by default
ENTRYPOINT ["docker-entrypoint.sh"]

# start postgres server
CMD ["postgres"]



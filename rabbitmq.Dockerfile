
FROM alpine:3.20

# install all required packages
RUN apk update && \
    apk add --no-cache rabbitmq-server bash

EXPOSE 5672 15672

# copy the entrypoint script
COPY scripts/rabbit-entrypoint.sh /usr/local/bin/

# add execute permission to 
RUN  chmod +x /usr/local/bin/rabbit-entrypoint.sh

ENTRYPOINT ["rabbit-entrypoint.sh"]

CMD ["rabbit-entrypoint"]


FROM alpine:3.20

# Install required packages
RUN apk update && \
    apk add --no-cache rabbitmq-server bash

EXPOSE 5672 15672

# Copy the entrypoint script
COPY scripts/rabbit-entrypoint.sh /usr/local/bin/

# Add execute permission
RUN chmod +x /usr/local/bin/rabbit-entrypoint.sh

# Set the entrypoint to run the script
ENTRYPOINT ["/usr/local/bin/rabbit-entrypoint.sh"]

# Start RabbitMQ server by default
CMD ["rabbitmq-server"]

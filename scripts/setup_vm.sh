#!/bin/bash

# Update the package list and install dependencies
sudo apt-get update -y

# Install Docker
sudo apt-get install -y docker.io

# Start Docker service and enable it on boot
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K[^"]*')" \
    -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create a directory for the Docker setup
mkdir -p /home/vagrant/docker-setup
cd /home/vagrant/docker-setup

# Copy docker-compose.yml and .env files from shared folder
cp docker-compose.yml .
cp .env* .  # This will copy any env files like .env, .env.dev, etc.

# Run docker-compose with the copied files
sudo /usr/local/bin/docker-compose up -d

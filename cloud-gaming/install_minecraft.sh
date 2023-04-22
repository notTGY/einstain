#!/bin/bash

# Create a directory to store the Minecraft client
mkdir ~/minecraft

# Download the Minecraft launcher
wget https://launcher.mojang.com/download/Minecraft.tar.gz -O ~/minecraft/Minecraft.tar.gz

# Extract the Minecraft launcher
tar -zxvf ~/minecraft/Minecraft.tar.gz -C ~/minecraft/

# Remove the downloaded archive
rm ~/minecraft/Minecraft.tar.gz

# Install the required dependencies
sudo apt-get update
sudo apt-get install -y openjdk-8-jre

# Start the Minecraft client
cd ~/minecraft
java -jar launcher.jar

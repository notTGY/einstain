#!/bin/bash

# Update Ubuntu package list
sudo apt-get update

# Install TightVNC server
sudo apt-get install -y tightvncserver

# Install XFCE desktop environment
sudo apt-get install -y xfce4 xfce4-goodies

# Create a new VNC session
tightvncserver :1

# Stop the VNC server to configure the settings
tightvncserver -kill :1

# Configure VNC settings
echo "#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &" > ~/.vnc/xstartup

chmod +x ~/.vnc/xstartup

# Start VNC server
tightvncserver :1 -geometry 1024x768 -depth 24

echo "TightVNC server and XFCE desktop environment have been installed and configured."


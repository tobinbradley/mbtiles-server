#!/bin/sh

# This would be better in upstart or systemd, but cron works and is a bit easier
# edit crontab via crontab -e
# Then stick this in:
# @reboot /path/to/starter.sh
# make sure that starter.sh is executable (chmod +x starter.sh)

cd /opt/apps/tiles
forever start server.js

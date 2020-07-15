#!/bin/bash
# deploy_website
# Syncs local repo with master, replaces all content in server's
# base directory with contents of './html', then restarts apache2.

git pull origin master
echo "Local repository synced with master."

rm -rf /srv/www/html
cp -r ./html /srv/www/html
echo "New page content loaded."

sudo service apache2 restart
echo "apache2 web server restarted."
exit 0

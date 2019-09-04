#!/usr/bin/env bash
echo "Creating users..."
mongo admin --host localhost -u root -p root --eval "db.createUser({user: 'caroneiroadmin', pwd: 'Santos09021992',roles: [{role: 'readWrite', db: 'caroneiroapp_local'}]}); db.createUser({user: 'administrator', pwd: 'Santos09021992', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Users created."
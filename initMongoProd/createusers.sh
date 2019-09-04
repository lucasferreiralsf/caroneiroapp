#!/usr/bin/env bash
echo "Creating users..."
mongo admin --host localhost -u rootprod -p HtwR48wi9m3 --eval "db.createUser({user: 'caroneiroadmin', pwd: 'CsA4er78t',roles: [{role: 'dbOwner', db: 'caroneiroapp_prod'}, {role: 'dbOwner', db: 'caroneiroapp_dev'}]}); db.createUser({user: 'administrator', pwd: 'Santos09021992', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Users created."
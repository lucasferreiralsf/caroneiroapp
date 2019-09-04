db = db.getSiblingDB('admin');
dbcaroneiro = dbcaroneiro.getSiblingDB('caroneiroapp_local');

dbcaroneiro.createUser({
  user: 'caroneiroadmin',
  pwd: 'Santos09021992',
  roles: [{ role: 'readWrite', db: 'caroneiroapp_local' }]
});
db.createUser({
  user: 'administrator',
  pwd: 'Santos09021992',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
});

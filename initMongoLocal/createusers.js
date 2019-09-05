// db = db.getSiblingDB('admin');
// dbcaroneiro = dbcaroneiro.getSiblingDB('caroneiroapp_local');

db.createUser({
  user: 'caroneiroadmin',
  pwd: 'Santos09021992',
  roles: [{ role: 'dbOwner', db: 'caroneiroapp_local' }]
});
db.createUser({
  user: 'administrator',
  pwd: 'Santos09021992',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
});

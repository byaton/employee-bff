const loki = require('lokijs');

const db = new loki('db.json');

db.addCollection('employees').insert([{id: 1, name: "Amit"}]);
db.addCollection('projects');

db.saveDatabase();
import fs from 'fs';
import path from 'path';
// db drivers
import Database from 'better-sqlite3';
import mysql from 'mysql2/promise';

export default function dbRouter(app, databasesFolder, sqliteFolder) {

  const dbConnections = {};

  // read info from databases-in-use.json
  let dbInfoFile = path.join(databasesFolder, 'databases-in-use.json');
  let dbInfos = [];
  if (fs.existsSync(dbInfoFile)) {
    try {
      dbInfos = JSON.parse(fs.readFileSync(dbInfoFile, 'utf-8'));
    }
    catch (_e) { }
  }

  let types = ['sqlite'];

  // make connections and store them
  let connections = {};
  for (let { name, type: t, file } of dbInfos) {
    let type = types.find(x => x.includes(t.toLowerCase()));
    if (!type) { return; }
    type = type.toLowerCase();
    if (type === 'sqlite') {
      file = path.join(sqliteFolder, file);
      fs.existsSync(file)
        && (connections[name] = { type: 'sqlite', con: new Database(file) });
    }
    if (type === 'mysql') {

    }
    connections.default = connections[Object.keys(connections)[0]];
  }

  app.get('/api/dbquery/:name/:query', async (req, res) => {
    let name = req.params.name;
    let connection = connections[name];
    let query = req.params.query;
    if (!connection) { res.json({ error: 'No such db name' }); return; }
    let { type, con } = connection;
    let result;
    try {
      if (type === 'sqlite') {
        result = con.prepare(query).all();
      }
    } catch (e) {
      result = { error: e + '' };
    }
    return res.json(result);
  });

}
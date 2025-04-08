async function dbQuery(query) {
  return await jload(
    '/api/dbquery/'
    + encodeURIComponent(globalThis.__usingDb || 'default') + '/'
    + encodeURIComponent(query.trim())
  );
}

dbQuery.use = (dbName) => {
  globalThis.__usingDb = dbName;
};

export default dbQuery;
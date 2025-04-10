import dbQuery from "./libs/dbQuery.js";

export let years = (await dbQuery(
  'SELECT * FROM countyInfo LIMIT 10'
)).map(x => x.year);
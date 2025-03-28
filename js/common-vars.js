import dbQuery from "./libs/dbQuery.js";

export let years = (await dbQuery(
  'SELECT DISTINCT year FROM dataWithMonths'
)).map(x => x.year);
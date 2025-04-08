import all from './_all-bundled.js';
import dbQuery from './dbQuery.js';

Object.assign(globalThis, all);
globalThis.s = all.simpleStatistics;
globalThis.dbQuery = dbQuery;

await import('/api/getMainScript');
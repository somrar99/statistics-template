addMdToPage(`
  ### Det finns mycket nytt och förbättrat i version 6!
  Läs om allt nytt och gammalt [i den inbyggda dokumentationen](/docs)!
`);

dbQuery.use('mysqltest');
let a = await dbQuery('SELECT * FROM test');
console.log(a);

dbQuery.use('pets-and-owners');
let pets = await dbQuery.collection('pets').find({ species: /ra.*/ }).sort({ name: 1 });
console.log(pets);

dbQuery.use('people');
let people = await dbQuery('MATCH (p: Person) RETURN p');
console.log(people);
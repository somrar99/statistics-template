addMdToPage(`
  ### Det finns mycket nytt och förbättrat i version 6!
  Läs om allt nytt och gammalt [i den inbyggda dokumentationen](/docs)!
`);

dbQuery.use('lia-match');
let a = await dbQuery('SELECT * FROM users WHERE id = 28 OR id=30');
console.log(a);

dbQuery.use('pets-and-owners');
let pets = await dbQuery({ collection: 'pets', find: { species: 'bird' } });
console.log(pets);

dbQuery.use('people');
let people = await dbQuery('MATCH (p: Person) RETURN p');
console.log(people);
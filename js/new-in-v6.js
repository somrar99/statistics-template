addMdToPage(`
  ### Det finns mycket nytt och förbättrat i version 6!
  Läs om allt nytt och gammalt [i den inbyggda dokumentationen](/docs)!
`);

dbQuery.use('lia-match');
let a = await dbQuery('SELECT * FROM users WHERE id = 28 OR id=30');
console.log(a);

dbQuery.use('pets-and-owners');
let pets = await dbQuery.collection('pets').find({ species: /ra.*/ }).sort({ name: 1 });
console.log(pets);

dbQuery.use('people');
let people = await dbQuery('MATCH (p: Person) RETURN p');
console.log(people);

/*dbQuery.collection = () => {
  let chain = [];
  let handler = {
    get(_target, prop) {
      chain.push({ command: prop });
      return new Proxy(func, handler);
    }
  };
  let func = (...args) => {
    chain[chain.length - 1].args = args;
    if (chain.slice(-1)[0].command === 'then') {
      args[0](chain.slice(0, -1));
    }
    return new Proxy(func, handler);
  };
  return new Proxy(func, handler);
};*/
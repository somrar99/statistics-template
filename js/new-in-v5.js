import jerzy from './libs/jerzy.js';

console.log(jerzy);

let data = [18, 160, 234, 149, 145, 107, 197, 75, 201, 225, 211, 119,
  157, 145, 107, 244, 163, 114, 145, 68, 111, 185, 202, 146,
  203, 224, 213, 104, 178, 166, 187, 154, 177, 95, 185, 50, 110,
  216, 138, 151, 166, 135, 155, 84, 248, 173, 131, 207, 121, 135];

let v = new jerzy.Vector(data);
console.log(jerzy.Normality.shapiroWilk(v).p);

console.log(jerzy.StudentT.test(v, 170).p);
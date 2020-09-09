const faker = require('faker');

const keyValueOne = {
  book: faker.name.findName(),
};

const keyValueTwo = {
  book: faker.name.findName(),
  price: faker.commerce.price(),
};

module.exports = {
  keyValueOne,
  keyValueTwo,
};

require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  favoriteFoods: [String],
});

let Person;

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Spaghetti', 'Burgers']
  });

  person.save((err, savedPerson) => {
    if (err) {
      return done(err);
    }
    done(null, savedPerson);
  });
};

const createManyPeople = (arrayOfPeople, done) => {

  const newPeople = [
    { name: 'Tommy Doe', age: 27, favoriteFoods: ['Pizza', 'Icecream'] },
    { name: 'Jane Smith', age: 30, favoriteFoods: ['Sushi', 'Ramen'] },
    { name: 'Emily Dickenson', age: 22, favoriteFoods: ['Burgers', 'Bacon', 'Cheese'] }];

  Person.create(arrayOfPeople, (err, newPeople) => {
    if (err) {
      return done(err); // Pass the error to the callback
    }
    done(null, newPeople); // Pass the saved documents to the callback
  });
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

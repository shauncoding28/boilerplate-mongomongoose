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

let personName = "John Doe";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) {
      return done(err);
    }
    done(null, personFound);
  });
};



const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foodFound) => {
    if (err) {
      return done(err);
    }
    done(null, foodFound);
  });
};

let personId = "64f9c6b4a8e4a1e2d7c";


const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, personFound) => {
    if (err) {
      return done(err);
    }
    done(null, personFound);
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Find person by ID
  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    if (!person) {
      return done(new Error("Person not found"));
    }

    // Add food
    person.favoriteFoods.push(foodToAdd);

    // Save update
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    },
  );
};



const removeById = (personId, done) => {
  //finds person by id
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      return done(err);
    }

    if (!removedPerson) {
      return done(new Error("Person not found"));
    }

    done(null, removedPerson);
  })
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, removedPeople) => {
    if (err) {
      return done(err);
    }
    done(null, removedPeople);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select('-age').exec((err, people) => {
    if (err) {
      return done(err);
    }
    done(null, people);
  })
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

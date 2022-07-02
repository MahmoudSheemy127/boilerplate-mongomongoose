require('dotenv').config();


const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, unifiedTopology:true})


//structure of a model
let carSchema = new mongoose.Schema({
  brand: String,
  model: Number,
  weight: Number

})

//structure of a model
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favouriteFoods:Array
})

data = [
  {
  name:"Ahmed",
  age:13,
  favouriteFoods: ['moji']  
  },
  {
    name:"Malek",
    age:13,
    favouriteFoods: ['moji']  
  },
  {
    name:"Ossama",
    age:13,
    favouriteFoods: ['moji']  
  },
  {
    name:"Mahmoud",
    age:21,
    favouriteFoods: ['moji']  
  },      
  {
    name:"Mahmoud",
    age:25,
    favouriteFoods: ['ha2ej']  
  }
]

//Create models for creating documents
let Car = mongoose.model('Car',carSchema)
let Person = mongoose.model('Person',personSchema)

//-------Write multiple documents----------
// Person.create(data)


Person.remove({
  name:"Mahmoud"
},(err,data) => {
  console.log(data)
})


//test find one
// Person.findOne({
//   name:"Mahmoud"
// },(err,data) => {
//   if(err)
//   {
//     console.log(err)
//   }
//   else
//   {
//     data.favouriteFoods.push('lwa2el')
//     console.log(data)
//     data.save()
//   }
// })



//------Write a document--------

// let car = new Car({
//   brand: "KIA",
//   model : 2013,
//   weight: 612
// }) 

// car.save().then((doc) => {
//   console.log(doc)
// }).catch((err) => {
//   console.log(err)
// })

const createAndSavePerson = (done) => {

  let person = new Person({
    name: "Mahmoud Hassan",
    age: 22,
    favouriteFoods : ['Macaroni','pizza']
  })
  
  person.save((err,data) => {
      if(err)
      {
        done(err)
      }
      else
      {
        done(null,data)
      }
  })

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then((doc) => {
    done(null,doc)
  }).catch((err) => {
    done(err)
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }).then((doc) => {
    console.log(doc)
    done(null,doc)
  }).catch(err => done(err))
};

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods:food},(err,data) => {
    if(err)
    {
      done(err)
    }
    else{
      done(null,data)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data) => {
    if(err)
    {
      done(err)
    }
    else
    {
      done(null,data)
    }
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,data) => {
    if(err)
    {
      done(err)
    }
    else
    {
      data.favouriteFoods.push(foodToAdd)
      data.save((err,data) => {
        if(err)
        {
          done(err)
        }
        else
        {
          done(null,data)
        }
      })

    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name:personName
  },{
    age: ageToSet
  },{
    new: true
  },(err,data) => {
    if(err)
    {
      done(err)
    }
    else
    {
      done(null,data)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data) => {
    if(err)
    {
      done(err)
    }
    else
    {
      console.log(data)
      done(null,data)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, (err,data) => {
    if(err)
    {
      done(err)
    }
    else
    {
      console.log(data)
      done(null,data)
    }
  })
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

const connection = require('../config/connection');
const { Thoughts, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Thoughtss
  await Thoughts.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});

  // Create empty array to hold the Users
  const Users = [];

  // Loop 20 times -- add Users to the Users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const Thoughts = getRandomThoughts(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    Users.push({
      first,
      last,
      github,
      Thoughts,
    });
  }

  // Add Users to the collection and await the results
  await User.collection.insertMany(Users);

  // Add Thoughtss to the collection and await the results
  await Thoughts.collection.insertOne({
    ThoughtsName: 'UCLA',
    inPerson: false,
    Users: [...Users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(Users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

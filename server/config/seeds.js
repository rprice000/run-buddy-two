const db = require('./connection');
const { User, Event, Comment} = require('../models');

db.once('open', async () => {
  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      name: 'Wine not?',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'wine-not.png',
    
    },
    {
      name: 'Filling my beer',
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'filling-my-beer.png',
     
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    events: [events[0].id]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    events: [events[0].id, events[1].id]
  });

  console.log('users seeded');

  process.exit();
});

const db = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('./users.json');
const thoughts = require('./thoughts.json');

db.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.create(users);

    for (let i = 0; i < thoughts.length; i++) {
      const { _id, username } = await Thought.create(thoughts[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
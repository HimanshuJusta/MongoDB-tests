const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');

before((done) => {
  mongoose.connection
    .once('open', () => {
      // Callback inbuilt to Mocha functions alloes us to execute test synchronously.
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // Ready to run next test!
        done();
      });
    });
  });
});

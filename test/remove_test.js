const assert = require('assert');
const User = require('../src/user');

describe('Deleting a User', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('Model Instance Remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' })) // Returning another Mongo operation so that it can again be chained to a then call.
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method Remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' })) // Returning another Mongo operation so that it can again be chained to a then call.
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' })) // Returning another Mongo operation so that it can again be chained to a then call.
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findOneAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' })) // Returning another Mongo operation so that it can again be chained to a then call.
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});

const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a username', (done) => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name is required.');
    done();
  });

  it('requires a username longer than 2 chars', (done) => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name must be longer than 2 characters.');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        assert(validationResult.errors.name.message === 'Name must be longer than 2 characters.');
        done();
      });
  });
});

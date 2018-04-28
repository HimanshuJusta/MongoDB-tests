const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/BlogPost');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it is' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation b/w user and blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') // This is the reference to the property added in the schema not the blogPost Collection.
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relationship tree', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        const { name, blogPosts } = user;
        const { comments } = blogPosts[0];
        assert(name === 'Joe');
        assert(blogPosts[0].title === 'JS is Great');
        assert(comments[0].content === 'Congrats on great post');
        assert(comments[0].user.name === 'Joe');
        done();
      });
  });
});

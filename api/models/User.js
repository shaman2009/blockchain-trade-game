/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
    point: {
      model: 'point'
    },
    articles: {
      collection: 'article',
      via: 'owner'
    }
  },


  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    User.create({
      name: inputs.name,
      // TODO: But encrypt the password first
      password: inputs.password
    })
      .exec(cb);
  },
  /**
 * Check validness of a login using the provided inputs.
 * But encrypt the password first.
 *
 * @param  {Object}   inputs
 *                     • name    {String}
 *                     • password {String}
 * @param  {Function} cb
 */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      name: inputs.name,
      // TODO: But encrypt the password first
      password: inputs.password
    })
      .exec(cb);
  }
};


/**
 * Article.js
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
    owner: {
      model: 'user',
      required: true
    },
    fileUrl: {
      type: 'string'
    },
    fileFd: {
      type: 'string'
    },
    price: {
      type: 'integer',
      required: true,
    }
  },


  generatePoint: function () {
    const start = 1;
    const end = 3;
    return Math.floor(Math.random() * (end - start) + start);
  }
};


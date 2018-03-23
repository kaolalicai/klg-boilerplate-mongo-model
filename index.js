'use strict';

module.exports = {
  name: {
    desc: 'project name',
  },
  description: {
    desc: 'project description',
  },
  author: {
    desc: 'project author',
  },
  modelName: {
    desc: 'Model 的名字，要大写例如 “User”',
    default:'User'
  }
};

function random(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

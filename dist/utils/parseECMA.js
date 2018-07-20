'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = parseECMA;

var _ramda = require('ramda');

var espree = require('espree');

var fixTraversal = function fixTraversal(obj, parents) {
  if (obj && obj.type === 'CallExpression') {
    delete obj.start;
    for (var x in parents) {
      delete parents[x].start;
    }
  }
  for (var i in obj) {
    if (obj[i] && _typeof(obj[i]) === 'object') {
      fixTraversal(obj[i], parents.concat([obj]));
    }
  }
  return obj;
};

function parseECMA(source) {
  return fixTraversal((0, _ramda.prop)('body')(espree.parse(source, {
    sourceType: 'module',
    loc: true,
    ecmaFeatures: {
      jsx: true
    }
  })), []);
}
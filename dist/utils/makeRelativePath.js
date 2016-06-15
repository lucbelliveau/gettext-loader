'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRelativePath;
exports.getBase = getBase;
exports.splitLastPath = splitLastPath;

var _ramda = require('ramda');

var path = require("path");

function makeRelativePath(paths) {
  var baseDir = getBase(process.cwd());
  var splitPath = splitLastPath(paths);
  var takeIdx = splitPath.length - splitPath.indexOf(baseDir) - 1;

  return (0, _ramda.compose)((0, _ramda.join)(path.sep), (0, _ramda.takeLast)(takeIdx))(splitPath);
}

function getBase(pwd) {
  return (0, _ramda.compose)(_ramda.last, (0, _ramda.split)(path.sep))(pwd);
}

function splitLastPath(paths) {
  return (0, _ramda.compose)((0, _ramda.split)(path.sep), _ramda.last, (0, _ramda.split)('!'))(paths);
}
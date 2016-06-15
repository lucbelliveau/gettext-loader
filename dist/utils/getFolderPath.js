"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFolderPath;

var _ramda = require("ramda");

var path = require("path");

function getFolderPath(filePath) {
  return (0, _ramda.compose)((0, _ramda.join)(path.sep), (0, _ramda.dropLast)(1), (0, _ramda.split)(path.sep))(filePath);
}
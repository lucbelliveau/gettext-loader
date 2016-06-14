import {compose, dropLast, split, join} from 'ramda';

const path = require("path");

export default function getFolderPath(filePath){
  return compose(join(path.sep), dropLast(1), split(path.sep))(filePath);
}
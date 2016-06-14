import {split, last, takeLast, join, compose} from 'ramda'
const path = require("path");

export default function makeRelativePath(paths){
  const baseDir = getBase(process.cwd());
  const splitPath = splitLastPath(paths);
  const takeIdx = splitPath.length - splitPath.indexOf(baseDir) - 1;

  return compose(join(path.sep), takeLast(takeIdx))(splitPath);
}

export function getBase(pwd){
  return compose(last, split(path.sep))(pwd)
}

export function splitLastPath(paths){
  return compose(split(path.sep), last, split('!'))(paths)
}

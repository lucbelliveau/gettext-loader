import {prop} from 'ramda';
const espree = require('espree');

const fixTraversal = (obj, parents) => {
  if (obj && obj.type === 'CallExpression') {
    delete obj.start;
    for (const x in parents) {
      delete parents[x].start;
    }
  }
  for (const i in obj) {
    if (obj[i] && typeof obj[i] === 'object') {
      fixTraversal(obj[i], parents.concat([obj]));
    }
  }
  return obj;
}

export default function parseECMA(source){
  return fixTraversal(prop('body')(
      espree.parse(source, {
      sourceType: 'module',
      loc: true,
      ecmaFeatures: {
        jsx: true,
      }
    })
  ), []);
}

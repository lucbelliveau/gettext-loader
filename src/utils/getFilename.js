import {compose, dropLast, join, split, last} from 'ramda';

const path = require("path");

export default compose(
  join('.'),
  split('.'),
  last,
  split(path.sep)
)

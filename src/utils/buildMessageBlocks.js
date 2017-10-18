import path from 'path';
import makeRelativePath from './makeRelativePath';
import isPluralForm from './isPluralForm';

import {

  compose as cx,
  concat as cat,
  join,
  reduce,
  last,
  takeLast,
  map,
  head,
  split,
  range
  
} from 'ramda';

const root = process.cwd();
const config = require(path.join(root, 'gettext.config.js'));

export const buildMsgstr = map((num) => `msgstr[${num}] ""\n`)
export const buildMsgstrs = (num) => cx(join(''), buildMsgstr)(range(0, num))
export const getNumPlurals = cx(parseInt, last, head, split(';'))
export const formatMessageBlock = (accum, translation) => {
  const path = makeRelativePath(translation.path);

  let translationBlock = cat(
    `#: ${path} ${translation.loc.line}:${translation.loc.column}\n`,
    `msgid "${translation.text}"`
  )

  if (isPluralForm(translation.text)){
    translationBlock += `\nmsgid_plural ""`
    const msgstrs = cx(
      buildMsgstrs,
      getNumPlurals
    )(config.header['Plural-Forms'])

    return cx(
      cat(accum),
      cat(translationBlock),
      cat('\n'),
      cat(msgstrs),
    )('\n');
  }

  return cx(
    cat(accum),
    cat(translationBlock),
    cat('\n'),
    cat('msgstr ""\n'),
  )('\n');
}

export default reduce(formatMessageBlock, '')

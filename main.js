#!/usr/bin/env node

const fs = require('fs');

const FILE_PATH = './node_modules/xhr2/lib/xhr2.js';
const STATEMENT_PATTERN = /xhrUrl\s=\sthis\._parseUrl\(url\);/;

run();

function run() {
  const arg = process.argv.slice(2)[0];

  if (!arg) {
    return console.log('Usage:\n  xhr2-test <prefix>\n  xhr2-test --revert\n\nwhere <prefix> is the test server URL.');
  }

  const statement = arg === '--revert'
    ? 'xhrUrl = this._parseUrl(url);'
    : `xhrUrl = this._parseUrl('${arg}' + url);`;

  const successMessage = arg === '--revert'
    ? 'xhr2-test: Reverted xhr2 library to original.'
    : `xhr2-test: Request URLs will now be prefixed with ${arg}. Run with --revert flag to restore default behavior.`;

  fs.readFile(FILE_PATH, 'utf8', function(err, file) {
    if (err) throw err;
    fs.writeFile(FILE_PATH, file.replace(STATEMENT_PATTERN, statement), function(err) {
      if (err) throw err;
      console.log(successMessage);
    });
  });
}

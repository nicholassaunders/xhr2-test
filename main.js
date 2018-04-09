const fs = require('fs');

const FILE_PATH = './node_modules/xhr2/lib/xhr2.js';
const STATEMENT_PATTERN = /this\._url\s=(.+);/;

run();

function run() {
  const arg = process.argv[0];

  if (!arg) {
    return console.log('Usage:\n  xhr2-test <prefix>\n  xhr2-test --revert\n\nwhere <prefix> is the test server URL.');
  }

  const statement = arg === '--revert'
    ? 'this._url = xhrUrl;'
    : `this._url = '${arg}' + xhrUrl;`;

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

const fs = require('fs');
fs.readdirSync('util')
fs.writeFileSync('util/console/status.json', '{\n' +
    '    "mine": "0",\n' +
    '    "mine-err": "0",\n' +
    '    "place": "0",\n' +
    '    "place-err": "0",\n' +
    '    "error": []\n' +
    '}')
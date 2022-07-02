const fs = require('fs-extra');
fs.readdirSync('Core');
fs.writeFileSync('Core/console/status.json',
    '{\n' +
    '  "mine": "0",\n' +
    '  "place": "0",\n' +
    '  "place-err": "0"\n' +
    '}'
);
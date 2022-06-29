const fs = require('fs-extra');
fs.writeFileSync('config.json',
    '{\n' +
    '    "prefix": "2w!",\n' +
    '    "host": "example.com",\n' +
    '    "port": 25565,\n' +
    '    "invport": 8000,\n' +
    '    "pin": [0, 0, 0, 0],\n' +
    '    "username": "Your minecraft account name"\n' +
    '}\n'
)
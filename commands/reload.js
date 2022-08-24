const fs = require('fs');

module.exports = {
    name: 'reload',
    execute(bot) {
        require('../cli/reload');
    }
};
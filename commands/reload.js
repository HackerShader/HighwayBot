const fs = require('fs');

module.exports = {
    name: 'reload',
    execute(bot) {
        require('../cmd/reload');
    }
};
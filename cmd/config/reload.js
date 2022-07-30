const fs = require('fs-extra');
const color = require('../../Core/Console/colorcode');

module.exports = () => {
    fs.readdirSync('./config').forEach(file => {
        delete require.cache[require.resolve(`./../../config/${file}`)];
    });
    delete require.cache[require.resolve(`../../path.json`)];
    console.log(color.code.green, `[Config | Reload] All Config files reloaded.`);
    const path = require('../../path.json').config
    try {
        require(`../../config/${path}`)
    } catch (error) {
        console.log(color.code.red, `Config [${path.replace('.json', '')}] no longer exists`)
        const commandconfig = require('edit-json-file')('./path.json');
        let config = 'default.json'
        if (!fs.readdirSync('./config/').includes(config)) config = fs.readdirSync('./config/')[0]
        commandconfig.set('config', config);
        commandconfig.save();
        console.log(color.code.yellow, `Changed to [${config.replace('.json', '')}] config`)
    }
};
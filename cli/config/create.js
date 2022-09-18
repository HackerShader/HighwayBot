const fs = require('fs-extra');
const color = require('../util/colorcode');

module.exports = (args) => {
    let configName;
    if (!args[2] && !fs.existsSync('./config/default.json')) {
        configName = 'default';
    } else {
        if (!args[2] || args[2] === undefined && fs.existsSync('./config/default'))
            return console.log(color.code.blue, `[Config | Create] Usage: config create <filename>`);
        if (fs.existsSync(`./config/${args[2]}.json`))
            return console.log(color.code.red, `[Config | Create | Error] Config [${args[2]}] already exists.`);
        configName = args[2];
    }
	
    fs.writeFileSync(`./config/${configName}.json`, JSON.stringify({
        general: {
            ingameprefix: "2w!",
            botusername: "highwaybot",
            owner: "Player",
            version: "1.12.2"
        },
        hostinfo: {
            hostname: "localhost",
            port: 25565,
            inventoryviewerport: 8000,
        },
        module: { 
            highway: {
                
            },
            player: {
                combat: {
                    autocrystal: {
                        toggle: false,
                    }
                },
                movenment: {
                    velocity: {
                        toggle: true,

                    }
                },
                utility: {

                }
            }
        }
        


    }));
    console.log(color.code.green, `[Config | Create | Done] Created empty config [${configName}].`);
    console.log(color.code.blue, `[Config | Create] Use 'config edit' to edit config`);
};

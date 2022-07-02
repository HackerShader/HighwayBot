const fs = require('fs-extra');
fs.writeFileSync('./index.js',
    'const mineflayer = require(\'mineflayer\')\n' +
    'const mineflayernavigate = require(\'mineflayer-navigate\')(mineflayer)\n' +
    'const pathfinder = require(\'mineflayer-pathfinder\').pathfinder\n' +
    'const config = require(\'./config.json\')\n' +
    'const tpsPlugin = require(\'mineflayer-tps\')(mineflayer)\n' +
    'const prefix = config.prefix\n' +
    'const inventoryViewer = require(\'mineflayer-web-inventory\')\n' +
    '\n' +
    'console.log(`HighwayBot is starting, please wait... \\nPrefix: ${prefix}\\nAvailable commands: ${prefix}mine, ${prefix}infoserver, ${prefix}inventory, ${prefix}reload`)\n' +
    '\n' +
    'function HighwayBot() {\n' +
    '    const bot = mineflayer.createBot({\n' +
    '        username: "highwaybot",\n' +
    '        host: config.host,\n' +
    '        port: config.port,\n' +
    '        version: \'1.12.2\',\n' +
    '    })\n' +
    '\n' +
    '    //Plugins loader\n' +
    '    bot.loadPlugin(pathfinder)\n' +
    '    bot.loadPlugin(tpsPlugin)\n' +
    '    mineflayernavigate(bot)\n' +
    '    inventoryViewer(bot, { port: config.invport })\n' +
    '\n' +
    '    //advanced login\n' +
    '    bot.on(\'windowOpen\', async (window) => {\n' +
    '        const pin = config.pin\n' +
    '        window.requiresConfirmation = false;\n' +
    '        await bot.clickWindow(pin[0], 0, 0);\n' +
    '        await bot.clickWindow(pin[1], 0, 0);\n' +
    '        await bot.clickWindow(pin[2], 0, 0);\n' +
    '        await bot.clickWindow(pin[3], 0, 0);\n' +
    '\n' +
    '        setTimeout(() => { bot.chat(\'/cmd\') }, 5*1000);\n' +
    '\n' +
    '        setTimeout(() => { bot.clickWindow(0,0,0) }, 6*1000);\n' +
    '    })\n' +
    '\n' +
    '    bot.on(\'chat\', (username, message) => {\n' +
    '        if (!message.startsWith(config.prefix)) return;\n' +
    '        const args = message.slice(prefix.length).trim().split(\' \');\n' +
    '        const cmd = args[0].toLowerCase();\n' +
    '        if(username !== config.username) return;\n' +
    '\n' +
    '        //execute commands\n' +
    '        try {\n' +
    '            const command = require(`./commands/${cmd}.js`)\n' +
    '            command.execute(bot, message, args, username)\n' +
    '        } catch (err) {\n' +
    '            console.log(err)\n' +
    '        }\n' +
    '    })\n' +
    '    bot.on(\'kicked\', kick => {\n' +
    '        console.log(`Disconnected. Reason: ${kick}`)\n' +
    '    })\n' +
    '\n' +
    '    bot.on(\'end\', (reason) => {\n' +
    '        console.log(`Disconnected. Reason: ${reason}`)\n' +
    '        setTimeout(() => HighwayBot(), 10000)\n' +
    '    })\n' +
    '\n' +
    '    bot.on(\'spawn\', () => {\n' +
    '        console.log(\'Bot spawn !\')\n' +
    '        console.log(\'Position of bot:\' + Math.round(bot.entity.position.x), Math.round(bot.entity.position.y), Math.round(bot.entity.position.z))\n' +
    '    })\n' +
    '\n' +
    '    bot.on(\'message\', msg => {\n' +
    '        console.log(msg.toString());\n' +
    '    });\n' +
    '\n' +
    '\n' +
    '}\n' +
    'HighwayBot()\n'
);
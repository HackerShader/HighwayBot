const fs = require('fs')

fs.mkdirSync('commands')
fs.mkdirSync('util')
fs.mkdirSync('util/HighwayTunnel')
fs.mkdirSync('util/HighwayTunnel/break')

fs.readdirSync('./cmd/installer/files').forEach(file => {
    require(`./files/${file}`)
})


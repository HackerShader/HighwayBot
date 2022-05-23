const fs = require('fs')
const exec = require('child_process').exec

console.log('\n\nInstallation log')
console.log('Creating directory...')

function createDir() {

    fs.mkdirSync('commands', {recursive: true})
    fs.mkdirSync('util', {recursive: true})
    fs.mkdirSync('util/HighwayTunnel', {recursive: true})
    fs.mkdirSync('util/HighwayTunnel/break', {recursive: true})
    fs.mkdirSync('util/console', {recursive: true})

}

try {
    createDir()
} catch (err) {
    console.log(err)
}
console.log('Directory created')
console.log('Creating files...')
fs.readdirSync('./cmd/installer/files').forEach(file => {
    require(`./files/${file}`)
    console.log(`File ${file} created`)
})

exec('npm install package.json', (err, stdout, stderr) => {
    if (err) return;
    console.log(stdout)
})






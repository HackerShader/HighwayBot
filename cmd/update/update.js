const fs = require('fs-extra')
const exec = require('child_process').exec
const editJsonFile = require('edit-json-file')
const package = require('./../../package.json')

async function Update() {
    if (package.version === undefined && package.build === undefined) return console.log('[X] HighwayBot not installed, Please launch the bot again [node ./cmd.js]')
    await console.log('[Update | Pending] Starting update...')
    await exec('git clone https://github.com/HackerShader/HighwayBot', async (err, stdout, stderr) => {
        if (err) return console.log(err);
        await console.log("[Update | Done] Cloned the HighwayBot repository")
        await console.log('[Update | Pending] Applying all changes from the repository...')  
        await fs.copy('./HighwayBot', './')
        await fs.removeSync('./HighwayBot')
        await console.log('[Update | Done] Replaced the files') 
        await exec('git rev-parse HEAD', async (err, stdout, stderr) => {
            if (err) return console.log(err);
            await console.log(`[Update | Done] HighwayBot updated to build ${stdout.substring(0, 7)}`)
            await console.log('[Notification] Please launch the bot again to apply the changes [node ./cmd.js]')
            const edit = editJsonFile('./package.json')
            edit.set('build', `${stdout.substring(0, 7)}`)
            edit.save()            
        })
    })
}
Update()
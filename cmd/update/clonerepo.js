const fs = require('fs-extra')
const exec = require('child_process').exec
async function ReplaceFile() {
    await fs.copySync('./HighwayBot/HighwayBot', './HighwayBotInstaller')
    await fs.removeSync('./HighwayBot/HighwayBot')
    await console.log('[Update | Done] Replaced the files')
}

async function Update() {

    if (fs.existsSync('./HighwayBot')) return; 
    await console.log('[Update | Pending] Starting update...')
    await exec('git clone https://github.com/HackerShader/HighwayBot', async (err, stdout, stderr) => {
        if (err) return console.log(err);
        await console.log("[Update | Done] Cloned the HighwayBot repository")

    })
    await console.log('[Update | Pending] Applying all changes from the repository...')  //replace folder using fs
    await ReplaceFile()
    
}
Update()
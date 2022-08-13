const fs = require('fs-extra')

fs.createReadStream('./HighwayBotResource.zip').pipe(unzipper.Extract({ path: './HighwayBot' }));

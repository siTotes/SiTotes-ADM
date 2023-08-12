const sitotes = require('./lib/gdriveapis')
const cv = require('./lib/con2vert')
const fs = require('fs')

async function test() {
    await sitotes.gdriveUpload(await cv.pathToBuffer('./pe.png'), 'png', '1jQk7lovSaz64K-W2mnCgzT0AXdDB5X-z')
        .then(result => {
        console.log(result)
    })
}

test()
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')
const ff = require('fluent-ffmpeg')

// async function TeriBosok() {
    // try {
        // m = {
            // type: '',
            // sender: '6288989781626@s.whatsapp.net',
            // isGroup: true,
            // chat: '6288989781626@s.whatsapp.net',
            // messageTimestamp: 1686631012,
            // key:{
                // fromMe: false
            // }
        // }
        // groupName = 'Slebeww Paguyuban'
        // budy = '.tt https://vm.tiktok.com/ZSL2Xhexc/'
        // pushname = 'Saiful Anam'
        // timestamp = m.messageTimestamp
        
        // console.log()
        // console.log(
            // chalk.black(chalk.bgWhite('\n |=| reload |-> ')),
            // chalk.black(chalk.bgYellow(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
            // chalk.black(chalk.bgBlue(`\n ${budy || m.mtype} `)),
            // chalk.black(chalk.bgMagenta(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
            // chalk.greenBright(chalk.bgGray.bold(`\n |=> `,m.isGroup ? groupName : 'Private Chat', m.chat))
        // )
    // } catch (err) {
        // console.log(chalk.yellow(err.stack))
    // }
// }

async function videoToWebp(locatepath) {

    const tmpFileOut = `${locatepath}pe.mp4`
    const tmpFileIn = `${locatepath}.mp4`

    await new Promise(function(resolve, reject) {
        ff(tmpFileIn)
            .setStartTime(2)
            .setDuration(10)
            .save(tmpFileOut)
            .on('start', function(commandLine) {})
            .on('progress', function(progress) {
                console.log('→', progress)
            })
            .on('end', function() {
                return resolve(tmpFileOut)
            })
            .on('error', function(err) {
                return reject(err)
            })
    })

    //fs.unlinkSync(tmpFileIn)
    return tmpFileOut
}






try {
    //TeriBosok()
    videoToWebp('./ytketok')
} catch (err) {
    console.log(err.stack)
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    delete require.cache[file]
    require(file)
})
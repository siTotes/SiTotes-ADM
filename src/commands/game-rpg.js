//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const similarity = require('similarity')
const util = require('util')
const threshold = 0.72

//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
const {
    smsg,
    getGroupAdmins,
    formatp,
    tanggal,
    tanggal_,
    tanggal__,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom
} = require(home('./lib/myfunc'))
const lang = require(home('./src/options/lang_id'))

//━━━[ @BOCHILTEAM ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const {
    tebakgambar,
    caklontong,
    family100,
    asahotak,
    tebakkata,
    tekateki,
    tebakkimia,
    tebakkabupaten,
    siapakahaku,
    susunkata,
    tebakbendera,
    tebaklirik,
    tebaktebakan,
} = require('@bochilteam/scraper')

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const _tebakgambar = (db.data.game['tebakgambar'] = {})
const _caklontong = (db.data.game['caklontong'] = {})
const _family100 = (db.data.game['family100'] = {})


let lgm = {
    "gamelist": [
        'tebakgambar',
        'caklontong',
        'family100',
        'asahotak',
        'tebakkata',
        'tekateki',
        'tebakkimia',
        'tebakkabupaten',
        'siapakahaku',
        'susunkata',
        'tebakbendera',
        'tebaklirik',
        'tebaktebakan'
    ]
}
let isInGame = false

const totalScore = (soal) => {
    let iswin = {}
    let dibagi
    iswin['lvl'] = soal.index

    if (soal.index < 10000) {
        //3092
        dibagi = 2000 * (iswin.lvl / 100) * 1
        iswin['coin'] = dibagi / 2
        iswin['xp'] = parseFloat(((iswin.lvl / 100) * 100.0 / 4).toFixed(2))
    } else if (soal.index < 1000) {
        //309
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 1
        iswin['xp'] = parseFloat(((iswin.lvl / 100) * 100.0 / 2).toFixed(2))
    } else if (soal.index < 100) {
        //30
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 10
        iswin['xp'] = parseFloat((iswin.lvl / 2 * 6).toFixed(2))
    } else {
        //3
        iswin['coin'] = 2000 * (iswin.lvl / 100) * 100
        iswin['xp'] = parseFloat((iswin.lvl / 2 * 16).toFixed(2))
    }
    return iswin
}

//━━━[ If user chat rpg-game ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    try{
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
    
        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
    
        isInGame = false
        for (let gameNo = 0; gameNo < lgm.gamelist.length; gameNo++) {
            var ver = db.data.game[lgm.gamelist[gameNo]] ? db.data.game[lgm.gamelist[gameNo]] : false
            if (ver[m.chat] ? true : false) {
                isInGame = true
            }
        }
    
        if (_tebakgambar[m.chat] && !isCmd && m.quoted) {
            if (m.quoted.id == _tebakgambar[m.chat]['gameid']) {
                let json = JSON.parse(JSON.stringify(_tebakgambar[m.chat]))
                jawaban = json.jawaban.toLowerCase().trim()
                if (m.text.toLowerCase() == jawaban) {
                    delete _tebakgambar[m.chat]
                    await reply(lang.JwbTrue('Tebak Gambar', json.hadiah.coin.toLocaleString('en-US'), json.hadiah.xp, 'tebakgambar'))
                } else if (similarity(m.text.toLowerCase(), jawaban) >= threshold) {
                    await reply(lang.JwbHampir())
                } else {
                    await reply(lang.JwbErr())
                }
            }
        }
        if (_caklontong[m.chat] && !isCmd && m.quoted) {
            if (m.quoted.id == _caklontong[m.chat]['gameid']) {
                let json = JSON.parse(JSON.stringify(_caklontong[m.chat]))
                jawaban = json.jawaban.toLowerCase().trim()
                if (m.text.toLowerCase() == jawaban) {
                    delete _caklontong[m.chat]
                    await reply(lang.JwbTrue('Cak Lontong', json.hadiah.coin.toLocaleString('en-US'), json.hadiah.xp, 'caklontong'))
                } else if (similarity(m.text.toLowerCase(), jawaban) >= threshold) {
                    await reply(lang.JwbHampir())
                } else {
                    await reply(lang.JwbErr())
                }
            }
        }
        if (_family100[m.chat] && !isCmd && m.quoted) {
            if (m.quoted.id == _family100[m.chat]['gameid']) {
                let json = JSON.parse(JSON.stringify(_family100[m.chat]))
                let hampir = 0
                let salah = 0
                for(let i = 0; i < json.jawaban.length; i++){
                    let jawaban = json.jawaban[i].toLowerCase().trim()
                    console.log(jawaban + ' | ' + m.text.toLowerCase().trim())
                    if (m.text.toLowerCase().trim() == jawaban) {
                        let benar = 0;
                        let tinggal = 0;
                        let hasilJawaban = ''
                        
                        json.jawab[i] = m.text  
                        
                        json.jawab.forEach((jawab, index) => {
                            if (jawab === json.jawaban[index]) {
                                benar++;
                                hasilJawaban += `${index + 1}. ${jawab} ✅\n`
                            }else{
                                tinggal++;
                                hasilJawaban += `${index + 1}. ${'```'+ json.jawaban[index].replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_')+'```'} 🤔\n`
                            }
                        });
                        
                        if(_family100[m.chat].jawab[i] == m.text){
                            await reply(`Sudah di jawab 🗿\n\n${hasilJawaban}`)
                            break
                        }
                        _family100[m.chat].jawab[i] = m.text
                        _family100[m.chat].hadiah.xp = json.hadiah.xp *2
                        _family100[m.chat].hadiah.coin = json.hadiah.coin *2
                        if(tinggal == 0){
                            await reply(lang.JwbTrue('Family 100', _family100[m.chat].hadiah.coin.toLocaleString('en-US'), _family100[m.chat].hadiah.xp, 'family100'))
                            delete _family100[m.chat]
                            break
                        }else{
                            await reply(`_*🎊Jawaban Anda benar 🎊*_ \n*✠━━━━━━━━━━━━✠*\nAnda berhasil menyebutkan ${benar} dengan benar, tinggal ${tinggal} lagi, ayo sebutkan lagi setiap anda menyebutkan jawaban yang benar hadiah dikali 2\n\n${hasilJawaban}\n\n*✠━━━🎁 Hadiah━━━━✠*\n💰 *Rp: ${_family100[m.chat].hadiah.coin.toLocaleString('en-US')}*\n🧩 + *${_family100[m.chat].hadiah.xp}* _XP_`)
                            break
                        }
                    }
                    if (similarity(m.text.toLowerCase(), jawaban) >= threshold){
                        hampir++
                    } else {
                        salah++
                    }
                    
                    if(i==json.jawaban.length-1){
                        if(hampir>0){
                            await reply(lang.JwbHampir())
                        }else{
                            await reply(lang.JwbErr())
                        }
                    }
                }
            }
        }
    
        let soal
        let gam
        let vlet
        let hadiahahah
    
        switch (command) {
            case 'bantuan':
            case 'hint':{
                if (isInGame) {} else return reply('Tidak ada soal/game yang anda mainkan coba ketik: #tebakgambar')
                if (!m.quoted) return reply('balas pesan/soal yang ingin di kasih hint/bantuam')
                let viu
                for (let i = 0; i < lgm.gamelist.length; i++) {
                    let vu = db.data.game[lgm.gamelist[i]] ? db.data.game[lgm.gamelist[i]] : false
                    if (vu[m.chat] ? true : false) {
                        viu = db.data.game[lgm.gamelist[i]]
                    }
                }
                if (m.quoted.id == viu[m.chat]['gameid']) {
                    if(_family100[m.chat]){
                        let benar = 0;
                        let tinggal = 0;
                        let hasilJawaban = ''
                        _family100[m.chat].jawab.forEach((jawab, index) => {
                            if (jawab === _family100[m.chat].jawaban[index]) {
                                benar++;
                                hasilJawaban += `${index + 1}. ${jawab} ✅\n`
                            }else{
                                tinggal++;
                                hasilJawaban += `${index + 1}. ${'```' + _family100[m.chat].jawaban[index].replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_')+'```'} 🤔\n`
                            }
                        });
                        
                        await reply('*HINT :*\n\n' + hasilJawaban)
                    }else{
                        await reply('*HINT :*\n```' + viu[m.chat].jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_') + '```')
                    }
                } else return await reply('Itu Bukan soal/Game kak😔')
            }
            break
            case 'nyerah':
            case 'menyerah':
            case 'quit':
            case 'metu':
            case 'out':
            case 'kalah':{
                if (isInGame) {} else return reply('Tidak ada soal/game yang anda mainkan coba ketik: #tebakgambar')
                for (let i = 0; i < lgm.gamelist.length; i++) {
                    let vu = db.data.game[lgm.gamelist[i]] ? db.data.game[lgm.gamelist[i]] : false
                    if (vu[m.chat] ? true : false) {
                        reply('Yah payah nyerah😆\n anda keluar dari soal:' + lgm.gamelist[i])
                        delete db.data.game[lgm.gamelist[i]][m.chat]
                    }
                }
            }
            break
            case 'tg':
            case 'tega':
            case 'tbkg':
            case 'tbkgam':
            case 'tebakgam':
            case 'tebakgambar':{
                if (_tebakgambar[m.chat]) return reply("Masih Ada Soal Yang Belum Diselesaikan!\nketik: *#nyerah*\nuntuk menyerah/mengakhiri soal")
    
                soal = await tebakgambar()
                gam = await getBuffer(soal.img)
                //const vlet = await onic.sendImage(m.chat, gam, `*Silahkan Jawab Soal Di Atas Ini*\n\n*Deskripsi :*\n${soal.deskripsi}\n\n*Waktu :* 2 Menit`,m)
                vlet = await onic.sendPesan(m.chat, {
                    image: gam,
                    caption: `*Silahkan Jawab Soal Di Atas Ini*\n\n*Deskripsi :*\n${soal.deskripsi}\n\n*Waktu :* 2 Menit`,
                }, {
                    quoted: m
                })
    
                hadiahahah = await totalScore(soal)
    
                _tebakgambar[m.chat] = {}
                _tebakgambar[m.chat]['gameid'] = vlet.key.id
                _tebakgambar[m.chat]['soaltype'] = command
                _tebakgambar[m.chat]['jawaban'] = soal.jawaban.toLowerCase()
                _tebakgambar[m.chat]['hadiah'] = {}
                _tebakgambar[m.chat]['hadiah']['xp'] = hadiahahah.xp
                _tebakgambar[m.chat]['hadiah']['coin'] = hadiahahah.coin
    
                console.log("Jawaban: " + soal.jawaban)
                svdata()
                await sleep(2 * 60000)
                if (_tebakgambar[m.chat]) {
                    delete _tebakgambar[m.chat]
                    await reply(`⏱️ *Waktu Habis* 😩\n✠━━━━━━━━━━━━✠\n   *› Jawabanya:* ${soal.jawaban}\n✠━━━━━━━━━━━━✠\nIngin bermain lagi?  ketik :\n*#tebakgambar*`)
                }
            }
            break
            case 'cl':
            case 'ckl':
            case 'cakl':
            case 'caklon':
            case 'caklontong':{
                if (isInGame) return reply("Masih Ada Soal Yang Belum Diselesaikan!\nketik: *#nyerah*\nuntuk menyerah/mengakhiri soal")
    
                soal = await caklontong()
                vlet = await reply(`\n🤔 ${soal.soal}\n━━━━━━━━━━━—–·→\n *Silakan Jawab Soal Di Atas ini 😉*\n_*Waktu : 3 Menit*_`)
    
                hadiahahah = await totalScore(soal)
    
                _caklontong[m.chat] = {}
                _caklontong[m.chat]['gameid'] = vlet.key.id
                _caklontong[m.chat]['soaltype'] = command
                _caklontong[m.chat]['jawaban'] = soal.jawaban.toLowerCase()
                _caklontong[m.chat]['hadiah'] = {}
                _caklontong[m.chat]['hadiah']['xp'] = hadiahahah.xp
                _caklontong[m.chat]['hadiah']['coin'] = hadiahahah.coin
    
                svdata()
                console.log("Jawaban: " + soal.jawaban)
    
                await sleep(3 * 60000)
                if (_caklontong[m.chat]) {
                    delete _caklontong[m.chat]
                    await reply(`⏱️ *Waktu Habis* 😩\n✠━━━━━━━━━━━━✠\n   *› Soal:* ${soal.soal}\n   *› Jawabanya:* ${soal.jawaban}\n   *› Keterangan:* ${soal.deskripsi}\n✠━━━━━━━━━━━━✠\nIngin bermain lagi?  ketik :\n*#caklontong*`)
                }
            }
            break
            case 'f100':
            case 'familyseratus':
            case 'family100':{
                if (isInGame) return reply("Masih Ada Soal Yang Belum Diselesaikan!\nketik: *#nyerah*\nuntuk menyerah/mengakhiri soal")
    
                soal = await family100()
                console.log(JSON.stringify(soal ,null , 2))
                vlet = await reply(`\n🤔 ${soal.soal}\n━━━━━━━━━━━—–·→\n*Silakan Jawab Soal Di Atas ini 😉*\n\n_*Waktu : 2 Menit*_`)
    
                let hadia = {index: (Math.floor(Math.random() * (275 - 225 + 1) + 225)) / 2}
                hadiahahah = await totalScore(hadia)
                let jawablength = []
                for(let i = 0; i < soal.jawaban.length; i++){
                    jawablength.push('')
                }
    
                _family100[m.chat] = {}
                _family100[m.chat]['gameid'] = vlet.key.id
                _family100[m.chat]['soaltype'] = command
                _family100[m.chat]['jawaban'] = soal.jawaban
                _family100[m.chat]['jawab'] = jawablength
                _family100[m.chat]['hadiah'] = {}
                _family100[m.chat]['hadiah']['xp'] = hadiahahah.xp
                _family100[m.chat]['hadiah']['coin'] = hadiahahah.coin
    
                svdata()
                console.log("Jawaban: " + soal.jawaban)
    
                await sleep(2 * 60000)
                if (_family100[m.chat]) {
                    let benar = 0;
                    let tinggal = 0;
                    let hasilJawaban = ''
                    
                    _family100[m.chat].jawab.forEach((jawab, index) => {
                        if (jawab === _family100[m.chat].jawaban[index]) {
                            benar++;
                            hasilJawaban += `${index + 1}. ${jawab} ✅\n`
                        }else{
                            tinggal++;
                            hasilJawaban += `${index + 1}. ${_family100[m.chat].jawaban[index]} 🤔\n`
                        }
                    });
                    let json = JSON.parse(JSON.stringify(_family100[m.chat]))
                    delete _family100[m.chat]
                    await reply(`⏱️ *Waktu Habis* 😩\n✠━━━━━━━━━━━━✠\n\n╭─❒ 「 *🎉 SELAMAT 🎉* 」 \n│\n├→ ╭─( *🎁 Total Hadiah* )\n│     │\n│     ├💰 *Rp: ${json.hadiah.coin}* \n│     ├ 🧩 + *${json.hadiah.xp}* _XP_ \n│     ╰→\n╰❒ *Family 100* \n\n${hasilJawaban}\n\nketik Perintah:\n*#family100*\n\nUntuk bermain lagi 👍`)
                }
            }
            break
    
        }

    }catch(e){
        m.reply(util.format(e))
        console.log('error path:\n'+ __dirname+'\n\nerror log:\n'+e.stack)
    }finally{
        console.log('GAME-RPG → global.db ')
        svdata()
    }
}
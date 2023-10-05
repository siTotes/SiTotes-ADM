require('./src/options/settings')
const {
    default: makeWASocket,
    MessageType,
    Mimetype,
    BufferJSON,
    WAMessageStubType,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    downloadContentFromMessage,
    downloadHistory,
    proto,
    getMessage,
    generateWAMessageContent,
    prepareWAMessageMedia,
    generateWAMessage,
    areJidsSameUser,
    makeInMemoryStore,
    delay
} = require('@adiwajshing/baileys')
const fs = require('fs')
const chalk = require('chalk')
const speed = require('performance-now')
const moment = require("moment-timezone")
const path = require('path')

//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(`./src/.sitotes/data/database.json`, JSON.stringify(global.db, null, 2))
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
} = require('./lib/myfunc')
const {
    client
} = require('./lib/dbmongosle')
const {
    bytesToSize,
    fileIO,
    UploadFileUgu,
    telesticker,
    webp2mp4File,
    TelegraPh
} = require('./lib/uploader')
const gdapis = require('./lib/gdriveapis')
const cv = require('./lib/con2vert')
const lang = require('./src/options/lang_id')
const {
    toAudio,
    toPTT
} = require('./lib/converter')


const botdata = 'BD_SiTotes'
pp_bot = fs.readFileSync(logo)
moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = onic = async (onic, m, chatUpdate, mek, store, reSize) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const content = JSON.stringify(mek.message)
        const type = Object.keys(mek.message)[0];
        if (m && type == "protocolMessage") onic.ev.emit("message.delete", m.message.protocolMessage.key);
        const isCmd = /*mek.key.fromMe ? /^[$]/.test(body) : */ /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const cimmind = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : body.trim().split(' ').shift().toLowerCase()
        const from = mek.key.remoteJid
        const time = moment(Date.now()).tz(timezone).locale('id').format('HH:mm:ss z')
        const wita = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
        const wit = moment(Date.now()).tz('Asia/Jayapura').locale('id').format('HH:mm:ss z')
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const sender = m.isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
        const botNumber = onic.user.id ? onic.user.id.split(":")[0] + "@s.whatsapp.net" : onic.user.id
        const isCreator = ["62821931157232@s.whatsapp.net", "62887435047326@s.whatsapp.net", botNumber, ...global.ownno].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == onic.user.id ? true : false
        const text = q = args.join(" ")
        const c = args.join(' ')
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)

        // Group
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat) : ''
        const groupId = m.isGroup ? groupMetadata.id : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const groupMembers = m.isGroup ? await groupMetadata.participants : ''
        const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        const ini_mark = `0@s.whatsapp.net`
        const timestamp = m.messageTimestamp
        const timestampi = speed();
        const latensii = speed() - timestampi
        const pathbufc = `./src/session/Cache-Buffer/${m.chat}`

        if (!m.key.fromMe) return
        console.log(
            chalk.black(chalk.bgWhite(' \n|=| MSG |-> ')),
            chalk.black(chalk.bgYellow(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
            chalk.black(chalk.bgBlue(`\n ${budy || m.mtype} `)),
            chalk.black(chalk.bgMagenta(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
            chalk.greenBright(chalk.bgGray.bold(`\n |=> `, m.isGroup ? groupName : 'Private Chat', m.chat))
        )
        
        /*
        if (m.message) {
            const readkey = {
                remoteJid: m.chat,
                id: m.key.id,
                participant: m.isGroup ? m.key.participant : undefined
            }
            await onic.readMessages([readkey]);
        }
        */

        onic.addProsMsg = () => {
            let pe = db.data.proses.reaload ? (db.data.proses.reaload.messages ? db.data.proses.reaload.messages.length : 0) : 0
            if (pe > 0) {
                for (let i = 0; i < db.data.proses.reaload.messages.length; i++) {
                    if (db.data.proses.reaload.messages[i] == null) {
                        db.data.proses.reaload.messages.splice(i, 1);
                    } else if (db.data.proses.reaload.messages[i].count) {} else if (db.data.proses.reaload.messages[i].key.id == m.id) {

                    } else {
                        db.data.proses.reaload.messages.push(mek)
                    }
                }
            } else {
                db.data.proses = {}
                db.data.proses.reaload = {}
                db.data.proses.reaload.messages = []
                db.data.proses.reaload.messages.push(mek)
            }
        }
        onic.endProsMsg = () => {
            let pe = db.data.proses.reaload.messages ? db.data.proses.reaload.messages.length : 0
            if (pe > 0) {
                for (let i = 0; i < db.data.proses.reaload.messages.length; i++) {
                    if (db.data.proses.reaload.messages[i] == null) {
                        db.data.proses.reaload.messages.splice(i, 1);
                    } else if (db.data.proses.reaload.messages[i].key.id == m.id) {
                        db.data.proses.reaload.messages.splice(i, 1);
                    }
                }
            }
        }
        onic.addProsessInv = (ivent, evid, ccmd) => {
            if (db.data.proses.event ? false : true) db.data.proses.event = {}
            if (db.data.proses.event[ivent] ? false : true) db.data.proses.event[ivent] = []
            db.data.proses.event[ivent].push({
                jid: m.chat,
                qid: evid,
                cmd: ccmd
            })
        }
        onic.rmvProsessInv = () => {}

        let nua = 0
        const reply = async (teks) => {
            if (nua < 4) {
                await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
                nua = 999
            } else {
                await onic.sendMessage(m.chat, {
                    text: teks
                }, {
                    quoted: m
                })
            }
        }
        // console.log(JSON.stringify(quoted ,null , 2))
        switch (cimmind) {
            case 'u': {
                await reply(`Runtime : ${runtime(process.uptime())}`)
            }
            break
            case 'mc': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return await reply('Reply media brow')
                if (!quoted) return await reply('Tidak mereply apapun, reply media')
                if ((quoted.msg || quoted).seconds > 900) return await reply('Maximum 60 seconds!')
                await onic.sendReaction(m.chat, m.key, '🦶')
                let media = await quoted.download()
                let audio = await toAudio(media, 'mp4')
                await onic.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: false
                })
            }
            case 'vn': {
                if (!quoted) return await reply('Tidak mereply apapun, reply media')
                await onic.sendReaction(m.chat, m.key, '🦶')
                let vnot = (quoted.msg || quoted).fakeObj
                vnot.message.audioMessage.ptt = true
                await onic.sendMessageJson(m.chat, vnot)
            }
            break
            case 'lgc': {
                let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
                for (let i of anu) {
                    let metadata = await onic.groupMetadata(i)
                    teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : '-'}\n⬡ *ID :* https://${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
                }
                onic.sendTextWithMentions(m.chat, teks, m)
            }
            break
            case '*':
            case '×':
            case '🌟': {
                if(!quoted) return
                await onic.sendMessageJson(onic.user.id, (quoted.msg || quoted).fakeObj)
            }
            break
            case 'send': {
                if(!quoted) return
                if(!text) return
                await onic.sendMessageJson(text.replaceAll('https://', ''), (quoted.msg || quoted).fakeObj)
            }
            break
            // default:{
            // let users = m.mentionedJid[0] ? m.mentionedJid : (m.quoted?.contacts)? await onic.vcardGetJid(m) : m.quoted ? m.quoted.sender : text.includes('+')? await onic.textGetJid(text) : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            // reply(JSON.stringify(users, null, 2))
            // }
        }

    } catch (err) {
        /**/
        console.log(onic.printErr(err))
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err + '```')
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}
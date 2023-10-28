require('./src/options/settings')
const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@adiwajshing/baileys')
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const moment = require('moment-timezone');
const {
    getBuffer,
    hitungmundur,
    bytesToSize,
    checkBandwidth,
    runtime,
    fetchJson,
    getGroupAdmins,
    msToDate,
    isUrl,
    tanggal,
    delay
} = require('./lib/simple')

module.exports = onic = async (onic, m, chatUpdate, store, antilink, antiwame, antilink2, antiwame2, set_welcome_db, set_left_db, set_open, set_close, _welcome, _left) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' //omzee
        var budy = (typeof m.text == 'string' ? m.text : '')
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const cimmind = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : body.trim().split(' ').shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await onic.decodeJid(onic.user.id)
        const tanggal = moment().tz("Asia/Makassar").format("dddd, ll")
        const jam = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
        const salam = moment(Date.now()).tz("Asia/Makassar").locale('id').format('a')
        const isCreator = ["62887435047326@s.whatsapp.net", botNumber, ...global.ownno].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const from = m.chat
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
        const timestamp = m.messageTimestamp

        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
        
        const casee = (lib) => './src/commands/' + lib
        const runCase = async (runto, perfic = true) => {
            if (perfic) {
                if (isCmd) require(casee(runto))(onic, m, command, mek)
            } else {
                if (!isCmd) require(casee(runto))(onic, m, cimmind, mek)
            }

        }
        
        console.log(
            chalk.black(chalk.bgWhite(' \n|=| MSG |-> ')),
            chalk.black(chalk.bgYellow(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
            chalk.black(chalk.bgBlue(`\n ${budy || m.mtype} `)),
            chalk.black(chalk.bgMagenta(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
            chalk.greenBright(chalk.bgGray.bold(`\n |=> `, m.isGroup ? groupName : 'Private Chat', m.chat))
        )
        if (m.message) {
            await delay(3)
            await onic.readMessages([m.key])
        }
        
        switch (cimmind){
            case 'tt':
            case 'downloadtiktok':
            case 'tiktokunduh':
            case 'tiktok':
            case '---------------':
            case 'ig':
            case 'igdl':
            case 'igdownload':
            case 'igunduh':
            case 'igsv':
            case 'instagramdl':
            case 'instagram':
            case 'instagrams':
            case 'instagramsdl':
            case 'instagramunduh':
            case 'igreel':
            case 'igvideo':
            case 'igimage':
            case 'igpost':
            case '---------------':
            case 'youtube':
            case 'youtubedownload':
            case 'youtubedl':
            case 'ytdl':
            case 'youtubemp4':
            case 'youtubemp3':
            case 'ytmp4':
            case 'ytmp3':
            case 'ꈍ':
            case '---------------':
            case 'play':
            case 'mainkan':
            case 'music':
            case 'lagu':
            case '---------------':
            case 'play>':
            case 'mainkan>':
            case 'music>':
            case 'lagu>':
            case '⊡':
            case '---------------':
            case 'pinters':
            case 'pintrs':
            case 'pint':
            case 'pinimg':
            case 'pinterest':{
                await runCase('download-media', true)
            }
            break
            case 'asu':{
                await onic.sendPesan(m.chat, {
                    text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n``` + _ + ```'
                }, {
                    quoted: m
                })
                await reply('hjj')
                await replyEmo('hjj', '👍')
                await react('🤣')
            }
            break
        }

        

        


        

    }
    catch (err) {
        m.reply(util.format(err))
    }
}
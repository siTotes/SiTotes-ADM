//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const chalk = require('chalk')


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
const {
    igGetUrlDownload
} = require(home('./lib/igdownapis'))
const lang = require(home('./src/options/lang_id'))

//━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
const YoutubeMusicApi = require('youtube-music-api')
const ytcapi = new YoutubeMusicApi()

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        let text = q = args.join(" ")
        const nrgs = args[0]

        let nua = 0
        const reply = async (teks) => {
            if (nua < 4) {
                nua = 999
                return await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
            } else {
                return await onic.sendMessage(m.chat, {
                    text: teks
                }, {
                    quoted: m
                })
            }
        }

        const replyError = async (text, emoji) => {
            await onic.sendReaction(m.chat, m.key, emoji)
            await reply(text)
        }

        switch (command) {
            case 'tt':
            case 'downloadtiktok':
            case 'tiktokunduh':
            case 'tiktok': {
                if (!text) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'Url / link Video Tiktok'))
                }
                if (!isUrl(nrgs) && !nrgs.includes('tiktok.com')) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, text + ' 👈Ini bukan Url / Link Video tiktok'))
                }

                await onic.addProsMsg()
                await onic.sendReaction(m.chat, m.key, '⏳')
                let noerr = {
                    s: true,
                    l: ''
                }
                const tiktok = await TiktokDL(nrgs).catch(async _ => {
                    noerr.s = false
                    noerr.l = _
                })
                
                await tiktok
                await reply(JSON.stringify(tiktok))
                
                
                if (tiktok.status == 'success' || noerr.s) {
                    const tt = await tiktok.result
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    if(tt.type=='image'){
                        for (let i = 0; i < tt.images.length; i++) {
                            let url = tt.images[i]
                            await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                await onic.sendReaction(m.chat, m.key, '🤔')
                                await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                    await onic.sendReaction(m.chat, m.key, '❌')
                                    await onic.sendMessage(m.chat, {
                                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        }
                    }else if(tt.type=='video'){
                        for (let i = 0; i < tt.video.length; i++) {
                            let url = tt.video[i]
                            await onic.sendVideoUrl(m.chat, url, false, '', m).then(_=> i = 1000).catch(async _ => {
                                await onic.sendReaction(m.chat, m.key, '🤔')
                                await onic.sendVideoUrl(m.chat, url, false, '', m).then(_=> i = 1000).catch(async _ => {
                                    await onic.sendReaction(m.chat, m.key, '❌')
                                    await onic.sendMessage(m.chat, {
                                        text: '*Terjadi kesalahan mengirim kan ke anda Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        }
                    }else{
                        await replyError('Saya belum bisa mendownload Format '+tt.type+' ini', '😔')
                    }
                    for (let i = 0; i < tt.music.length; i++) {
                        let music = tt.music[i]
                        await onic.sendMessage(m.chat, {
                            audio: {
                                url: music
                            },
                            mimetype: 'audio/mpeg',
                            ptt: false,
                        }, {
                            quoted: m
                        })
                    }
                    
                    
                    await onic.sendReaction(m.chat, m.key, '✅')
                } else {
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await onic.sendMessage(m.chat, {
                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa periksa link di web,*\n*tolong bagikan ke owner:*\n\n```' + noerr.l + '```'
                    }, {
                        quoted: m
                    })
                }
            }
            break
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
            case 'igpost': {
                if (!text) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'Url / link Video, gambar, story atau reels orang yang bisa di copy atau di bagikan di instagram'))
                }
                if (!isUrl(nrgs) && !nrgs.includes('instagram.com')) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, text + ' 👈Ini bukan Url / Link url instagram'))
                }

                await onic.addProsMsg()
                await onic.sendReaction(m.chat, m.key, '⏳')
                let noerr = {
                    s: true,
                    l: ''
                }
                const output = await igGetUrlDownload(nrgs).catch(async _ => {
                    noerr.s = false
                    noerr.l = _
                })

                if (noerr.s) {
                    if (output.data ? false : true) {
                        await onic.sendReaction(m.chat, m.key, '❌')
                        return reply('*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + (onic.isJson(output) ? JSON.stringify(output, null, 2) : output) + '```')
                    }
                    for (let i = 0; i < output.data.length; i++) {
                        if (i === 5) {
                            break;
                        }
                        let url = output.data[i].url
                        if (output.data[i].type == 'video') {
                            await onic.sendReaction(m.chat, m.key, '✈️')
                            await onic.sendVideoUrl(m.chat, url, false, '', m).catch(async _ => {
                                await onic.sendReaction(m.chat, m.key, '🤔')
                                await onic.sendVideoUrl(m.chat, url, false, '', m).catch(async _ => {
                                    await onic.sendReaction(m.chat, m.key, '❌')
                                    await onic.sendMessage(m.chat, {
                                        text: '*Terjadi kesalahan mengirimkan ke anda Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        } else if (output.data[i].type == 'image') {
                            await onic.sendReaction(m.chat, m.key, '✈️')
                            await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                await onic.sendReaction(m.chat, m.key, '🤔')
                                await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                    await onic.sendReaction(m.chat, m.key, '❌')
                                    await onic.sendMessage(m.chat, {
                                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        } else {
                            reply('*Bot belum bisa mendownload dan mengirim format ini*\n\n```' + output[i].type + '```')
                        }
                        await onic.sendReaction(m.chat, m.key, '✅')
                    }
                } else {
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await onic.sendMessage(m.chat, {
                        text: '*Terjadi kesalahan Coba ulang kak*,\n*jika masih tidak bisa periksa link di web,\ntolong bagikan ke owner:*\n\n```' + noerr.l + '```'
                    }, {
                        quoted: m
                    })
                }
            }
            break
            case 'youtube':
            case 'youtubedownload':
            case 'youtubedl':
            case 'ytdl':
            case 'youtubemp4':
            case 'youtubemp3':
            case 'ytmp4':
            case 'ytmp3':
            case 'ꈍ' : {
                if(!command.includes('ꈍ')){
                    //return reply('Fitur sedang di perbaiki dan tidak bisa di gunakan terlebih dahulu')
                    if (!text) {
                        await onic.sendReaction(m.chat, m.key, '❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                    }
                    if (!isUrl(q)) {
                        await onic.sendReaction(m.chat, m.key, '❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                    }
                    if (!text.includes('youtu.be') && !text.includes('youtube.com')) {
                        await onic.sendReaction(m.chat, m.key, '❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/7wfSvv4AHsQ'))
                    }
                }else{
                    text = 'https://music.youtube.com/watch?v=' + text.split('\n\n◕ ')[1]
                }

                // await onic.addProsMsg()
                await onic.sendReaction(m.chat, m.key, '⏳')
                let noerr = true

                const {
                    thumbnail,
                    video: _video,
                    audio: _audio,
                    title
                } = await youtubedl(text).catch(async _ => await youtubedlv2(text)).catch(async _ => noerr = false)

                if (noerr) {
                    if (command.includes('mp3') || command.includes('ꈍ') ) {
                        await onic.sendReaction(m.chat, m.key, '✈️')
                        await onic.sendMessage(m.chat, {
                            audio: {
                                url: await _audio[Object.keys(_audio)[0]].download()
                            },
                            mimetype: 'audio/mpeg',
                            ptt: false,
                            contextInfo: {
                                forwardingScore: 999,
                                isForwarded: true,
                                externalAdReply: {
                                    containsAutoReply: true,
                                    showAdAttribution: true,
                                    renderLargerThumbnail: true,
                                    title: title,
                                    body: '© ' + ownername,
                                    thumbnail: await onic.axiosUrlToBuffer2(thumbnail),
                                    mediaType: 1,
                                    mediaUrl: await _audio[Object.keys(_audio)[0]].download(),
                                }
        
                            }
                        }, {
                            quoted: m
                        }).catch(async _ => await replyError('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```', '❌'))

                        await onic.sendReaction(m.chat, m.key, '✅')
                    } else {
                        let resoluse = Object.getOwnPropertyNames(_video)
                        let resohigh = []
                        let listreso = 'Pilih salasatu resolusi yang sesuai contoh ketik 1 untuk yang paling hd\n'
                        for (let i = 0; i < resoluse.length; i++) {
                            if (resohigh[i] == 'auto') {} else {
                                resohigh.push(resoluse[i].split('p')[0])
                            }
                        }
                        resohigh = resohigh.sort(function(a, b) {
                            return b - a
                        })
                        for (let i = 0; i < resohigh.length; i++) {
                            if (resohigh[i] == 'auto') {} else {
                                resohigh[i] = resohigh[i] + 'p'
                            }
                            sizevid = _video[resohigh[i]].fileSize * 1000
                            if (!+sizevid) sizevid = await onic.getUrlTotalSize(await _video[resohigh[0]].download())
                            listreso = listreso + '\n' + (i + 1) + '. ' + resohigh[i] + ' → ' + await onic.caculedSize(await sizevid)
                            if (resohigh.length - 1 == i) listreso = listreso + '\n\nInfo Aja Jika ukuran nya lebih dari 48 mb video akan di kirim bentuk link, yang harus didownload manual'
                        }
                        let url = await _video[resohigh[0]].download()
                        //await reply(url)
                        await onic.sendReaction(m.chat, m.key, '✈️')
                        if (_video[resohigh[0]].fileSize * 1000 > 50000000) {
                            let nu = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

                            let v = 0
                            for (let i = 0; i < resohigh.length; i++) {
                                if (v == 1) {} else {
                                    if (_video[resohigh[i]].fileSize * 1000 < 50000000) {
                                        url = await _video[resohigh[i]].download()
                                        console.log(url)
                                        v++
                                    }
                                }
                            }


                            await onic.sendReaction(m.chat, m.key, nu[resohigh.length])
                            if (v == 1) {
                                await onic.sendVideoUrl(m.chat, await url, false, '', m)
                            } else {
                                await reply(`🗃️ ${await onic.caculedSize(await _video[resohigh[0]].fileSize*1000)}\n${url}\n\nUkuran Media terlalu besar, jadi kami kirim kan link alternatif aja 😉`)
                            }
                        } else {
                            await onic.sendVideoUrl(m.chat, url, false, '', m)
                        }
                        await onic.sendReaction(m.chat, m.key, '✅')
                    }
                } else {
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await reply('Periksa Link anda apakah error jika tidak, coba ulang, Jika masih tidak bisa Hubungi Owner Jika perlu')
                }


            }
            break
            case 'play':
            case 'mainkan':
            case 'music':
            case 'lagu': {
                await onic.sendReaction(m.chat, m.key, '⏳')
                await ytcapi.initalize()

                let result = JSON.parse(JSON.stringify(await ytcapi.getSearchSuggestions(text)))
                if (await result[0] ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                for (let i = 0; i<result.length; i++){
                    result[i] =  `⊡ ${result[i]}`
                }
                if(!Array.isArray(result)) result = [
                    '⊡ '+result,
                    '⊡ '+result+' terbaru',
                    '⊡ '+result+' slow'
                ]
                await onic.sendReaction(m.chat, m.key, '✈️')
                await onic.sendPoll(m.chat, 'Menemukan '+result.length+' Saran pencarian di YouTube Music.\nPilih salah satu Untuk mencari:', result)

                await onic.sendReaction(m.chat, m.key, '✅')
                
                /*
                await onic.sendReaction(m.chat, m.key, '⏳')
                await ytcapi.initalize()
                let teks
                let pos
                if (text.includes(' >')) {
                    teks = text.split(' >')[0]
                    pos = text.split(' >')[1]
                } else {
                    teks = text
                    pos = 0
                }
                let result = await ytcapi.getSearchSuggestions(teks)
                if (result[0] ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                if (result.length < pos) return await reply('Hanya menemukan ' + result.length + ' Lagu saja, permintaan anda terlalu jauh')
                let resu = await ytcapi.search(result[0])
                resu.content = await resu.content.filter(item => item.type === "song")
                try {
                    const {
                        thumbnail,
                        audio: _audio,
                        title
                    } = await youtubedl('https://music.youtube.com/watch?v=' + await resu.content[pos].videoId).catch(async _ => await youtubedlv2('https://music.youtube.com/watch?v=' + resu.content[pos].videoId)).catch(async _ => noerr = false)
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    await onic.sendMessage(m.chat, {
                        audio: {
                            url: await _audio[Object.keys(_audio)[0]].download()
                        },
                        mimetype: 'audio/mpeg',
                        ptt: false,
                        contextInfo: {
                            externalAdReply: {
                                title: title,
                                body: '© ' + ownername,
                                thumbnail: await onic.axiosUrlToBuffer2(thumbnail),
                                sourceUrl: myweb,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                mediaType: 1
                            }
                        }
                    }, {
                        quoted: m
                    }).catch(async _ => await replyError('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```', '❌'))

                    await onic.sendReaction(m.chat, m.key, '✅')
                } catch (err) {
                    console.log(onic.printErr(err))
                    await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '\n\n' + JSON.stringify(result, null, 2) + '\n\n' + JSON.stringify(resu, null, 2) + '```')
                }
                */

            }
            break
            case 'play>':
            case 'mainkan>':
            case 'music>':
            case 'lagu>':
            case '⊡': {
                await onic.sendReaction(m.chat, m.key, '⏳')
                await ytcapi.initalize()
                if (text ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                let data = await ytcapi.search(text)
                data.content = data.content.filter(item => item.type === "song")
                data.content = data.content.map((item) => `ꈍ ${item.name}\n⊡ ${item.artist.name}\n\n◕ ${item.videoId}`)
                await onic.sendReaction(m.chat, m.key, '✈️')
                await onic.sendPoll(m.chat, 'Menemukan '+data.content.length+' Lagu di YouTube Music.\nPilih salah satu Untuk memainkan:', data.content)
                await onic.sendReaction(m.chat, m.key, '✅')
            }
            break

        }

    } catch (err) {
        /**/
        console.log(onic.printErr(err))
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```')
    } finally {
        onic.endProsMsg()
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}
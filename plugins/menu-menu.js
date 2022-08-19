import db from '../lib/database.js'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {
try {
let vn = './media/menu.mp3'
let pp = './Menu2.jpg'
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(db.data.users).length
let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender    
let userm = `@${who.replace(/@.+/, '')}` 
        

let str = `
*HOLA ✨${userm}✨, ESTE ES EL MENU DE INICIO DE JEIRONY*

*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

*<INFORMACION DEL BOT/> + <UNE UN BOT A TU GRUPO/>*

° ඬ ⃟ 💟 _${usedPrefix}info-bot_



<ACTIVAR O DESACTIVAR/>

${usedPrefix}enable welcome
${usedPrefix}disable welcome
${usedPrefix}enable modohorny
${usedPrefix}disable modohorny
${usedPrefix}enable antilink
${usedPrefix}disable antilink
${usedPrefix}enable antilink2
${usedPrefix}disable antilink2
${usedPrefix}enable detect
${usedPrefix}disable detect
${usedPrefix}enable audios
${usedPrefix}disable audios
${usedPrefix}enable autosticker
${usedPrefix}disable autosticker

<REPORTES DE FALLOS/>

${usedPrefix}reporte <texto>

<DESCARGAS/>

${usedPrefix}facebook <enlace / link / url>
${usedPrefix}instagram <enlace / link / url>
${usedPrefix}mediafire <enlace / link / url>
${usedPrefix}instagram <enlace / link / url>
${usedPrefix}gitclone <enlace / link / url>
${usedPrefix}tiktok <enlace / link / url>
${usedPrefix}ytmp3 <enlace / link / url>
${usedPrefix}ytmp4 <enlace / link / url>
${usedPrefix}ytmp3doc <enlace / link / url>
${usedPrefix}ytmp4doc <enlace / link / url>
${usedPrefix}play.1 <texto / enlace / link / url>
${usedPrefix}play.2 <texto / enlace / link / url>
${usedPrefix}play <texto>
${usedPrefix}playdoc <texto>
${usedPrefix}spotify <texto>
${usedPrefix}imagen <texto>
${usedPrefix}pinteret <texto>
${usedPrefix}wallpaper <texto>
${usedPrefix}wallpaper2 <texto>
${usedPrefix}pptiktok <nombre de usuario>
${usedPrefix}igstalk <nombre de usuario>
${usedPrefix}igstory <nombre de usuario>
${usedPrefix}tiktokstalk <nombre de usuario>

<GRUPOS/> 

${usedPrefix}add <numero>
${usedPrefix}kick <@tag>
${usedPrefix}grupo <abrir / cerrar>
${usedPrefix}promote <@tag>
${usedPrefix}demote <@tag>
admins <texto> (𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)
${usedPrefix}demote <@tag>
${usedPrefix}infogroup
${usedPrefix}link
${usedPrefix}setname <texto>
${usedPrefix}setdesc <texto>
${usedPrefix}invocar <texto>
${usedPrefix}setwelcome <texto>
${usedPrefix}setbye <texto>
${usedPrefix}hidetag <texto>

<CONVERTIDORES/>

${usedPrefix}toimg <responde a un sticker>
${usedPrefix}tomp3 <responde a un video / nota de voz>
${usedPrefix}toptt <responde a un video / audio>
${usedPrefix}tovideo <responde a un audio>
${usedPrefix}tourl <responde a un video / imagen / audio>
${usedPrefix}tts es <texto>

<EFECTOS Y LOGOS/>

${usedPrefix}logos <efecto> <texto>
${usedPrefix}simpcard <@tag>
${usedPrefix}hornycard <@tag>
${usedPrefix}lolice <@tag>
${usedPrefix}ytcomment <texto>
${usedPrefix}itssostupid
${usedPrefix}pixelar
${usedPrefix}blur

<RANDOM/>

${usedPrefix}cristianoronaldo
${usedPrefix}messi
${usedPrefix}meme
${usedPrefix}itzy
${usedPrefix}blackpink
${usedPrefix}kpop <blackpink / exo / bts>
${usedPrefix}lolivid
${usedPrefix}loli
${usedPrefix}navidad
${usedPrefix}ppcouple
${usedPrefix}neko
${usedPrefix}waifu
${usedPrefix}akira
${usedPrefix}akiyama
${usedPrefix}anna
${usedPrefix}asuna
${usedPrefix}ayuzawa
${usedPrefix}boruto
${usedPrefix}chiho
${usedPrefix}chitoge
${usedPrefix}deidara
${usedPrefix}erza
${usedPrefix}elaina
${usedPrefix}eba
${usedPrefix}emilia
${usedPrefix}hestia
${usedPrefix}hinata
${usedPrefix}inori
${usedPrefix}isuzu
${usedPrefix}itachi
${usedPrefix}itori
${usedPrefix}kaga
${usedPrefix}kagura
${usedPrefix}kaori
${usedPrefix}keneki
${usedPrefix}kotori
${usedPrefix}kurumi
${usedPrefix}madara
${usedPrefix}mikasa
${usedPrefix}miku
${usedPrefix}minato
${usedPrefix}naruto
${usedPrefix}nezuko
${usedPrefix}sagiri
${usedPrefix}sasuke
${usedPrefix}sakura
${usedPrefix}cosplay

<COMANDOS +𝟙𝟠/>

${usedPrefix}pack
${usedPrefix}pack2
${usedPrefix}pack3
${usedPrefix}videoxxx
${usedPrefix}tetas
${usedPrefix}booty
${usedPrefix}ecchi
${usedPrefix}furro
${usedPrefix}imagenlesbians
${usedPrefix}panties
${usedPrefix}pene
${usedPrefix}porno
${usedPrefix}porno2
${usedPrefix}randomxxx
${usedPrefix}pechos
${usedPrefix}yaoi
${usedPrefix}yaoi2
${usedPrefix}yuri
${usedPrefix}yuri2
${usedPrefix}trapito
${usedPrefix}hentai
${usedPrefix}pies
${usedPrefix}nsfwloli
${usedPrefix}nsfworgy
${usedPrefix}nsfwfoot
${usedPrefix}nsfwass
${usedPrefix}nsfwbdsm
${usedPrefix}nsfwcum
${usedPrefix}nsfwero
${usedPrefix}nsfwfemdom
${usedPrefix}nsfwglass

<EFECTOS DE AUDIOS/>
RESPONDE A UN AUDIO O NOTA DE VOZ

${usedPrefix}bass
${usedPrefix}blown
${usedPrefix}deep
${usedPrefix}earrape
${usedPrefix}fast
${usedPrefix}fat
${usedPrefix}nightcore
${usedPrefix}reverse
${usedPrefix}robot
${usedPrefix}slow
${usedPrefix}smooth
${usedPrefix}tupai

<CHAT ANONIMO/>

${usedPrefix}start
${usedPrefix}next
${usedPrefix}leave

<BUSCADORES/>

${usedPrefix}animeinfo <texto>
${usedPrefix}google <texto>
${usedPrefix}letra <texto>
${usedPrefix}wikipedia <texto>
${usedPrefix}ytsearch <texto>

<AUDIOS/> 
- ESCRIBE LAS SIGUIENTES PALABRAS O FRASES SIN NINGUN PREFIJO (#, /, , .) 
(uso sin prefijo)

Quien es tu sempai botsito 7w7
Te diagnostico con gay
A nadie le importa
Fiesta del admin
Fiesta del administrador 
Vivan los novios
Feliz cumpleaños
Noche de paz
Buenos dias
Buenos tardes
Buenos noches
Audio hentai
Chica lgante
Feliz navidad
Vete a la vrg
Pasa pack Bot
Atencion grupo
Marica quien
Murio el grupo
Oh me vengo
Viernes
Baneado
Sexo
Hola
Un pato
Nyanpasu
Te amo
Yamete
Bañate
Es puto
La biblia
Onichan
Mierda de Bot
Siuuu
Rawr
UwU
:c
a

<HERRAMIENTAS/>

 ${usedPrefix}afk <motivo>
 ${usedPrefix}acortar <enlace / link / url>
 ${usedPrefix}calc <operacion math>
 ${usedPrefix}del <respondre a mensaje del Bot>
 ${usedPrefix}qrcode <texto>
 ${usedPrefix}readmore <texto1| texto2>
 ${usedPrefix}spamwa <numero|texto|cantidad>
 ${usedPrefix}styletext <texto>
 ${usedPrefix}traducir <texto>

<RPG - LIMITES - ECONOMIA/>

 ${usedPrefix}balance
 ${usedPrefix}claim
 ${usedPrefix}top
 ${usedPrefix}levelup
 ${usedPrefix}myns
 ${usedPrefix}perfil
 ${usedPrefix}work
 ${usedPrefix}minar
 ${usedPrefix}buy
 ${usedPrefix}buyall
 ${usedPrefix}transfer <tipo> <cantidad> <@tag>
 ${usedPrefix}verificar
 ${usedPrefix}unreg <numero de serie>

<STICKERS/>

${usedPrefix}sticker <responder a imagen o video>
${usedPrefix}sticker <enlace / link / url>
${usedPrefix}s <responder a imagen o video>
${usedPrefix}s <enlace / link / url>
${usedPrefix}emojimix <emoji 1>&<emoji 2>
${usedPrefix}semoji <tipo> <emoji>
${usedPrefix}attp <texto>
${usedPrefix}ttp <texto>
${usedPrefix}pat <@tag>
${usedPrefix}slap <@tag>
${usedPrefix}kiss <@tag>
${usedPrefix}dado
${usedPrefix}wm <packname> <author>
${usedPrefix}stickermarker <efecto> <responder a imagen>
${usedPrefix}stickerfilter <efecto> <responder a imagen>

<OWNER Y MODERADORES/>

${usedPrefix}cajafuerte
${usedPrefix}enable restrict
${usedPrefix}disable restrict
${usedPrefix}enable autoread
${usedPrefix}disable autoread
${usedPrefix}enable public
${usedPrefix}disable public
${usedPrefix}enable pconly
${usedPrefix}disable pconly
${usedPrefix}enable gconly
${usedPrefix}disable gconly
${usedPrefix}banchat
${usedPrefix}unbanchat
${usedPrefix}banuser <@tag>
${usedPrefix}unbanuser <@tag>
${usedPrefix}banuser <@tag>
${usedPrefix}bc <texto>
${usedPrefix}bcchats <texto>
${usedPrefix}bcgc <texto>
${usedPrefix}cleartpm
${usedPrefix}restart
${usedPrefix}update
${usedPrefix}addprem <@tag>
${usedPrefix}delprem <@tag>
${usedPrefix}listprem
`.trim()
let mentionedJid = [who]
conn.sendButton(m.chat, str, wm, pp, 
/*conn.sendHydrated2(m.chat, str, wm, pp, 'https://www.facebook.com/JEISON JEISON', 'FACEBOOK', */[
['📮 DONAR 📮', '/donasi'],
['🌹 OWNER 🌹', '/owner'],
['🐾 INFOBOT 🐾', '/infobot']
], '', { contextInfo: { mentionedJid }})

    
    
/*await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true})*/

} catch (e) {
conn.reply(m.chat, '*[❗INFO❗] EL MENU TIENE UN ERROR Y NO FUE POSIBLE ENVIARLO, REPORTELO AL PROPIETARIO DEL BOT*', m)
throw e
}}
handler.command = /^(menu|menú|memu|memú|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos)$/i
handler.exp = 50
handler.fail = null
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}


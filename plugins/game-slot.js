/* CREDITOS A https://github.com/FG98F */

import db from '../lib/database.js'
let handler = async (m, { args, usedPrefix, command }) => {
let fa = `
*[â] INGRESA LA CANTIDAD QUE DESEA APOSTAR* 

*ð EJEMPLO:*
*${usedPrefix + command} 100*`.trim()
if (!args[0]) throw fa
if (isNaN(args[0])) throw fa
let apuesta = parseInt(args[0])
let users = db.data.users[m.sender]
let time = users.lastslot + 10000
if (new Date - users.lastslot < 10000) throw `*â³ ESPERE ${msToTime(time - new Date())} PARA VOLVER A APOSTAR*`
if (apuesta < 100) throw '*[â] EL MINIMO PARA APOSTAR ES DE ð·00 XP*'
if (users.exp < apuesta) {
throw `*[â] TU XP NO ES SUFICIENTE PARA APOSTAR ESA CANTIDAD, ð¹UEGA OTROS JUEGOS O INTERACTUA CON EL BOT PARA GANAR MAS XP*`
}
let emojis = ["ð", "ð", "ðï¸"];
let a = Math.floor(Math.random() * emojis.length);
let b = Math.floor(Math.random() * emojis.length);
let c = Math.floor(Math.random() * emojis.length);
let x = [],
y = [],
z = [];
for (let i = 0; i < 3; i++) {
x[i] = emojis[a];
a++;
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b];
b++;
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c];
c++;
if (c == emojis.length) c = 0;
}
let end;
if (a == b && b == c) {
end = `*GANASTE! ð +${apuesta + apuesta} XP*`
users.exp += apuesta
} else if (a == b || a == c || b == c) {
end = `*ð® CASI LO LOGRAS!, SIGUE INTENTANDO*\n*TOMA +10 XP*`
users.exp += 10
} else {
end = `*â PERDISTE -${apuesta} XP*`
users.exp -= apuesta
}
users.lastslot = new Date * 1
return await m.reply(
        `
ð° | *SLOTS* 
ââââââââ
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
ââââââââ
ð° | ${end}`) 
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']
export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s "
}


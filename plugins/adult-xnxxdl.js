import db from '../lib/database.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*'
if (!args[0]) throw `*[❗INFO❗] INGRESE UN ENLACE VALIDO DE XNXX, EJEMPLO: ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`
try {
await conn.reply(m.chat, '[❗] El video esta siendo procesado, espere un momento en lo que es enviado..\n\n﹣ EL TIEMPO DE ENVIO DEPENDE DEL PESO Y DURACIÓN DEL VIDEO', m)
let res = await fetch(`https://zenzapis.xyz/downloader/xnxx?apikey=${keysxxx}&url=`+args[0])
let json = await res.json()
if (json.result?.message) throw json.result.message
let teks = `*⭔ Titulo:* ${json.result.title}`
conn.sendMessage(m.chat, { video: { url: json.result.files.high }, caption: teks }, { quoted: m })
} catch (e) {
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*')
console.log(e)
}}
handler.command = /^(xnxxdl)$/i
export default handler

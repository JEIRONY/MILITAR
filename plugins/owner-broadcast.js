import Connection from '../lib/connection.js'
import fs from 'fs'
let handler = async (m, { conn, text } ) => {  
let chatsall = Object.entries(Connection.conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
for (let id of chatsall) { 
conn.sendButton(id, `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*`, '_ESTE ES UN COMUNICADO OFICIAL_\n' + wm, fs.readFileSync('./src/avatar_contact.png'), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { 
contextInfo: { externalAdReply: {
title: 'COMUNICADO OFICIAL A TODOS LOS CHATS',
body: 'BY 🌎ANI MX SCANS🌏', 
sourceUrl: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD`, 
thumbnail: fs.readFileSync('./Menu2.jpg') }}})}
m.reply(`*[❗INFO❗] MENSAJE ENVIADO A TODOS LOS CHATS*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`)
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i
handler.rowner = true
export default handler

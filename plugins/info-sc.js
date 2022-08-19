import fs from 'fs'
let handler = async (m, { conn }) => {
conn.reply(m.chat, `*NO*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'SCRIPT WHATSAPP BOT MD',
body: 'JEIRONY',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `NO`}}})
}
handler.command = ['sc','script']
handler.help = ['sc']
handler.tags = ['General']
export default handler

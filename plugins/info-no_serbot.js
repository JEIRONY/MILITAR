let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let text = `*[βINFOβ] LAS FUNCIONES PARA SER BOT (#ππππππ, #πππππππ, #ππππ, #πππππππ, #πππππππ, #πππππππππ) NO ESTAN ACTUALMENTE FUNCIONALES PARA ESTE BOT (JEIRONY)*

`.trim()   
conn.reply(m.chat, text, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'INFORMACION - SERBOT',
body: 'πJEIRONYπ',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: ` NO`}}})   
}
handler.command = /^(jadibot|serbot|bots|subbots|getcode)/i
export default handler

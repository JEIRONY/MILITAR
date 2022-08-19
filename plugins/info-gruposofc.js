let media = './Menu2.jpg'
let handler = async (m, { conn, command }) => conn.sendButton(m.chat, `
*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot ANI MX SCANS*

*_➤ Grupos oficiales del Bot:_*
 NO HAY XD
`.trim(), wm, media, [['IR AL MENU PRINCIPAL', '.menu']], m)
handler.command = /^linkgc|grupos$/i
export default handler

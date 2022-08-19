/* ⚠ POR FAVOR NO MODIFIQUES NADA DE AQUÍ ⚠ */

let handler = async (m, { conn, usedPrefix, command }) => {
let name = await conn.getName(m.sender)
let donar =`
*┏ ┅ ━━━━━━━━━ ┅ ━*
*┇          「 DONAR 」*
*┣ ┅ ━━━━━━━━━ ┅ ━*
*┃ HOLA ${name} 💙*
*┃*
*┃ 👉🏻 AQUI ALGUNOS DATOS*
*┃ POR SI GUSTAS APOYAR :𝟹*

*┃ ➤ CONCEPTO: APOYO*  
*┃ ➤ PAYPAL: https://www.paypal.me/serviciosjava*
*┃ ➤ NEQUI: 3152139466
*┃*
*┃ 👉🏻 CONTACTAME SI* 
*┃ NECESITAS MAS*
*┃ DATOS Y PARA* 
*┃ AGRADECERTE <𝟹*
*┃ wa.me/573152139466*
*┗ ┅ ━━━━━━━━━ ┅ ━*
`.trim()
conn.sendHydrated(m.chat, donar, wm, null, 'https://www.paypal.me/serviciosjava', 'PAYPAL', null, null, [['MENU PRINCIPAL', '/menu']], m)}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)|donar|apoyar$/i
export default handler

import db from '../lib/database.js'
let linkRegex = /https:/i
export async function before(m, { isAdmin, isBotAdmin, text }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = db.data.chats[m.chat]
let bot = db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
if (chat.antiLink2 && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
const linkThisGroup2 = `https://www.youtube.com/`
const linkThisGroup3 = `https://youtu.be/`
if (m.text.includes(linkThisGroup)) return !0
if (m.text.includes(linkThisGroup2)) return !0
if (m.text.includes(linkThisGroup3)) return !0
}    
await this.sendButton(m.chat, `*γ ANTI LINKS γ*\n*ADIOS CAMPEON π, ${await this.getName(m.sender)} ACABAS DE ENVIAR LINK NO AUTORIZADO *${isBotAdmin ? '' : '\n\n*[βINFOβ] EL BOT NO ES ADMIN, NO PUEDE ELIMINAR A LAS PERSONAS*'}`, author, ['DESACTIVAR ANTILINKS', '/disable antilink'], m)    
if (isBotAdmin && bot.restrict) {
await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return m.reply('*[βINFOβ] EL PROPIEARIO DEL BOT NO TIEIE HABILITADO LAS RESTRICCIONES (#ππππππ ππππππππ) CONTACTE CON EL PARA QUE LO HABILITE*')
}
return !0
}

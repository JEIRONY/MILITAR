// TODO: reduce global variabel usage

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)

import './config.js';
import { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
} from 'fs'
import {
  spawn
} from 'child_process'
import {
  tmpdir
} from 'os'
import {
  protoType,
  serialize
} from './lib/simple.js'
import {
  plugins,
  filesInit,
  reload
} from './lib/plugins.js'
import Connection from './lib/connection.js'
import Helper from './lib/helper.js'
import db, { loadDatabase } from './lib/database.js'
import chalk from 'chalk'

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()
if (db.data == null) loadDatabase()

Object.assign(global, Helper)
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(Connection.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

// global.opts['db'] = process.env['db']

const conn = await Connection.conn

// load plugins
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.(mc)?js$/.test(filename)
filesInit(pluginFolder, pluginFilter, conn).then().catch(console.error)

Object.freeze(reload)


if (!opts['test']) {
  setInterval(async () => {
    if (db.data) await db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()
    } catch (e) { console.error(e) }
    Connection.store.writeToFile(Connection.storeFile)
  }, 60 * 1000)
}
if (opts['server']) (await import('./server.js')).default(conn, PORT)


function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

Connection.conn.welcome = '*╔══════════════*\n*╟❧ @subject*\n*╠══════════════*\n*╟❧ @user*\n*╟❧ BIENVENIDO* \n*║*\n*╟❧ LEE LA DESCRIPCION DEL GRUPO*\n*║*\n*❧ SI NECESITAS AYUDA EN ALGO CONTACTAME*\n*╚════════════*'
Connection.conn.bye = '╔══════════════*\n*║〘 *ADIÓS* 〙*\n*╠══════════════*\n║*_☠ SE NOS VA UN GUERRERO @user_*\n║*_Si no regresa..._*\n║ *PERO NOS QUEDA SUS RECUERDOS *\n*╚══════════════*'
Connection.conn.spromote = '*@user SE SUMA AL GRUPO DE ADMINS!!*'
Connection.conn.sdemote = '*@user ABANDONA EL GRUPO DE ADMINS !!*'
Connection.conn.sSubject = '*SE HA MODIFICADO EL NOMBRE DEL GRUPO*\n*NUEVO NOMBRE:* @subject'

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)
/*
  if (!s.ffmpeg) (conn?.logger || console).warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) (conn?.logger || console).warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) (conn?.logger || console).warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
*/
}
setInterval(async () => {
var a = await clearTmp()
console.log(chalk.cyanBright(`\n▣────────[ AUTOCLEARTMP ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 180000)
_quickTest()
.then()
.catch(console.error)

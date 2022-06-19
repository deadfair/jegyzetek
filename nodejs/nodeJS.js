// NODEJS:
// js futtatási környezet     // NEM keretrendszer, NEM programozási nyel
// VAN global object          // nincs DOOM, nincs WINDOW
// 1 szál, minden más aszinkron
// MIRE JÓ? => API szerverek készítése, Streamingre, Microservisek, Real-time appok írására
// Weboldalak kiszolgálása, CLI alkalmazások írására, keresztplatform mobil/asztali alkalmazások írására

//-------------------------------------------------------------------
// Beépített NODE consolos parancsok: 
// .help:     súgó
// .editor:   többsoros kód írását könnyíti meg
// .break:    többsoros kifejezés létrehozása
// .clear:    a REPL visszaállítása
// .load:     JS file betöltése
// .save:     REPL munkamenet fájlba mentése
// .exit:     kilépés

// REPL gyorsbillentyűk
// Arrow up/down: előző/következő parancs
// Tab:           lokális/globális változók kiírása v. kódkiegészítés
// Ctrl + C:      .break parancs
// Dupla Ctrl + C:.exit parancs
// Ctrl + D:      .exit parancs

//-------------------------------------------------------------------
// npm init VAGY npm init --yes         // a json filet-t elkészíti, inicializál egy node projektet

// npx eslint --init                    // szigorú bácsi aki figyeli hogy elrontunk e vmit a kódba
// syntax + problems + code style => CommonJS => none => No => Node => popular => standard => JSON => JES

// .gitignore    => // node_modules     // nem tölti fel a node_modules mappát
// VAGY gitignore extension =>          //  (CTRL + SHIFT + p) => >Add  gitignore => enter => Node

// node index.js            // futtatás
// VAGY // package.json: 
// "scripts": {"start": "node index.js"},
// npm run start            // futtatás

//-------------------------------------------------------------------
// HA "type": "module"      // => minden .js => .mjs
// export fgv1 = () => {}  
// export fgv2 = () => {}  
// import {fgv1 as func} from './elérés.mjs'  // .mjs esetén

function fgv1(){return}
module.exports = Object.freeze(fgv1)  // MINDIG FAGYASSZUK hogy ne irják a legfelsőbb rétegét a külső fileok felül
module.exports = {fgv1,fgv2}     // így objektet akár többet             // NEMED export
module.exports = {fgv2:fgv1}     // átnevezés                            // NEMED export
module.exports = fgv1            // így fgv-t adunk ki, így csak 1 et,   // DEFAULT export
module.exports.fgv1 = fgv1       // 
module.exports.fgv1 = arr => arr.filter(x => x > 0) // vagy egyből exportálunk
// VAGY
// exports.fgv1 = fgv1
// exports.fgv1 = arr => arr.filter(x => x > 0) // vagy egyből exportálunk
// exports = fgv1    // DE így probléma!!!, undefined lesz ott ahol required-el behuzzuk 
// AZÉRT mert itt az exports mutatóját átállítottuk a fgv1 re 
// háttérben =>
// module.exports = {}      // a module Object minden fileba más, ez egy létező objektum
// exports = module.exports
// require = () =>  module.exports
// KERÜLJÜK az exports-ot

// Ha nem súgja a requiert => // npm i @types/node --save-dev // vagy // npm i @types/node –D
const func = require('./elérés.js')   // a modul.exprtal lesz egyenlő
const {fgv1} = require('./elérés.js') // csak a fgv1- et impotáljuk be

//-------------------------------------------------------------------
// https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line
// környezeti változók
// npm i dotenv
//.env file 
// API_STRING ="VERISZIKRET"

const port = process.env.PORT || 8080;  // ha van beállítva környezeti változó akkor az legyen
// set PORT = 8080                      // process.env.PORT = 8080    // terminal-ba írni 

//.js
const process = require('process')
require('dotenv').config()
const str = process.env.API_STRING

//.mjs
import * as process2 from 'process'
import 'dotenv/config'
console.log(process2.env.API_STRING);

//-------------------------------------------------------------------
// path MODULE              // szerver oldali elérési utakhoz
const path = require('path')

const fileName3 = '/file.txt' 
const filename4 = 'file.txt'

filePath = '/a/b/c/file.txt'
path.dirname(filePath)                            // /a/b/c
path.extname(filePath)                            // .txt
path.basename(filePath)                           // file.txt
path.basename(filePath,path.extname(filePath))    // file
path.isAbsolute(filePath)                         // absolute vagy sem? true => mert / el kezdődik
path.parse(filePath)     // {root: '/', dir: '/a/b/c', base: 'file.txt', ext: '.txt', name: 'file'}

const filePathObject = {
  dir: 'C:\\Users\\user\\Desktop\\file.txt',
  base: 'file.txt',
}    
// const FILE_PATH_OBJECT = {                       // VAGY
//   dir: 'E:\\programozás\\Progmasters2\\04\\01-fsapi-nodejs-basics',
//   name:'password',
//   ext: '.txt',
// }                       
path.format(filePathObject) // C:\Users\user\Desktop\file.txt

path.resolve()    // a terminál absolút elérési útja
path.join()       // . // MERT az aktuális munkakönyvtár relatív utvonalát adja vissza
__dirname         // aktuális file abszolút elérési útja
path.resolve(fileName3)         // ahol állok a terminálba + '/file.txt'
path.join(fileName3)            // file.txt
path.join(__dirname, fileName3) // a munkakönyvtár  + '/file.txt'
const absFileName = path.join(__dirname, '/../cv/' + filename4) // lehet mozogni így 

//-------------------------------------------------------------------
// fs MODULE                  // file szisztem műveletek
const fs = require('fs')

const fileName = './file.txt'         // ./ === relatív => ott keresi a filet, ahol állunk a terminálba
const options = {encoding: 'utf8'}

// read
const dataSync = fs.readFileSync(fileName, options) // csak a konfig fileok beolvasására használunk sync-et
const callbackRead = (err, data) => {        // error first
  if (err) {throw err}
  console.log(data)                          // az olvasással kinyert adat
}                                            // jobb megoldás ha a consol helyett callback-et adunk át ennek a callbacknak
//                                           // és az error meglétének a függvényében történhez 'A' vagy 'B' dolog => Progmasters2/03 mappa anyaga
fs.readFile(fileName, options, callbackRead)            // async
fs.readFile(absFileName, options, callbackRead)         // async    // absolute utat is megeszik 

// write
const callback2 = (err) => {              // error first, csak error lesz ilyenkor
  if (err) {throw err}
  console.log('sikerült az írás')
}
const data = 'Hello World'                // amit akarunk a file-ba írni
fs.writeFile(fileName, data, callback2)   // ha volt a file-ba valami akkor felülírja, ha nem létezik a file, akkor létrehozza

// append, hozzáfűzés
fs.appendFile(fileName, data, callback2)  // ha nem létezik a file, akkor létrehozza

// refakt =>
const fileHandlerWrapper = ({method, filename, data , callback = callback2} = {}) => {method(filename, data, callback)}
fileHandlerWrapper({method: fs.writeFile, filename: fileName, data: data, callback: callback2})

// file törlése
fs.unlink(fileName, callback2)

// file átnevezése
fs.rename(fileName, './újnév.txt', callback2)

// file másolása
fs.copyFile(fileName, './mappa1/mappaA' + fileName, callback2)

// file infók lekérdezése
fs.stat(fileName, callbackRead)

// file hozzáférés modosítások
const mode = 754                         // a tulajdonos, a csoport többi tagja, és az egyéb user-ek jogosultágai
// READ: 4, WRITE: 2, EXECUTE: 1         // EXECUTE == file futtatása
// 754 => 
// tuajdonos  = 7 ==> 4+2+1 ==> READ + WRITE + EXECUTE
// csoport    = 5 ==> 4+1   ==> READ + EXECUTE
// egyéb user = 4 ==> 4     ==> READ
fs.chmod(fileName, mode, callback2)

//----------------------
const truncateAndPrintFile  = (fileName,length, bufferSize) => {
  // file megnyitása
  fs.open(fileName, 'r+', (err,fd) => {
    if (err) {throw err}
    fs.ftruncate(fd, length, (err)=>{  // mekkora szeletet akarok belőle? length méretűt
      if (err) {throw err}
      const buffer = Buffer.alloc(bufferSize)
      fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
           // melyik file?, mekkora rész?,  0 tól, a buffer.length-ig, honnan?
        if (err) {throw err}
        if (bytes > 0) {  // ha tudunk még kiolvasni
          console.log(buffer.slice(0, bytes).toString())
          fs.close(fd, (err) => {
            if (err) {throw err}
          })
        }
      })
    })  
  })
}
truncateAndPrintFile (fileName, 11, 1024)  // első 11 betűt hagyja meg a fileból

// - r: Megnyitja olvasásra; kivétel keletkezik, ha a fájl nem létezik.
// - r+: Megnyitja olvasásra és írásra; kivétel keletkezik, ha a fájl nem létezik.
// - rs: Szinkron módban megnyitja olvasásra.
// - rs+: Szinkron módban megnyitja olvasásra és írásra.
// - w: Megnyitja írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.
// - wx: A w-hez hasonló flag. A fájl exkluzív módban nyílik meg: ez azt jelenti, hogy a flag csak újonnan létrehozott fájloknál működik.
// - w+: Megnyitja olvasásra és írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.
// - wx+: A w+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.
// - a: Megnyitja adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza. 
// - ax: A a-hoz hasonló flag. A fájl exkluzív módban nyílik meg.
// - a+: Megnyitja olvasásra és adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza.
// - ax+: A a+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

// fs promisok
const fsp = require('fs').promises 

const readFileWrapper = async (fileName, options) => {
  try {
    const result = await fsp.readFile(fileName, options)
    console.log(result)
  }catch (err) {
    console.log(err)
  }
}

// nem minden async funkcióhoz van Promise os módszer DE vannak külső packagek =>
// npm i bluebird     // minden létező callbackes fgv-t konvertál promisossá DE az uj neve =>
// fgv => fgvAsync    // új neve fgvAsync lesz
const bluebird = require('bluebird')
const fsb = bluebird.promisifyAll(require('fs'))

const truncateAndPrintFilePromise  = async (fileName,length, bufferSize) => {
  const fd = await fsb.openAsync(fileName, 'r+')
  await fsb.ftruncateAsync(fd, length)
  const buffer = Buffer.alloc(bufferSize)
  const bytes = await fsb.readAsync(fd, buffer, 0, buffer.length, 0)
  if (bytes > 0) {
    console.log(buffer.slice(0, bytes).toString())
  }
  await fsb.closeAsync(fd)
}
// npm i fs-extra       // kiegészíti az fs modult, pl. promisokkal

//----------------------
// Stream:  Adatok sorozata, adatfolyam, 
//          Nagy mennyiségű adatok kezelésénél hasznos, 
//          Nem kell a teljes tartalmat a memóriában tartani Buffer-eket, 
//          fix méretű tárolókat használ
// Típusai: Readable    (adatok kiolvasása), 
//          Writable    (adatok írása), 
//          Duplex      (adatok írása és olvasása), 
//          Transform   (adatok módosítása írás/olvasás közben)
// Módok:   Standard:       Alapértelmezett mód
//                          String, Buffer vagy UInt8Array típussal dolgozik
//                          A belső folyamatoknál csak ezt használja a NodeJS
//          Object:         Az objektumokat és nem a bájtokat számolja

// Readable stream
const readableStream =  fs.createReadStream(fileName,{
  encoding: 'utf8',
  highWaterMark: 11,                // a stream hossza
})
readableStream.on('data',           // ha bekövetkezik a data esemény, akkor meghívjuk a callbacket, addig amíg a filenak vége nem lesz
  (chunk) => {                      // a chunk egy 11 Byte-os adat
  console.log(chunk)
  process.stdout.write(chunk)       // ugyanaz mint a console.log, csak sortöréseket nem tesz
})

// Writable stream
const fileNameÚj = './fileCopy.txt' 
const writableStream = fs.createWriteStream(fileNameÚj)
readableStream.pipe(writableStream) // a readableStream-ból a writableStream-ba írja a tartalmat

// Transform stream, tömörítés
const zlib = require('zlib')
const createCompressedFile = fs.createWriteStream(fileNameÚj + '.gz')
readableStream
  .pipe(zlib.createGzip())      // létrejön a tömörített fájl
  .pipe(createCompressedFile)   // beleírunk

//-------------------------------------------------------------------
// mappa műveletek
const createStarterTamplate = () =>{
  fs.acces('views')                 // van e hozzáférés a views mappához?
  .catch(() => fs.mkdir('views'))   // ha nem akkor létrehozom a mappát
  .then(()  => fs.writeFile('views/index.html', '<h1>Hello World</h1>'))
  .then(()  => fs.writeFile('views/about.html', '<h1>About</h1>'))
  .then(()  => fs.readdir('views')) // olvassuk ki a views mappa tartalmát
  .then(console.log)
  .then(()=> rmdir('tmp'))          // töröljük a tmp mappát és a tartalmát
  .then(()=> {
    const folder = 'controllers'
    fs.rename(folder, folder.charAt(0).toUpperCase() + folder.slice(1)) // átnevezem nagybetűssé => Controllers
  })
  .catch((err)=>{
    console.log('\x1b[31m',err.message) // piros lesz a hiba
  })
}

//-------------------------------------------------------------------
// os MODULE      // Operációs rendszer 
const os = require('os');

console.log('Platform ', os.platform());
console.log('Architecture ', os.arch());
console.log('OS version ', os.version());
console.log('OS build number ', os.release());
console.log('Processor ', os.cpus());
console.log('Free memory ', os.freemem()/1024/1024/1024, 'GB');
console.log('Total memory ', os.totalmem()/1024/1024/1024, 'GB');
console.log(os.networkInterfaces());
console.log('IP address', os.networkInterfaces()['Wi-Fi'][1].address);
console.log('Username', os.userInfo().username);

//-------------------------------------------------------------------
// http MODULE      
// server.js
const http = require('http')

const path = require('path');
const fs = require('fs');
const port = 8080

http.createServer((req, res) => {
  console.log('Incoming request');

// Sima válasz ----------------
  res.write('Hello World');       // válaszként ezt küldjük
  res.end();                      // lekell zárni, utánna küldi el
  // res.end('Hello');            // utsó üzenet, majd lezár

// Sync HTML válasz ------------
  res.writeHead(200, {'Content-Type': 'text/html'});                        // fejléc, ha html-t akarunk küldeni
  const html = fs.readFileSync(path.join(__dirname, 'index.html'),'utf-8'); // bekell olvasni a file-t
  res.write(html);              
  res.end(html.replace(/\{\{name\}\}/g, 'Jhon')) // a html ben lévő '{{name}}' helyett azt írja hogy 'Jhon'
  // DE EZ syncron és nem szeretjük, helyette => 

// Async HTML válasz ------------
  res.writeHead(200, {'Content-Type': 'text/html'});                        // fejléc, ha html-t akarunk küldeni
  fs.createReadStream(path.join(__dirname, 'index.html'),'utf-8').pipe(res); // adatfolyamba küldi STEAM, ezt nem kell lezárni
  // ezt nem kell lezárni

// ASYNC ha cserélni akarunk------ 
  res.writeHead(200, {'Content-Type': 'text/html'});                        // fejléc, ha html-t akarunk küldeni
  const readableStream = fs.createReadStream(path.join(__dirname, 'index.html'),'utf-8')
  readableStream.on('data', (chunk) => {    // data eventre feliratkozunk
    const htmlFragment = chunk.toString().replace(/\{\{name\}\}/g, 'Jhon')
    res.write(htmlFragment)
  })
  readableStream.on('end', () => res.end())

// JSON CASH-elő SYNC--------------  
  res.writeHead(200, {'Content-Type': 'application/json'});     // fejléc, ha JSON    
  const jsonFile =  require('./database/data');                // JSON file helye    
  res.end(JSON.stringify(jsonFile));         

// JSON ASYNC-----------------------
  res.writeHead(200, {'Content-Type': 'application/json'});     // fejléc, ha JSON    
  fs.createReadStream('./database/data.json').pipe(res)

}).listen(port);                  // start a server-t
console.log(`Server is running on port ${port}`);

// EGYÉB INFÓK
http.createServer((req, res) => {
  console.log(req.url);     // milyen útvonalra jött a kérés, vis "localhost:8080/mivanitt?"
  if (req.url === '/'){}    // ez a gyökér
  console.log(req.method);  // method
})
.on('error', (err) => {console.log(err.message);})  // ha hiba van
.on('listening', () => {console.log(`Server is running on port ${port}`);})
.listen(port); 

//-------------------------------------------------------------------
// npm i nodemon --g        // a servert mindig ujraindítja ha változtatunk vmit, nem kell nekem ujraindítgatni
// node server.js helyett nodemon server.js

//-------------------------------------------------------------------


//-------------------------------------------------------------------



//-------------------------------------------------------------------



//-------------------------------------------------------------------



//-------------------------------------------------------------------
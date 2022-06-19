//----------------------------------------------------------------------------------------------------------------
// https://kangax.github.io/compat-table/es6/       // kompatibilitási tábla
// https://caniuse.com/                             // is
// ha nincs meg a kompatibilitás akkor POLYFILL     => metódusoknál, a prototype- hez megírjuk magunk vagy
if (!String.prototype.trim) {String.prototype.trim = function() {return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');};}
//                                     TRANSPILER   => szintaktikát alakít át, babeljs.io
// https://babeljs.io/                              // uj generációs js kódot alakít át régivé
// mockaroo.com                                     // random database generálásához
//----------------------------------------------------------------------------------------------------------------
// a HTML be: <script src=./js.js> </script>
console.log(5 + 6);             //  consolba ír
console.log('%c My Friends','color:orange;font-weight:bold');   // css-t is adhatunk a konzolra
console.log({a,b,c});           // a,b,c = Objektum // több adatot akarunk kiírni jobb objektumként
console.table([a,b,c]);         // táblába megjelenítve még jobb
console.trace('hol hívtuk meg') // hol hívtuk meg és mikor definiáltuk adatok..
debugger // Stops the execution of JavaScript, and calls (if available) the debugging function
// adatbevitel mindig string: prompt ablak, html űrlap, api csatlakozás, adatbázis műveletek, fájl olvasás/írás
//----------------------------------------------------------------------------------------------------------------
/*tippek:
kerüljük a globális változó használatát => szűkíteni kell a hatáskört
kerüld a new kulcszó használatát, csak saját objektumnál szabad használni meg Dátumnál
kerüld az automatikus típuskonverzió használatát
fgv-eknél használj default bemeneti értékeket 
switchnél használj default ágat
kerüld az eval() fgv-t  */
'use strict';           // baromságok elkerülése miatt kell
//----------------------------------------------------------------------------------------------------------------
/* operátorok:   +   -   *   /   %   **  ++i    i++     i-- --i   +=    -=  /=  *=  %=
==  === !=  !== >   <   >=  <=     feltétel ? "igen ág" : "nem ág"
logikai:      &&  ||  !           
bitműveletek: &   |   ~(negálás)  ^(XOR)  
x << n (x balra shift n dbszor) x >> n (jobbra előjelet tart) x >>> n (jobbra, előjelet nem tart)
rövidzár: false && feltétel   // a feltétel nem fog kiértékelődni
őrfeltétel: feltétel && X     // X értékét egy feltételhez kötjük, Ha a feltétel true akkor visszaadja X-et */
alapértelmezet = valami ?? "ha a valami null vagy undefined akkor az értéke én leszek";
// (!!truthy), (!!falsy) => true, false    // !! operátor 
//----------------------------------------------------------------------------------------------------------------
// if
if (feltétel) {} else if (feltétel) {} else {}
// switch
switch ("érték") { //                                                       // Switch(true){
    case x: // if (érték)===x (szigorú egyenlőség)                          // x helyett feltétel is lehet
        break; // ha kihagyjuk a break et, akkor az alatta lévő többi case ágba is belefut a többi case igazságtartalmától függetlenül a kövi break-ig
    case y: // if (érték)===y
        break;
    default:
        // else ág..
}
//break, continue
while (i < 100) { i++; }
do { input = 10 } while (i < 100) { i++; }  //inputok esetén hasznos
for (let i = 0, j = 0; i < maxi && j < maxj; i++, j++) {} // akár több index
for (let i in arr_0) { sum += arr_0[i]; }   // az i a kulcsokon megy végig
for (let value of arr_0) { sum += value; }  // a value a tömb elemein megy végig

loop1:
continue loop1;  // loop1 címkére ugrik
//----------------------------------------------------------------------------------------------------------------
// változók
let a;      // block {}
const a;    // block {} nem változtatható értékű        // Objektum esetén mindig const !!!
// var a;   // fgv      // window.a  // => hozzá van kötve a window objektumhoz, a let és const NINCS
// var a;   // létezik a deklaráció elött is, undefined az értéke + lehet ujradeklarálni ugyanabba a blockba
// a;       // globális

//----------------------------------------------------------------------------------------------------------------
// primitívek Immutable: az objektumon nem végezhető módosítás, helyette a műveletek egy új, objektumot adnak vissza.
// primitívek a stack-ben                       // typeof valtozo;   // Típusvizsgálat eredménye string:
boolean     // 4 byte                           // "boolean" 
bigint      // memóriától függ a max értéke     // "bigint" 
number      // 8 byte                           // "number"(NaN,Infinity) 
string      // 2 byte karakterenként UTF-16     // "string"
symbol                                          // "symbol"  
undefined                                       // "undefined"      valtozo===undefined     // kapott értéket?
null == undefined;  // true     // egyenlő értékűek de különböző a típusuk
null                                            // "object"    !!!  valtozo===null
// NEM primitívek:
// [],{}                                        // "object"
//                                              // "function"
// objektumok a heap-ben, ami egy rendezetlen memória
// minden fgv átadás érték szerinti, objektumok esetén ez az érték egy referencia
Array.isArray(X)    // => true, ha x tömb
X instanceof obj;   // true. Ha x az obj objektumtípus példánya
//----------------------------------------------------------------------------------------------------------------
/* Boolean      Number(true); ==> 1     Number(false); => 0
falsy értékek:      0   ''  null    undefined   NaN
truthy értékek:     minden más ami nem falsy pl.:(Infinity,[],{}," ") 
0!==!1  -->  0!==false  -->  !(0===false)  -->  !false -->  true      */
//----------------------------------------------------------------------------------------------------------------
// BigInt      // CSAK EGÉSZ    // A (2^53-1)-nél (Number.MAX_SAFE_INTEGER)-nél nagyobb EGÉSZ számokat ilyenbe tároljuk
let BI_0 = 20n*3n;      // műveletek CSAK BigIntekkel
BI_0 = BigInt("10");       
BI_0 = BigInt(10); 
BI_0 = BigInt(0x10); 
//----------------------------------------------------------------------------------------------------------------
// Number               // 64 bites Float ==> 52 bit érték + 11 bit exponent + 1 bit előjel
// számok összehasonítása =>           x>v==v>y
let N_0 = 0xf;          // hexa forma(15) // 0o => octal // 0b => binális  // 6.7 => float // 6 => decimal
Number.EPSILON          // === 2**(-52)   // az 1 és az egynél nagyobb lebegőpontos számok közötti legkissebb különbség

// Number => Number(ami String!!!) 
N_0.toFixed(6);               // 6-odik tizedesjegyet még kiírja normál alakban
N_0.toExponential(6);         // 6-odik tizedesjegyet még kiírja exponenciális alakban
N_0.toPrecision(6);           // 6 db számjegyből álljon a szám(ha nem fér ki => exp alak)

// Number ==> String 
N_0.toString(2);               //  2 es számrendszerü stringé konvertál, 2-36 
String(0xFF)                   //  "255"   Ez csak 10 essé!
N_0.toLocaleString('de-DE');   // németül írjra ki a számot (1000 es . oknál érdekes)

// String ==> Number 
N_1 = +S_0                              // number lesz // === Number(S_0)
Number("10,212");                       // NaN      // ha nem tudja átalakítani akkor NaN
Number(" 10  ");                        // 10       // => Number("10.212");                 // 10.212
Number.parseFloat("10.212 asd", 10);    // 10.212   // az első nem számig veszi a számokat és
Number.parseInt("10 20 30", 10);        // 10       // számrendszert is lehet állítani      // egész szám!!!
Number.parseInt("0xz")                  // NaN!!!!!!!

// Number => Object
nObj_0 = new Number(123);          // Objekt a típusa

// Object => Number
N_1 = nObj_0.valueOf();            // már number 

// Number => Boolean
Number.isSafeInteger(N_0);  // ==> true HA N_0 -2**53 és a 2**53 értékek közé esik
// ennél nagyobb és kisseb számoknál a számítások nem mindig lesznek helyesek, mert 2 különböző szám értéke lehet ugyanaz (SZABVÁNY miatt)
Number.isInteger(N_0);      // ==> true HA number
Number.isFinite(10 / 0);    // false esetek => Infinity,-Infinity,NaN
isNaN(X);                   // true => Ha NEM tudja átalakítani számmá, false, ha igen
Number.isNaN(NaN);          // true => csak akkor HA NaN (mint a 3 egyenlőség ===)
//----------------------------------------------------------------------------------------------------------------
// Math , többi kevésbé fontos a file végén..
Math.sign(N_0)      // 1 ==> N_0 = Infinity, vag pozitív 0 nál nagyobb számokra
//                  //-1 ==> N_0 = -Infinity, vagy negatív 0-nál kisseb számokra
Math.sign(0)        // 0
Math.sign(-0)       // -0
Math.sign(NaN);     // NaN
Math.trunc(30.17);     // 30           // törtrész levágása, jobb a floor-nál
Math.trunc('-1.123');  // -1

Math.round(x);                          // egészre kerekít
Math.ceil(4.4);                         // 5 // felfele kerekít   
Math.floor(x);                          //      lefele kerekít -30.10 => -31
Math.abs(x);                            //
Math.pow(x, y);                         // x**y
Math.sqrt(x);                           // x**0.5
Math.min(0, 150, 30, 20, -8, -200);     // -200
Math.max(0, 150, 30, 20, -8, -200);     // 150      // Math.max.apply(Math,arr) => Math.max(...arr)
Math.random();                                      // 0 <= x < 1
Math.floor(Math.random() * 10);                     // int     0 <= x <= 9
Math.floor(Math.random() * 10) + 1;                 // int     1 <= x <= 10
Math.floor(Math.random() * (max - min) + min);      // min <= x < max
Math.floor(Math.random() * (max - min + 1) + min);  // min <= x <=max
//----------------------------------------------------------------------------------------------------------------
// String  // speciális karakterek: \"  \'  \\  \n  \t  \v  \r  \f  \b   // ``-nál nem kell levédeni
// String => String
S_0 = "Apple, Banana, Kiwi";
S_0.toUpperCase();          // minden betű nagybetű lesz  // S_0.toLocaleUpperCase();        
S_0.toLowerCase();          //                               S_0.toLocaleLowerCase();      
S_2 = S_1 + " " + S_0   // === S_2 = S_1.concat(" ",S_0)
S_2 = `${S_1} ${S_0}`   // 
S_0.repeat(4)           // S_0 ismétlése 4 szer

S_0.charAt(0);          // "".charAt(0) === ""          
S_0[0];                 // ""[] === undefined 
S_0[0] = "A";   // NEM LEHET FELÜLÍRNI !!! így csak olvasni lehet !!!
S_0.slice(-12);         // ==> Banana, Kiwi     // utolsó karakter a -1 es indexű
S_0.slice(7, 13);       //  ==> Banana // 7(inclusive) 13(exclusív)  // substring() negatív indexet nem vehet fel!!
S_0.slice(-12, -6);     //  ==> Banana                               // S_0.substring(indexStart); S_0.substring(indexStart, indexEnd);
S_0.substr(7, 6);       // a 7. indextől 6 karakter hosszan ==> Banana      // Ha a 2. paraméter nincs akkor mint a S_0.slice(7)

S_0.replace("Dad","Apa");   // csak az első találatot cseréli   // új stringel tér vissza, az eredetit nem módosítja !!! 
S_0.replace(/Hello/gi,'Hi');// reguláris kifejezés is lehet
S_0.replaceAll(regexp_VAGY_substr, newSubstr_VAGY_replacerFunction) // Node.js 15.0.0 tól 

S_0.trim();                 // üres karakterek törlése elöl és hátul  === S_0.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
S_0.trimLeft();
S_0.trimRight();	

// String => Number
S_0.length;                 // String Hossza
S_0.indexOf("béla", 4);     // balról az első találat indexét adja vissza a 4. indextől indulva // -1 <==> ha nincs találat
S_0.lastIndexOf("béla", 4); // jobbról az első találat indexét adja vissza a 4. index az utsó   // -1 <==> ha nincs találat
S_0.search("béla");         // nincs 2. argumentum de gyorsabb a keresése mint az indexOf-nak
S_0.charCodeAt(0);          // a 0. indexű karakternek adja vissza az UTF-16 kódját

// Number => String
String.fromCharCode(65,66)  // === AB   // vissza irány

// String => Array
S_1= [...S_0]               // ===S_O.split("")
S_0.split(";");             // splitel ; mentén és az eredményeket tömbé alakítja
S_0.split(";",2);           // 2 méretű tömbé alakít
S_0.match(reguláris_kifejezés); // visszaadja a találatokat egy tömbbe

// String => Boolean
S_0.includes("valami", 3)   // benne van?      S_0[3:]-ban
S_0.startsWith("valami", 3) // ezzel kezdődik? S_0[3:]-ban
S_0.endsWith("valami", 3)   // ezzel végződik? S_0[:3]-ban

// String => Object
var obj0 = JSON.parse('{"name":"John", "age":30, "city":"New York"}');

// Object => String
var myJSON = JSON.stringify(obj0); // stringé alakítja

// Object => String => Object   // DEEP COPY, de helyette inkább erre használatra könyvtárakat, ez pazarló
obj1 = JSON.parse(JSON.stringify(obj0))

// Egyéb
S_0 = "5";                  // "ezt kitölti".padStart(milyenhosszúra, 0);  
S_0.padStart(4, 0);         // result is "0005"     // bankártya adatoknál használjuk
S_0.padEnd(4, 0);           // result is "5000"
//----------------------------------------------------------------------------------------------------------------
//Array     több típúsu elem is lehet egy tömbben, akár objekt is
const intArr = new Int8Array(2)  /* 2 elemű típusos tömb, csak ilyen elemeket tartalmazhat a tömb
Int8Array()         - 8 bites előjeles egész
Uint8Array()        - 8 bites előjel nélküli egész
Uint8ClampedArray() - 8 bites előjel nélküli egész (a nem megfelelő értékeket módosítja a legkisebb/legnagyobb értékre)
Int16Array()        - 16 bites előjeles egész
Uint16Array()       - 16 bites előjel nélküli egész
Int32Array()        - 32 bites előjeles egész
Uint32Array()       - 32 bites előjel nélküli egész
Float32Array()      - 32 bites lebegőpontos
Float64Array()      - 64 bites lebegőpontos         
IntXxxx     =>  HA nem ábrázolható értéket adunk neki => TULCSORDULÁS!!!  
UintXxx     =>  HA nem ábrázolható értéket adunk neki => 0("-" számok esetén) VAGY a MAX(legnagyobbnál nagyobb számok esetén) ábrázolható szám lesz 
*/
[a, b] = [b, a];                        // elemek cseréje
[a = 5, b = 7] = [1];                   // default értékek a=1, b=7

arr_2 = new Array(4)                    // uj 4 méretű undefined elemekből álló tömb
arr_2 =[].constructor(4)
arr_2.fill(2, 0, 4)                     // 2 esekkel tölti fel a tömböt a [0:4] intervallumba 

let arr_0 = ["Saab", "Volvo", "BMW"];
let [elso, masodik, harmadik] = arr_0;  // elso=arr_0[0]; masodik=arr_0[1]; harmadik=arr_0[2];  // másolás
let [, masodik] = arr_0;                // masodik=arr_0[1];
let [fej, ...farok] = arr_0;            // fej=arr_0[0];  farok=arr_0[1:len(arr_0)]
arr_0[0];                               // Saab
arr_0[0] = "Opel";                      // felülírás tömbnél lehet!!!       // HA nagyobb az index mint a length akkor undefined lyukak
arr_0.length;                           
arr_1 = [...arr_0, ...arr_0];           // ["Opel", "Volvo", "BMW", "Opel", "Volvo", "BMW"]  ,minden érték átmásolása
//... === a tömbösítés ellentet művelete, az objektumok klónozására is.
// arr_4 = arr_1.concat(arr_2, arr_3);  // 3 tömb egymás után összeillesztése, vagy több.. lehet 1 stringet is

arr_0.flat();       // xDimenziós tömbből 1 mélységbe ... művelet
arr_0.flat(2);       // xDimenziós tömbből 2 mélységbe ... művelet
arr_0.flat(Infinity);   // teljes mélységig kilapít 

arr_0.unshift("Lemon");     // arr_0=["Lemon",...arr_0]  a tömb elejére pushol és visszatér a tömb új hosszával
arr_0.push("Lemon");        // arr_0=[...arr_0,"Lemon"]  a tömb végére  beszúr és visszatér a tömb új hosszával
arr_0.shift();                          // az elsőt veszi ki és visszaadja + a többi elemet balra shifteli
arr_0.pop();                            // az utolsó elemet kiveszi és visszaadja

arr_0.splice(2, 0, "Lemon", "Kiwi");    // a 2. indexű helyre beszúrja ezt a 2 elemet + 0 db-ot töröl hátulról
arr_0.splice(0, 1);                     // a 1 elem törlése lyuk nélkül, bármennyi argumentuma lehet

arr_1 = arr_0.slice(3, 6);              // a 3. 4. 5. indexű elemet átmásolja és az lesz az uj tömb
arr_1 = arr_0.slice(3);                 // a 3. tól az összeset

// Array => Number
arr_0.indexOf("Apple", 0);      //az első "Apple" értékű elem indexével tér vissza, a keresés a 0. indextől indul
arr_0.lastIndexOf("Apple", 1);  // utolsó.. 1. indextől indul a keresés // mind2 ha nem talál: return -1

// Array => String
arr_0.join("*");                        // Opel*Volvo*BMW // arr_0.toString(); === arr_0.join(",");  

// Array => Boolean
arr_0.includes("Saab", 0)               // a Saab benne van a arr_0 tömbben?
Array.isArray(arr_0);                   // true <== a arr_0 egy tömb?
arr_0 instanceof Array;                 // true <== ha az Array a konstruktora


delete arr_0[0];            // a 0. elemet lecseréli undefined elemre
delete arr_0                // teljes lista törlése

arr_0.entries();            // kulcs érték párokat ad vissza objektumként, amit "for of"-al végig lehet járni. 
arr_0.copyWithin(3, 0, 2);  // az arr_0-ban a 3 as helytől felülírja a [0:2] elemekkel, a tömb mérete nem változik

Array.from(object, mapFunction, thisValue) // obj=>>tömbé alakít, 1 attribútummal, mint a stip
Array.from(document.querySelectorAll("selector"))// NODE listából is tömböt csinál

arr_0.flatMap((item,index,array) => [item,item**2],thisErreMutatObjektum) // egy új tömböt ad vissza, az eredeti tömb tartalmát módosítja a megadott függvény szerint, és egy dimenziónyit „lapít” rajta
arr_0.map((item) =>[item,item**2]).flat()   // egyenlő a 2

arr_0.reverse();    // fordít
arr_0.sort();       //sorba rakás, ASCII szerint
arr_0.sort(function(a, b) { return a - b }); //növekvő // ha a a-b negatív ==> a<b // ez a sort a string számokat is jól sort-olja
arr_0.sort(function(a, b) { return b - a }); //csökkenő
arr_0.sort(function() { return 0.5 - Math.random() }); // random sorrend
arr_0.sort(function(a, b) { return a.year - b.year }); // ha a tömbben objektumok vannak
function novekvo(a,b){ return a - b}
arr_0.sort(novekvo); // NEM KELL MEGHÍVNI mert akkor a visszatérési érték lenne átadva, DE így a fgv van átadva

// Max és min keresésre saját fgv ajánlott    //Math.max(1, 2, 3); // === Math.max.apply(null, [1, 2, 3])     //Math.min(1, 2, 3); // === Math.min.apply(null, [1, 2, 3])  
arr_0.every(fgv);       // Minden elemre igaz?  => true, ha a tömb MINDEN elemére teljesül a feltétel
arr_0.some(fgv);        // Van ilyen elem?      => true, ha a tömb 1 elemére már teljesül a feltétel
arr_0.find(fgv);        // Megkeresi az első elemmet amire teljesül a feltétel és visszatér vele, ha nincs találat => undefined-el tér vissa
arr_0.findIndex(fgv);   // az első elem indexével.. -1 el ha nincs találat

arr_0.forEach(fgv);     //  a tömb minden elemére meghívja a fgv-t
arr_0.map(fgv);         //  ez is, de ez új tömböt hoz létre, a régihez nem nyúl
arr_0.filter(fgv);      //  szűrést csinál, és új tömböt hoz létre, régihez nem nyúl
function fgv((value, index, array) {}, thisValue)

arr_0.reduce(fgv2);      //  egy összeget számol balról, a régihez nem nyúl .. 
// stringet is vis HTML kiírnivalót is szummázhatunk vele!!
arr_0.reduceRight(fgv2); // jobbról
function fgv2((total, value, index, array) {}, initialValue)
/* új arrayt hoznak létre a régit nem változtatják
value = a soron következő érték, total = az összeg, index = az indexe, array = az egész tömb, 
thisValue = ha ide "this"-t írunk és ez a fgv egy classz része akkor a fgv en belül "this"-el hivatkozunk 
a class-ra (ha ide bármi mást írúnk pl 111 akkor a fgv en belül a this-el erre az 111 re hivatkozunk
initialValue default értéke a tömb 0 indexű eleme, és default esetben a value a tömb 1 indexű elemétől indul  */

//Pl.:
characters.map(c => c.name) // az új tömb csak a name attribútumból fog állni
characters.map(c => { // csak azokat tartjuk meg ahol az item.owner === c.id-val
    let items = inventory.filter(item => item.owner === c.id);
    return { name: c.name, itemCount: items.lenght }
})
characters.map(c => { // majd a megtartottaknak summázzuk az item.Value mezőit
    let totalValue = inventory.filter(item => item.owner === c.id).reduce((sum, item) => item.Value + sum, 0)
    return { name: c.name, totalValue }
})
//----------------------------------------------------------------------------------------------------------------
// MAP  // szótár
const map = new Map();
map.set("foo",123).set("moo",456).set(object1, 789)   // mint a push, sorba tárolva, Object és Symbol is lehet kulcs érték
map.get("foo")                        // 123
map.has("moo")                        // benne van e?
map.delete("moo")
map.size
map.keys()                            // kulcsok, tömb-ben
map.values()                          // értékek
map.forEach((value,key) => console.log(value,key))
map.clear()                           // ürítés
objekt1=null;map.get(objekt1)         // undefined, DE benne marad az objekt1 a map-ba, forEach-al elérem
//---------------------------
// WeakMap  // memória sporolás // csak Objekt kulcsai lehetnek
const weakMap = new WeakMap()
weakMap.set(object2, 789)             
object2 = null;weakMap.get(objekt2)   // undefined, ÉS már forEach-el sem érem el
// Csak get(), set(), has(), delete() metódusokkal rendelkezik.
//----------------------------------------------------------------------------------------------------------------
// SET  // halmaz // ez egy objekt
const set = new Set()         // const set = new Set(array_1)
set.add("asd")
set.has("asd")
set.delete("asd2")
set.size
set.entries()                 // {"asd" => "asd"}     // az elemek ilyen furán, SetIterátorként
set.values()                  // {"asd"}              // az értékek, SetIterátorként
set.add("asd").add("asd2")
const values = set.values()
values.next()                 // {value:"ads",done:false}   // mivel iterátor  
values.next()                 // {value:"ads2",done:false}    
values.next()                 // {value:undefined,done:true}    
set.forEach()
set.clear()
//---------------------------
// WeakSet  // memória sporolás // az értékek csak Objekt-ek lehetnek
const weakSet = new WeakSet()
weakSet.set(object2)             
object2 = null;weakSet.get(objekt2)   // undefined, ÉS már forEach-el sem érem el // törlődik az elem is
// Csak get(), add(), has(), delete() metódusokkal rendelkezik.
//----------------------------------------------------------------------------------------------------------------
// function         // hoisting működik fgv esetén ! var, let, const változók esetén viszont NEM !
// IIFE-n belül definiált fügvényt semilyen módon se érünk el

// closure          // a fgv viszatérési értéke egy belső fgv, ami hivatkozik e külsö fgv egyik változójára és ezért életbe tartja
function x(){       // így hozzáférünk a x() en belül deklarált változóhoz is
  let c=0
  console.log("out");
  return function inner(){
    console.log("inner");
    console.log(c); // külsö objektumot és értékeket életbe tart
    c++;
  }
}
const z = x       //          // így nem hívódik meg a fgv, csak átadjuk egy változónak

const y = x()     // out      // meghívjuk a fgvn-t és a visszatérési értékét átadjuk y- nak ami szintén egy fgv  
y()               // inner 0  // ez a fgv életbe tartja a c változót (ugyanazon az objektumon "dolgozik")
y()               // inner 1

x()() // out inner 0          // meghívja x-et, majd a visszatérési értékét is meghívja
x()() // out inner 0          // mindig egy uj fügvénypéldányt hívunk meg ezért lesz mindig 0 a "c" értéke
x()() // out inner 0


function add(a, b=2) { return a + b; }              // b=2 default érték
function fgv_0(a)  { return { 0: 2, 1: 3 }[a]; }    // return egy objektum trükkel
let sub = function(a, b) { return a - b; }          // így csak a fgv deklarálása után hivhatom meg
let multiply = (a, b) => a * b;                     // arrow function
var sumArgs = function(...arr_0) {};                // tömböt, több, bármennyi argumentumot vár

// default paraméter objektumok esetén
function fgv_1({elso=1000,masodik=21,harmadik=2}={}){   // ha ez a fura sintaxis nem lenne akkor nem móködne
    return elso + masodik + harmadik;                   // a default paraméter, ha hiányos objektumt adunk át
}
console.log(fgv_1({elso:200}));     // igy a többi paramétere default lesz

function sum(a,b,...c){             // így a c egy tömfb MINDÍG
    console.log(c);
}
sum(1,2,3)                          // [3] a c egy tömb MINDÍG

const user={firstName:"kiki",lastName:"baller",age:20,}
const tag = (texts, ...values) => {console.log(texts,values);}
tag`My name is ${user.firstName} ${user.lastName}, and I am ${user.age} years old`
// texts=["My name is "," "," and I am "," years old"] values=["kiki","baller",20]
// az első paraméter mindig egy tömb
const tag = (texts, values) => {console.log(texts,values);}
// texts=["My name is "," "," and I am "," years old"] values="kiki"
const tag = (texts, value1,value2) => {console.log(texts,values);}
// texts=["My name is "," "," and I am "," years old"] value1="kiki" value2="baller"
const tag = (texts, ...values) => texts.map((text,index) =>
        `${text}${values[index]?`<strong>${values[index].toLocalUpperCase()}</strong>`:""}`).join("")
const template = tag`My name is ${user.firstName} ${user.lastName}, and I am ${user.age} years old`
// => My name is <strong>kiki</strong> <strong>baller</strong>, and I am <strong>20</strong> years old

// azonnalmeghívott fgv-ek
(function f() {})();
(function() {})();
(function f(text) { return text; })('lefutottam');
(text => console.log(text))('lefutottam');
((a, b) => a + b)(5, 6);                            // 11
(be => ({ objektum }));                             //   objektum viszatérésnél  ({
(be => {return { objektum }});                      //  vagy így

/* A FGV argumentumaiba..
HA értékeket adunk át  ===>> kifelé nem módosul 
HA objektumot adunk át ===>> a mutatót adjuk át és a fgv modosítja az objektumot	
fgv(X,Y){X.Z=valami, Y=valami2;}	kívül a X.Z => módosul, Y => nem
var X = new fgv(Y) 
(példányosítás)az eredeti fgv ben lévő this az így kreáltra mutat*/
//----------------------------------------------------------------------------------------------------------------
// generátor fgv ek => egy irányú, bármikor lepausolható és a pause helyre visszaugorhatok bármikor, hogy fusson tovább
// SOK errőforrást spórolhatunk vele
function* langues(){
  console.log('Start');
  yield "php"
  yield "java"
  yield "js"
  console.log('End');
}
const generatorObject = langues();      // semmit nem ír ki
console.log(generatorObject.next());    // 'Start'  {value:"php",done:false}
console.log(generatorObject.next());    //          {value:"java",done:false}
console.log(generatorObject.next());    //          {value:"js",done:false}      'End'
console.log(generatorObject.next());    //          {value:undefined,done:true}        
//-----------------------------------------------------
function* langues(){console.log('Start');yield "php";yield "java";yield "js";console.log('End');}
const generatorObject = langues();            // semmit nem ír ki
console.log(generatorObject.next());          // 'Start'  {value:"php",done:false}
console.log(generatorObject.return());        //          {value:undefined,done:true}   // manuálisan mi állítjuk le
//console.log(generatorObject.return("end?"));  //          {value:end?,done:true}        // manuálisan mi állítjuk le
console.log(generatorObject.next());          //          {value:undefined,done:true}        
//-----------------------------------------------------
function* langues(){
  console.log('Start');
  yield "php"
  return "end?"                         // a return véget vet a fgv futásának, a yield, csak szünetelteti
  yield "java"
  yield "js"
  console.log('End');
}
const generatorObject = langues();      // semmit nem ír ki
console.log(generatorObject.next());    // 'Start'  {value:"php",done:false}
console.log(generatorObject.next());    //          {value:"end?",done:false}
console.log(generatorObject.next());    //          {value:undefined,done:true}      
//-----------------------------------------------------
function* generatorFunction(){
  try{
    yield 1;
  }catch(e){                            // ha a hibát nem kezelem le akkor az // Error: ...... // sor után már nem fut a program
    console.log(e);                     // hiába lenne még .next() metódusai meghívva
  }
  yield 2;
  yield 3;
}
const generatorObject = generatorFunction();      
console.log(generatorObject.next());                            // {value:1,done:false}
console.log(generatorObject.throw(new Error('Custom Error')));  // Error: ......
// throw -al megkapjuk a következő értéket is, nem csak a hibát // {value:2,done:false}
//-----------------------------------------------------
function* n_N_Generator() {
    let n = 1;
    while (true) {
        yield n++;
    }
}
for (let number of n_N_Generator()) {
    console.log(number);                // 1 2 3 
    if (number === 3) break;    
}
//-----------------------------------------------------
const array = [{fName:"kis",lastName:"józsef",age:10},{/*...........*/}];
function* loop(arr){
  for (const item of arr) {
    yield item;
  }
}
const items = loop(aray);
console.log(items.next().value);      // itt dolgozunk az adattal és ha kell majd továbblépünk a kövi next-re
//-----------------------------------------------------
function* first(){
  yield 1;
  yield 2;
}
function* secound(){
  yield* first(); 
  yield 3;
  yield 4;
}
for (const value of second()) {
  console.log(value);                 // 1 2 3 4 
}
//-----------------------------------------------------
function* idGenerator(){
  let id = 0;
  while (true){
    yield id++
  }
}
const id = idGenerator();
console.log(id.next().value);         // 1
console.log(id.next().value);         // 2

function* fibonacci(current,next){
  while (true){
    next = next + current
    current = next - current
    yield next;
  }
}
const fibo = fibonacci(1,1)
console.log(fibo.next().value);       // 2
console.log(fibo.next().value);       // 3
console.log(fibo.next().value);       // 5
//-----------------------------------------------------
function* range(start,end,step){
  while(start<=end){
    yield start;
    start+=step
  }
}
for (const value of range(10,200,3)) {
  console.log(value);         // 10 13 16 ....... 199
}
//-----------------------------------------------------
const pattern =/#\w+/g
const text =`This is a #sample text which #contains a few #specific #hashtags.`
function* searchhashtags(text){
  let match;
  do{
    match = pattern.exec(text);
    if (match) {
      yield match[0]
    }
  }while(match)
}
for (const hashtag of searchhashtags(text)) {
  console.log(hashtag);     // #sample #contains #specific #hashtags
}
//-----------------------------------------------------
const urls=['./data1.json','./data2.json']
function responseHeandler(gen){
  const result = gen.next();
  const {done,value} = result;
  if (!done) {
    value
      .then((data)=> data.json())
      .then((user)=>console.log(user))
      .catch((e)=>console.error)
    responseHeandler(gen);
  }
}
function* main(){
  for (const url of urls) {
    yield fetch(url)
  }
}
const myGenerator = main();
responseHeandler(myGenerator)       // mind 2 json filet kiirja
//----------------------------------------------------------------------------------------------------------------
this
/* A szokásos függvényekben ez a kulcsszó képviselte a függvényt meghívó objektumot, 
amely lehet az ablak, a dokumentum, egy gomb vagy bármi más.
A nyílfüggvényeknél ez a kulcsszó mindig a nyílfüggvényt definiáló objektumot jelenti.*/
/*
objektum methodus-ában,             aktuális objektumra mutat
önmagába                            global objectumra ami böngészőben a window
fgvben (objektum methodus,fgvébe)   global objectumra ami böngészőben a window
fgvben, (-||-) strict mode-ban      undefined.
event-ben,                          arra az element-re ahol az eventet megívták
objektum methodus-ának egy fgv-ében:globális objektum(egyszerű függvénydefiníciónak minősül)
-||- strict módban                  undefined
-||- Nyíl fügvénnyel                aktuális objektumra(a => fgv. megváltoztatja a kontextust) => a szülő scopejából örökli a this-t
bind(), call(), és apply()          én állítom be manuálisan bármilyen objektumra   */

// CALL     // obj1.fgv.call(obj2,[...fgvargumentumok])	obj2 -re állítjuk a this értékét 
'use strict';
const user ={
  fName:"Jhon",
  speak(massege){
    console.log(this);
  }
}
const speak = user.speak;                     speak("asd") // undefined!!! MERT ekvivalens => 
const speak = function (){console.log(this)}; speak("asd") // ezzel, itt meg undefined, strict miatt
// megoldás =>
const speak = user.speak; 
speak.call(user,"asd")                  // user- re állítom a this-t, de állíthatom bármely más objektumra

// APPLY, ugyanaz mint a call csak itt tömböt adunk át
// obj1.fgv.call(obj2,[fgvargumentumok])	obj2 -re állítjuk a this értékét 
speak.apply(user,["asd"])               // user- re állítom a this-t, de állíthatom bármely más objektumra

// BIND   
const speakBind = user.speak.bind(user) // user- re állítom a this-t, de állíthatom bármely más objektumra
// call, apply                                                        bind
// (egy fgvnt) MEGHÍVUNK (és mi mondjuk meg mi legyen a this értéke)  ÚJ FGVNT HOZUNK LÉTRE (amelyen belül a this az lesz amit mi adunk meg)

// classokkal call, bind
var Hero = function(name) {  this.name = name; };
var Superman = function(name) {  Hero.call(this, name); };
var clark = new Superman('Clark Kent');
// Meghívjuk a Hero konstruktor fügyvényét úgy, hogy a Hero this-je legyen "this", 
// vagyis a Superman this-je, így a konstruktor fügyvény lefut a Superman-be is, nem kell uj konstruktorfgv.
var heroGreeting = function(address, greeting) {};
heroGreeting.call(Superman, 'Kripton', "Hi there, I'm ");
// meghívjuk a heroGreeting-st és azt mondjuk meg hogy a  heroGreeting this-je a superman-re mutasson.
//----------------------------------------------------------------------------------------------------------------
// MODULE rendszer   
// a HTML be megkell adni a js file impot résznél =>
<script src="import/js" type="module"></script>
//-------------------
// export a "név" elé
const PI=3.14
export const vmiObj = {};export function vmifgv(){return PI};  // így elérhető a PI ott, ahol importáltuk a vmifgv()-t, van rá referencia

// export több "vmit" egy objektumként
const vmiObj = {};function vmifgv(){};
export {vmifgv,vmiObj};                     // így objektumként exportálom
// =>
// Becenevek
import {vmifgv as fgv,vmiObj as objektum} from './file.js.js.js'    // becenevek 1
fgv()       
// VAGY
export {vmifgv as fgv,vmiObj as objektum};                    // becenevek 2
// =>
import {fgv,objektum} from './file.js.js.js'
fgv()                                       // az új névvel hívom meg

// mindent importálunk egy objektként
import * as module1 from './file.js.js.js'        
module1.fgv()

// export default                   // Akkor használjuk, ha az adott fájl csak egy class-t, objectet stb. tartalmaz.
export default fgv1                         // ha csak 1 vmit szeretnénk importálni     // csak 1 lehet 1 fileba, illik a file végére tenni 
// =>
import bármimás from "./xxx.js.js.js"             // a neve itt mind1 mi 
bármimás.fgv1()

// export default + export
export {a,b}
export default c
// =>
import c, {a,b} from './file.js.js.js'            // c az ELSŐ !!!
//----------------------------------------------------------------------------------------------------------------
// objektum            MINDIG legyen const
// for(let value of Object.values(obj)) // az értékein végigiterálhatunk
// for(let keys of Object.keys(obj))    // kulcsokon így
// for(let value of obj)                // értékein
// for(let key in (obj))                // vagy a kulcsain

// if (obj.hasOwnProperty(key)) {}      // FORIN nél ez mindig kell, mert megkell nézni mindig hogy az övé e a kulcs
//                                      // a key az obj saját tulajdonsága? nem öröklött?

const obj = {}          // === new Object()


Object.freeze(turtle)   // objektum lefagyasztása, vagyis NEM MODOSÍTHATÓ MÉG A KULCS ÉRTÉKEI SEM
                        // csak a legfelső szintet fagyasztja be, vis freezelt objekt objektjét már modosíthatom

const turtle= new Object();
turtle.property="az érték";
turtle.method=function(){};        

const turtle={                          
    name:'kiki',
    legs:4,
    shell:true,
    meal:10,
    diet:'berries',
    method:function(){},
}

const firstName="Jhon"; const lastName="Doe"
const user = {firstName,lastName}   // const user = {firstName:firstName,lastName:lastName}
const user = {create(){}}           // const user = {create:function(){}}

const key ="key";
const value ="value";
const myObj={
  [key]:value,                      // key:"value"
  [`computed${key}`]:'computed'     // computedkey:"computed"
}
const keys =['key1',"key2","key3"];
const values =['value1','value2','value3']
const myObj={
  [keys.shift()]:values.shift(),        // key1:"value1"
  [keys.shift()]:values.shift(),        // key2:"value2"
  [keys.shift()]:values.shift(),        // key3:"value3"
}
const {firstName} = userOne;  // firstName be kiszedjük az userOne firsName - ét
http.createServer((req, res)=>{})   // pl 
http.createServer(({url}, res)=>{}) // kiszedtük a req ből a req.url-t
const {firstName="“unknown”",lastName="“unknown”",job="“unknown”"} = userOne;   // mi legyen a default érték ha az userOne propja undefined..
const {firstName:f="“unknown”",lastName:l="“unknown”",job:j="“unknown”"} = userOne; // ha máshogy akarjuk nevezni, f l j
const{name,legs}=turtle;                        // === name=turtle.name  legs=turtle.legs      // objektum kulcsai alapján értékeket szedünk ki
const{name:név,meal:kaja}=turtle;               // név='kiki'  kaja=10
const{name:név,meal:kaja,city="lelle"}=turtle;  // név='kiki'  kaja=10   city='lelle'
const{name:név,meal:kaja,diet="nincs"}=turtle;  // név='kiki'  kaja=10   diet='berries'     az eredetit így nem lehet felülírni !!!!!!

delete turtle.meal;         // a meal property törlése
Object.keys(turtle)         // legfelső szinten lévő kulcs értékeket stringként  adja vissza // amit örököl azt NEM     
Object.values(turtle)       // az értékeket hasonlóan                                                                   
Object.entries(turtle)      // 2d tömbként a kulcsokakt és értékeket

const a = 2;
const b =3;
const obj ={a,b}      //=== const obj = { a=a; b=b;}

for (const key in turtle) {
    if (turtle[key] && turtle[key].toUpperCase) {
//  if (typeof turtle[key] === "string") 
        console.log(turtle[key].toUpperCase())
    }
}

function feed(animal){
    return `Feed ${animal.name} ${animal.meal} kilos of ${animal.diet}`
} // => jobb kód
function feed({name,meal,diet}){
    return `Feed ${name} ${meal} kilos of ${diet}`;
} // => jobb kód
function feed(animal){
    const{name,meal,diet}=animal;
    return `Feed ${name} ${meal} kilos of ${diet}`;
} 

var { email: email } = felhasználó  // az email a felhasználó email atribútumával lesz egyenlő
var { email } = felhasználó         // így is

var person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    },
    fullName2() {
        setTimeout(function() {
            console.log(this)   // ez a this a window objekt, metóduson belüli fgv this értéke
        })
        return this.firstName + " " + this.lastName;
    },
    fullName3: () => {
        return this.firstName + "ez a this nem az objektumra vonatkozik, hanem a SZÜLŐRE";
    },
    get fullName4(){      // Objektnek is lehet get set
      return firstName+lastname
    }
};
person2 = person                // shallow copy, egyed változók kapcsolódnak az eredeti változókhoz // person2 a person-ra mutat
person2 = {...person }          // person klónozása DEEP COPY <= HA nincs beágyazott objektuma  === x      
person2 = Object.assign({},person);         // is                                               === x
const { ...person2 } = person               // is                                               === x ez a 3 x egyenértékű
person4= JSON.parse(JSON.stringify(person)) // DEEP COPY, semmi kapcsolat az eredetivel   // erőforrás égető, + fgv-eket nem tudunk másolni :'(  
// DEEP COPY-ra külső libary-ket kell használni !!!
person3 = {...person,age:20}     
person.lastName = "Kiss"        // A lastName kulcsú elem étékének a felülírása
person.lakhely = "Budapest"     // Új kulcs érték pár




Lastnév = person.lastName; //                                                   // írni olvasni
valtozó ="lastName"        // ha változóként jön a lastName akkor használjuk => // írni olvasni
Lastnév = person[valtozó]; // Properties-t lehet így is                         // írni olvasni
Fullnév = person.fullName();


// egy tulajdonság tulajdonságai, vagyis egy property tulajdonságai
Object.getOwnPropertyDescriptor(person,"firstName")   // a person objektumnak a firstName propjának a descriptorai


// Object.defineProperty(obj, név, leíró) // új property felvételére, illetve módosítására
// defaultan mind true, de ha
Object.defineProperty(person, "_firstName", {      // itt állítjuk be a tulajdonság értékeit akkor defaultan mind false
    value: "EN",                    // érték
    writable: true,                 // irható e?
    enumerable: true,               // iterációba megjelenik e?
    configurable: true,             // törölhető e a .delete-el?
    get: function() { return this._firstName },             // value +
    set: function(value) { this._firstName = value }        // writable-t nem szebad megadni, ha akarunk itt get,set-et
});

/*                                                      Alapértelmezetten
value:      a tulajdonság értéke.                       undefined.
writable:   megváltoztatható-e egy tulajdonság értéke?  false
enumerable: megjelenik-e az adott tulajdonság a         false
for..in ciklusban vagy az Object.keys() felsorolásban? 
configurable: törölhető-e a tulajdonság,                false
vagy változtatható-e bármelyik itt tárgyalt attribútuma?  
set:        setter.                                     undefined.
get:        getter.                                     undefined.
*/
/*
delete obj.b	                            b tag törlés
Object.create(prototípus-objektum)	        Objektum létrehozása
Object.getPrototypeOf(obj)	                === Object.prototype
    	
var obj = Object.create(Object.prototype, 	
    {a: { value: 'piros', writable=true, …	
    	
Object.getOwnPropertyDescriptor(obj, név)	adott tulajdonság leíróobjektumát lekérni.
    	
X=Object.defineProperty(obj, 'a', {	        // tulajd. Létrehozása
     value: 1,  writable: true, …}          // X.value===1 X.writable===true

Object.defineProperties(obj,{               // vagy egész obj létrehozása
    a:{ value: 42,enumerable: false    },	
    b:{ value: 2 }});	
    	
Object.keys(obj): 	                az objektum felsorolható tulajdonságainak nevét tartalmazó tömb.
Object.getOwnPropertyNames(obj): 	az objektum összes tulajdonságának nevét tartalmazó tömb.
Object.preventExtensions(obj): 	    megakadályozza új tulajdonság hozzáadását az objektumhoz.
Object.isExtensible(obj): 	        a fenti tulajdonság lekérdezése.
Object.seal(obj): 	                a tulajdonságok és leírók attribútumának változtatását tiltja le, kivéve az értékek megváltoztatását.
Objcect.isSealed(obj): 	            a fenti tulajdonság lekérdezése.
Object.freeze(obj): 	            az objektum befagyasztása, azaz semmiféle változtatás sem engedélyezett az objektumon.
Object.isFrozen(obj):	            a fenti tulajdonság lekérdezése.	
a.isPrototypeOf(b): 	            visszaadja, hogy "a" szerepel-e "b" prototípusláncában.
Object.getPrototypeOf(obj):	        megadja obj prototípus-objektumát.
obj.__proto__: a __proto__	        tulajdonság az obj prototípus-objektumára mutat. Csak pár böngészőben érhető el, így használata nem javasolt.
obj.hasOwnProperty(név)	            a "név" tulajdonság az obj-é-e, ha igen akkor true …pl Ha a prototípusáé akkor is false
*/

// a prototype egy class-nak a fő "Class"-a és rajta keresztül érjük el az adott class metódusait és, annak a prototypnak, is van
// prototype-ja, végső lánc az Object class prototype-ja 
var Hero = function(name) { this.name = name; };    // ez a konstruktor fgv
function Hero(name){this.name=name}                 // ez a konstruktor fgv
Hero.prototype.getName = function() { return this.name; };
// a hero prototípusához így adunk uj fgv-nt azért jó mert ha a konstruktorfügvényhez adnánk akkor minden példánynál létrejön a fgv, ez pazarlás, így csak a prototípusához adjuk hozzá
var Superman = function(name) {  this.name = name; };
Superman.prototype = new Hero;
// igy állitjuk be a supermen prorotípusát hogy egy hero legyen
// de ha most a Superman-nek adunk uj fgvt-t akkor az nem lesz jelen a Hero-ba
Hero.getHeroCount = function() {  return Hero.heroCount; };
// EZ a superman objektum számára undefined mert nincs a hero prototíousába és this elve sincs
this.getHeroCount = function() {  return Hero.heroCount; };
// helyette a HERO konstruktor fgv ében DE így mindig létrejön uj példánynál
Hero.prototype.getHeroCount = function() {  return Hero.heroCount; };
// így kevésbé memoriapazarló mint a this-es mert itt csak egyszer jön létre
var Hero = function(name) {  this.name = name; };
var Superman = function(name) {  Hero.call(this, name); };
var clark = new Superman('Clark Kent');
// assertEquals('Clark Kent', clark.name);
// a this mire mutatson? name-re..
// így a konstruktor fügyvény lefut a Superman-be is
// nem kell ujra leírni hogy this.name=name;
var hero = { name: 'Superman', getName: function() { return this.name; } };
// assertEquals('Superman', hero.getName());
var fatHero = {  name: 'Sugarman'  };
fatHero.saySomething = hero.getName; // assertEquals('Sugarman', fatHero.saySomething);
// Egy metódust minden további nélkül átadhatunk egy másik objektumnak,
// a this már az új objektumra fog mutatni.
var  superman = Object.create(hero);
superman.name = 'Clark Kent'; // assertEquals('Clark Kent', superman.getName())
/* Ha egy prototípus alapú öröklődést valósítunk meg függetlenül attól,
hogy az Object.create vagy konstruktorfüggvény alapú, a this mindig a prototípusláncban 
a híváshoz legközelebbi objektumra fog mutatni! Bár a superman objektumban 
nincs getName függvény, azt a prototípuslánc következő elemétől kell elkérnie, 
azonban maga a hívás a superman objektumon történt, így a this értéke is a superman-től indul.
Ha itt nem találna name property-t, akkor tovább keresné a prototípusláncban.
*/
 
hero = { 
        name: 'Superman',
        getIntroductionHTML: function() {
                var formattedName = function(tag) {
                    return '<' + tag + '>' + this.name + "stb..."
                }
            } // egy metódusbeli belső függvény már egyszerű függvénydefiníciónak minősül, 
    } // így az ott szereplő this értéke a globális objektum (strict módban pedig undefined) lesz! 

hero = { 
    name: 'Superman',
    getIntroductionHTML: function() { 
            var _this = this,
                formattedName = function(tag) {
                    return '<' + tag + '>' + _this.name + "stb..."
                }
        } //A megoldás a fenti problémára
}
hero = { 
        name: 'Superman',
        getIntroductionHTML: function() { 
                var formattedName = (tag) => '<' + tag + '>' + this.name + "stb..."
            } // A jobb megoldás a fenti problémára
    } // kontextusa mindig az a scope, amiben őt definiáltuk.

var heroGreeting = function(address, greeting) {}
heroGreeting.call(superman, 'Kripton', "Hi there, I'm ");
// meghívjuk a heroGreeting-st és azt mondjuk meg hogy a 
// heroGreeting this-je a superman-re mutasson, a többi meg a fgv bemenetei
heroGreeting.apply(superman, ['Kripton', "Hi there, I'm "]);
// ugyanaz csak tömbbel

let id = Symbol('id'); //egy egyedi azonosító és mások számára láthatatlan
person.id = 140353;

// String,Boolean,Number    // NE HASZNÁLD a new kulcsszót ilyenkor!!!!!! csak Dátumnál
var x = "John"; // var y = new String("John"); var z = new String("John");
// (x == y) --> true // (x == z) --> true  // (y == z) --> false
//(x === y) --> false// (x === z) --> false // (y === z) --> false // mert nem ugyanaz az objektum.
//----------------------------------------------------------------------------------------------------------------
// OBJ -> CLASS
function User(name){
  this.name=name
  this.whoAmI = function(){console.log(this.name)}  // BAD PRACTICE, rossz MO // probléma => minden objekt esetébe létrejön
}
const johnDoe = new User("John");
johnDoe.whoAmI()                                    // "John"                 // helyette =>
User.prototype.whoAmI= function(){console.log(this.name)}                     // a jó megoldás ez
// prototype láncon keresztül öröklődös, == objektum örököl objektumtól
// prototype      tulajdonsága csak fügvényeknek van
// a constructor egy hivatkozás a construktor fgv-re
// [[prototype]]  tulajdonsága minden objektumnak van   // az öröklődés ezzel valósul meg // __proto__ segítségével érem el
// ez a __proto__ a [[prototype]] egy getter settere 
//  ----------------------------------------------------------------------------------------------------    ----------------------                  
//  |  ------------------------------------------------------                                          V    V                    |
//  | |                                                     |         ------------------------------>Function.prototype          |
//  | V                                                     |         || Function()<-----------------constructor                 |
//  | User() constructor fgv                                |         |--prototype        -----------__proto__                   |
//  | prototype ------------------------> User.prototype    |         ---__proto__        |                                      |
//  --__proto__    |                      constructor  ------         ---------------------                                      |
//                 |                      __proto__    -----          |  Object.prototype  <------------------------------------ |
//   Man.prototype |                      whoAmI()         |          |  constructor -------------->  Object() constructor fgv | |     
//   constructor   |                      ^     ^          |          -->hasOwnProperty               prototype ---------------- | 
//   __proto__ -----                      |     |          ------------->isPrototypeOf                __proto__ ------------------
//                                        |     |                        __proto__ -----               
//                          User obj1     |     |    User obj2                         |                
//                            name        |     |      name                            V
//                          __proto__ -----     ---- __proto__                        null 
// mindenkinek a konstruktor fgv __proto__-ja a Function.prototype-ra mutat            
// mindenkinek a konstruktor fgv prototype-ja a saját .prototype-jára mutat
// mindenki.prototype-jának a __proto__-ja a láncba felette lévő .prototype ra mutat,     
// DE az Object.prototype __proto__-ja null-ra, és az Function.prototype __proto__-ja az Function.prototype-ra
// a példányok __proto__-ja a saját .prototype-jára
//----------------------------------------------------------------------------------------------------------------
// CLASS   
// ökölszabáj => ha nem használok egy metódusba this-t akkor az mindig legyen static
class Car {
  static type = "Busz";   // Car.type   // "BMW"    // static     // osztoznak rajta a hasonló típusú példányok
  micsoda = "auto";       // minden példánynak külön külön beégeti EZ NEM KÖZÖS ELEM
  #rendszam;              // privát változó nem érem el kívül, csak get,set-el, + muszáj itt deklarálni!!! // delete this.#rendszam => syntax error
  constructor(name, year) {                                               // prototypolással =>
      this._name = name;           // itt létrejön a this._name property  // function Car(name,year){this._name=name;this._year=year} // constructor
      this._year = year;
      this.#rendszam="123456"             
  }                                                                       
  get name(){return this._name}     // Car_1.name;    // BMW              // Car.prototype = {get name(){return this._name}}          // get
  set name(name){this._name= name}  // Car_1 = Merci; // így állítom be   
  age(x) {                                                                // Car.prototype.age= function(){return x - this._year;}    // fgv-ek
      return x - this._year;
  }
}
Car_1 = new Car("BMW", 1991);      
Car.type                        // "Busz"                                 

class Super_Car extends Car {                                           
  constructor(name, year) {                                           
    super(name, year);  // a gyerek konstruktorának meghívása          // Car.call(this,name,year)                                     // super
    this._age = super.age(2022)       // így elérem a szülő fgveit
  }
  kiiras() {                                                            // Super_Car.prototype = Object.create(Car.prototype);          // extends
      console.log(`bármi`);                                             // Super_Car.prototype.constructor = Super_Car                  // constuctor 
  }                                                                     // Super_Car.prototype.kiiras= function(){console.log(`bármi`);}// fgv-ek
}
//----------------------------------------------------------------------------------------------------------------
// a hiba visszafele halad, keres egy hibakezelést(catch blockot), majd ott folytatódik ahol abba maradt
// úgy hogy a hibás rész kimarad, DE ha egy fgvbe volt a hiba akkor nem a fgv-t folytatja, 
// hanem a fgv en kívüli a fgv-t követő utasítás az ami következik
try { 
    // A try blokkba írjuk azt a kódrészletet, amit tesztelni szeretnénk. Ha nincs hiba, akkor simán lefut a kód.
    if (x < 5) { 
      throw "túl kicsi";  // a catch blockban ==> err = "túl kicsi" 
      throw TypeError("error typust is adhatunk + szöveg") // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors?retiredLocale=hu
    }
} catch (err) { //ha problémát talál, akkor a catch ágban "kapja el" a hibát 
  // és a catch ágban tudjuk lekezelni - megmondani, hogy mit tegyen, ha hibát észlel.  
  // throw után is ide jutunk
  if (err instanceof ReferenceError) {/* itt szedjünk külön hibafélékre */}   // nincs multi catch ág(több catch lánc) mint pl java-ba
  t_error = err;          // ez a throw-lolt üzenet minden infóval
  massage = err.massage;  // "túl kicsi"
  ename = err.name;
  stack = err.stack       // nem a szabvány része, plusz infók
  /* az err.name értékei lehetnek:
    EvalError	      An error has occurred in the eval() function
    RangeError	    A number "out of range" has occurred
    ReferenceError	An illegal reference has occurred
    SyntaxError	    A syntax error has occurred
    TypeError	      A type error has occurred
    URIError	      An error in encodeURI() has occurred
  */
} finally {} // mindenképp lefut

setTimeout(()=>{try {}catch(e){}})  // Assinkron kódnál a magba legyen a try catch block
//----------------------------------------------------------------------------------------------------------------
// element elérése // document === Böngészőspecifikus, csak a böngésző miatt érem el a DOM miatt 

document.getElementById('ID');                                                        // az első elemet adja vissza
document.querySelector('cssselector');            // pl.: ".clasasnév p"              // az első elemet adja vissza
document.querySelectorAll('cssselector');                                             // iterálható objektumot ad vissza (Nodelist)
document.getElementsByName('namee');              // pl.: name="namee"  // ez a Name  // iterálható objektumot ad vissza (Nodelist)
document.getElementByClassName('classnév');                                           // iterálható objektumot ad vissza (HTMLCollection)
document.getElementByTagName('tagname');          // pl.: "td"                        // iterálható objektumot ad vissza (HTMLCollection)
// => iterálható elemeknél elérjük indexel az elemeket  => iterálható[1]
//----------------------------------------------------------------------------------------------------------------
// element kreálása
// element.innerHTML = ``; //      így tilos me ez lassú!!!

// fragment     // akkor használjuk, ha dinamikusan jön hogy pl "p"-t akarunk vagy x db "p"-t akarunk stb
let fragment=document.createDocumentFragment()
var  para = document.createElement("p");    // milyen tag?
// para.id = ''; para.className = '';          // beállítjuk a dolgait
// para.setAttribute("class",  "democlass");   // atribútum érték, pl class a cssből vagy bármi más
fragment.appendChild(para); // az adott elem gyerekei közül utolsóként szúrja be az újelem-et.
fragment.appendChild(para2); // ciklikusan hozzáfűzöm magához a fragmenthez (végére a kövi elemet)
element.appendChild(fragment)

// template     // akkor használjuk, ha ezt a templatet akarjuk ujra és ujra felhasználni mint sablon
const tpl = document.createElement('template');   
tpl.innerHTML = `
<div>
    <h1>Heading</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    <button>Button</button>
</div>
`;
const el = tpl.content.firstElementChild
document.documentElement.appendChild(el.cloneNode(true)); // true === mély másolás, minden gyerek minden gyerekét, false === csak a legkülsű gyerek node-ot másolja
//---------------------
// element törlése
while (element.firstChild) {                // kitörli az element alatt lévö összes element-et
  element.removeChild(element.firstChild);
}
element.remove();                           // majd csak utánna töröljük 
//---------------------
element.replaceChild();                     // így az element gyerekeinek a törlés
//---------------------
ParentElement.insertBefore(newNode, ParentElement.firstChild); // beszúrja az újelem csomópontot az adott elem gyerekei közül 
// a létező refelem gyerekcsomópont elé. Ha ez utóbbi null, akkor a gyerekelemek végére szúrja be az újelem-et.
element.replaceChild(új, régi); //az adott elem gyerekelemei közül a régielem csomópontot 
// az újelem csomópontra cseréli le, és a régi csomóponttal tér vissza.
// https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren#emptying_a_node
//---------------------
element.insertAdjacentHTML(position, text);
//  position értékei:
// <!-- beforebegin -->         // 'beforebegin': Before the element itself.
// <p>
//   <!-- afterbegin -->        // 'afterbegin': Just inside the element, before its first child.
//   foo
//   <!-- beforeend -->         // 'beforeend': Just inside the element, after its last child.
// </p>
// <!-- afterend -->            // 'afterend': After the element itself.
//----------------------------------------------------------------------------------------------------------------
// attribútum fgvek // attribútum pl.: class="...", id="...", name="...", type="..." stb...

element.hasAttribute('attribútum'); //van e ? true or false

element.getAttribute(namee); //adott nevű attribútum értékének lekérdezése.
element.setAttribute(namee, value); //adott nevű attribútum értékének beállítása.
element.hasAttribute(namee); //adott nevű attribútum létezésének vizsgálata. van e? true or false
element.removeAttribute(namee); //adott nevű attribútum eltávolítása.
//attributes: 	        elem összes attribútumának gyűjteménye.
//----------------------------------------------------------------------------------------------------------------
// element.Y
// Y =>
innerHTML               // az egész tag és benne lévő minden classnév id innertext stb nem ajánlott biztonsági rés
innertext               // CSAK a szövegrész
textContent             // szövegrész + minden sortörést + szövegben lévő scriptek is 

style.color             // minden css tulajdonság elérhető a style alatt
style.backgroundColor   // camelCase  
id
className               // class="ez az egész a class Name"
// classList.add("classneve")      classList.remove("classneve")

type
value                   // (az értéke amit beír a felhasználó)    
checked                 // (pipa v nem pipa)

/*    selectorok:
last-child      first-child     only-child      nth-child(3n)(minden 3. gyereke)
nth-last-child(odd)(hátulról odd(páratlan),even)    nextSibling(kövi tesó)   
NextElementSibling(kövi egész elem tesó)   previousSibling     parentNode(szülő)    parentElement(szülő)
childNodes[szám](az összes gyerekcsomópont listája (NodeList)) children(csak a gyerekei)   
childElementCount(gyerekszámolo)        firstChild      lastChild       firstElementChild
*/

// form name
// van a html-ben a form, aminek van name property-je, formon belül pedig van egy input, aminek szintén van name property-je. 
// Ezeket tudod szépen felfűzni. document.<form name>.<input name>


//----------------------------------------------------------------------------------------------------------------
// Események:

// 1. html-ben az onclick bemenetre kötjük a fgvünk => onclick="fgv()"
// vagy jsben                                       => element.onclick=fgv()
// 2. js fileba                                     => element.addEventListener("click",fgv(),usecapture)
//                                                                                            usecapture=true,false
//                                  true:   ha egy dobozban van a doboz, akkor először a külső doboz, majd a belső fut le
//                                  false:  alapértelmezett, először a belső
//                                                     element.removeEventListener("mousemove", myFunction);

// akkor hívódik meg ha betöltődött az oldal MINDIG IDE ÍRUNK MINDENT
document.addEventListener('DOMContentLoaded', () => {
  // Itt nem működik az amikor a html onclick jére kötjük a fgvt
  // mert akkor még nem létezik amikor betöltődik a html és úgy van rákötve
  // csak addEventListener es megoldás működik
});

//----------------------------------------------
/*events

Esemény	    Eseménykezelő	  Bekövetkezése
submit      onsubmit
input       oninput         az input reál time értéke
            onload	        The browser has finished loading the page   // window.onload = renderfgv;	ha az oldal betöltődött lefut a render fgv
            onkeypress      gomb lenyomás pl input esetén               // event.key	            az utolsó billentyű értéke
            onkeydown
            onkeyup
dblclick    ondblclick
click       onclick         The user clicks an HTML element
            onchange        An HTML element has been changed
Load	      onLoad	        Az oldal minden objektuma letöltődése után
Resize	    onResize	      Dokumentum átméretezésekor
Scroll	    onScroll	      Dokumentum görgetésekor
Unload	    onUnload	      Dokumentum eltávolítása esetén ablakból vagy frame-ből. Érvényes BODY, FRAMESET elemekre.
Click	      onClick	        Az adott elemre való egérkattintáskor	            A legtöbb elemre.
MouseDown	  onMouseDown	    Egérgomb lenyomása az adott elem felett	    	    A legtöbb elemre.
MouseUp	    onMouseUp	      Egérgomb felengedése az adott elem felett		      A legtöbb elemre.
MouseOver	  onMouseOver	    Az egérkurzor az adott elem fölé kerülése esetén.	A legtöbb elemre.
MouseMove	  onMouseMove	    Az egérkurzor az mozog az adott elem fölött.      A legtöbb elemre.
MouseOut	  onMouseout	    Az egérkurzor az adott elemet elhagyja.	    	    A legtöbb elemre.
mouseenter
mouseleave                   ha a szülőre  megyünk akkor is proccol

Menete:  MouseDown > MouseUp > Click (Többszörös kattintásnál) 
a detail attribútum értéke minden kattintásnál megnövekszik eggyel.	

Formokra vonatkozó események
Blur
Eseménykezelő neve: onBlur
Bekövetkezése: amikor az adott elem elveszti a "fókuszt".
Érvényes: LABEL, INPUT, SELECT, TEXTAREA, és BUTTON elemekre.
Change
Eseménykezelő neve: onChange
Bekövetkezése: amikor az adott elem elveszti a beviteli fókuszt, és változás következett be a tartalmában azóta, hogy rákerült a fókusz.
Érvényes: INPUT, SELECT, és TEXTAREA elemekre.
Focus
Eseménykezelő neve: onFocus
Bekövetkezése: amikor az adott elem aktívvá válik, vagy az egér, vagy a billentyűzet segítségével (TAB).
Érvényes: LABEL, INPUT, SELECT, TEXTAREA, és BUTTON elemekre.
Reset
Eseménykezelő neve: onReset
Bekövetkezése: amikor FORM reset következik be.
Érvényes: Csak FORM elemre.
Select
Eseménykezelő neve: onSelect
Bekövetkezése: amikor a felhasználó szöveget jelöl ki szöveges (text) mezőben.
Érvényes: INPUT, TEXTAREA elemekre.
Submit
Eseménykezelő neve: onSubmit
Bekövetkezése: amikor a FORM adatokat elküldenek. (submit).
Érvényes: Csak FORM elemre.

Objektumszintű események
Abort
Eseménykezelő neve: onAbort
Bekövetkezése: amikor egy képletöltést megszakítanak.
Érvényes: objektum elemekre.
Error
Eseménykezelő neve: onError
Bekövetkezése: Amikor egy kép nem töltődik le teljesen vagy hiba keletkezik a script futása közben.
Érvényes: OBJEKTUM, BODY, FRAMESET elemekre.
*/
//----------------------------------------------
// form küldés
// event.target.elements.	                            összes form kontroll form esetén
// event.target.elements."Name attribútuma".value	    a beirt érték  form esetén
// event.target.elements."Name attribútuma".checked    pipa, nem pipa
// event.target.dataset."valami"                       a data-valami=="XXX" értéke.. 
//     //data-valami="XXX"      bármennyi lehet egy html elemnek, csak más névvel, pl ID-t csatolás
//               dataset az összes data- attributumokat tartalmazzsa
// fgv(event){	event.preventDefault;}
// az event alapértelmezet feladatát nulázza vagyis, 
// ha pl post űrlapot küldene, nem fog, ha linket megnyitna, nem fog.. 
// Helyette az eventre azt csinálja amit mi írunk neki

// event.target	    az az elem ahol az esemény bekövetkezett
// event.target.id	    az idja, stb. amit lehet modosítani
// event.type	        az event típusa
// event.timeStap	
// event.target.dataset.valami	így lehet elérni a js be
// <data-valami="értéke pl ID">	EZT
// event.clientY	        Y koordináta az egérnek
// event.clientX	
// event.offsetY	        a gomb hoz mért kordináta y
// event.offsetx	
//----------------------------------------------------------------------------------------------------------------
/*Ajax kérések, asszinkron metódusok

var xhr = new XMLHttpRequest()	    Creates a new XMLHttpRequest object
abort()	                            Cancels the current request
getAllResponseHeaders()	            Returns header information
getResponseHeader()	                Returns specific header information
open(method, url, async, user, psw)	Specifies the request
                                        method: the request type GET or POST
                                        url: the file location
                                        async: true (asynchronous) or false (synchronous)
                                        user: optional user name
                                        psw: optional password
send()	                            Sends the request to the server.Used for GET requests                                
send(string)	                    Sends the request to the server.Used for POST requests                                        
setRequestHeader()	                Adds a label/value pair to the header to be sent

Propertízek:	
onreadystatechange	                Minden változáskor bekövetkező esemény
readyState	                        a kérelem állapotát jelzi
                                        0: request not initialized
                                        1: server connection létrejött
                                        2: kérés fogadva
                                        3: kérés feldolgozás folyamatba
                                        4: kérés készz, válasz késsz
responseText	                    Returns the response data as a string
responseXML	                        Returns the response data as XML data
status	                            Returns the status-number of a request
                                        200: "OK" sikeres a kérés
                                        403: "Forbidden"
                                        404: "Not Found"
statusText	                        Returns the status-text (e.g. "OK" or "Not Found")

Szerver metódusok:
getResponseHeader()	                Returns specific header information from the server resource
getAllResponseHeaders()	            Returns all the header information from the server resource

Szerver propertízek:
responseText	                    get the response data as a string
responseXML	                        get the response data as XML data

xhr.open('POST','www.indx.hu')	            hova küldje ki a kérést
xhr.send(string)	                        POST, pl:"fname=Henry&lname=Ford"
jSON.parse(xhr.responseText)	            átalakítja js es alakpba az adatokat
xhttp.open("POST", "ajax_test.asp", true);	egy post így néz ki, a true az asyncront jelzi alapértelmezetten true
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
xhttp.send("fname=Henry&lname=Ford");

xhr.open('GET','www.indx.hu')	            hova küldje ki a kérést
xhr.send()	
JSON.parse(xhr.responseText)	            átalakítja js es alakpba az adatokat	
xhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send();	
*/
document.getElementById("ID_0").onclick = function() {
        kérés_küldés_1();
    } // 0. pl Egy onclick eményre kötjük be azt a fgvt ami kiküld egy ajax kérést
function kérés_küldés_1() {
    var xhr = new XMLHttpRequest() // 1. kell egy XMHttp objekt
    xhr.onreadystatechane = function() {
            //2. readystate változását várjuk, ha megtörténik, akkor ez a fgv lefut
            if (xhr.readyState === 4 && xhr.status === 200) {
                //3. a változások alapján a megfelelelő if ág..
                var választext = JSON.parse(xhr.responseText);
                //4. JSON formátumból js é alakítjuk a választ
                var válaszhtml = ``
                for (var elem of választext) {
                    válaszhtml += `<p>` + elem.title + `</p><small>` + elem.body + `</small>`
                } //megjelenítés, már átvan js-é konvertálva, vagyis ha obj, akkor létezik a .title..
                document.getElementById("ID_ahova_1").innerHTML = válaszhtml
            }
        } //5. felépítjük a htmlt és bekötjük vhova A "választext"-et
    xhr.open('GET', 'www.valhol.hu/stb'); //6. hova küldjök a kérést? ahonnan a választext et várjuk
    xhr.send() //7. küldjük
} //(onclick zárása)
//VAGY, általános mgoldás!!
document.getElementById("ID_1").onclick = function() {
    var url = ""
    kérés_küldés_2(url, "GET", null, function() {
        var válaszhtml = `` // ez akor hívódik meg ha végzett, vagyis megkaptuk az adatokat
        for (var elem of választext) {
            válaszhtml += `<p>` + elem.title + `</p><small>` + elem.body + `</small>`
        } //megjelenítés, már átvan js-é konvertálva, vagyis ha obj, akkor létezik a .title..
        document.getElementById("ID_ahova_2").innerHTML = válaszhtml
    });
}

function kérés_küldés_2(url, method, body, callback) {
    // callback= egy fügvény, akkor hívódik meg ha "eljön az ideje"
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechane = function() {
            if (xhr.readyState === 4 && xhr.status === 200) { // most jött el a "callback ideje" ha ez igaz
                callback(JSON.parse(xhr.responseText)); //  ha ez nálunk van, akkor fog majd lefutni az 
            } //                                             a callback amivel majd meghívjuk
        } //és ez lesz a callback értéke amit vár a kövi résznél a teljesadat
    xhr.open(method, url);
    //  setRequestHeader('content-type', 'application/json') //és itt, header információ, ami csak itt ez..
    xhr.send(body)
}
//login funkció, ..egymásba ágyazódás..

var url = 'www.valami/login'; //ahova
var body = JSON.stringify({ email = 'email', password = 'pass' }) //amit küldünk
kérés_küldés_2(url, 'POST', body, function(token) {
    if (token) {
        //ebbe a fgvbe a token nálunk van és csinálhatunk valamit vele 
        kérés_küldés_2(url2, 'GET', null, function(users) {
            if (users) {
                // itt meg az users ..
            } else {
                alert('Error');
            }
        })
    } else {
        alert('Error');
    }
})

//---------------------------------------------------------------------------------------------------------------------------
// Assincron programozás
// Promis prioritása nagyobb mint a többi aszinkron fgv-é mert ő mikroTask a többi macroTask
//---------------------------------------------------------------------------------------------------------------------------
// Promise
// 4 állapota lehet: 
// pendig,várakozás         fulfill,sikeresen lefutott          reject,sikertelen, vmi hiba       settled, ha lefut(sikerességtől függetlenül)

const samplePromis = new Promise((resolve,reject) => {                                                // ez a resolve bemenetre
  setTimeout(()=>{
    resolve("fulfill,sikeresen lefutott")         // ha sikeresen lefut => meghívódik a resolve       // a resolve bemenetre hívjuk meg
    reject(Error("reject,sikertelen"))            // ha sikertelen      => meghívódik a reject
  })
})
samplePromis.then(
  (data)=>console.log(data),              // data="fulfill,sikeresen lefutott"    // itt meghívom     // a then egy promoist ad vissza
  (error)=>console.log(error)             // error="reject,sikertelen"             // a rejectet, ha hiba történt akkor ez fut le itt kezeljük
)   
// szebb megoldás =>  ugyanazt csinálja mint a másik
samplePromis
  .then((data)=>console.log(data))  
  .catch((error)=>console.log(error))
//----------
  .finally(()=> console.log("settled"))     // mindig lefut 

// ha láncoljuk a then-eket, akkor kell return value
samplePromis  
.then((data)=>{data.toUpperCase();return new Promise((resolve,reject)=>{/*....*/});})   // visszatérési érték lehet egy promnis is
.then((data)=>console.log(data))


const cat = new Promise((resolve,reject)=>({sound:'miau',loyal:false}))
const dog = new Promise((resolve,reject)=>({sound:'vauu',loyal:true}))

Promise.all([cat,dog])      // addig vár amíg a paraméterül kapott összes promis fulfilld nem lesz.. vis sikeres
  .then((ressults)=>{
    const [cat,dog] = ressults;
    console.log(cat,dog);
  })
  .catch(error=>console.log(error)) // ha az egyiknél [cat,dog] már hiba van egyből ide ugrunk (DE az utánna lévő promisok még futnak)


Promise.allSettled([cat,dog])      // a sikerességtől függetlenül, ha mind lefut akkor lép be a then blockba
  .then((ressults)=>{
    const [cat,dog] = ressults;
    console.log(cat,dog);
  })
  .catch(error=>console.log(error)) 

Promise.race([cat,dog])             // ha az első már lefut akkor belép a thenbe
.then((promise)=>{
  console.log(promise);
})
.catch(error=>console.log(error)) 

//---------------------------------------------------------------------------------------------------------------------------
// thenable     // objekt olyan objektum aminek van then metódusa
const thenable = {
  age:30, 
  then(res,rej){
    setTimeout(()=>res(this.age*2),1000)
  }
}
Promise
  .resolve("Succes")
  .then((result)=>{                           // "Succes"
    console.log(result);                    
    return thenable;
  })
  .then((value)=>console.log(value))          // 1 sec múlva kíirja hogy 60
//---------------------------------------------------------------------------------------------------------------------------
// XMLHttpRequest
function request(method,url,callback){
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange=()=>{                
    if(xhr.readyState === 4 && xhr.status === 200){     // ha az állapora az xhr-nek 4 és 200, vagyis sikeres, akkor meghívja a ...
      callback(xhr.responseText)
    }
  xhr.open(method,url,true)                              // Milyen kérés és hova?
  xhr.send()                                            // elküldjük a kérést
  } 
} 
function callback(result){
  const data = JSON.parse(result);                     // amit kapunk (xhr.responseText) azt Parsoljuk objektummá
  console.log(data.users)
}
const url = 'http://'
request('GET',url,callback)
//---------------------------------------------------------------------------------------------------------------------------
// Fetch      // ugyanaz mint e fenti megoldás
const url = 'http://'
const result=fetch(url)
result
  .then(data=> data.json())
  .then(users=> console.log(users.users))
//----------------------------------
// plusz opciók fetch-hez
const fetchHeaders=new Headers({
  "Content-Type": "application/json; charset=UTF-8"
})    
// const fetchHeaders=new Headers([                         // így is lehet
//   ['Content-Type','application/json']
// ])
const url = 'http://'
const fetchOptions={
  method: 'GET',              // muszály
  headers:fetchHeaders,       // muszály
  mode:'cors',
  cache:'no-cache'
}
const result=fetch(url,fetchOptions)
result
  .then(data=> data.json())
  .then(users=> console.log(users.users))
//---------------------------------------------------------------------------------------------------------------------------
// Aszinkron függvények     // Mindig promist ad vissza
async function two(){
  const promise = new Promise((resolve,reject)=>{
    setTimeout(resolve,1000,2)
  })    
  const result = await promise;       // megvárja a Promis-t hogy lefusson, csak asynkron fgv-n belül lehet használni az await-ot
                                      // vagy másszóval: Meghívja a "promise" then metódusát 
  console.log(result)                 // 2
  return result;                      //=== return Promise.resolve(2)
}
two().then(console.log)               // 2
//----------------------------------
// performance mérés
function resolve(value){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,2000,value*2)
  })
}
async function serial(){ 
  const a=await resolve(1)                      // 2 sec
  const b=await resolve(2)                      // 2 sec
  return a+b                                    // összesen 4 sec
}
async function serial2(){                       // párhuzamos futás
  const aPromis= resolve(1)                     // 2 sec
  const bPromis= resolve(2)                     // 2 sec
  return (await aPromis)+(await bPromis)        // összesn 2 sec
}

function executionTime(func){                   // szinkron kód esetén jól működik
  const start=performance.now();
  func();
  const end = performance.now();
  return end-start;
}
console.log(executionTime(serial));
async function executionTime2(func){             // Aszinkron kód esetén ez
  const start=performance.now();
  const result=await func();
  const end = performance.now();
  console.log({             
    functionName:func.name,
    executionTime:end-start,
    result
  });
}
executionTime2(serial)
//---------------------------------------------------------------------------------------------------------------------------
// Fetch+Async
async function request(url,options={}){
  try{
    const response=await fetch(url,options)
    const result=await response.json();
    success(result)
    // return result
  }catch(e){
    console.log(e);
  }
}
function success(response){
  console.log(response);
}
request('./data.json')
// request('./data.json').then(console.log)
//---------------------------------------------------------------------------------------------------------------------------
// ?_limit=X
url= 'http://........./tudos?_limit=20'         // csak 20 adat jön
url= 'http://........./tudos/2'                 // a tudos listába a 2-es ID-jú elem



//---------------------------------------------------------------------------------------------------------------------------
// POST
const saveText = async () => {
  const textInput = document.getElementById('text')
  const dateInput = document.getElementById('date')
  const textObject = {
    text:textInput.value,
    date:new Date(dateInput.value)
  }
  const body = JSON.stringify(textObject);
  const headers = new Headers({'Content-Type': 'application/json'})
  const options = {
    method: 'POST',
    headers: headers,
    body: body                  // request body
  }
  const URL ='http://localhost:3000/todo'
  const response = await fetch(URL, options)      
  const data = response.json()                            // az objektumot adja vissza a kérés, vagy hiba
  console.log(data);
}



//---------------------------------------------------------------------------------------------------------------------------
// PUT
const updateText = async () => {      // amelyik tulajdonságot nem adok meg pl kihagyom a date-et akkor azt elhagyja

  const textInput = document.getElementById("text")   
  const dateInput = document.getElementById("date")
  const idInput = document.getElementById("id")

  const updatedText = {
    text: textInput.value,
    date: new Date(dateInput.value),
  }

  const body = JSON.stringify(updatedText)
  const options = {
    method:"PUT",
    headers:headers,
    body:body
  }
  console.log(idInput.value);
  const response = await fetch(`${URL}/${idInput.value}`,options);
  const data = await response.json()                      // a válasz maga az új objektum
  console.log(data);
}
//---------------------------------------------------------------------------------------------------------------------------
// DELETE
const deleteText = async () => {        // üres objektet kapunk 
  const idInput = document.getElementById("id")
  const options={
    method:"DELETE",
    headers:headers
  }  
  const response = await fetch(`${URL}/${idInput.value}`,options);
  const data = await response.json()                      // a válasz egy üres objektum
  console.log(data);
}

//---------------------------------------------------------------------------------------------------------------------------




function kérés_küldés_3(url, method, body) {
    return new Promise(function(resolve, reject) { //itt hozzuk létre a promist
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechane = function() {
            if (xhr.readyState === 4) {
                if (xhr.status < 300 && xhr.status >= 200) {
                    resolve(JSON.parse(xhr.responseText)); //a promise sikeres állapota
                } else { reject(xhr.responseText); } //a promise sikertlen állapota
            }
        }
        xhr.open(method, url);
        setRequestHeader('content-type', 'application/json'); //ezek a végére kellenek mert előszőr nyilván megakarjuk kapni a kérésre a választ 
        xhr.send(body); //	és az után annak alapján kérni és küldeni .. Ide jut a program legkésöbb
    });
}

kérés_küldés_3(url, 'POST', body)
    .them(function(token) {
        console.log(token);
        return "valami";
    }) // ez mindenképp egy promise lesz!! Átalakítja 1x es promissá nekünk a then
    .then(function(users) {
        console.log(users); //users==="valami"
        //a users itt az előző returnja amit felhasználhatunk
    })

kérés_küldés_3(url, 'POST', body)
    .them(function(token) {
        console.log(token);
        return kérés_küldés_3(url, 'GET', null);
    }) // ez mindenképp egy promise lesz!! Átalakítja 1x es promissá nekünk a then
    .then(function(users) {
        console.log(users); // it az userek is már a kezünkben
        return Promise.reject('hiba oka'); // hibára, catch blockra futtatás manuálisan!!!
    })
    .catch(function(error) {
        console.log(error); // csak ez elötte levő then blockokba lesi a hibát
    })
    //  FETCH	beépített request function
document.getElementById("Login").onsubmit = function(event) {
    event.preventDefault(); //  a gomb alapértelmezett működés tiltása
    var email = event.target.elements.email.value;
    var password = event.target.elements.password.value;
    var body = JSON.stringify({ email: email, password: password, }); //ezt küldjük 
    fetch('url ahova a kérés megy', {
            method: 'POST',
            body: body, //  a fetch blokra a válasz a kövi then blockba érhető el
            header: { "Content-type": "application/json" }
        }) //               promise of response val tér vissza, késöbb elérhető resoponse
        .then(function(response) {
            if (!response.ok) {
                return Promise.reject('Login Error')
            }
            console.log(response) //    ez a teljes válasz statusokkal mindennel
            return response.json()
        }) //                           VAGY így továbbadjuk
        .then(function(response) { //   itt kezöünkbe a token
            return fetch("url") //      vis jöhet a második kérés kiküldése
        }) //                           erre a válasz a kövi then blockba lesz elérhető
        .then(function(response) { //   itt
            return response.json() //   ki kell parsolni
        })
        .then(function(userPage) {
            console.log(userPage) //    itt nálunk az user adatok
            state = userPage.data; //   az user adatok.. most a .data mezőbe vannak
            renderUsers(); //           az uj adatok renderelése
        })
        .catch(function(error) { //     hibakezelés
            console.log(error); //      ha bármelyik then block visszautasításra kerül 
        }); //                          akkor egyböl ide ugrik a program a catchre
};

function renderUsers() {} // renderelés

// Async function SiNTAKTIKAI KÖNNYÍTÉS
async function liginAndFetchUsers(body) {
    var loginResponse = await fetch('url ahova a kérés megy', {
        method: 'POST', // MINTHA megvárná a választ és mintha szinkron lenne
        body: body, //  a fetch blokra a válasz a kövi then blockba érhető el
        header: { "Content-type": "application/json" }
    });
    if (!loginResponse.ok) { // így elérhető
        alert("Bejelentkezés sikertelen");
        return;
    }

    var tokenobjekt = await loginResponse.json();
    //  állapotváltoztatások, renderelés

    var userResponse = await fetch("url");
    if (!userResponse) {
        alert('Users error')
        return;
    }
    var userPage = await userResponse.json()
    state = userPage.data; //   az user adatok.. most a .data mezőbe vannak
    renderUsers(); // 
}

//----------------------------------------------------------------------------------------------------------------
// Date //24 hours = 86 400 000 milliseconds // 0 time = January 01, 1970 00:00:00 UTC.     // day.js => külsö könyvtár
let D_0 = new Date();           // aktuális idő Object 
let D_1 = new Date(year, month, day, hours, minutes, seconds, milliseconds);  // (év,0-11,1-31,0-24,0-59,0-59,0-999)
let D_2 = new Date(milliseconds);
let D_3 = new Date("October 13, 2014 11:13:00"); 
//  "YYYY-MM-DDTHH:MM:SSZ" | "YYYY-MM-DD" | "YYYY-MM" | "YYYY" |"MM/DD/YYYY" | "MMM DD YYYY"  | "MMM, DD, YYYY" 

// DATE => STRING
let S_D= Date();                // aktuális idő STRING !!!
String(D_0)                                 
D_0.toString();
D_0.toJSON();                   // 2021-10-04T12:17:06.144Z     // Z jelentése az UTC time
D_0.toDateString();             // Mon Oct 04 2021              // csak a dátumot kapjuk meg stringként, az időt nem
D_0.toLocaleDateString('hu');   // 2021. 10. 04.                // magyar idő szerinti dátum
D_0.toTimeString();             // 14:17:06 GMT+0200 (közép-európai nyári idő)
D_0.toLocaleTimeString('hu');   // 14:17:06
D_0.toUTCString();
D_0.toISOString();

Date.now();                                 // 1633350223465 – az 1970. 01. 01. óta eltelt idő milliszekundumban
Date.UTC(2020,0,1);                         //                 -||-
let mSec = Date.parse("March 21, 2012");    // milisecundumra konvertálás
Number(new Date("2017-09-30"));             // 1506729600000
new Date(year, month, 0).getDate()          // az adott hónap napszáma

D_0.getFullYear(); //      (yyyy)                                          // d.setFullYear()	
D_0.getMonth(); //         melyik hónap? (0-11)                            // d.setMonth()	
D_0.getDate(); //          hányadika van? (1-31)                           // d.setDate()   // ha többet állítunk mint amit lehet(pl.:32) akkor ugrik a kövi hónapra
D_0.getHours(); //         hour (0-23)                                     // d.setHours()	
D_0.getMinutes(); //       min (0-59)                                      // d.setMinutes()		
D_0.getSeconds(); //       sec (0-59)                                      // d.setSeconds()	
D_0.getMilliseconds(); //  millisecond (0-999)                             // d.setMilliseconds()	
D_0.getTime(); //          millisecondba  January 1, 1970 hez viszonyítva  // d.setTime()	
D_0.getDay(); //           milyen nap van? (0-6)    // 0 a vasárnap
/*
getUTCFullYear()	    Same as getFullYear(), but returns the UTC year
getUTCMonth()	        Same as getMonth(), but returns the UTC month
getUTCDate()	        Same as getDate(), but returns the UTC date
getUTCDay()	          Same as getDay(), but returns the UTC day
getUTCHours()	        Same as getHours(), but returns the UTC hour
getUTCMinutes()	      Same as getMinutes(), but returns the UTC minutes
getUTCSeconds()	      Same as getSeconds(), but returns the UTC seconds
getUTCMilliseconds()	Same as getMilliseconds(), but returns the UTC milliseconds */
//----------------------------------------------------------------------------------------------------------------
// INTL       // nemzetközi cuccok
const charList=['ä','a','z']
const germanCollator = new Intl.Collator("de")
const swedishCollator = new Intl.Collator("sv")
console.log(charList.sort(germanCollator.compare));   // a ä z        német abc
console.log(charList.sort(swedishCollator.compare));  // a z ä        swéd

const usCurreny = new Intl.NumberFormat("en-US",{
  style:"currency",
  currency:"USD"
})
const gbCurreny = new Intl.NumberFormat("en-GB",{
  style:"currency",
  currency:"GBP"
})
const deCurreny = new Intl.NumberFormat("de-DE",{
  style:"currency",
  currency:"EUR"
})
console.log(usCurreny.format(100200400.54));    // $100,200,400.45
console.log(gbCurreny.format(100200400.54));    // E100,200,400.45
console.log(deCurreny.format(100200400.54));    // 100.200.400,45 E

console.log(new Intl.DateTimeFormat("hu-HU").format(new Date()));  // magyarul írja ki a mai nap értékét
//----------------------------------------------------------------------------------------------------------------
// Symbol
const symbol1 = Symbol('symbol')
const symbol2 = Symbol('symbol')
symbol1==symbol2              // false // mert van egy rejtet ID-ja
const id1 = Symbol.for('id')  // csak akkor jön létre, ha nem létezik
id1.description               // id
const id2 = Symbol.for('id')
id2===id1                     // true
const nameSymbol = Symbol.for('name')
Symbol.keyFor(nameSymbol)     // name
nameSymbol.description        // name
const person ={
  firstName : 'Jhon', lastName:'Doe',
  [id1]:1
}
for (const key in person) {
  if (person.hasOwnProperty(key)) {   // ez azért kell mert forin nél megkell nézni mindig hogy az övé e a kulcs
    console.log(key);         // firstName lastName   // symbol-t így nem érem el
  }
}
person[id1]                           // 1
Object.getOwnPropertySymbols(person)  // [1]          // symbol-ok értékei tömbként
//----------------------------------------------------------------------------------------------------------------
// setTimeout() setInterval()
setTimeout(fgv,milliseconds)                              // 1000 milliseconds === 1 seconds
setTimeout(fgv, milliseconds, "amit a fgvnek átadunk")    // x sec mulva meghívjuk 1x
setInterval(fgv,interval)                                 // interval === milyen időközönként fusson le a fgv újra és újra
let id = setInterval(fgv,interval)                        // a számláló ID-ja
clearInterval(id)                                         // a számláló leállítása, ujraindítás nincs!!! új id kell 
clearTimeout(id2)                                         // a clearTimeout ID-ját kukázza ki
//----------------------------------------------------------------------------------------------------------------
// cookie  sütik
// A sütik kulcs-érték párokban tartalmaznak jellemzően a kliensre vonatkozó információt.
// A sütiket a szerver állítja be a kliensoldalon, de a kliens tárolja ezeket az információt a böngészőben.
// A további HTTP kéréseknél a kliens elküldi a sütiket is a szerver felé, így valósul meg az állapotkövetés. 
// A sütik sokféle információt tartalmazhatnak, a kliens időzónájától vagy preferált nyelvétől kezdve a folyamatos bejelentkezést lehetővé tevő adatokig.
// A sütiknek többféle jellemzője van a kulcs-érték adatpáron kívül (a teljesség igénye nélkül): 
// - expires: lejárati idő, amely után a süti érvénytelen, alapbeállítás 0, ami a session időtartamát jelenti (ha bezárjuk az ablakot, a süti lejár)
// - secure: csak HTTPS kapcsolaton keresztül továbbítható (alapbeállítás FALSE)
// - HTTPOnly: az adott cookie javascriptből a frontend oldaláról nem hozzáférhető, ha ez TRUE (biztonság)
// - domain: melyik domainről származik az adott süti
// - path: az adott domainen belül milyen elérési útról származik a süti
// Előnyök:
// - folyamatosabbá a böngészési élmény
// - a szervert tehermentesíthetik, mert nem kell a szerveren tárolni ezeket az adatokat
// - lokálisan tárolódnak => az ideiglenes szerverleállások, újraindítások nem befolyásolják a sütiket
// Hátrányok: - különös figyelmet kell fordítani a biztonságra, mert érzékeny adatokat is tartalmazhatnak

document.cookie = "username=Énekes Laci"                                      
document.cookie = "username=John Doe;expires=Thu, 18 Dec 2023 12:00:00 UTC;path=/";  // path=/ => bármely aloldalon elérhető
document.cookie = "username=;expires=Thu, 18 Dec 2013 12:00";                        // cookie törlése, így ha régebbi dátumot adok meg
const cookieHandler = {
  setCookie(name,value,expirationDays = 365,path = "/"){
    const expires = new Date(new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie =`${name}=${value};expires=${expires};path=${path}`;                        // +1 süti
  },
  getCookieValue(name){                     // minden süti 1 stringbe van összefűzve 
    const keyValuePairs=document.cookie
    .split("; ")                            // így !!! 
    .find(cookie => cookie.startsWith(`${name}=`))
    return keyValuePairs ? keyValuePairs.split("=")[1] : ""
  },
  checkCookie(name){
    return cookieHandler.getCookieValue(name)!==""
  },
  deleteCookie(name){
    document.cookie =`${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;              // -1 süti
  }
}
cookieHandler.setCookie("username","kiki")

// cookie                               LocalStorage                                                  sessionStorage
// 4kb(20 süti domainenként)            nagy tárolási limit is rendelkeznek ( 5-10 MB domainenként).  ( 5 MB domainenként)
// Browseren és szerveren is tárolódik  sosem továbbítjuk a szerver felé, Browser Only                -||-
// manuálisan törölhető                 lejárati dátum nélkül mentődik,így nem törlődik,              csak az adott session alatt tárolódnak ott, 
// és van lejárati dátuma               él, amíg a felhasználó vagy a program nem törli,              a böngészőablak bezárásakor ez törlődik.

localStorage.setItem('username',"Kiki")                             // kulcs érték párok, mint STRING // csak String !!!
localStorage.setItem('address',JSON.stringify({
  street:"Váci utca",
  zipcode:1001,
  city:"Budapest"
}))
console.log(JSON.parse(localStorage.getItem("address")));                                   // az értékek
console.log(localStorage.key(0));console.log(localStorage.key(1));  // username // address  // kulcsok
localStorage.removeItem('username')
localStorage.clear()              // mindent töröl a localStorage ból
//----------------------------------------------------------------------------------------------------------------
// Test -ek írása =>
// tests/XXX.test.js
const {sumOfDivisibleByThree, matchCity,refArr} = require('../01-unit-test/main')
describe("sumOfDivisibleByThree függvény tesztelése", ()=>{
  test("Példa eredmény tesztelése", ()=>{
    expect(sumOfDivisibleByThree([45,4,66,34,24,76,33,36,9])).toBe(213)   // szigorú vizsgálat
  })
  test('A fgv visszatérési értéke egy boolean',()=>{
    expect(typeof matchCity("Szombathely","Vas")).toBe("boolean");        // a visszatérési érték typeof-ja
  })
})

describe("Tömbök értékének összehasonlítása",()=>{    // részegységek
  const localArr =[1,2,3,4]
  test("Példa tesztelése",()=>{                       // a test
    expect(refArr).toEqual(localArr)                  // tömbök összehasonlítása
  })
})
// 01-unit-test/main
const matchCity = (city, county) => {}
const sumOfDivisibleByThree = (arr) => {}
const refArr = (arr) => {return [1,2,3,4]}     
module.exports = {sumOfDivisibleByThree,matchCity,refArr}

//----------------------------------------------------------------------------------------------------------------
// POLYFILL? ugyanez az isArray-al
function isArray(x) {
    return x.constructor.toString().indexOf("Array") > -1;
}
//----------------------------------------------------------------------------------------------------------------
/*
Original Value  Converted to Number     Converted to String     Converted to Boolean
false           0                       "false"                 false
true            1                       "true"                  true
0               0                       "0"                     false
1               1                       "1"                     true
"0"	            0	                    "0"	                    true	
"000"	        0	                    "000"	                true	
"1"	            1	                    "1"	                    true	
NaN	            NaN	                    "NaN"	                false	
Infinity	    Infinity	            "Infinity"	            true	
-Infinity	    -Infinity	            "-Infinity"	            true	
""	            0	                    ""	                    false	
"20"	        20	                    "20"	                true	
"twenty"	    NaN	                    "twenty"	            true	
[ ]	            0	                    ""	                    true	
[20]	        20	                    "20"	                true	
[10,20]	        NaN	                    "10,20"	                true	
["twenty"]	    NaN	                    "twenty"	            true	
["ten","twenty"]NaN	                    "ten,twenty"	        true	
function(){}	NaN	                    "function(){}"	        true	
{ }	            NaN	                    "[object Object]"	    true	
null	        0	                    "null"	                false	
undefined	    NaN	                    "undefined"	            false
*/
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
document.location.href // a dok linkje
document.location.host // a dok hostja
document.write(5 + 6);
// beleírja a dokumentumba DE ujratöltéskor(pl onclick eseményre)az egész html tartalmát törli és csak ez lesz
console.dir(obj); // az objektumot a tulajdonságaival eggyütt logolja ki
console.warn('uzenet'); // uzenet (felkiáltójellel)
// <button onclick = "window.print()" > a weboldal printscreenje < /button>
document.write(text); // Write into the HTML output stream
var szam = prompt('irj be egy számot'); // cancel esetén null az érték (mint a python input(), csak böngészőbe)
alert(5 + 6); // kiírás, felugró ablak                                 (mint a python print(), csak böngészőbe)   
//----------------------------------------------------------------------------------------------------------------
// REGEXP, reguláris kifejezések:  // a mintázat megfelel e a stringnek? ha van találat akkor megáll az olvasás
// https://regex101.com/           // ha nicns találat => return null

const re = /ab+c/   //=>  /pattern/modifiers;      //=== const re = new RegExp('ab+c');
const result = re.exec(text)    // Keresést hajt végre egy karakterláncban, visszatérési értéke az első találatot egy tömbben egyéb adatokkal                        
const result = re.test(text)    // volt találat? true vagy false
const result = text.match(re)   // mint az exec, csak stringre hívva, csak az első találat egy tömbben
// exec() test()                                                    => RegExp-re hívva
// match(), matchAll(), replace(), replaceAll(), split()            => Strign-re  
// search(), // Letesztel egy egyezést egy karatkerláncon, visszatérési értéke az egyezés indexe, vagy -1, ha nincs egyezés.  

// \X	így védünk le bármilyen "X" karaktert aminek speckó jelentése van, pl.: . ? * stb.
// csoportosítás ()   // intervallum []  // számosság  {}   // vagy  |
// a csoportosítás capturingol a capturingok elé kikell tenni => ?: => (?:regex)
const macPattern = /^(?:[0-9A-Fa-f]{2}(?::(?!$)|$)){6}$/    // ez nem capturingol

const viza =/^(\d{4} ?){3}\d{4}$/        // const viza =/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/

// (x|y) => x vagy y

// modifiers:
// g        // match() az összes találatot visszaadja egy tömbbe => exec() egyesével adja vissza a találatokat, indexet tárolva
S_0.replace(/Apple/g, "W3Schools"); // g <==> az összes találatot cseréli
// i        // nagy,kisbetű érzékenységet elveszti 
// m        // (több soron keres), ha nincs itt akkor a sortörésig keres csak
// d s u y

// g y => flageknélk az indexet nyomonköveti exec() vis ha ugyanarra keresünk rá 2x akkor másodjára nem ad találatot

/* patterns:
^D    // a szöveg "D" -vel kezdődik?         // n$	    szöveg végén
D$    // a szöveg "D" -vel végződik?         // ^n	    szöveg elején
^Teljes egyezést így vizsgálunk$
n{X}	  n karakter(ek) pontosan x dbszor szerepel e?
n{X,Y}	n karakter(ek) X db és Y db közt bármennyiszer 
n{X,}	  csak a minimum számosságát definiáljuk

// IF ELSE
valami(?=n)	    ha az n követi  a valami -t
valami(?!n)     n NEM követi a ...    // => pl.:
const realIPPattern = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
(\.(?!$)|$)     // => ha nincs vége akkor kell pont, ha vége akkor nem kell semmi

o+  => o oo ooo oooo ooooo stb...     // + jelet megelöző karakter legalább 1x szerepel e?
lo* => l lo loo looo loooo stb...     // 0 db - szor is szerepelhet
lo? => l lo lo  lo   lo               // 1x vagy 0 szor szerepel e? az elötte lévő karakter?

[abc]  => ezek a betűk közül vmelyik  // [0-9] => intervallum      
[^abc] => ezek a betűk kizárása       // [^0-9] => számok kizárása    
^[a-cA-B2-6] // az első karakter "abcAB23456" valamelyike - e?

.  => 1 bármilyen karakter, ami új sor nem lehet 
\w => [A-Za-z0-9_]      => [A-Z] + [a-z] + [0-9] + [_]  
\W => előző ellentetje
\d => [0-9]
\D => [^0-9]
\s => Find a whitespace character
\S => Find a non-whitespace character
\0 => Find a NULL character
\n => Find a new line character
\f => Find a form feed character
\r => Find a carriage return character
\t => Find a tab character
\v => Find a vertical tab character
\xxx    ==>	Find the character specified by an octal number xxx
\xdd    ==>	Find the character specified by a hexadecimal number dd
\uxxxx  ==> xxxx az Unicode karakter hexadecimális kódja
\B ==>	Find a match, but not at the beginning/end of a word
\b ==>  /LO\b/ ==> "LO"-val végződik L-nek az indexét adja vissza
        /\bLO/ ==> "LO"-val kezdődik L-nek az indexét adja vissza
*/
S_1 = "HELLO, LOOK AT YOU!";
S_1.search(/LO\b/); //      3  
S_1.search(/\bLO/); //      7   

// toString()	Returns the string value of the regular expression	
//----------------------------------------------------------------------------------------------------------------
// az elemhez scrollolás 30 px el felé...
window.scroll({top:element.offsetTop - 30,behavior: 'smooth'});
window.location.replace("masik.html")   // navigálunk ide

event.stopPropagation() // event terjedésének leállítása

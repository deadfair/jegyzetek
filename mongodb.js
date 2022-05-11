// SQL        noSQL
// adatbázi   adatbázi
// tábla      kollekció
// sor        dokumentum (BSON)
// oszlop     mező

//-------------------------------------------------------------------
// Típusok

// String − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
// Integer − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
// Boolean − This type is used to store a boolean (true/ false) value.
// Double − This type is used to store floating point values.
// Min/ Max keys − This type is used to compare a value against the lowest and highest BSON elements.
// Arrays − This type is used to store arrays or list or multiple values into one key.
// Timestamp − ctimestamp. This can be handy for recording when a document has been modified or added.
// Object − This datatype is used for embedded documents.
// Null − This type is used to store a Null value.
// Symbol − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
// Date − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
// Object ID − This datatype is used to store the document’s ID.
// Binary data − This datatype is used to store binary data.
// Code − This datatype is used to store JavaScript code into the document.
// Regular expression − This datatype is used to store regular expression.

//-------------------------------------------------------------------
// mongo        // indítja a mongo-t itt kell=> C:\Program Files\MongoDB\Server\5.0\bin 
mongosh         // ez az uj !!!
show dbs        // megmutatja az adatbázisokat
use adatbazis   // uj adatbázist hoz létre és/vagy átvált rá ilyen néven

load('C:\\a script elérése')  // futtatja a js-t 

//-------------------------------
// ID
x = ObjectId()
x.getTimestamp()  // időbéjjeg, mikor került bele
x.str             // stringje az id-nak, mert az egy objekt

//-------------------------------
// Lekérdezés

db.collection.find()              // minden rekord kilistázása
db.collection.find().pretty()     // szebb megjelenés
// $gt ⇒ ("greater than", nagyobb mint)
// $gte ⇒ ("greater than equal", nagyobb egyenlő mint)
// $lt ⇒ ("lower than", kisebb mint)
// $lte ⇒ ("lower than equal, kisebb egyenlő mint)
// $not ⇒(tagadás)
// $ne => (not equal) 
// $in ⇒ (valamilyen megadott felsorolásban kell lennie)                // tömböt vár
// $nin ⇒ (a keresett érték nincs benne egy előre megadott listában)    // tömböt vár
// $or ⇒ ("vagy operator")                                              // tömböt vár
// $nor ⇒ ("NEM vagy operator")                                         // tömböt vár
// $and ⇒ ("és operator")                                               // tömböt vár
// $nand ⇒ ("NEM és operator")                                          // tömböt vár
db.collection.find(selector,projektor)
// selector: mit akarunk lekérni?
// projektor: milyen oszlopok jelenjenek meg? 1(truly) === megjelenik 0(falsy) === nem
db.collection.find({first_name:"Burgess"})
db.collection.find({"first_name":"Burgess"})
db.collection.find({"address.country":"China"})     // ha beágyazás van !
db.collection.find({age:{$lt:60}})                  // kevesebb mint 60
// db.collection.find({age:{$lte:60}})                 // kevesebb egyenlő mint 60
// db.collection.find({age:{$gt:60}})                  // több mint 60
// db.collection.find({age:{$gte:60}})                 // több egyenlő mint 60
db.collection.find({age:{$gte:18, $lte:60}})        // 18 <= age <= 60                    // &&
db.collection.find({$and:[{age:{$lte:60}},{age:{$gte:18}}]})                              // &&
db.collection.find({age:{$in:[20,30,40]}})          // age===20 || age===30 || age===40   // ||
db.collection.find({age:{$nin:[20,30,40]}})         // !(age===20 || age===30 || age===40)
db.collection.find({status:{$ne:"active"}})         // status !== "active"
db.collection.find({"ratings.0":2})                 // tömbnél
db.collection.find({status:{$ne:"active"}},{first_name:1,last_name:1,_id:0})  // melyik oszlop jelenjen meg? ahol nem falsy van az megjelenik                     
db.collection.find({email:{$regex:"emailregex"}})

db.collation.findOne({_id:ObjectId("asdsadsad")})   // csak 1 et keres, az elsőt adja vissza

//-------------------------------
// DB számítás

// db.collection.count({age:{$nin:[20,30,40]}})           // a sima count deprecated...
db.restaurants.countDocuments({name:{$regex:"^Tony"}})    // db-száma

//-------------------------------
// Beszúrás

// pl: beszurja a listát a táblára
db.collection.insert({name:'jani'})                       // többet is beszúrhat, tömbként
db.collection.insertOne({name:'jani'})                    // beszurja csak 1 doksit
db.collection.insertMany([{name:'kiki'},{name:'jani'}])   // beszúr sokat, tömb
// db.collection.save({username:'Krisz'})   // elavul!!!! // lementi az users táblába ezt az objektet, ha létezik felülírja 

//-------------------------------
// Update

db.collection.update({name:'lani'},{age:10})              // egész objektumot cseréli erre
db.collection.update({name:'lani'},{$set:{age:10}})       // csek ezeket irja felül  CSAK 1 et cserél de van egy bemenete amit truera téve updateMany lesz
db.collection.updateOne({name:'lani'},{age:10})           // biztos csak 1 et módosít
db.collection.updateMany({name:'lani'},{$set:{age:10}}) 
db.collection.updateMany({name:'lani'},{$push:{favoriteTanárok: "ADAM"}})  // Ha a favoriteTanárok egy [] akkor így teszünk bele elemt
// ha eaz első objektum üres akkor mindet
$addToSet   // hozzáad listához, ha nincs benne
$pull       // kiszedi a listából az elemeket
$unset      // 

//-------------------------------
// Törlés

// törlésnél célszerű először áthelyezni egy másik collection-ba vagy timeStramp ot veszünk fel vis egy idő után törlődik
let removed = db.collation.findOne({_id:ObjectId("asdsadsad")})
db.collation2.insertOne(removed)
db.collation.deleteOne(removed)           // elem törlése

db.collation.deleteMany({age:{$gte:20}})  // elemek törlése
db.collection.drop()                      // kollekció törlése
db.dropDatabase()                         // database törlése
.remove()

//-------------------------------
// Cursor => mint egy iterátór v láncolt lista

let myCursor = db.collection.find()
myCursor.hasNext()  // van kövi?
myCursor.next()     // lépteti a cursorot
// ha az utolsó után léptetek 1 et akkor exhausted lesz
myCursor.forEach((doc)=>print(doc.name))
let myList = myCursor.toArray()

myCursor.size()                 // hány elem van a cursorban?  
.sort({age:-1})                 // -1 csökkenő, 1 növekvő
.limit(2)                       // első 2-t kapom vissza
.skip(2)                        // 2-t kihagy
.collation()                    // speciális dolgok
.collation({ "locale": "hu" })  // ékezeteseket kezeli pl sortolásnál

//------------------------------
// Validéció

// collection létrehozása feltételekhez kötés, validálás stb
db.createCollection("users",{   // collection név
  validator:{
    $jsonSchema:{
      bsonType:"object",
      required:["name","age","_id","status"],   // kötelező mezői
      properties:{
        name:{
          bsonType:'string',
          minLength:3 ,                         // string min hossza
          pattern: "^[1-9a-zA-Z ]+$"
        },
        age:{
          bsonType:"int",
          minimum:16                            // int minimum értéke    
        },
        status:{
          enum:['ACTIVE','IN_ACTIVE'],  // vagy ACTIVE vagy IN_ACTIVE lehet csak
          description:"can only be 'ACTIVE' or 'IN_ACTIVE'"  // megjegyzés, ha nem jó adatot adunk
        },
        address:{
          bsonType:'object',
          required:['city'],
        }
      }
    }
  }
})

//-------------------------------
// Agregálás, aggregátorok

db.restaurands.aggregate(
  [{
// rendezés    
    $sort: {
        stars: -1,      // rendezünk, csökkenő -1
        name: 1         // majd név alapján növekvő
    }
}, {
// mennyi maradjon
    $limit: 10          // csak 10 kell
}, {
// mi jelenjen meg  
    $project: {         // cak ezek a mezők
        _id: 0,
        restaurant_name: '$name',
        rating: '$stars',
        movies:{title:1}    // csak a tittle mező jelenjen be a movies-en belül
    }
}]
)

// $lookup vagyis összekötés ID alapján , ÚJ OSZLOP keletkezik 

// $lookup:{   // joinolás         // uj oszlopot csinál !!!!!!!!!!!!!!!!!!!!!!
//   from: "restaurants",          // melyik collection-ból vessszük az adatokat
//   localField: "restaurant_id",  // idegen kulcs
//   foreignField: "_id",          // a másik táblában lévő FŐ kulcs
//   as: "restaurant"              // mi a neve az uj oszlopnak?
// }

// Group by
// $group{
//   _id: "$borough",
//   avg_rating: {
//     $avg: "$stars"
//   }
// }

// Eggyezés
// $match

// db
// {$count: "összeg"}       // az uj oszlop neve "összeg"

db.students.aggregate([
  { $match: { status: "ACTIVE" } },
  // { $group: { _id: "$name", avgGrade: { $avg: {$avg:"$grades"} } } },
  { $project:{_id:0,name:1,status:1,avgGrade:{$avg:"$grades"}}},
  { $sort: { avgGrade: -1 } },
  { $limit: 3 },
]);




//-------------------------------
// Egyéb
snippet search      // csomagok

snippet install analyze-schema  // shémák installálása
schema(db.collection)           // megmutatja a shémát a collection táblára

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
// FELADATOK
db.directors.updateMany(
    {name :"Steven Spielberg"},
    {$push: { movies: { $each: db.movies.find({director: "Steven Spielberg"},{_id:1}) } } }
)

db.movies.find({director: "Steven Spielberg"},{_id:1})

// lehet ilyen
const directors2 = db.directors.find()
directors2.forEach(director => {
  db.movies.find({director:director.name}).map(movies => movies._id).forEach(id => {
    db.directors.updateOne(
      {name:director.name},
      {$push:{movies:id}}
      )
  });
})

['romantica','akció','horror'].forEach(típus => {
  db.collenctionneve.updateMany({type:típus},{$set:{category:típus.toUpperCase()}})  
})




// const fs = require('fs');
// const https = require('https');

// const URL = 'https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json';
// const DATA_PATH = './restaurants.json'

// const requestRestaurantsData = (url, path) => {
//     const file = fs.createWriteStream(path);
//     https.get(url, (resp) => {
//         // console.log(resp);
//         resp.pipe(file);
//         file.on('error', (e) => console.error(e));
//         file.on('finish', () => {
//             console.log("\nFile writing complete.")
//         });
//         file.on('close', () => {
//             console.log('Writing DB...');
//             let jsonData;
//             fs.readFile(DATA_PATH, (err, data) => {
//                 if (err) console.error(err);
//                 jsonData = data.toString().split('\n');
//                 jsonData.splice(jsonData.length - 1);
//                 jsonData.forEach((row, i) => {
//                     console.log(i);
//                     const doc = JSON.parse(row);
//                     doc.stars = parseFloat((Math.random() * 4 + 1).toFixed(1));
//                     db.restaurants.insertOne(doc);
//                 })
//                 console.log('DB ready')
//             });
//         });
//     })
// }

// requestRestaurantsData(URL, DATA_PATH);





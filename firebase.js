/*
Mi az a Firebase?
A Firebase egy BaaS, vagyis Backend-as-a-Service szolgáltatás. Segítségével egyszerűen tudunk a frontend applikációnkhoz hozzákötni egy backendként is szolgáló infrastruktúrát, amely további fontos szolgáltatásokkal kiegészítve egy teljes értékű alkalmazást tudunk összeállítani.

Milyen eszközöket biztosít számunkra a Firebase?
A Firebase SDK (Software Development Kit) a backend szolgáltatást nagyon sok hasznos eszközzel is támogatja. Fejlesztőként a Build eszközök lesznek elsősorban fontosak számunkra. Ezeket az eszközöket a frontend alkalmazásunkkal együtt alkalmazva egy fullstack alkalmazást tudunk létrehozni.

Autentikáció: regisztrált felhasználók, adminisztrátorok beléptetése
Firestore: noSQL adatbázis valós idejű adatokkal
Storage: fájlok tárolására alkalmas tárhely
Hosting: segítségével az interneten is elérhetővé tehetjük az alkalmazásunkat
Functions: a backend szolgáltatást tudjuk kiegészíteni további funkcionalitással
Emulátor: lokálisan létrehoz egy firebase klónt, amely nem a felhőben, hanem a saját gépünkön fut, segítségével tesztelhetjük az alkalmazásunkat lokálisan. Minden olyan szolgáltatás elérhető benne, ami a Firebase-ben.
//--------------------------------------------------------------------------------------------------------------------------------------------------
*/
// firebase oldalon, új project lépések =>
// add project
// uj vagy meglévőhoz akarok uj projektetk? 
// project neve 
// enable google analitika, ezt melyik filyokhoz?
// create project
// web icon
// app nicknév 
// regist app
// megkapom a firebaseConfig adatokat
// continue
//--------------------------------------------------------------------------------------------------------------------------------------------------
// firebase oldalon, hosting lépésekként leírja => /hosting
// npm i -g firebase-tools
// firebase login                            // google fiokkal belépés        // firebase logout  // néha kell mert néha a tokenek már halottak
// firebase init                             // első lépés mayd Y 
// firestore, hosting, emulators             // pipa space-el, ami kell, majd enter
// use an exesting project
// rules... enter 
// indexes...enter
// melyik könyvárt kell kirakni?
// N N N
// AUthen, Firestore, Hosting => enter enter enter Y enter Y

// Add nickname: megadom és 3 scriptet bekell másolni a htmlbe =>
// https://firebase.google.com/docs/web/learn-more?authuser=0#add-sdks-cdn // CDN linkek a plusz funkcionalításokhoz pl authentikacio
// ezeket a js file TUDO részéhez kell beimportálni

// tools mappában npm insert data  // ezt mi hoztuk létre hogy feltötlse jsonból az adatbázist és a jsonfileban a script hivatkozik rá

// firebase deploy                                //  élesbe kirakja egy url-re                   // a hosting fülön már elérem egy linken
// firebase deploy --only hosting:projectneve     //  élesbe kirakja egy url-re, csak az egyiket  // -||-

// firebase emulators:start        // kell hozza java a gépen    // teszteléshez jó
//--------------------------------------------------------------------------------------------------------------------------------------------------
// autómatikus deploy beállítása:
// npm init => 
// lesz a package.json-ban => "scripts":{"deploy":"firebase login && firebase deploy --only hosting:projectneve"}
// npm run deploy
//--------------------------------------------------------------------------------------------------------------------------------------------------
// firebase oldalon, autentikáció fül
// sign in methód fül => engedélyezni kell amilyen belépést akarok
// users fül => felhasználókat ítt adok hozzá 
//--------------------------------------------------------------------------------------------------------------------------------------------------
// firebase oldalon, Firestore => Database => create database  // test
//--------------------------------------------------------------------------------------------------------------------------------------------------
// emulátor
// Az emulátorban létrehozott felhasználókat, illetve az adatbázisban tárolt adatokat elmenthetjük a firebase emulators:export ./emulator-data-mappa-neve paranccsal. Fontos, hogy az adatok betöltéséhez a firebase emulators:start --import=emulator-data-mappa-neve parancsot kell használni indításkor!
//--------------------------------------------------------------------------------------------------------------------------------------------------
// van egy firebase-init.js amibe mindig a firebaseConfig változik attol függően hogy melyik firebase adatbázisba vok
/*
const firebaseConfig = {
  apiKey: "AIzaSyCMQABeQK_pEpI82748A7frsM3w4DRZ6QU",
  authDomain: "alfa-ea74e.firebaseapp.com",
  projectId: "alfa-ea74e",
  storageBucket: "alfa-ea74e.appspot.com",
  messagingSenderId: "871382680050",
  appId: "1:871382680050:web:34e4dfd899aa23b8a9eb6b",
  measurementId: "G-CV7REV4RL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8080);

console.log('Firebase initialized');
*/
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Autentikáció
// https://firebase.google.com/docs/auth/web/start#web-version-9_2
//--------------------------------------------------------------------------------------------------------------------------------------------------
// tipic fgv felépítés: 
async function saveNewPerson(person){   // mindig async fgv
  try{                                  // mindig try catch blockba
    const personRef = await addDoc(collection(db, "persons"), person);
    console.log('Created person:' + personRef);
    console.log('Created personID:' + personRef.id);
  }catch(e){console.log(e)}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------
// QUERY SELECTOROK
// 1 collection csak documentumokat tartalmazhat, 1 doc max 1 MB, 1 doc több kulcs érték párt tartalmazhat, dokumentum nem tartalmazhat documentumot
const docRef = doc(db,"persons",id);            const docSnapshot = await getDoc(docRef)        // ott érdemes refet, ahol nincs speciális kikötés
const docQ = query(doc(db, "persons", id));     const docSnapshot = await getDoc(q)             // de becsomagolható

const colRef = collection(db, "persons");       const querySnapshot = await getDocs(colRef)  
const colQ = query(collection(db, "persons"));  const querySnapshot = await getDocs(q)          // is.. -||-

// querySnapshot értékeinek v a docSnapshot - nak már van =>
.id         // ő az id
.data()     // ő az adat

// ezeket muszáj becsomagolni mert összetett lekérdezlések
const q = query(collection(db,"persons"),  where("address.city", "==", "Budapest"))
const q = query(collection(db,"persons"), where("age", ">", "20"), where("age", "<", "36"));    // és kapcsolat, de különböző fildekre nem lehet, csak ha az egyik "==", de akkor is indexelni kell a firestore-ba 
const q = query(collection(db,"persons"), orderBy("name"), limit(3))
//--------------------------------------------------------------------------------------------------------------------------------------------------
// CRUD
//------------------
// CREATE  // addDoc
const createdElementRef = await addDoc(colRef, person);               // beszúrunk a persons-ba egy person-t
const createdElementRef = await setDoc(doc(db, "persons", id), data); // ez vár ID-t is
// createdElementRef.data()-ja nincs csak .id-ja, minden máshoz a person-on keresztül hozzáférek
//------------------
// READ
// egy elem keresése  // getDoc                                      
const docSnapshot = await getDoc(docQ)                      // ID alapján keres, docSnapshot-ot ad vissza   
// több elem keresése // getDocs
const querySnapshot = await getDocs(colQ)                   // querySnapshot ad vissza, ez egy lista
//------------------
// UPDATE
// egy elemet
updateDoc(docRef, {email: "ujmail@.com"})
setDoc(docRef, {email: "ujmail@.com"},{merge: true})        // merge true => a többi tulajdonságát meghagyja, false => mindent megkell adni
// egy elemet ami tömb
const filmList = ["Silent hill", "Lord of the Rings"]
updateDoc(docRef, {films: arrayUnion(...filmList)})
updateDoc(docRef, {films: arrayRemove("Titanic")})
//------------------
// DELETE
await deleteDoc(docRef)                          // töröljük
//--------------------------------------------------------------------------------------------------------------------------------------------------

const unsubscribe = onSnapshot(q,(querySnapshot)=>{       // figyeli az adatbázis változásokat
  querySnapshot.forEach((person) => {
    console.log(person.id);
  })
})
unsubscribe()       // erről lekell iratkozni ha bezárom az oldalt mert feleslegesen figyeli az adatbázis változásokat


//--------------------------------------------------------------------------------------------------------------------------------------------------
(async () => {
  // await saveNewPerson(newPerson)
  // await readPersons()     // így először bevárja a programot és minden sorba fut
})();

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
const docSnapshot = await getDoc(docQ)                      // Mindig ID alapján keres, docSnapshot-ot ad vissza   
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
//--------------------------------------------------------------------------------------------------------------------------------------------------
// + ANGULAR

// https://github.com/angular/angularfire                   // <= HELP

// 1, kell egy webApp

// 2, AngularFire https://github.com/angular/angularfire

// 3, ng add @angular/fire    // legujjab verzió            // 3, ng add @angular/fire@7.2.0-canary.eeb9dcc  // előző verzió
//    ezt a verziót akarod telepíteni? igen
//    mi kell nekünk? space-select
//    Firestore,aut,deploy,stb
//    email kiválasztása
//    projekt kiválasztása
//    új app v meglévő?

// 4, app module imports: kikell kommentezni a provideFirebaseApp(()=>.....)
//                                          provideFirestore(()=>....)
// 4, helyette => 
// import {AngularFireModule} from "@angular/fire/compat";
// import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
// import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
// AngularFireModule.initializeApp(environment.firebase),
// AngularFirestoreModule,
// AngularFireAnalyticsModule

// 4.5, HA most nem jó akkor =>
// npm install typescript@4.4.4 // lekell butítani a typescriptet
//---------------------------------------

constructor(private afs: AngularFirestore)
postCollection =  this.afs.collection<Post>("posts");

// Creat
createPost(post:Post):Promise<DocumentReference<Post>>{   // @angular/fire/compat/firestore
  return this.postCollection.add(post);
}
//---------------------------------------
// Get
getPosts():Observable<Post[]>{              
  return this.postCollection.get().pipe(      // querySnapshot ból Observable<Post[]>
    map((posts)=> posts.docs.map((post)=>{      
      const convertedPost:Post = post.data();
      convertedPost.id = post.id
      return convertedPost
    }))
  )
}
// posts?:Observable<Posts[]>               // component.ts
// this.posts = postservice.getPosts()      // component.ts
// posts | async                            // component.HTML   // leiratkozást is kezeli

public getFilteredCars(field: string, value: string): Observable<CarModel[]>{
  return this.afs.collection<CarModel>("cars", ref => ref.where(field, "==", value))
  .get().pipe( map((carModels) => carModels.docs.map((cars) => {
//             querySnapshot =>                    queryDocSnapshot => data()
      const convertedCar: CarModel = cars.data();
      convertedCar.id = cars.id;
      return convertedCar
    })
  ));
}

getPostById(id:string):Observable<Post |undefined>{       // ez a csúnya ID
  postDoc:AngularFirestoreDocument<Post> = this.afs.doc<Post>(`posts/${id}`)
  return postDoc.get().pipe(
    map((post:DocumentSnapshot<Post>)=>post.data())
  )
}
//---------------------------------------
// Update
public updatePost(data: Post, id: string): Promise<void> {
  const postDoc: AngularFirestoreDocument<Post> = this.afs.doc<Post>(`posts/${id}`);
  return postDoc.set(data);
}
//---------------------------------------
// Delete
public getPost(id: string): Promise<void> {
  const postDoc: AngularFirestoreDocument<Post> = this.afs.doc<Post>(`posts/${id}`);
  return postDoc.delete()
}

//---------------------------------------
// service:
// constructor(private afs:AndularFirestore){}
// private customCollection: AngularFirestoreCollection<Model> = this.afs.collection<Model>('table')
/*public saveCustomer(customer:Model):Observable<DocumentReferenc<Model>>{
  return from(this.customCollection.add(customer))      // létre is hozza a táblát ha nincs
}
public getCustomers():Observable<QuerySnapshot<Model>>{
  return this.customCollection.get()              // 1x ad vissza értéket
  return this.customCollection.valueChanges()     // folyamat figyel, 2 irányú kötés
}
// component:
this.service.getCustomers().subscribe(
  {
    next:(data)=>{
      data.forEach(customer =>{this.customers.push(customer.data())})
    },
    error:(err)=>{console.log(err)},
    complete:()=>{}
  }
)

  public getCars(): Observable<CarModel[]> {
    return this.afs.collection<CarModel>(this.CARS_COLLECTION).valueChanges({ idField: 'id' });
  }

  public getCarById(id: string): Observable<CarModel | undefined> {
    return this.afs.doc<CarModel>(`cars/${id}`).valueChanges();
  }


*/
// public deleteDish(dish:Dish):void{
//   this.dishCollection.doc(dish.id).delete()
// }

// public saveDish(dish: Dish): Promise<DocumentReference<Dish>> {
//   return this.dishCollection.add(dish);
// }

// protected dishCollection: AngularFirestoreCollection<Dish> = this.db.collection<Dish>('dishes');

// constructor(protected db: AngularFirestore) {}


// public getAllDishes(): any {
//   return this.dishCollection.get()
// }

// public getAllDishesRealTime():Observable<Dish[]> {
//   // azt csinálja hogy az id mezőbe belemásolja a saját id-já,
//   // és ezzel az id-val fogom majd elérni az
//   return this.dishCollection.valueChanges({idField:'id'})
// }

// getDishById(id:string) :Observable<any>{
//   return this.dishCollection.doc(id).get();
// }

// public updateDish(id:string,dish:Dish):Observable<void>{
//   return defer(()=>from(this.dishCollection.doc(id).update(
//     {
//       imgSrc: dish.imgSrc,
//       price: dish.price,
//       type: dish.type,
//       name: dish.name,
//       description:dish.description,
//       cuisine:dish.cuisine,
//       isVegetarian:dish.isVegetarian,
//       isVegan:dish.isVegan,
//       isLactoseFree:dish.isLactoseFree,
//       isGlutenFree:dish.isGlutenFree
//     })))
// }
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Autentikáció
// firebase odlal => autentikáció -> get started -> add new provider
import {AngularFireAuth} from "@angular/fire/compat/firestore"
import firebase from "firebase/compat/app"

constructor(private auth: AngularFireAuth)        // így is jó //  private fireAuth: any = getAuth(); 
async submitForm(){
  try{
    const userData = createUserWithEmailAndPassword(this.auth,this.regForm.value.regEmail,this.regForm.value.regPassword);
    this.toastr.succes("sikeresen regisztráltál","(cím) Sikeres")   // külön csomag a toastr
  }catch(e){
    this.toastr.error("oopsz vmi hiba","(cím) Hiba")   // külön csomag a toastr
  }
}

submitLoginForm(){
  signInWithEmailAndPassword(this.auth,this.loginForm.value.email,this.loginForm.value.password)
  .then((userData) =>{
    this.toastr.succes("sikeresen bejelentkeztél","(cím) Sikeres")   // külön csomag a toastr
  })
  .catch((e) =>{
    this.toastr.error("rossz felhasználónév v email","(cím) Hiba")   // külön csomag a toastr
  })
}

// google-s
loginWithGoogle(){
  this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then((userData) =>{
    console.log(userData.user?.email); // egyéb adatok
  })
  .catch((e) =>{console.log(e);})
}

// user adatok kinyerése
constructor(private auth:AngularFireAuth){}
this.auth.user.subscribe({
  next:(user)=>{      // az user adatai vagy null ha nincs
    if (user) {
      console.log(user);
    }
  },
  error:(e)=>{},
  complete:()=>{}
})                

logout(){
  this.auth.signOut()
}

// canActivate(){               // Guardnál
//   this.auth.user.pipe(       // pipe Observable-t ad vissza
//     map(user)=>{
//       if (user) {
//         return this.router.createUrlTree(['sign-in'])
//       }else{
//         return true
//       }
//     }
//   )
// }

//--------------------------------------------------------------------------------------------------------------------------------------------------
// BUILDELÉS
// ng build      // .browserslistrc ürítése ha hibát ad  // 
// firebase login
// firebase init
//       Yes
//       Hosting kell
//       kiválasztjuk a projektet
//       dist/mappaahovabuildelődött
//       igen
//       no  // github kérdés
//       no  // felülírás
// firebase deploy
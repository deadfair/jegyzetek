// npm i -g typescript          // globális telepítés
// tsc typescript.ts -w         // auto fordítás js re      // tsc typescript.ts    // csak fordít 1x   
// tsc typescript.ts -t es2016  // ha hiba van
// npm init                 
// tsc --init               // => most a tsc parancsal már mindent fordít az adott mappába, + létrehozott egy tsconfig.json filet

// package.json             // scriptek közé irni hogy              
// ts:"tsc -w" 
// "start":"node ./dist/index.js"   // => npm run start                 // a js filet futtatja
// "start": "lite-server"           // npm i --save-dev lite-server     // fasza live szerver

// tsconfig.json            // hasznos opciók: =>
// ,"exclude": [                                    // a sconfig.json file végére
//  "node_modules",                                 // mappát ne fordítsa, defaultba benne van, akkor kell csak ha exclude-ot felvesszük
// 	"analytics.ts",	                                // ezt a file-t nem fordítja
// 	"*.dev.ts",                                     // minden file ami erre végződik
// 	"**/*.dev.ts"								    // minden mappa benne minden file amierre végződik
// ],"include":[                                    // az itt található file-okat fordítja csak
// 	"app.ts",	                            
// ],"files":[]                                     // direktbe mik legyenek fordítva?
// {"rootdir":"./src"   "outdir":"./dist"}          // honnan hova fordítson beállítás
// "lib": [                                         // ide lehet irni explicite hogy milyen apikat akarunk
// "DOM",                                           // ez a 4 az ES6 default settings-e
// "ES6",
// "DOM.Iterable",
// "ScriptHost"
// ],   
// "sourceMap" true                                 // debugolásra, megkapja a böngésző a ts file-t is egy map file segítségével, és debugolhatom
//------------------------------------------------------------------------------------------------------------------------------------------------
let Never:never;        // sohase ér a végére a fgv, pl throw a fgv-en belül // KIKELL RAKNI MINDIG
// :void => a void a default viszatérési érték, értéke "undefined" v. "null"       
let A_0:any;            // bármi    DE!!! => // S_0= A_0  // <= ez jó, DE // S_0 = U_0 // <= ez nem jó 
let U_0:unknown;        // ismeretlen tipus, nem tudjuk előre milyen, megkell mondani neki hogy kezelje ugy mint "as", akkor használjuk ha nemtudjuk mi a típus
let S_0:string="valami";
let B_0:boolean=true;
let N_0:number=22;      // N_0=0xf; => hexa forma, 15    // 0b => binális    // 0o => octal     // 6.7 => float     // 6 => decimal
var L_0:bigint=100n;    // long // js be is van
let U_1:undefined;      // visszatérési értéknél van értelme
let N_1:null;           // -||-
let NU_1:null | undefined;  
let V_0:"vagyez" | "vagyaz";
let object1: object;     // ez csak egy objekt
let object2:{}           // === mint ez
let person: object = {name:"kiki"}; console.log(person.name);   // fordítás idejü HIBA
let fgv_1: Function;                        // a fgv_1 bármilyen fgv lehet 
let fgv_2: (a:number, b:number) => number;  // a fgv_2 csak olyan fgv lehet ami vár 2 numbert és visszatér egy numberrel
const undefinedReturn = (): undefined => {return};  // kötelező kiírni a return-t
const voidReturn = (): void => {};                  // elhagyható a return, de mind2 returnja undefined
// void: nem veszi figyelembe a returnt, ha van, ignorálja és engedi hogy akár legyen, de nem tér vissza semmivel, nem érdekli mi a return
//------------------------------------------------------------------------------------------------------------------------------------------------
// Readonly
class Ember {readonly id: number;}      // csak olvasható, mint a const DE csak Interface v Class property-je lehet, CSAK konstruktorba kap értéket
//                                      // => A constructorba még ujra értéket adhatok neki vis felülírhatom
let emp1: Readonly<ClassVInterfaceNév> = {id:1,name:"Steve"} // Típus   // ráeröszakoljuk, hogy deklarálás után csak olvasható
let RO_0: ReadonlyArray<number>=[1,2,3]; // csak olvasható tömb
//------------------------------------------------------------------------------------------------------------------------------------------------
// átalakítás, kasztolás, CSAK ABBA A SORBA ALAKUL ÁT 
S_0=(U_0 as string);    // kasztolás_1
S_0=(<string>U_0);      // kasztolás_2
S_0=`${N_0} így is lehet szöveggé alakítani`;

// string => number 
let N_2:number = (S_0 as unknown) as number;

// bármi => object
interface Employee {name: string; code: number;} 
let employee = (U_0 as Employee)                // LEHET objektummá is, akkor
employee = (<Employee> U_0);                    // LEHET objektummá is, akkor
employee.name = "John"; employee.code = 123;    // Majd értéket KELL adni
//------------------------------------------------------------------------------------------------------------------------------------------------
// Típus létrehozás     // Literal típus  // tisztább lesz a kód a | típusok helyett
type MyType="igen" | "nem" | number ;
let enboolom:MyType="igen";
type User = { name: string; age: number };  // mint az interface???
function fgv(user: User) {}
const u1: User = { name: 'Max', age: 30 }; 
//------------------------------------------------------------------------------------------------------------------------------------------------
// Tömbök
let SA_0:string[]=["szöveg1","szoveg2"];    // VAGY => let SA_1:Array<string>=["szöveg1","szoveg2"];
let SA_1:(string|number)[]=["szöveg1",1];   // VAGY => let SA_1:Array<string|number>=["szöveg1",1];
let T_T:[number,string];                    // 2 elemű objektum, tömb =>
T_T=[10,'21'];                              // pl ha 2 visszatérési értéket akarunk
let SA_3:{name:string, email:string}[]=[{name:"kiki",email:"bb@freemail.hu"}];          // milyen objektek lehetnek benne?
// let SA_2:Array<{name:string, email:string}>=[{name:"kiki",email:"bb@freemail.hu"}];  // milyen objektek lehetnek benne?
//------------------------------------------------------------------------------------------------------------------------------------------------
// Tuple, ez egy tömb ami megmondja hogy, hogy következnek egymás után az elemek típus szerint
// akkor használjuk, ha egy fügvénynek van sok bemenete és ezt a tuple-t adjuk át a fgv bemenetére fgv(...tuple)
let Tuple: [number, string] = [1, "Steve"];
Tuple.push(2, "Bill");      // [1, 'Steve', 2, 'Bill']      // így növelhetem a méretét, amúgy csak 2 hósszú lehet értékadásnál
Tuple.push(true);           // DE ÍGY NEM JÓ !!!
Tuple[1]=10;                // DE ÍGY NEM JÓ !!!
Tuple = [2,'author','admin']// DE ÍGY NEM JÓ !!!
Tuple.push("true");         // ÍGY SAJNOS JÓ NEM SZÓL

// Tuple Array
let TupleArray: [number, string][];
TupleArray = [[1, "Steve"], [2, "Bill"], [3, "Jeff"]];

const addd = (...numbers:[number, number, number]) =>{} // ha tudom hogy 3 paraméter lesz, de nem akarom kiirogatni, ez így szebb
//------------------------------------------------------------------------------------------------------------------------------------------------
// ENUM     // értékek: string vagy szám vagy mind2
enum Szinek{                                
    Piros,Zold=getZoldName("4"), Kek=22  // kulcs érték párok, ha nem adunk értéket neki akkor 0-tol indul és 1 el növexik
}                                            
function getZoldName(num:string){
    return 54  
}
let num:number = Szinek.Piros;    // 0
Szinek["Piros"];                  // 0
Szinek[0]                         // "Piros"    // csak akkor működik a visszaút ha számok az értéke a Pirosnak
Szinek[Szinek.Piros]              // "Piros"
//------------------------------------------------------------------------------------------------------------------------------------------------
// FGV

const nevtelenfgv = function(x,y){};                          // névtelen fgv.              
const nyilfgv = (input:string):void=>{console.log(input)}     // nyíl
function normalfgv(input:string):void{ console.log(input)}    // normál 

// declare === nem itt készítjük el a fgv-t
declare function vagyBemenet(o:object | null):void;             // 2 fajta bemenete is lehet bárminek...    

declare function opcionalisBemenet(o?:string):void;             // overload helyett van, nem kötelező bemenet az "o"
opcionalisBemenet(); opcionalisBemenet("béla"); // ezt is és ezt is elfogadja

declare function cifraBemenet(i:{id:string}):void{ console.log(i.id);}  // lehet beállítani bemenetet ilyen cifrán is
let be={id:'asdads'};cifraBemenet(be); // i objektumot vár, aminek van id-je

function defaultertekBemenet(o:string="alapértelmezettérték"):void{};   // ez nem lehet declare!!!, mert már kap értéket vis deklaráltuk default értékkel
defaultertekBemenet(); // van alapértelmezettbemenet   // default érték a fgv paraméterek végére!! defaultok után nem szabad nem defaultnak jönni

declare function tombmegadasa(o:number,...values:string[]):void;        // ha tömböt vár, a tömb mindig az utolsó bemenete a fgv-nek
tombmegadasa(2,"212","1321","...");
function sohanemérvégetfgv():never{throw new Error();}

//------------------------------------------------------------------------------------------------------------------------------------------------
// Interface    tulajdonságai és metódusai(csak neve) is lehetnek. ígéreteket feltételeket adunk

interface Emlos{}
interface Peaople extends Emlos{
  id?:number,         // id-t nem kötelező megadni => változó:Peaople={név:"Ballér"}
  readonly x:number;  // csak olvasható const, DE a constructorba még tudok neki új értéket adni, class v interfaceknál használjuk
  név:string
  getId(id: string): number;
  [propname:string]:any;          // hogyan nézzenek ki a + többi tulajdonságai?  // az indexei,kulcsai stringek, és az értéke any
}
let people:Peaople={id:32,getId:()=>23,név:"ballerk",x:0,age:"121"}        // az age a plusz tulajdonság
//--------------------------------

interface ReadonlyStringArray{
    readonly [index:number]:string; // az indexei number értékü, és csak string értékeket tartalmazhat
}
let myArray:ReadonlyStringArray=["asd","asda","asdds"]
console.log(myArray[2]);        // "asdds"
//--------------------------------

interface Fgv{                    // => Az interface fgv is lehet
  (id:string,value:number):boolean 
} 
let mFgv_1:Fgv = function(id:string,value:number):boolean{return false;}
let mFgv_2:Fgv =         (id:string,value:number):boolean => false;
let myFgv_3:Fgv = (id: string, value: number) => id === '1' && value === 2;

//--------------------------------

interface Counter{              // ez vajon mire jó?
  (start:number):string;
  i:number;
  reset():void
}
function getc():Counter{
  let c:Counter = <Counter>function(start:number):string{return ""+start};  // ha itt lenne this az a globális object, mert fgv
  c.i=212;                          // megmondjuk hogy a fenti fgv-t kezelje ugy mint egy Counter, majd az i értékét beállítjuk 
  c.reset=function(){this.i=0};     // majd a reset fgv-t                   //  ez a this a Counter this-je
  return c;                         
}
let cc=getc();console.log(cc);        // [Function: c] { i: 212, reset: [Function (anonymous)] }
cc(10);console.log(cc(10));           // 10                                                         // csak meghívtuk 10 el
console.log(cc);                      // [Function: c] { i: 212, reset: [Function (anonymous)] }
cc.reset();console.log(cc);           // [Function: c] { i: 0, reset: [Function (anonymous)] }      // nullázza mert a reset már eléri a interface-t
cc.i=5;console.log(cc);               // [Function: c] { i: 5, reset: [Function (anonymous)] }

//------------------------------------------------------------------------------------------------------------------------------------------------
// Abstract Class
abstract class Emlős {                // nem példányosítható !!!
  abstract hangotAd():void;           // abstract fgv-ei lehetnek  => egy leszármazott osztájba definiálunk, muszáj minden leszármazottban definiálni
  mozog():void{console.log("fut")}    // és nem abstract is
}
//------------------------------------------------------------------------------------------------------------------------------------------------
// Class  // 1 class csak 1 classtól örökölhet, de bármennyi interface-t kiterjeszthet 
// VAN => public(default), private, protected !!! // van static is, ugyanúgy osztoznak rajta a hasonló típusú példányok
// super()      =>  a szülő constructorát futtatja le
// super.fgv()  === elérem a szülő fgveit
// a szülő konstruktorát felülirhatom a gyerekével
// classon belül a privat dolgaival dolgozunk "_valami" és kívülről a public dolgaival "valami"
// class      class-t        extends
// class      interface-t    implements

interface MyInterface{id:string;getId():string;} 
class MyClass implements MyInterface{id:string; getId=()=>this.id;}
const mc:MyInterface= new MyClass();
class Circle {
  static pi:number = 3.14;        // osztoznak rajta a hasonló típusú példányok
  pi:number= 3;                   // ez a pi a példányhoz tartozik, más lesz a Circle.pi===3.14 és a circleObj.pi===3
  private _radius:number          // rejtett    // defaultan minden public
  protected _prot:string;         // a gyerekei elérjék kivülről private
  readonly x:number;              // csak olvasható, CSAK a constructorba tudok neki újra értéket adni, class v interfaceknál használjuk
  valami?:number;                 // number, de az elején undefined, nem muszáj értéket adni neki
  constructor(private _age:number,public kor?:number){}    
  // a kor opcionális, nem kötelező paraméter, de a bemenetek végén legyen mindíg az összes ilyen opcionális paraméter
  // egyböl létrehozza a public és privat szavakkal a public és privat fieldeket
  
  // setter és getterbe komplex logikákat szokás tenni, pl érték validálás
  get age():number {return this._age}           // console.log(circle.age)
  set radius(radius){this._radius = radius}     // circle.radius = radius

  static calculateArea(radius:number):number {  // lehet fgv is static
      return this.pi * radius * radius;
  }
  getId1(){};                                   // itt is lehet így is, csakdefiniálni, de ez csak void lehet
  getId2:()=>string;                            // így megadhatom hogy mi legyen a return 
  getId3=():string=>{return "id";};             // nyíl fgv
  korKiiras():void{console.log(this.kor)}       // normál fgv
  describe(this:Circle) {                       // így védem le, azt hogy, aki meghívná ezt a fgv-t az BIZTOSAN Circle legyen, vis a this típusa Circle
    console.log('Department: ' + this.pi);
}
}
Circle.pi; // returns 3.14
let circleObj:Circle = new Circle(23);     
circleObj.pi; // returns 3

class Question {        // egy trükk!!!
    value:string;
    key:string;
    label:string;
    constructor(options:{value?:string,key?:string,label?:string,}){
        for (const k in options) {
            this[k]=options[k];
        }
    }
}
class textQuestion extends Question{
    label="valami";
    type:string;
    optionss:{key:string, value:string}[]=[]        // ilyen objektumok tömbje
    constructor(options:{}={}){                     // default érték az üres obj
        super(options);         
        this.type=options["type"] || [];            // kijátszottuk a típusvizsgálatát a type-nak, vis ami a constructorba jön érték az lesz a this.type
        this.optionss=options["optionss"] || [];
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------
// privát konstruktor, akkor kell ha azt akarjuk hogy 1 Classból csak eggyetlen egy példány létezzen
class AccountingDepartment  {
    private constructor(id: string) {}
    private static instance:AccountingDepartment;
    static getInstance(){
        if (AccountingDepartment.instance){
            return this.instance
        }
        this.instance = new AccountingDepartment('id');
        return this.instance;
    }
}
const accountingDepartment = AccountingDepartment.getInstance();

//------------------------------------------------------------------------------------------------------------------------------------------------
// generikus osztályok
function mygen<T>(input:T):T{
    return input;
}
function merge<T, U>(object_1:T,object_2:U){
	return Object.assign(object_1,object_2);
}
const mergedObject = merge({name:"Max"},{age:20}) // generikusság nélkül ő cask egy object lesz
console.log(mergedObject.age);                    // így érti a ts hogy van neki age
const mergedObject_2 = merge<string,number>("string",20)    // vagy direktbe megis mondhatjuk neku hogy mit adunk a merge-be
// szigorítást teszünk, hogy a T meg az U mik lehetnek
function merge2<T extends number | string, U extends object>(object_1: T, object_2: U) {
	return Object.assign(object_1, object_2);
}
interface MyGenInterface<T>{
    lista:Array<T>;
    item:T;
    value:number;
}
class MyGenClass<T,T2> implements MyGenInterface<T>{  // lehet több típus...
    constructor(){
        this.lista=new Array<T>();
    }
    lista:Array<T>;
    item:T;
    value:number;
}
var mGC=new MyGenClass<string,number>();

function create<T>(myClass:{new():T}):T{
    return new myClass();
}
var vmi =create(MyClass1);

function create2<T extends MyClass1>(myClass:{new():T}):T{
    let c= new myClass();
    c.getId();
    return c;   // olyan T-t vár aki extendálja a MyClass1-t , csinál dolgokat majd visszaadja 
}               // amivel utánna mi csinálunk dolgokat a fgv en kivül

interface Lengthy{
	length: number;
}
// olyan elementeket adhatunk cask át, aminek van length propertíje
function countAndPrint<T extends Lengthy>(element:T):[T,string]{
	let descriptionText = "Got no value.";
	if (element.length === 1) {
		descriptionText = "Got 1 element.";
	} else if(element.length >1) {
		descriptionText = `Got ${element.length} elements.`
	}
	return [element, descriptionText];
}

// U extends keyof T => U a T kulcsai közül való legyen
function extractAndConvert<T extends object, U extends keyof T>(obj:T,key:U){
	return obj[key];
}
class DataStorage<T>{
	private data:T[] = [];
	addItem(item:T){
		this.data.push(item);
	}
	removeItem(item:T){
		this.data.splice(this.data.indexOf(item), 1);
	}
	getItems(){
		return [...this.data];
	}
}
const textStorage = new DataStorage<string>();

interface CourseGoal{
	title:string;
	description:string;
	completeUntil:Date;
}

function createCourseGoal(title:string, description:string, date:Date):CourseGoal{
	let courseGoal:Partial<CourseGoal> = {};  // az interface minden elemére megmondjuk hogy opcionális
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;
	return courseGoal as CourseGoal;
}

const names:Readonly<string[]> = ["Max", 'Anna']
//------------------------------------------------------------------------------------------------------------------------------------------------
// Dekorátorok ????
//------------------------------------------------------------------------------------------------------------------------------------------------
/*
Namespace	                                                                                                            Module
Must use the namespace keyword and the export keyword to expose namespace components.	                                Uses the export keyword to expose module functionalities.
Used for logical grouping of functionalities with local scoping.	                                                    Used to organize the code in separate files and not pollute the global scope.
To use it, it must be included using triple slash reference syntax e.g. ///<reference path="path to namespace file" />.	Must import it first in order to use it elsewhere.
Compile using the --outFile command.	                                                                                Compile using the --module command.
Must export functions and classes to be able to access it outside the namespace.	                                    All the exports in a module are accessible outside the module.
Namespaces cannot declare their dependencies.	                                                                        Modules can declare their dependencies.
No need of module loader. Include the .js file of a namespace using the <script> tag in the HTML page.	                Must include the module loader API which was specified at the time of compilation e.g. CommonJS, require.js etc.
*/ 
//------------------------------------------------------------------------------------------------------------------------------------------------

/*
// CLEAN CODE      
General rules
    Follow standard conventions.
    Keep it simple stupid. Simpler is always better. Reduce complexity as much as possible.
    Boy scout rule. Leave the campground cleaner than you found it.
    Always find root cause. Always look for the root cause of a problem.
Design rules
    Keep configurable data at high levels.
    Prefer polymorphism to if/else or switch/case.
    Separate multi-threading code.
    Prevent over-configurability.
    Use dependency injection.
    Follow Law of Demeter. A class should know only its direct dependencies.
Understandability tips
    Be consistent. If you do something a certain way, do all similar things in the same way.
    Use explanatory variables.
    Encapsulate boundary conditions. Boundary conditions are hard to keep track of. Put the processing for them in one place.
    Prefer dedicated value objects to primitive type.
    Avoid logical dependency. Don't write methods which works correctly depending on something else in the same class.
    Avoid negative conditionals.
Names rules
    Choose descriptive and unambiguous names.
    Make meaningful distinction.
    Use pronounceable names.
    Use searchable names.
    Replace magic numbers with named constants.
    Avoid encodings. Don't append prefixes or type information.
Functions rules
    Small.
    Do one thing.
    Use descriptive names.
    Prefer fewer arguments.
    Have no side effects.
    Don't use flag arguments. Split method into several independent methods that can be called from the client without the flag.
Comments rules
    Always try to explain yourself in code.
    Don't be redundant.
    Don't add obvious noise.
    Don't use closing brace comments.
    Don't comment out code. Just remove.
    Use as explanation of intent.
    Use as clarification of code.
    Use as warning of consequences.
Source code structure
    Separate concepts vertically.
    Related code should appear vertically dense.
    Declare variables close to their usage.
    Dependent functions should be close.
    Similar functions should be close.
    Place functions in the downward direction.
    Keep lines short.
    Don't use horizontal alignment.
    Use white space to associate related things and disassociate weakly related.
    Don't break indentation.
Objects and data structures
    Hide internal structure.
    Prefer data structures.
    Avoid hybrids structures (half object and half data).
    Should be small.
    Do one thing.
    Small number of instance variables.
    Base class should know nothing about their derivatives.
    Better to have many functions than to pass some code into a function to select a behavior.
    Prefer non-static methods to static methods.
Tests
    One assert per test.
    Readable.
    Fast.
    Independent.
    Repeatable.
Code smells
    Rigidity. The software is difficult to change. A small change causes a cascade of subsequent changes.
    Fragility. The software breaks in many places due to a single change.
    Immobility. You cannot reuse parts of the code in other projects because of involved risks and high effort.
    Needless Complexity.
    Needless Repetition.
    Opacity. The code is hard to understand.
*/
//------------------------------------------------------------------------------------------------------------------------------------------------
// Intersection Types                   // &                                  
interface Colorful {color: string;}
interface ICircle {radius: number;}
type ColorfulCircle = Colorful & ICircle;   
// szinte olyan mint ez =>
interface ColorfulCircle2 extends Colorful, Circle {}

// function draw(circle: ColorfulCircle) {}         
function draw(circle: Colorful & ICircle) {         
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
draw({ color: "blue", radius: 42 });

// különbség a konfliktusok kezelése, és ez a különbség tipikusan az egyik fő oka annak, hogy miért választjuk az egyiket a másik helyett 
// egy interfész és egy metszet típus alias típusa között.

// type                                                                 // interface
// nincs hiba =>                                                        // van hiba =>
type NumberToStringConverter = {                                        // interface NumberToStringConverter {                                                                    
  convert: (value: number) => string;                                   //   convert: (value: number) => string;
}                                                                       // }
type BidirectionalStringNumberConverter = NumberToStringConverter & {   // interface BidirectionalStringNumberConverter extends NumberToStringConverter {
  convert: (value: string) => number;                                   //   convert: (value: string) => number;
}                                                                       // }

type SetPoint2 = (x: number, y: number) => void;                           interface SetPoint {(x: number, y: number): void;}

// a típus tudja az interface-val szembe =>
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;                        // nem implements-elhetünk ILYET
                                                                          class SomePartialPoint implements PartialPoint {x = 1;y = 2;}

// tuple
type Data = [number, string];

// Egymást tudják oda vissza kiterjeszteni, csak más szintaktika
type PartialPointX1 = { x: number; };                                     interface PartialPointX0 { x: number; }
type Point1 = PartialPointX1 & { y: number; };                            interface Point0 extends PartialPointX0 { y: number; }

type PartialPointX2 = { x: number; };                                     interface PartialPointX3 { x: number; }
interface Point2 extends PartialPointX2 { y: number; }                    type Point3 = PartialPointX3 & { y: number; };

// Always prefer interface over type.

// When to use type:

// Use type when defining an alias for primitive types (string, boolean, number, bigint, symbol, etc)
// Use type when defining tuple types
// Use type when defining function types
// Use type when defining a union
// Use type when trying to overload functions in object types via composition
// Use type when needing to take advantage of mapped types
// When to use interface:

// Use interface for all object types where using type is not required (see above)
// Use interface when you want to take advatange of declaration merging.



//------------------------------------------------------------------------------------------------------------------------------------------------
// TYPE GUARD

function size(input: string | number) {
    if (typeof input === 'string') {        // primitívek esetén typeof
        return input.length;
    }
    return input;
    }
//--------------------------
interface Admin {
	name: string;
	privileges: string[];
}

interface Employee {
	name: string;
	startDate: Date;
}
type UnknowEmloyee = Employee | Admin;

function printEmployeeInformations(employee: UnknowEmloyee){
	if ('privileges' in employee) {
		console.log('Privileges: '+employee.privileges);
	}
}

//--------------------------
class Car{
	drive(){
		console.log("Driving");
	}
}
class Truck{
	drive(){
		console.log("Driving a truck");
	}
	loadCargo(amount:number){
		console.log("Loading cargo..." + amount);
	}
}

type Vehicle = Car | Truck;

const vehiicle_1 = new Car();
const vehiicle_2 = new Truck();

function useVehicle(vehicle:Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {         // ha a vehicle a Truck egyik példánya akkor, CSAK CLASSOKNÁL SZBAD Interfaceknél NEM, 
		vehicle.loadCargo(10000)            // mert interface, az csak  Typescript specifikus cucc nem fordul semmire, amíg a class igen
//                                          // és az instanceof az js specifikus cucc
	}
}
//--------------------------
interface Bird{
	type:'bird';
	flyingSpeed: number;
}

interface Horse{
	type:'horse',
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed: number;
	switch (animal.type) {
		case 'bird':
			speed=animal.flyingSpeed;
			break;
		case 'horse':
			speed=animal.runningSpeed;
	}
	console.log('Moving at speed: ' + speed);
}

moveAnimal({type:'bird',flyingSpeed:200})

//------------------------------------------------------------------------------------------------------------------------------------------------
interface ErrorContainer{
	[prop: string]:string;			// nemtudom a propertyk nevét csak hogy a tipusa string és az értéke is
	// id:string,	 	 // ilyet lehet
	// id:number,	     // ilyet nem
}
const errorBag:ErrorContainer={
	email:"Not a Valid email!",
	userName: "Must start with a capital character"
}
//---------------------------------
type Combinable = string | number;
// function add1(a: number) :number;
function add1(a: number, b: number) :number;
function add1(a: Combinable, b: Combinable) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result = add1(1,5)		// azt akarom hogy tudja a forító, hogy a result number legyen, a kasztolással minden helyen kell kasztolni, => megoldás

//------------------------------------------------------------------------------------------------------------------------------------------------
console.log(fetchUserData?.job?.title);                         // === a kövi sorral => 
console.log(fetchUserData.job && fetchUserData.job.title);	    // csekkolás
////

const userInput ='';
const storedData_1 = userInput || 'DEFAULT';  	// falsy 				=> DEFAULT
const storedData_2 = userInput ?? 'DEFAULT';    // ha null v undefined  => DEFAULT


//------------------------------------------------------------------------------------------------------------------------------------------------
// Dekorátorok, akkor futnak le amikor magához a classhoz rendeljük, nem a class példányosításakor
// a tsconfigba konfigolni kell

function Logger(constructor:Function){
	console.log('Logging');
	console.log(constructor);
}

@Logger
class Person{
	name = 'Max';
	constructor(){
		console.log("creating person object...");
	}
}
//-----------------------------
// adat passzolása a dekorátornak
function Logger(logString:string){
	return function(constructor:Function){
		console.log(logString);
		console.log(constructor);
	}
}

@Logger("LOGGING - PERSON")
class Person{
	name = 'Max';
	constructor(){
		console.log("creating person object...");
	}
}

//-----------------------------
function WithTemplate(template: string, hookID: string) {
	return function (_: Function) {    // _ === tudom hogy itt van egy paraméter amit nem használok, de nem is akarom
		const hookEl = document.getElementById(hookID);
		if (hookEl) {
			hookEl.innerHTML = template;
		}
	};
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
	name = 'Max';
	constructor() {
		console.log('creating person object...');
	}
}
//-----------------------------
function WithTemplate(template: string, hookID: string) {
	return function (constructor: any) {    // _ === tudom hogy itt van egy paraméter amit nem használok, de nem is akarom
		const hookEl = document.getElementById(hookID);
		const p = new constructor();
		if (hookEl) {
			hookEl.innerHTML = template;
			hookEl.querySelector('h1')!.textContent = p.name;
		}
	};
}
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
	name = 'Max';
	constructor() {
		console.log('creating person object...');
	}
}

//-----------------------------
function Logger(){
	console.log("1. lefutás");
	return function(_:Function){
		console.log("5.lefutás");
	}
}

function WithTemplate() {
	console.log('2. lefutás');
	return function (constructor: any) {    
		console.log("3. lefutás");
        const p = new constructor();
	};
}
@Logger()
@WithTemplate()
class Person {
	name = 'Max';
	constructor() {
		console.log("4.lefutás");       // mert meghívom az egyik dekorátorba a construktort
	}
}
//-----------------------------
function Log(target: any, propertyName: string | Symbol): void {
	console.log('Property decorator!');
	console.log(target, propertyName);
}

function Log2(target:any, name:string,descriptor:PropertyDescriptor){
	console.log("Accessor decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);	// pár infó: konfigurálható? enumerálható? get, set
}

function Log3(target:any, name:string | Symbol, descriptor:PropertyDescriptor){
	console.log("Method decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);	// pár infó: konfigurálható? enumerálható? amire raktuk, írható e?
}

function Log4(target:any, name:string | Symbol, position:number){
	console.log("Parameter decorator!");
	console.log(target);		// a class prototypja
	console.log(name);			// fgv neve?
	console.log(position);		// hanyadik paraméter?
}

class Product {
	@Log					// akkor futnak le amikor a klasszt definiálja a javascript
	title: string;

	@Log2
	set price(value: number) {
		if (value > 0) {
			this._price = value;
		} else {
			throw new Error('price must be greater than 0');
		}
	}
	constructor(title: string, private _price: number) {
		this.title = title;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}


//-----------------------------
function WithTemplate(template: string, hookID: string) {
	return function <T extends {new(...args: any[]): {name:string}}> (originalConstructor: T) {
		return class extends originalConstructor{
			constructor(..._: any[]){	// így már akkor fut le amikor példányosítom a klasszt amire raktam
				super();
				const hookEl = document.getElementById(hookID);
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector('h1')!.textContent = this.name;
				}
			}
		}
	};
}

@Logger('Hy')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
	name = 'Max';
	constructor() {
		console.log('creating person object...');
	}
}

//-----------------------------
function Autobind(_:any, _2:string, descriptor:PropertyDescriptor){
	const originalMethod = descriptor.value; // eredeti vghez való hozzáférés
	const adjDescriptor:PropertyDescriptor ={
		configurable: true,
		enumerable:false,
		get(){
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		}
	}
	return adjDescriptor
}

class Printer {
	message = 'This works!';

	@Autobind
	showMessage(){
		console.log(this.message);
	}
}
const p = new Printer();
const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p))
button.addEventListener('click', p.showMessage)         // dekorátorral bindoltuk a thist nem kell a híváskor


//-----------------------------
interface ValidatorConfig{
	[property: string]: {
		[validatableProperty: string]:string[]       // ['required', 'positive']
	}
}

const registerValidators : ValidatorConfig = {}


function Required(target:any,propName:string){
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propName]: [...(registerValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target:any,propName:string){
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propName]: [...(registerValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj:any){
	const objValidatorConfig = registerValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator  of objValidatorConfig[prop]) {
			switch (validator){
				case 'required':
					isValid = isValid && !!obj[prop];
					break;
				case 'positive':
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid
}


class Course {
	@Required
	title:string;
	@PositiveNumber
	price:number;
	constructor(title:string, price:number) {
		this.title = title;
		this.price = price;
	}
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const titleElement = document.getElementById('title') as HTMLInputElement;
	const priceElement = document.getElementById('price') as HTMLInputElement;
	const title = titleElement.value;
	const price = +priceElement.value;
	const createdCourse = new Course(title, price)
	console.log(createdCourse);
	if(!validate(createdCourse)) {
		alert('Invalid input, pls try again')
		return true
	}

})


//------------------------------------------------------------------------------------------------------------------------------------------------
// namespace, nem tökéletes => helyette ES Modules
// namespace spec komment
/// <reference path="drag-drop-interfaces.ts"/>
/// <reference path="project-model.ts"/>
//    "outFile": "./dist/boundle.js",  	// az összes namespace-t eggyesítse 1 db file-á
//    "module": "amd", 					// ez is kell mellé plusz infó
namespace App {}
// másik fileba =>

namespace App {
	export enum ProjectStatus {
		ACTIVE,
		FINISHED,
	}
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// webpack
// npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader



//------------------------------------------------------------------------------------------------------------------------------------------------
var GLOBAL = "Globális változó"	// ez van vhol globálisan
declare const GLOBAL:any;				// ez van a mi ts fileunkba

"devDependencies": {
	"@types/lodash": "^4.14.182",		// olyan függőségek amik pl egy js filnak a ts dolgait adják
}



// UTILITY TÍpusok
https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype

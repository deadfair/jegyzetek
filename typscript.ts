// npm i -g typescript      // globális telepítés
// tsc typescript.ts -w     // auto fordítás js re      // tsc typescript.ts    // csak fordít 1x   
// tsc typescript.ts -t es2016  // ha hiba van
// npm init                 
// package.json             // scriptek közé irni hogy              ts:"tsc -w" 
// tsc --init               // => most a tsc parancsal már fordít
// tsconfig.json            // {"rootdir":"./src"   "outdir":"./dist"}             // honnan hova fordítson beállítás
// package.json             // scriptek közé irni hogy              start:"node ./dist/index.js" 
// npm run start            // a js filet futtatja
//------------------------------------------------------------------------------------------------------------------------------------------------
let Never:never;        // sohase ér a végére a fgv, pl throw a fgv-en belül
// :void => a void a default viszatérési érték, értéke "undefined" v. "null"       
let A_0:any;            // bármi
let S_0:string="valami";
let B_0:boolean=true;
let N_0:number=22;      // N_0=0xf; => hexa forma, 15    // 0b => binális    // 0o => octal     // 6.7 => float     // 6 => decimal
var L_0:bigint=100n;    // long // js be is van
let U_0:unknown;        // ismeretlen tipus, nem tudjuk előre milyen, megkell mondani neki hogy kezelje ugy mint "as"
let U_1:undefined;      // visszatérési értéknél van értelme
let N_1:null;           // -||-
let NU_1:null | undefined;  
let V_0:"vagyez" | "vagyaz";
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
// Típus létrehozás     // Literal típus
type Mybool="igen" | "nem";
let enboolom:Mybool="igen";
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
Tuple.push(2, "Bill");  // [1, 'Steve', 2, 'Bill']      // így növelhetem a méretét, amúgy csak 2 hósszú lehet értékadásnál
Tuple.push(true);       // DE ÍGY NEM JÓ !!!
// Tuple Array
let TupleArray: [number, string][];
TupleArray = [[1, "Steve"], [2, "Bill"], [3, "Jeff"]];
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
  abstract hangotAd():void;           // abstract fgv-ei lehetnek  => egy leszármazott osztájba definiálunk 
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
  
  get age():number {return this._age}
  set radius(radius){this._radius = radius}

  static calculateArea(radius:number):number {  // lehet fgv is static
      return this.pi * radius * radius;
  }
  getId1(){};                                   // itt is lehet így is, csakdefiniálni, de ez csak void lehet
  getId2:()=>string;                            // így megadhatom hogy mi legyen a return 
  getId3=():string=>{return "id";};             // nyíl fgv
  korKiiras():void{console.log(this.kor)}       // normál fgv
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
// generikus osztályok
function mygen<T>(input:T):T{
    return input;
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
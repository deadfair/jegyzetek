// komment
/* komment */
using System;
namespace ConsoleApp1
{class Program
    {static void Main(string[] args)
        {
            byte b_0=10;                //1 byte      0 ->255    // ha nagyobb értéket kap akkor túlcsordulás!! =>
            sbyte sb_0=10;              //1 byte    -128->127    // vagyis ujra elkezdődik 0 tól
            
            ushort ush_0=10;            //2 byte      0 ->
            short sh_0=10;              //2 byte
            
            uint uint_0=10;             //4 byte      0 ->
            int int_0=10;               //4 byte
            
            ulong ul_0=10;              //8 byte      0 ->
            long  l_0=10;               //8 byte

            float double_0=10.10;       //4 byte    7 tizedes
            double double_1=10.10;      //8 byte    15-16 tizedes
            decimal double_2=10.10;     //16 byte   28-29 tizedes

            const double PI=3.14;       // konstans

            char c_0='s';
            string S_0="sztring";

            bool B=true;

            var valami=14;              // valami itt int lesz, MUSZÁJ értéked adni neki, a fordító dönti el a típúsát.

            string S_1= Console.ReadLine();                 // Mindig string         
            B=int.TryParse(Console.ReadLine(),out int_0);   // ha siekrült a konvertálás inté => B=true ÉS int_0=Console.ReadLine()
            int ascii = Console.Read();                     // az ascii karakter kódját adja vissza ami int
            ConsoleKeyInfo cki= Console.ReadKey(true);      // true => amit leütünk billt, azt nem írja ki 
            ConsoleKey bill=cki.KeyChar;                    // billentyűt kér, ez lesz a bekért karakter, azé jó ez, 
                                                            // mert spec karaktert is tunk figyelni pl.: fel nyíl           
            Console.Write($"nincs \n a végén")
            Console.WriteLine($"szám1:{int_0}, szám2:{double_0}, c_0:{c_0}; S:{S_0}; B:{B}");   
            //                  szám1:10, szám2:10,1, c_0:s; S:sztring; B:True   
            Console.ReadKey();          // egy billentyűt vár, nem záródik be az ablak     
        }
    }
} 
//------------------------------------------------------------------------------------------------------------------
// típus átalakítás:
// autómatikus:     char -> int -> long -> float -> double
double szám3_0 = int_0;

// manuális:        double -> float -> long -> int -> char
int szám3_1 = (int) int_0;

// X -> string
X.ToString();           
Convert.ToString(X,2);  // 2 es számrendszerbe írja ki az X et

// X(string is) -> int,double
string S_1 = "10,1"; // ilyenkor vessző van nem pont!!!
Convert.ToDouble(S_1);   //...
Convert.ToInt32(S_2);    // a különbség:           Null value => returns "0"
Int32.Parse(S_2) ;       //                        Null value => ArguementNullException
char.parse("K");         // karakterré parsolás
//------------------------------------------------------------------------------------------------------------------
// oerátorok:   
// aritmetikai:  +  -  *  /  %  --  ++          ++a(műveleti sorrendbe a növelés a legelső,legerősebb, majd utánna jön minden más)    
//               =  +=  -=  *=  /=  %=          a++(a leggyengébb műveleti jel, csak a legvégén növelődik) 
// összehas:     ==  !=  >  <  >=  <=           pl.: b=a++ => "b" 1 el kissebb mindig, mint az "a"
// bit:          &=  |=  ^=  <<=  >>=                b=++a => egyenlőek mindig
// logikai:      &&   ||   !                    rövidzár létezik
//                   ? :

// if(){}else if(){}else{}
int day=4;
switch(day){            // csak == összehasonlításra jó! ,lehet string is vagy bármi amit összehasonlítani tudunk
    case 1:
    Console.WriteLine("Monday");
    break;
    case 2:
    Console.WriteLine("kedd");
    break;
    default:            // elhagyható rész, ha nincs meccs..
    Console.WriteLine("egyéb ");
    break;
}

// while(){}        do{}while()
// for (int i = 0; i < 5; i++) {}    // megkell adni az index típusát is
// foreach (típus elem in Array) {}  // megkell adni az elem típusát is, CSAK OLVASÁSRA // var elem <=> ArrayList-eknél bármilyen típusú

// break(kilép), countinue(elejére ugrik)
// goto ugras;    // innen
// ugras:         // ideugrik a vezérlés
//------------------------------------------------------------------------------------------------------------------
// String:  karakterekből álló tömb
// S[i]     speciális karakterek: \'  \"  \\  \t  \n  \b
string S_1 = "Hello ",S_2="világ";
string S_3 = S_1 + S_2;    // Hello világ     // ===  string.Concat(S_1,S_2)
S_3.Length;                // 11
S_3.ToUpper();             // HELLO VILÁG
S_3.ToLower();             // hello világ
S_3.Replace("hello","csá");// csá világ    // az S_3 ban minden "hello"-t lecserél "csá"-ra
S_3.IndexOf("á",1);        // 2            // Az S_3 ban a keresett karakterlánc kezdő indexét 
S_3.LastIndexOf("á",1);    // 7            // a 1 es indextől kezdve balról/jobbról az elsőt, ha nem talált => return -1,                         
S_3.Substring(4,2);        // vi           //4. indexű karaktertől kiolvassa 2 karaktert és azt adja vissza stringként,
                                           // ha nincs ott a "mennyit"?(2) => default S_3.Length
S_3.Insert(0,"A mondat: ") // A mondat: vi // beszúrja a 0. index helyére, többit eltolja
S_3.Remove(2,4);           // A at: vi     // A 2 es indextől töröl 4 db karaktert

S_3.Contains("barack");   // van S_3 ban barack?

S_3.PadLeft(10,'-');      // --A at: vi    // milyen hosszu legyen? és mivel töltse ki a maradék helyet? balról tölti fel
S_3.PadRight(12,'$')      // --A at: vi$$
S_3.Trim(' ');            // a S_3 elejéről és végéről leszedi a whitespaceket // S_3.Trim('a'); => az 'a'-kat 
// string => tömb
string[] S_3_tomb=S_3.Split(' '); // ' ' <= választó  default=' '

//------------------------------------------------------------------------------------------------------------------
// array
string[] A_0;
string[] A_1 = new string[4]; // 4 elemű alapértelmezetten => string esetén {"","","",""}, int esetén {0,0,0,0}
string[] A_1 = new string[] {"Volvo", "BMW", "Ford", "Mazda"}; // mérete a megadott elemszám lesz!
string[] A_1 = new string[4] {"Volvo", "BMW", "Ford", "Mazda"};
string[] A_1 = {"Volvo", "BMW", "Ford", "Mazda"};
int[] A_3 = {10, 20, 30, 40};

A_3.Length;
Array.Sort(A_3);   //rendezés

using System.Linq;  
A_3.Min(); // => using System.Linq;
A_3.Max(); // => using System.Linq;
A_3.Sum(); // => using System.Linq;

// több dimenzó
int[,] A_2D = new int[2,4];
A_2D.GetLength(0); //melyik dimenziójának a hossza? => 2  A_2D.GetLength(1) => 4
// mutatóvektor => a belső tömbök más méretűek is lehetnek
int[][] mv = new int[][]{
    new int [5],
    new int [10];
};
mv.Length;
mv[0].Length;
//------------------------------------------------------------------------------------------------------------------
// lista            CSAK 1D lehet
using System.Collection.Generic;
List<string> L_S_0 = new List<string>(A_1); // Az A_1 tömbből csinál listát
List <int> L_I_0 = new List<int>();
L_I_0.Add(11);
L_I_0.Add(9);   // 11,9
L_I_0[0];       // == 11
L_I_0.Count     // 1    // hossza
L_I_0.Clear();  // törli a listát
L_I_0.Insert(1,44);// 11,44,9   // Az első indexű helyre beteszi a 44 et, többit eltolja
L_I_0.Remove(9);   // 11,44     // kitörli az ELSŐ 9 es elemet
L_I_0.RemoveAt(1); // 11        // kitörli az 1 es indexű elemet
L_I_0.Sort();      // növekvőbe rendez ascii
int[] A_2 =new int[]{7,8,9,10}
L_I_0.AddRange(A_2); // végére teszi

List <List <int>> L_I_2D = new List<List <int>>()  // Listába listák..
{new List <int>(),new List <int>()};
L_I_2D[0].Add(12);
L_I_2D[1].Add(14);
//------------------------------------------------------------------------------------------------------------------
// halmaz  // minden elem csak 1x szerepelhet
HashSet<int> halmaz =new HashSet<int>();
HashSet<int> halmaz_2= new HashSet<int>(){10,3,2};
halmaz.Add(9);
foreach (int item in halmaz){}
halmaz.Count;
halmaz.Clear();
halmaz.Contains(3); // tartalmazza e a 3 ast?
halmaz.Remove(3);   // kiszedi a 3 ast
halmaz.UnionWith(halmaz_2);         // halmaz -ba lesz az uniója 
halmaz.IntersectWith(halmaz_2);     // metszet
halmaz.ExceptWith(halmaz_2);        // halmaz=halmaz-halmaz_2
//------------------------------------------------------------------------------------------------------------------
// szótár
Dictionary<int,string> D_0=new Dictionary<int,string>();
Dictionary<int,string> D_0=new Dictionary<int,string>(){{42,"alma"},{32,"béla"}};
D_0.Add(21,"hal");
D_0[21]="ezmár nem hal";
foreach (KeyValuePair<int,string> item in D_0)
{Console.Write($"{item.Key} {item.Value}");}
D_0.ContainsKey(21);        // a kulcsok közt van a 21?
D_0.ContainsValue("papa");  // benne van e a papa?
//------------------------------------------------------------------------------------------------------------------
// enum // a main-en kívül van!!!
enum abc:byte{A=20,B=10}                  // a számok itt byte típusba lesznek, default=int
enum Állatok{Kutya=0,Macska=1,Zsiráf=2}   // a sorszámok lehetnek más, DE ez a default, ha csak az elsőnek adunk értéket akkor ahhoz képest változik a többi +1
// mainbe:
Állatok e_0= Állatok.Macska;
e_0;        //== Macska
(int)e_0;   //== 1
(Állatok)2; //== Zsiráf
(Állatok)12;//== 12         // mert nincs bent az enumban..
// enum => enum tömb
Állatok[] á_0= (Állatok[])Enum.GetValues(typeof(Állatok));
// enum => string tömb
string[] á_1=Enum.GetNames(typeof(Állatok));
// enum => 1 elem, string
string S_8= Enum.GetName(typeof(Állatok),1); // S_8 = Macska

Állatok á_1;
if(Enmum.TryParse(Console.ReadLine(), out á_1)){}else{}  // bemenet: Macska => á_1= Macska
//------------------------------------------------------------------------------------------------------------------
// ArrayList          // mindenfélefajta típus lehet benne
ArrayList A_L_0= new ArrayList();
A_L_0.Add(11);
A_L_0.Add("jani");
A_L_0[0].GetType();    // az elem típusát adja vissza
//------------------------------------------------------------------------------------------------------------------
// láncolt Lista
LinkedList<int> LL_0= new LinkedList<int>();
LL_0.AddLast(5);    // utsó helyre rakja
LL_0.AddFirst(2);   // első helyre rakja
foreach(int item in LL_0){} // item az elemei lesznek // a sima for nem fog működni, nincsenek indexek
LinkedListNode<int> LL_cs = LL_0.First; // LL_0.Last  // LL_cs egy mutattó az első elemre mutat
LL_cs.Value;        // 2 // az érték  
LL_cs=LL_cs.Next;   // léptünk eggyet // utsó elem next-je => null
LL_0.AddAfter(LL_cs,32);  // a mutatónk után szúrja
LL_0.AddBefore(LL_cs,32); // elé
//------------------------------------------------------------------------------------------------------------------
// verem
Stack<int> verem =new Stack<int>();
verem.Push(21);   // berakja 
verem.Pop();      // kiveszi a legfelső elemet
// a foreach először az utolsónak berakottat éri el
verem.Count;
verem.Clear();
int[] verem_to_A= verem.ToArray(); // tömbé alakítja
//------------------------------------------------------------------------------------------------------------------
// sor    // mint a verem, csak itt, aki először jön az megy először el is
Queue<int> sor=new Queue<int>();
sor.Enqueue(32)  // push
sor.Dequeue();   // pop
sor.Count;
sor.Clear();
int[] sor_to_A= sor.ToArray(); // tömbé alakítja
//------------------------------------------------------------------------------------------------------------------
//fgv,         void => nincs visszatérési érték     // main en kívül!!!
static int fgvnév(int a,string b="defaultérték"){} // érték átadás // tömbök és objektumok esetén mindig a címét (default)
static int fgvnév2(ref int a){}         // a címét adjuk át  
fgvnév2(ref I_9);                       // így hívjuk meg
static void fgvnév3(int a,out bool X){} // a bemenetén is adhatunk meg kimenetet
fgvnév3(I_9,out B)                      // a B értéke lesz az ami a fgv3-on belül az X változik

//------------------------------------------------------------------------------------------------------------------
// struktúrák  // main-en kívül
struct Coords
{
    public string név;
    public int kor;
    public int mikor(){
        return 2021-kor;
    }
    public void Kiír(){
        Console.WriteLine($"Név: {név}")
    }   
    public Coords(string m,int k){      // konstruktor
        this.név=m;
        this.kor=k;
    }



    public Coords(double x, double y)
    {
        X = x;
        Y = y;
    }
    public double X { get; }
    public double Y { get; }

    public override string ToString() => $"({X}, {Y})";
}
// main-ba =>
Coords e = new Coords(béla,20);
e.név;
e.Kiír();
Coords e_2 = e;      // az értékei másolódnak át NEM a mutató
//------------------------------------------------------------------------------------------------------------------
// Class   // a Class programunkon kívülre kell !!!  
// jobb oldalt a project nevére jobb click => Add => Class => Class => Name:Ember.cs
// VAGY csak simán ugyanabba a file-ba a Class programonkunk kívűlre

// abstract class => nem példányosítható  => Human első= new Human(); 
Class Ember{
    public string név; // mindenki számára elérhető
    protected string név2; // saját osztájon belül + az Ember-ből származtatott gyermek osztályok férhetnek hozzá
    private string név3;   // csak osztályon belül

    public int életkor;
    public string város;
    public void Kiír(){
        Console.writeLine(this.név);
    }
    public Ember(string n,int életkor, string város){   // konstruktor
        név=n; this.életkor=életkor; this.város=város;
    }
    public Ember(){} // ez azért kell + ba hogy ígyis meglehessen hívni => Ember e = new Ember()
    ~Ember(){}  // destruktor   
}
// main unkban:
Ember e = new Ember();
Ember e = new Ember("jani",20,"pest");
Ember e2 = e;  // a mutató másolódik át !!!
// 
class Pont{                     // static class Pont{       <=>     ha minden metódus static  =>  így nem deklarálható, nem lehet neki példánya
    public Pont(int x, int y){                  // Pont e = new Pont(10,10); // => azért lehet így is deklarálni mert van konstruktora,
        this.x=x;
        this.y=y;
    }
    public static double PI=3.14;               // => Pont.PI;    // csak így érhető el   // Pont p = new Pont(10,10); p.PI; így nem..!!!
    private int x;
    private int y;
    public int x{                                                       // rossz adatra felkészítés
        get{return x;}                                                  // ha csak get-je van az x nek => csak olvasható az x
        set{if(value>0 && value < Console.WindowWidth) x=value;         // ha csak set van az x nek => csak írható az x (metódus)
            else Exception("Rossz koordináta");}
    }
    public int y{
        get{return y;}
        set{if(value>0 && value < Console.WindowHeight) y=value;
            else Exception("Rossz koordináta");}
    }
    public void Kirajzol(){
        Console.SetCursorPosition(x,y);     // a kurzor pozició kirajzolása
    }
    private void Exception(string s){
        throw new FormatException(s);
    }
    static public void Kiír(Pont p){        // osztály metódus =>  Pont.Kiír(e);
        Console.WriteLine(p.x);
    }
}
Pont e = new Pont(10,10); 
e.x=22;
Pont.Kiír(e);

class ős{
    private int a;
    public A(int a){
        this.a=a;
    }
}
class Gyermek : ős {      // mindent örököl az ősből
    protected int b;
    public B (int b, int a) : base(a) { // ős osztály konstruktorát meghívja 
        this.b=b;
    }
}
// konvertálás
ős o =new ős(10);
Gyermek gy=new Gyermek(33,22);
Gyermek gy_2=(Gyermek)o; // mert nem minden ős gyerek, de minden gyerek ős
ős o_2=gy;

static void ősKiír(ős j){
    Console.WriteLine(j.a)
    if(j is Gyermek){
        Gyermek x= (Gyermek)j;
        Console.WriteLine(x.b);
    } // VAGY
    /*Gyermek x = j as Gyermek;
    if(x!=null){
        Console.WriteLine(x.b);
    }*/
}
class Emlősök{
    public virtual void evés(){        // virtual jelzi hogy a gyerek osztályba majd felülírom ezt a metódust
        Console.WriteLine("etetés");
    }
}
class Kutyák:Emlősök{
    public override void evés(){       // override, megmondjuk hogy felülirjuk az ős metódust, DE virtual is lesz
        Console.WriteLine("etetés-kutya");
    }

}
sealed class Labrador:Kutyák{                // => a labradornak nem lehet gyereke
    public new void evés(){            // new => nem lesz virtual     // new virtual = override
        Console.WriteLine("etetés-labrador");
    }
    public sealed override evés(){            // lezárja tovább nem örökölhetik az alatta lévők
        Console.WriteLine("etetés-labrador");
    }
}
//mainba:
Labrador lab=new Labrador();
lab.evés();                             // etetés-labrador
class Fegyver{
    public virtual int  sebzés(){return 20;}
    public override string ToString(){  // minden objektum az Object östől származik és van nekik ToString()
        // return base.ToString();   // alapértelmezett
        return "ez egy fegyver";     // Write esetén mit írjon ki
    }
}
class GépFegyver:Fegyver{
    public override int sebzés(){return 5*20;}
}
// main en kívül:
static void Elsüt(Fegyver f){
    Console.WriteLine($"Sebzés: {f.sebzés()}")
}
// main:                              nincs virtual és override             Van
Fegyver f =new Fegyver(); Elsüt(f);         //20                            20
GépFegyver gf= new GépFegyver();Elsüt(gf);  //20                            100
//class on kívül:
class Külső{   // beágyazott classoknál privát változó átadása...
    private int szam=10;
    private Belső b;
    public Külső(){
        b=new Belső(this);
    }
    public class Belső{
        private Külső k;
        public Belső(Külső k){
            this.k=k
        }
        public void Hello(){
        Console.WriteLine($"Hello {k.szam}")
        }
    }
}
// mainbe:
Külső.Belső.Hello();
// class töredékek, több helyen vannak...
partial class Pclass{
    public void Hello(){
        Console.WriteLine($"Hello")
        }
    partial void Hello3();              // megmondjuk hogy majd egyszer megírja más
}
partial class Pclass{
    public void Hello2(){
        Console.WriteLine($"Hello2")
        }
    partial void Hello3(){       // megis irta vki más
        Console.WriteLine($"Hello3")
        }
}
Pclass pc= new Pclass();
pc.Hello(); pc.Hello2();

// interface
// class-on kívül
interface IKöszönés{
    void Reggel(); //mindig public 
    void Délben();
}
interface IÜdvözlés{
    void Szia(string név);
}
class Köszönés : IKöszönés, IÜdvözlés{
    public void Reggel(){Console.WriteLine($"jóreggelt");}
    public void Délben(){Console.WriteLine($"jónapot");}
    public void Szia(string név){Console.WriteLine($"Szia {név}");}
}
interface példa1
{
    void Példa1();
    void Példa3();
}
interface példa2 : példa1
{
    void Példa2();
    void Példa3();
}
class példa: példa2,példa1{
    public void Példa1(){Console.WriteLine($"példa1");}     // öröklésnél is megkell adni
    public void Példa2(){Console.WriteLine($"példa2");}
    void példa1.Példa3(){Console.WriteLine($"példa3");}     // azé nem public mert akkor elérné simán is
    void példa2.Példa3(){Console.WriteLine($"példa3_");}
}
// operátorok 
class EgészSzám{
    int szam;
    public int Szam{ get{return szam;}set{szam=value}}
    public EgészSzám(int szam){
        this.szam=szam;
    }
    static public EgészSzám operator +(EgészSzám sz1,EgészSzám sz2){
        return new EgészSzám(sz1.szam+sz2.szam);
    }
    static public bool operator ==(EgészSzám sz1,EgészSzám sz2){
        return sz1.szam==sz2.szam?true:false;
    }
    static public bool operator !=(EgészSzám sz1,EgészSzám sz2){
        return !(sz1==sz2);
    }
    static public EgészSzám operator ++(EgészSzám sz1){
        return new EgészSzám(sz1.szam+1);
    }
    static public implicit operator EgészSzám(int sz1){
        return new EgészSzám(sz1);
    }
    static public explicit operator EgészSzám(string sz1){
        return new EgészSzám(int.Parse(sz1));
    }
}
//mainbe:
EgészSzám sz1 =new EgészSzám(20);
EgészSzám sz2 =new EgészSzám(23);
EgészSzám osz =sz1+sz2;
EgészSzám sz3 =231;             //implicit
EgészSzám sz4 =(EgészSzám)"231"; //explicit
//delegate 
// class ba:
delegate void VD(string s);
static void Metódus(string s){
    Console.WriteLine($"Metódus {s}");
}
static void Metódus2(string s){
    Console.WriteLine($"Metódus2 {s}");
}
// main ba:
VD vd=new VD(Metódus);                          // először ezt                 3
vd += Metódus2;                                 // mert itt hozzáadtuk         2
vd("alma");         // Metódus alma             // mind2 őt meghívja           1
                    // Metódus2 alma
class Class{
    public delegate void Meghívás(int i);
    static public void Ciklus(Meghívás mh){
        for (int i = 0; i < 1000; i++)
        {
            mh(i);
        }
    }
}
// classba:
static void Kiír(int i){Console.WriteLine($"{i}");}
// main ba:
Class.Meghívás m =new Class.Meghívás(Kiír);
Class.Ciklus(m);        //1000 x kiírja az aktuális i-t => 0,1,2,3,....999
// event
class Szám{
    public delegate void EseménykezelőDelegate(string str);
    public event EseménykezelőDelegate Állapotváltozás;
    int szam;
    public int Szam{
        get{return szam;}
        set{szam=value;ÁllapotváltozásMetódus();}
    }
    private void ÁllapotváltozásMetódus(){
        if (Állapotváltozás !=null) Állapotváltozás("Megváltozott a mező")
    }
}
// class ba
static voi Eseménykezelés(string str){
    Console.WriteLine(str);
}
// main ba:
Szám sz =new Szám();  // szál példány
sz.Állapotváltozás += Eseménykezelés;  // feliratkoztunk az esemény kezelőre
sz.Szam=20;     // megváltozott a szám mező => meghívódott  ÁllapotváltozásMetódus => átadja a "Megváltozott a mező" értékét 
                // az Eseménykezelésnek ami egy stringet vár => kiírja hogy "Megváltozott a mező"
// 
class Szám{
    int a ;
    public override string toString(){return a.ToString()}
    public override bool Equals(object obj){        // egy objektumról megmondja hogy megeggyezik e az adott osztályal
        Szám sz = obj as Szám;                      // ha számtipusú az obj akkor át is konverátlja és sz lesz az obj
        if(sz!=null){                   
            if (sz.a==this.a)
            {
                return true;
            }else
            {
                return false;
            }
        }
    }
    public override int GetHashCode(){     // visszaad egy int-et  // id szerü, amiből visszalehet fejteni 
        return base.GetHashCode();         //hogy milyen osztály volt és milyenek voltak az értékei pl az "a"
    }
}
// mainba:
int a =11;
object b=a;         // becsomagoljuk
int c= (int)b;      // kibontjuk
//------------------------------------------------------------------------------------------------------------------
// generikus metódusok
static void Csere(ref int x,ref int y){
    int k =x;
    x=y;
    y=k;
}
static void Csere(ref string x,ref string y){
    string k =x;
    x=y;
    y=k;
} // igy mindig ujra másolgatni kéne
// de így nem => DE ez nem mindig jó, pl ha a összeadunk 2 intet vagy 2 stringet... ilyenkor a fordító szól.
static void Csere<T>(ref T int x,ref T y){
    T k =x;
    x=y;
    y=k;
}
// generikus osztály
class GenClass <T>{  // => így is lehet => class GenClass<T,U,K>{}
    T érték;
    public T Érték{
        set{érték=value;}
        get{return érték;}
    }
} // => így is lehet => 
class GenClass <T> where T: class{}  // itt megmondjuk hogy T csak class lehet! vagy bármi egyéb: interface stb.
// main:
genClass<string> genclassstr = new GenClass<string>();
genclassstr.Érték="alma";

class Tároló<T>{
    private T[] tárol;
    private int index=0;
    public Tároló(int kapacitás){
        tárol = new T[kapacitás];
    }
    public T Hozzáad{
        set{
            try{tárol[index++]=value;}  // először elkéri az indexet majd növeli
            catch (IndexOutOfRangeException)
            {               
                Console.WriteLine("Megtelt a tároló");
            }
        }
    }
    public T Lekér(int i){
        return tárol[i]
        }
}
// mainba:
Tároló<int> inttárol = new Tároló<int>(10);     // 10 a kapacitás
inttárol.Hozzáad = 32;  // hozzááadja a 32 est
inttárol.Lekér(0);      // visszaadja a 0. indexű elemet => 32 est

class Ős<T>{}
class Gyerek<T> : Ős<T>{}
class Unoka : Gyerek <string>{}  // az unoka már elveszti a generikusságát és cask stringre értelmezhető

class StatGen<T> {public static int szam;} // ha statikusra állítjuk 
// mainba:
StatGen<string>.szam=10;
StatGen<int>.szam;  // 0 lesz mert ilyenkor nem ugyanaz a 2, beállítás után WTF???
//------------------------------------------------------------------------------------------------------------------
// kivétel kezelés
int a=0;
try
{
    a = Int32.Parse(Console.ReadLine());                        // itt keletkezhet kivétel
    Console.WriteLine($"itt nem keletkezett kivétel");
    if(a==0)throw new ApplicationException("nem lehet 0");      // saját hibára dobás + az alapértelmezett e.Massage felülírása
}
catch(ApplicationException e){
    Console.WriteLine($"{e.Massage}");    // nem lehet 0
}
catch(FormatExeption){
    Console.WriteLine($"rossz bemenet");
}
catch(OverflowExeption){
    Console.WriteLine($"nem fért bele az intbe a szám");
}
catch (Exception e)  // így minden kivételt elkap
{
    Console.WriteLine($"HIBA: {e.Message}");
}
finally{  // MINDIG LEFUT, ha van kivétel, ha nincs akkor is
}
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
// fájlkezelés      // TXT
using System.IO;
// olvasás TXT
StreamReader olvas = new StreamReader("szoveg.txt",Encoding.Y);
string sor;
while(!olvas.EndOfStream){
sor=olvas.ReadLine();
}
olvas.Close();
// írás TXT                                                         // Y = kódolás
StreamWriter íras = new StreamWriter("fájlnév.txt",X,Encoding.Y);   // X = false => felülírás   // default
                                                                    // X = true  => hozzáfűzés
// ha elérési út is kell => new StreamWriter(@"c:\Users\mouni\fájlnév.txt",X);   // @ azért kell, hogy \n ne legyen új sor
írás.WriteLine("sor")
írás.Write("valami")
írás.Flush();           // puffer kiürísétése
íras.Close();
//------------------------------------------------------------------------------------------------------------------
// path, Directory, File
string fájl = @"C:\Users\mappa\példa.txt"
Path.GetDirectoryName(fájl);            // C:\Users\mappa
Path.GetFileName(fájl);                 // példa.txt
Path.GetFileNameWithoutExtension(fájl); // példa
Path.GetExtension(fájl);                // .txt

Directory.CreateDirectory(@"C:\mappa\képek\nyaralás\");  // minden mappát létrehoz ha nem létezik                                  
foreach (string item in Directory.GetDirectories(@"D:\alma\"))  // mappákat adja vissza  
{                                                               // alma mapában lévő összeset, elérési utakat is
    Console.WriteLine(item);                                    // D:\alma\zöld   D:\alma\piros  ...
}
Directory.GetFiles(@"D:\alma\");       // ugyanaz mint a GetDirectories csak ő a file-okat a kiterjesztéssel együtt
Directory.Exists(@"D:\alma\");         // létezik ez a mappa hogy?   D:\alma\
Directory.Delete(@"D:\alma\",X);       // X=true => mindenképp mindent töröl a mappába és a mappát is  X=false => csak akkor törli ha üres 
Directory.Move(@"D:\honnan",@"D:\hova"); // áthelyezés
static void KönyvtárVégigj(string mappa){
    if (Directory.Exists(mappa))
    {foreach (string item in Directory.CreateDirectory(mappa))
        {KönyvtárVégigj(item);}          // ki akarjuk írni az összes filet vagyis belemgyünk mindbe
        foreach (string item in Directory.GetFiles(mappa))
        {Console.WriteLine(item);}
    }
}

File.Exists(@"D:\alma\alma.exe");                       // mint a Directory
File.Move(@"D:\honnan\alma.exe",@"D:\hova\alma.exe");   // áthelyezés
File.Copy(@"D:\honnan\alma.exe",@"D:\hova\alma.exe");   // másolás
StreamWriter irás = File.AppendText(@"D:\alma\alma.txt"); // utolsó sorba ír, folytatja a file-t
StreamWriter irás = File.CreateText(@"D:\alma\alma.txt"); // létrehozza a file-t 
File.SetAttributes(@"D:\honnan\alma.exe",FileAttributes.) // a file attributumait lehet beállitani, olvasható, írható stb stb

string[] strT =File.ReadAllLines(@"D:\alma\alma.txt");// mindent beolvas tömbbe soronként
string str =File.ReadAllText(@"D:\alma\alma.txt");   // mindent beolvas, enterrel válassza el az uj sorokat
File.WriteAllLines(@"D:\alma\alma.txt",strT);        // felülírás
File.WriteAllText(@"D:\alma\alma.txt",str);          // mindig felülír

FileStream fs = new FileStream(@"D:\alma\alma.txt",FileMode.,FileAcces.,FileShare.); // FileMode: a módja, pl.: hozzáírás, felülírás stb.
StreamWriter sw =mew StreamWriter(fs);                                    // FileAcces: írás, olvasás, írás+olvasás
sw.Write("valami"); sw.Flush(); sw.Close(); fs.Close();                   // FileShare: egyéb más folyamatok hogy férhetnek hozzá

Environment.CurrentDirectory; // az aktuális könyvtárat adja vissza, ahol vunk C:\.......\Debug\
//------------------------------------------------------------------------------------------------------------------
// Bináris fájlok
FileStream fs = new FileStream(@"data.bin",FileMode.Create,FileAcces.Write);
BinaryWriter bw = new BinaryWriter(fs);
bw.Write("hello world");bw.Write(12); bw.Flush(); bw.Close(); fs.Close();
fs = new FileStream(@"data.bin",FileMode.Open,FileAcces.Read);
f.Seek(3,SeekOrigin.Begin);  // Előröl 3 BYTE sorozatot ugrik
f.Seek(3,SeekOrigin.End);    // hátulról 3 at
f.Seek(3,SeekOrigin.Current); // a jelenlegitől számitva 3 al késöbbire ugrik
f.Seek(-3,SeekOrigin.Current); // a jelenlegitől számitva 3 al elöbb ugrik
BinaryReader br = new BinaryReader(fs);
Console.WriteLine(br.ReadString()); // hello world
Console.WriteLine(br.ReadInt32());  // 12
// vagy:
while (br.PeekChar() != -1){} // addig olvassa amíg vége nincs a filenak
br.Close(); fs.Close();
//------------------------------------------------------------------------------------------------------------------
// Memóriába írunk
MemoryStream ms = new MemoryStream();  
StreamWriter sw =mew StreamWriter(ms);
sw.WriteLine(15);
sw.Flush();
FileStream fs = File.Create("memory.txt"); // it beleraktuk egy fileba amit beraktunk elöb a memoriába
ms.WriteTo(fs);
sw.Close(); ms.Close(); fs.Flush(); fs.Close();
//------------------------------------------------------------------------------------------------------------------
// XML olvasás
using System.Xml;
// jobb click a projektre => add => new item=> XML file => valami.xml
// mainba: xml olvasása
XmlReader xml_read = XmlReader.Create("valami.xml");
while(xml_read.Read()){
    switch (xml_read.NodeType)
    {
        case XmlNodeType.Element: 
            Console.Write($"<{xml_read.Name}>");
            break;
        case XmlNodeType.text:
            Console.Write(xml_read.Value);
            break;
        case XmlNodeType.EndElement:
            Console.Write($"</{xml_read.Name}>");
            break;
    }
    if(xnl_read["mennyiség"]!=null)
    {
        Console.Write(xml_read["mennyiség"]);
    }
}
xml_read.Close();
// xml írás
XmlTextWriter xml_writer = new XmlTextWriter("pelda.xml",Encoding.UTF8);
xml_writer.Formatting = Formatting.Indented; // tabulátoros igazítás
xml_writer.WriteStartDocument();
xml_writer.WriteComment("komment");
xml_writer.WriteStartElement("auto");
xml_writer.WriteAttributeString("év","4");
xml_writer.WriteElementString("kocsim","suv")
xml_writer.WriteEndElement();
xml_writer.Close();
//------------------------------------------------------------------------------------------------------------------
/* Random:          CONSTRUCTORS: Random(),	Random(Int32)  */
Random rnd = new Random();
int szám4_0= rnd.Next(0,111);
/*
METHODS:
Next()	                    Returns a non-negative random integer.
Next(Int32)	                0 <= Int < Int32.
Next(Int32, Int32)	        Int32 <= Int < Int32.
NextDouble()	            0.0 <= float <1.0.
Sample()	                0.0 < float <1.0.
*/
//------------------------------------------------------------------------------------------------------------------
// MATH:
Math.PI;          // 3.14
Math.E;           // 2.7

Math.Cos(0);       // 1   a bemenet radián
Math.Sin(Math.PI/6)//0.5
Math.Tan(Math.PI/4)//1
Math.Log(X);
Math.Log10(1000);  // 3

Math.Min(3, 33);  // 3 // csak 2 bemenet :(...
Math.Max(3, 33);  // 33 // csak intekre.. doublekra van másik..

Math.Abs(-3.5);   // 3.5
Math.Pow(4,2);    // 4^2=16
Math.Sqrt(64);    // 8

Math.Round(9.99);   // 10    egészre kerekítés
Math.Round(9.123,2);// 9.12  két tizedes jegyig
Math.Ceiling(12.6); // 13    felfele kerekít 
Math.Floor(12.6);   // 12    lefele
//------------------------------------------------------------------------------------------------------------------
// DateTime
DateTime dátum= new DateTime(2021,03,10);       // dátum létrehozása
DateTime idő = new DateTime(2021,3,10,14,4,45)  // év,hó,nap,óra,perc,mp
idő;                        // 2021. 3. 10. 14:04:45 
idő.ToShortDateString();    // 2021. 2. 10.
idő.ToShortTimeString();    // 14:04
idő.ToLongDateString();     // 2021. február 10., hétfő
idő.ToLongTimeString();     // 14:04:45

DateTime most = DateTime.Now;                   // év,hó,nap,óra,perc,mp
most.Month;                                     // hónap
DateTime egyevvelezelott=most.AddYears(-1);     // mounth stb..vel is
DateTime szülinap =DateTime.Parse("1999.07.23");// Date típussá parsolás
TimeSpan év =DateTime.Now-szülinap;             // 2 DateTime különbsége TimeSpan-t ad eredményül
év.TotalDays/365;          // az év az egy objektum, a TotalDays az eltelt napok száma => eredmény az életkor
//------------------------------------------------------------------------------------------------------------------





s_0.Contains('a') // s_0 tartalmazza e az 'a'-t?
char[] szoo = szotar[i].ToCharArray();   // stringet=>karakterek tömbjévé

adat.Split(':')




kosarak.Add(seged.Remove(seged.Length-1));    // segedet hozza adja, de törli az utsot belőle
kosarak[k].Contains(arucikk);
package java;
// források:
// hackerrank.com => menő feladatok
// codingame.com
// geeksforgeeks.org
// leetcode.com
// codesignal.com

// solo learning
// a 2 legjobb:
// codingBat.com
// codewars.com
// -----------------------------------------------------------------------------------------------------------------------
// cmd -ből =>
// cd C:\....\mappanév
// javac filenév.java // VAGY ha mappába akarjuk tenni => // javac -d mappanév
// filenév.java
// java filenév
// -----------------------------------------------------------------------------------------------------------------------
// objektum orientált programozás alapkoncepcióiű
// egységbe zárás => összetartozó részeket egy helyre írjuk => adatok amik
// tárolódnak + műveletek => pl év honap nap => dátum
// öröklődés
// polimorfizmus => sokalakúság
// absztrakció
// -----------------------------------------------------------------------------------------------------------------------
// gyorsbill
// ctr + space => segítség
// ctr + katt a fgv nevére => odaugrik ahol a fgv declarálva van
// ctr + shift + c => a kijelöltek kommentelése
// ctr + shift + f => auto format
// ctr + f11 => run
// sysou => ctr + space => System.out.println();
// Alt + fel/le => az adott sor mozgatása
// Alt + ctr + fel/le => az adott sor másolása
// ctr + shift + job/bal => kijelöli jobbra/ballra
// ctr + d => sor törlése
// alt + shift + m => egy logikai blokk rész kiszervezése fgv-é // szuper cucc
// ctr + balklikk => egy metódusra => odaugrik ahol definiálva van
// alt + bal/jobbra => visszaugrik/odaugrik
// alt + shift + r => egy változó átnevezése, mindenhol...
// alt + shift + a => több sor kijelölése és pl elé írni hogy private
// ctr + / => minden fgv becsukása
// alt + shift + i => inline olás vagyistöbb sor összevonása, a feleslegesek
// eltüntetése pl: x=new Y;return x; => return new Y;
// ctr + o => egy osztájnak az össze fgv-ei, az örököltek is
// ctr + alt + h => hol van használva a fgv , amire ezt megnyomtuk?
// alt + shift + l => a kijelölt részt kimenti egy változóba
// -----------------------------------------------------------------------------------------------------------------------
// debugolás // töréspont => duplaklikk a számra
// f11 // indítás
// f6 // 1 esével léptetés
// f5 // metódusba ugrik
// f7 // a metódus hívás helyére ugrik
// f8 // break pontig lépked
// breakpoints nál kilehet kapcsolni amit akarunk, vagy skip all breakpoints
// törésponthoz jobb klikk => breakpoint properties => pl feltételt adunk meg
// hogy mikor aktiválódjon a breakpoint
// -----------------------------------------------------------------------------------------------------------------------
// jobb klikk a class nevére => Source => add constuktor, getter, setter...
/**
 * ide a dokumentáció szintű kommentek kerülnek, a fgv. elé kell rakni
 */

// NINCS többszörös öröklés, csak 1 vkitöl örökölhet => public interface
// Classname{}
// class => nagybetűvel kezdődjön => IgyLegyen
// változó és fgv => kissbetűvel kezdődjön => igyLegyen
// konstans => csupa nagy betű => IGY_ELVÁLASZTVA

import java.util.Scanner; // input
import java.util.ArrayList; // az ilyen importálásokat automatice felajánlja csak katt az aláhúzásra
// -----------------------------------------------------------------------------------------------------------------------
Thread.sleep(1000L); // várakozik 1000ms-ot
long start=System.currentTimeMillis();// az akt idő
long end=System.currentTimeMillis();// az akt idő
System.out.println(end-start); // mennyi idő telt el?
// -----------------------------------------------------------------------------------------------------------------------
// Mindegyik(-)-tól (+)ig BYTE -128 -> +127 default(értékadás nélkül, mi van
// benne? CSAK CLASS-oknál)
byte by; // 1 0
short s; // 2 0
int i=2_000; // 4(-2Miliárd->2M) 0 2_000=2000 // a szemnek jobb, lehet így is
long l; // 8 0

float f=12.3f; // 4 0.0f
double d; // 8 0.0d

char c='c'; // 2 \u0000 // ascii értékeket vesz fel, ha inté alakítjuk => (int) c

boolean b=true; // false

// objektumok: String,Array // null
// -----------------------------------------------------------------------------------------------------------------------
// Scanner
System.out.print("Hello"); // nincs \n
System.out.println(1+1+"Hello "+1+1); // 2Hello 11

try(Scanner be=new Scanner(System.in)){// ha fgvbe akarunk a billentyűről bekérni,
fgv("bemenet1",be); // akkor a Scanner-t a mainbe kell deklarálni és
} // fgv-nek átkell adni paraméterként a "be" -t is
  // egyéb NEM Scanner kivételek kezelése a fgv-en belül KELL!!
Scanner be=new Scanner(System.in);int i_0=be.nextInt(); // int // hagy egy /n-t a végén
be.nextLine(); // /n beolvasása
double d_0=be.nextDouble(); // 3,45 BEMENETNÉL VESSZŐVEL KELL MEGADNI A TIZEDESPONTOT!!! // ez is =>
be.nextLine(); // ha ez nincs itt akkor egyből visszatér "" Stringel
String S_0=be.nextLine(); // String
int i=Integer.parseInt(be.nextLine()); // így nem kell
be.close();
// ------------------------------------------------------------------------------------------------------------------
// oerátorok:
// [] . () tömb elem hozzáférés, objektum tag hozzáférés, zárójel
// aritmetikai: + - * / % -- ++ ++a(műveleti sorrendbe a növelés a
// legelső,legerősebb, majd utánna jön minden más)
// = += -= *= /= %= a++(a leggyengébb műveleti jel, csak a legvégén növelődik)
// összehas: == != > < >= <= pl.: b=a++ => "b" 1 el kissebb mindig, mint az "a"
// b=++a => egyenlőek mindig
// bit: & | ^ << >> >>> ~ ~ === bitenkénti tagadás
// &= |= ^= <<= >>= >>>
// logikai: && || ! & | ^ && => rövidzár létezik, bal oldalról indul. & => nincs
// rövidzár, minden kif kiértékelődik
// ? : && elöbb értékelődik ki mint a ||
// () new kasztolás, obj létrehozás
// o1 instanceof o2 (o1 az o2 példánya?) o1 az o2 leszármazottja?
// -----------------------------------------------------------------------------------------------------------------------
// if(){}else if(){}else{} //c#
int day=2;switch(day){ // csak == összehasonlításra jó! ,lehet string is vagy bármi amit
                       // összehasonlítani tudunk
case 1:System.out.println("Monday");break; // ha nincs break akkor a belépési pont után minden végrehajtódik a break-ig
                                           // => mint a vízesés leesik a kód a break-ig
case 2:System.out.println("kedd");break;default: // elhagyható rész, ha nincs meccs..
System.out.println("egyéb ");break;}String sw_0=switch(day){ // java specifikus switch, értékadó switch, -> esetén
                                                             // automatice ott a break;
case 1->{
// ....
yield"hétfő"; // ugyanaz a szerepe mint a return, ha kifejezéseket írunk ide akkor ezzel
              // térünk vissza
};case 2:"kedd";break; // ilyenkor : esetén kell break
default->"passz";};

// while(){} do{}while() // true esetén maradunk
// for (int i = 0; i < 5; i++) {} // megkell adni az index típusát is
// for (típus elem : Array) {} // megkell adni az elem típusát is, CSAK
// OLVASÁSRA // fore ctr + space

// break(kilép), countinue(elejére ugrik)
cimke1:for(int i=0;i<5;i++){cimke2:for(int i=0;i<5;i++){// lehet így is
if(){continue cimke1;} // ugyanaz mint c# ban a => goto cimke1
}}// vagy
break cimke1; // kilép a külső ciklusból (és persze a belsőböl is)
// -----------------------------------------------------------------------------------------------------------------------
// KOnvertálás, kasztolás:
// kissebtől nagyobbig automatice: byte->short->char->int->long->float->double

// (mivé) mit: double->float->long->int->char->short->byte
// levágja a tizedesjegyeket => lefele kerekít!!!
int i=(int)d;

// int => String (bármi más primitív, hasonlóan) primitív => String
String S_0=""+5; // "5"
Integer.toString(5); // "5"
String.valueOf(5); // primitív => String <=> // return (obj == null) ? "null" : obj.toString();
// Integer => String (bármi más primitív objektumai, hasonlóan)
Integer I_0=5;I_0.toString(); // "5"

// String => int (bármi más primitív, hasonlóan) String => primitív
Integer.parseInt("5");
// String => Integer (bármi más primitív objektumai, hasonlóan)
Integer.valueOf("5");
// -----------------------------------------------------------------------------------------------------------------------
// Csomagolók: Integer, Character, Double ...
Integer I_0; // inmutabilis => gyorsítótárazza a sokat használt számtartományokat
int i_0;
// Integer => int
I_0=i_0; // becsomagoljuk, objektummá // === I_0 = Integer.valueOf(i);
// int => Integer
i_0=I_0; // kicsomagolás // === i_0 = I_0.intValue();

Character C_0='c'; // C_0 egy objektum!! és a nem objektum char primítív között tudnak váltani pl:
char c='c';test(c); // meghívható így
public static void test(Character c){System.out.println(c);}Integer a=2;Integer b1=a;a++; // ITT Értéket adunk át!!!
                                                                                          // normális objektumoknál a
                                                                                          // mutatót adjuk át DE ITT NEM
System.out.print(a+""+b1+a.intValue()); // 323 // objektum => van sok fgv-e
// -----------------------------------------------------------------------------------------------------------------------
// String OBJEKTUM INMUTABLE(megváltoztathatatlan)
// \' => ' \" => " \\ => \
// \n New Line \r Carriage Return \t Tab \b Backspace \f Form Feed
String S_0="Hello World"; // így a StringPool ba rakja
String S_1=S_0; // nem a mutatót adjuk át hanem az értéket !!!
String S_2=new String("hello"); // így SE mutatót adunk át! DE vigyázat kövi sorok =>
String S_3=new String("hello"); //
String S_3=new String(new char[]{'H','e','l','l','o',' ','W','o','r','l','d'}); // ez történik a háttérben
S_3==S_2; // false => az egyenlőséget vizsgálja hogy a 2 objektum ugyanaz e..
S_3.equals(S_2); // true => értékét
S_1==S_0; // true => itt viszont a String speciális tulajdonsága miatt lesz egyenlő
S_1.equals(S_0); // true => felül lehet írni overrideal

// return ÚJ!!! String
S_0.toUpperCase(); // "HELLO WORLD"
S_0.toLowerCase(); // "hello world"
// S_0.replace('l', 'p'); // cserél minden karaktert
// S_0.replace("mit","mire"); // cserél mindent
S_0.replaceAll("mit","mire"); // cserél mindent // reguláris kifejezést IS lehet megadni
S_0.replaceFirst("mit","mire"); // első találatot // reguláris kifejezést IS lehet megadni
S_0.trim(); // white spacek-törlése előröl és a végéről
S_0.substring(2,6); // visszaadja a [2 3 4 5] indexü elemeket S_0.substring(inclusive,exclusive);
S_0.substring(2); // visszaadja a [2 től a végéig mindet
S_0.repeat(3); // "Hello WorldHello WorldHello World"

// return int
S_0.length(); // hossz
S_0.indexOf("world"); // 6 => ha nincs találat => return -1
S_0.lastIndexOf("planet"); // hátulról keresi
S_0.compareTo(S_1); // sorbarendezéshez => egyezőek => 0, negatív => S_0 elöbb van(abc), pozitív =>
                    // S_0 hátrébb van(abc)
S_0.compareToIgnoreCase(S_1); // -||- kis-nagy betű nem számít..

// return char
S_0.charAt(10); // 10. indexű helyen mi van?

// return boolean
S_0.matches("H[a-z]+\\s"); // illeszkedik e rá? => egy szabájnak megfelel e? => megeggyezik e? reguláris
                           // kifejezés
S_0.equals(S_1); // megegyeznek e? objektum is lehet
S_0.equalsIgnoreCase(S_1); //
S_0.contentEquals(S_1); // karakter szekvencia
S_0.contains("mi"); // tartalmazza-e a "mi" -t?
S_0.startsWith("hee");S_0.endsWith("llo"); // "loo" ra végződik a S_0?
S_0.isEmpty(); // ""=> true S_0 üres? S_0.length()==0 ?
S_0.isBlank(); // " "=> true S_0 csak whitespacekből áll? S_0.trim().isEmpty() ?

// return array
S_0.split(" ");S_0.split("[-_]"); // így mind2 karakterre splitel, reguláris kifejezést is lehet adni
S_0.toCharArray(); // Stringnek a karakter tömbé alakítása

// Egyéb
// objekt => String
Arrays.toString(A_1); // ["béla","béla2"] visszaadja a tömb összes elemét String formába, célszerű
                      // felülírni
// return ÚJ!!! String
S_0.copyValueOf(char[]data,int start,int db); // egy char tömbből összerak Stringet data[start]-tól 5 db-ot
// -----------------------------------------------------------------------------------------------------------------------
// StringBuilder // a Stringek összefüzése + jellel ezt csinálja a háttérbe //
// nem szál biztos => gyorsabb
// a Stringek MUTABILIS társ osztája
StringBuilder sb=new StringBuilder(); // => 16 elemű
StringBuilder sb=new StringBuilder(100); // => 100 elemű
StringBuilder sb=new StringBuilder("hello"); // String => StringBuilder
sb.lenght(); // 5 // "az értékes karakterek" hossza // 100 méretű üresnek => 0
sb.append("1, "); // erősen overload olt sok féle bemenete is lehet
sb.append("2, ").append("3");sb.delete(0,1); // törli a 0. indexű elemtől az 1-1 edik elemig az elemeket //
                                             // sb.delete(inclusive,exclusive);
sb.insert(0,"4"); // 0. indexre beszúrjuk a 4 est, többit ami van, toljuk jobbra
sb.charAt(0); // 4 // 0. indexű helyen mi van?
sb.setCharAt(1,'.');// 4. 2, 3 // karakter felülírása
sb.indexOf("4"); // 0 // hol van a 4 es?
sb.lastIndexOf("4");// 0
sb.replace(0,4,"5") // 5. 3 // sb.replace(inclusive,exclusive,"mit")
sb.substring(2,4); // 5. // return " 3" // KIVÁGJA és visszaadja a kivágott részt egy String
                   // objektumként
// sb.substring(2); // 2 indextől az összeset kivágja
sb.reverse(); // .5 // megfordítja
sb.toString(); // Stringé alakít
// sb.equals(sb2); // NEMJÓ CSAK Stringekre MŰKÖDIK
// -----------------------------------------------------------------------------------------------------------------------
// StringBuffer ugyanaz mint a StringBuilder CSAK EZ synchronized => szál biztos
// => lassabb
// -----------------------------------------------------------------------------------------------------------------------
// StringPool
String S_0="Hello World"; // így létrehoz egy új objektumot és azt a StringPool ba rakja
String S_1="Hello World"; // nem hoz létre új objektumot mert már létezik, visszaadja a Pool-ban lévő
                          // mutatót =>
S_1==S_0; // ezért true

// -----------------------------------------------------------------------------------------------------------------------
// Character
Character.isLetter('c'); // true, ha abc
Character.isDigit('c'); // true ha szám
// -----------------------------------------------------------------------------------------------------------------------
// Object // mit öröklünk töle?
Object o1=new Object();o1.hashCode(); // az objektum azonosító száma
o1.getClass(); // osztáj nevét adja vissza
if(o1 instanceof Classnév) // o1 Classnév példánya?
o1.toString(); // stringé alakítja, CÉLSzerű ezt override-olni a mi objektumunkba
o1.equals(" "); // o1 értéke egyenlő e " " ? mivel az == azt vizsgálja hogy ugyanaz a mutatója e

// Sorba rendezés
// JOBB MO: a classunkba létrehozunk egy új Comparator -t
public static Comparator<Ember>Komparatorneve=new Comparator<Ember>(){@Override public int compare(Ember o1,Ember o2){String o1name=o1.getName();String o2name=o2.getName();

return o1name.compareTo(o2name); // növekvő
// return o2name.compareTo(o1name); // csökkenő
}
// mainba:
L_0.sort(Ember.Komparatorneve); // => ugye statikus és azért meghívható így, példány nélkül

// számok:
public static Comparator<Ember>Komparatorneveint=new Comparator<Ember>(){@Override public int compare(Ember o1,Ember o2){int o1kor=o1.getAge();int o2kor=o2.getAge();

return Integer.compare(o1kor,o2kor); // növekvő
// return Integer.compare(o2kor,o1kor); // csökkenő
}L_0.sort(Ember.Komparatorneveint); // => ugye statikus és azért meghívható így, példány nélkül

// VAGY lambdás sortolás:
L_0.sort((p1,p2)->p1.getAge()-p2.getAge()); // növekvő
L_0.sort((o1,o2)->o1.getName().compareTo(o2.getName()));

// -----------------------------------------------------------------------------------------------------------------------
// Array
// ha törölsz belőle elemet akkor az null értékű lesz // lehet több dimenziós
// String tömböknél a referenciákat tároljuk a Stringekről, primitíveknél az
// értékeit tároljuk a tömbben
// ha objektumokat, struktura elemeket akarunk beletenni, bármilyen array-be
// struct helyett => static class Név{privat int a; + getter + setter +
// konstruktor}
// + mindig létrekell hozni egy uj példányt amit belerakunk a tömbbe => Név[]
// n_tomb = new Név[10]; Név n1= new Név(X); n_tomb[0]=n1;
int[]A_0=new int[2]; // default értéke => {0, 0}
String[]A_1=new String[]{"béla","béla2"};String[]A_3={"valami","valami2"};

A_0.lenght;Arrays.toString(A_1); // ["béla","béla2"] visszaadja a tömb összes elemét String formába

// több D tömb
String[][]A_0_2D_2={{"béla","béla2"},{"jani"}};int[][]A_0_2D_0=new int[4][6];int[][]A_0_2D_1=new int[2][];int[]A_4=new int[10]; // lehet
                                                                                                                                // az
                                                                                                                                // oszlopok
                                                                                                                                // mérete
                                                                                                                                // más
int[]A_5=new int[13];A_0_2D_1[0]=A_4;A_0_2D_1[1]=A_5;

Arrays.fill(A_0,1); // A_0 feltöltése 1 esekkel

// array => Lista
List<String>L_0=Arrays.asList(A_1);
// -----------------------------------------------------------------------------------------------------------------------
// Lista // nem tud tárolni primitíveket!!! csak objektumokat // nem lehet több
// dimenziós
// ha objektumot tárolunk => annak gyerekeit is tárolhatjuk benne. DE szülő
// formájában!!!
// DE ha kinyertük az elemet => kasztolással átalakíthatjuk a gyerekké => így
// elérhető a gyerek metódusai is
List<Szülő>L_0=new ArrayList<Szülő>();Gyerek GY_1=new Gyerek();L_0.add(GY_1);Gyerek GY_2=(Gyerek)L_0.get(0);

List<Object>L_1=new ArrayList<Object>(); // így mindent tárolhatunk benne
List<Integer>L_2=new ArrayList<Integer>(); // OBJEKTUMOKAT CSAK
List<String>L_0=new ArrayList<String>();L_0.size(); // a mérete
L_0.get(0); // a 0. indexű elemet adja vissza
L_0.set(0,"Opel"); // 0. indexűt megváltoztatja
L_0.indexOf("elso");// hányadik indexű elem?
L_0.add("elso");L_0.remove(2); // 2. indexűt törli => a többi csúszik odébb
L_0.isEmpty(); // üres?
L_0.clear(); // L_0 törlése

Collections.sort(L_0); // növekvő/abc rendezés
L_0.sort((a,b)->a-b); // VAGY
L_0.sort((a,b)->a.compareTo(b));System.arraycopy(L_0_honnan,0,L_1_hova,0,L_0_honnan.length); // beépített tömb átmásoló
                                                                                             // metódus=>
// honnan, honnan kezdő indexe, hova, hova kezdő indexe, mennyi elemet?

// int array-> Integer Array v. List
int[]data={1,2,3,4,5,6,7,8,9,10};

Integer[]A_1=Arrays.stream(data).boxed().toArray(Integer[]::new);
// Integer[] A_2 = IntStream.of( data ).boxed().toArray( Integer[]::new );

List<Integer>L_1=Arrays.stream(data).boxed().collect(Collectors.toList());
// List<Integer> L_2 = IntStream.of( data ).boxed().collect( Collectors.toList()
// );
// -----------------------------------------------------------------------------------------------------------------------
// láncolt lista // törlés hozzáadás gyorsabb mint ArrayListnél, de a keresés
// lassabb
List<String>L_0=new LinkedList<String>();

L_0.add("mit");L_0.addFirst("mit");L_0.addLast("mit");L_0.removeFirst();L_0.removeLast();L_0.getFirst();L_0.getLast();
// -----------------------------------------------------------------------------------------------------------------------
// iterátor // ArrayList + LinkedList nél IS működik
Iterator<Integer>it=L_0.iterator(); // int-típusra mutató létrehozása az L_0 ra
while(it.hasNext()){// amig van kövi elem..
int akt=it.next(); // ő az aktuális elem
if(akt==10){it.remove(); // törli azt az elemet amire épp mutat,=> vagyis az összes 10 es értékűt törölni
                         // fogja
}}
// -----------------------------------------------------------------------------------------------------------------------
// szótár // lehet => String/Integer vagy bármi más kombó
Map<String,String>H_0=new HashMap<String,String>();H_0.size();H_0.put("USA","Washington DC");H_0.put("USA","asd DC"); // csak
                                                                                                                      // ez
                                                                                                                      // lesz
                                                                                                                      // benne
                                                                                                                      // másikat
                                                                                                                      // felülírja
H_0.get("USA"); // "asd DC" // visszaadja
H_0.remove("England"); // kulcsa alapján töröl
H_0.clear();H_0.keySet() // kulcsai, ha foreach el akarunk végigmenni rajta...=> mind2 őn is ezzel kell
                         // for-olni
H_0.values() // értékein
H_0.replace("mit","mire") // értékét

// vagy körüljárás
Iterator it=H_0.entrySet().iterator();while(it.hasNext()){Map.Entry p=(Map.Entry)it.next();System.out.println(p.getKey()+":"p.getValue());if(p.getValue().equals("valami")){it.remove(); // törlés
}}
// a belerakás sorrendje számít:
Map<String,String>H_0=new LinkedHashMap<String,String>();
// -----------------------------------------------------------------------------------------------------------------------
// halmaz
Set<String>H_0=new HashSet<String>();H_0.size();H_0.add("BMW"); // belerakja
H_0.contains("Mazda"); // tartalmazza e?
H_0.remove("Volvo"); // törli
H_0.clear();

// Lista => halmaz
Set<String>H_1=new HashSet<String>(L_0); // int tömböt nem tud fogadni CSAK Integer tömböt

// megőrzi a sorrendet, ahogy betettük
Set<String>H_0=new LinkedHashSet<String>(L_0);
// -----------------------------------------------------------------------------------------------------------------------
// sor
Queue<String>qu=PriorityQueue<>(); // ABC be kerülnek bele
qu.offer("bbb"); // betettük
qu.offer("aaa"); // betettük
qu.offer("ccc"); // betettük
qu.peek(); // az első elem lekérdezése => ABC be a legelső
qu.poll(); // kivesszük az elsőt, marad => bbb,ccc
qu.poll(); // marad => ccc
Queue<String>qu=LinkedList<>(); // itt a sorrend számít az megy ki aki elöb => akit először leraktunk
Queue<String>qu=PriorityQueue<>((a,b)->a.length()-b.length()); // ABC helyett a hosz alapján rakja sorba
// -----------------------------------------------------------------------------------------------------------------------
// stack verem
Stack<String>st=new Stack<String>();st.push("béla"); // vagy st.add("béla");
st.pop(); // utoljára betett elemet kiszedi
// -----------------------------------------------------------------------------------------------------------------------
// Enum // fordítás idejű konstansok, felsorolás típus // nagy betűk

public enum Iranyok{UP,DOWN,RIGHT,LEFT} // => ekvivalens
public class Iranyok{public static final Iranyok UP=new Iranyok();public static final Iranyok DOWN=new Iranyok();public static final Iranyok RIGHT=new Iranyok();public static final Iranyok LEFT=new Iranyok();private Iranyok(){}} // csak
                                                                                                                                                                                                                                     // itt
                                                                                                                                                                                                                                     // hívható
                                                                                                                                                                                                                                     // meg
                                                                                                                                                                                                                                     // =>
                                                                                                                                                                                                                                     // csak
                                                                                                                                                                                                                                     // ez
                                                                                                                                                                                                                                     // a
                                                                                                                                                                                                                                     // 4
                                                                                                                                                                                                                                     // Iranyok
                                                                                                                                                                                                                                     // fog
                                                                                                                                                                                                                                     // létrejönni

public enum Orszagok{HUNGARY("Budapest",93036,9893899),GERMANY("Berlin",357168,80716000),SPAIN("Madrid",505990,46464053){@Override public int getArea(){return 0;} // így
                                                                                                                                                                   // felülirtuk
                                                                                                                                                                   // CSAK
                                                                                                                                                                   // a
                                                                                                                                                                   // SPAIN-nak
};
// lehetnek metódusai.. , konstruktor, getter
private final String capitalTown;private final int area;private final int population;private Orszagok(String ct,int area,int population) // privátnak
                                                                                                                                         // kell
                                                                                                                                         // lennie
                                                                                                                                         // mert
                                                                                                                                         // konstans,
                                                                                                                                         // kívülről
                                                                                                                                         // ne
                                                                                                                                         // legyen
                                                                                                                                         // meghívható
{this.capitalTown=ct;this.area=area;this.population=population;}public String getCapitalTown(){return this.capitalTown;} // getterek
public int getArea(){return this.area;}public int getPopulation(){return this.population;}public int getDensity(){return this.population/this.area;}}

// main
System.out.println(Orszagok.SPAIN.getArea()); // 0, mert felül van írva
Orszagok akt=Orszagok.SPAIN; // változónak adás
System.out.println(akt.getArea()); // 0
Orszagok[]mind=Orszagok.values(); // visszaadja tömbben az enum összes értékét
System.out.println(mind[2]); // SPAIN
// -----------------------------------------------------------------------------------------------------------------------
// MATH + Random
Math.max(5,10); // 10
Math.min(5,10); // 5
Math.sqrt(64); // 8
Math.pow(5,2); // 25
Math.abs(-4.7); // 4.7
Math.round(x); // kerekít
Math.ceil(x); // fel kerekít
Math.floor(x); // le kerekít
Math.random(); // 0 <= x < 1
int x=(int)(Math.random()*A_0.lenght); // 0 <= x < A_0.lenght (random tömb index generátor)

// vagy
Random random_2=new Random();random_2.nextInt(); // -2miliárd->2miliárd
random_2.nextInt(X); // 0 <= random_2 < X
// -----------------------------------------------------------------------------------------------------------------------
// fgv // primitívek átadása mindig érték alapján // objektumok cím szerint,
// (kivétel String, ő speciális => érték)
public static void fgv(){return};
// lambda (parameter1, parameter2) -> { code block } // pl.:

public interface StringFunction{public String run(String s);}StringFunction fgv_1=(s)->s+"!";public static void printFormatted(String str,StringFunction fgv){String eredmeny=fgv.run(str);System.out.println(eredmeny);}printFormatted("Hello",fgv_1);

ArrayList<Integer>L_1=new ArrayList<Integer>();L_1.add(5);L_1.add(9);L_1.add(8);L_1.add(1);L_1.forEach((n)->{System.out.println(n);});
// -----------
// Lambda
@FunctionalInterface // csak 1 db metódusa lehet, MERT ha több lenne akkor nem működni a lambdás
                     // megoldás, mert akor a labdába is kéne defiiálni
public interface Growl{public void growling();}
// interfész ami definiálha, fgv neve = (bemeneti paraméterek)->{a kód...};
Growl growling=()->{System.out.println("grrrr")};
// most átadhatom egy olyan fgvnek ami majd használni akarja,pl ö:
public void csinaljValamit(Grow a){a.growling();}
// majd meghívhatjuk =>
csinaljValamit(growling);
// 1 fontos különbség => A lambda fgv-nél Bent a fgvben használt a this szó a
// külső környezetre(class-ra) mutat,
// nem magára, mert ő csak egy fgv lesz // ha lambda nélkül valósítjuk meg =>
csinaljvalamit(new Growl(){@Override public void growling(){
// this.. // az itt lévő this a Growl objektumra fog mutatni
}})
// -----------
// Arraylist végigjárás lambdával:
L_0.forEach(s->System.out.println(s)); // kiírja sorba(index szerint) a lista összes elemét
L_0.forEach(s->System.out.println(s.getName())); // kiírja sorba(index szerint) a lista összes elemének csak a nevét

// map filter reduce
<Integer>L_0=List Array.asList(A_0); // -1 Array -> List
Stream<Integer>S_0=L_0.stream(); // 1 List -> Stream
// Stream<Integer> S_0=Arrays.stream(A_0) // 1 Array -> Stream
Stream<Integer>S_0_0=S_0.map(s->s*2); // 2 map
.filter(s->s>4);Integer[]A_0_0=S_0_0.toArray(Integer[]::new); // -> Array
.collect(Collectors.toList()); // -> List

int sum=.reduce(0,(a,b)->a+b); // int-el v stringel tér vissza
// .reduce(START érték,(görgetettÖsszeg,értékek)-> fgv);

.forEach(System.out::prinln);
// -----------------------------------------------------------------------------------------------------------------------
// package = hu.ak_akademia.demo //csupa kis betűk . al elválasztva a szinteekt
// === hu mappába ak_akademia mappába demo mappa
// ide kell class-t létrehozni
{{{
// -----------------------------------------------------------------------------------------------------------------------
// kulcsszavak
static // osztály =>
       // fgv => példányosítása nélkül meghívható => "new" rész nem kell !!!
       // változó => osztoznak rajta a klassz példányai => a class minden példányának
       // ugyanannyi ezen változó értéke
final // osztály => Az osztálylánc utolsó tagja lesz
      // fgv => nem lehet örökölni ezt a fgv-t
      // változó => nem változtatható, nem felülírható => inmutable lesz

public // mindenki számára elérhető
protected // classon belül + leszármazottainak elérhető
private // csak a classon belül elérhető
semmi // package-private

this // => az objektumra mutat

public abstract class Human{...} // nem példányosítható!! csak a gyerekei => Human első = new Human(); NEM
                                 // működik

public interface X{} // interfaceket implementálunk, itt csak nyilvántartásba van véve a metódus =>
                     // metódusoknak nincs body-ja {EZ a body}
                     // + lehet még static változó és static metódus is amit nem kell implementálni
                     // az "Y" classba
public class Y implements X{} // így játszuk azt körbe hogy csak 1 vkitöl örökölhetünk, tőle vehetünk át fgv
                              // eket
                              // és bármennyi lehet,DE override-olni kell és elkészíteni

super(); // a szülő konstruktorát hívja meg => első parancs!!!
super(x,y,z);super.; // a szülő dolgai
super.fgv();

Nő extends Ember; // a Nő örökli az Ember tulajdonságait

public synchronized void add(){} // egyszerre csak 1 száll használhatja
private volatile boolean futás=true; // volatile jelentése: egy máik szál modosíthatja
// -----------------------------------------------------------------------------------------------------------------------
// Class
public class Human{private String name="Gyula"; // default érték beállítása + private hogy Ne közvetlenül férjünk hozzá
                                                // ha nincs ott a private => defaultan public
public Human(String name){ // konstruktor
this.setName(name);}public Human(){ // konstruktor
this.setName("Gyula"); // automatice gyula, ha nincs name érték a () között , akokr ez fut le
}public Human(String name,int kor){ // konstruktor // túl töltés...mert 3x megírtuk ugyanazt, 3 különbözű
                                    // bemenetekre
this.setName(name);this.setKor(kor); // ha több konsatruktor van akkor több féleképp hívhatom meg
}public Human(Human másik){ // konstruktor
this(másik.getName()); // explicit, igy is lehet
}

public void Kiír(){System.out.println("Az én nevem"+name);} // this => az objektumra mutat
public String getName(){return this.name;} // azért kell set és get => hogy Ne közvetlenül férjünk hozzá =>
public void setName(String be){this.name=be;} // azért mert ha késöbb változtatjuk a classt pl. 3 változót összevonunk
                                              // 1-é
                                              // akkor mindenhol máshol is átkéne változtatni, ha get,set elünk akkor
public void kiáltás(){ // mindig azt fogja visszaadni amit először akartunk
System.out.println("áááá") // egyéb metódusok
}}
// mainbe
Human első=new Human();Human első_1=new Human("jani"); // mivel 3 konstruktora van így meghívhatjuk 3 különböző féle
                                                       // képp => ez az overloading
Human első_2=new Human("béla",20);első.name; // name értéke DE mivel private ezért nem férünk így hozzá
első.Kiír(); // meghívja a fgvnt
első.getName(); // így kérjük ki a nevet
első.setName("béla");System.out.println(első.getName()==null?"üres":"nem üres, az értéke"+első.getName());

// polimorfizmus a nő megkap minden Ember tulajdonságot is így, vis a szűlője az
// ember
public class Nő extends Ember implements Kicsi{public Nő(){super(); // az Ember konstruktorát hívja meg, de ezt is
                                                                    // túltölthetjük
}public Nő(String name){super(name);}@Override public void kiáltás(){System.out.println("miáú")}} // felülírtuk az
                                                                                                  // emberben levőt
@Override public void sit(); // az interface eket MINDIG override olni kell
//
// LÉNYEG: a meghívás pillanatába mondjuk meg hogy mit csináljon az interface
// fgv-e
interface Üzenet{String greet()} // az interface
class MyClass{public void üzenetKiÍrása(Üzenet m){ // a Classunkba egy fgv, ami az interface-t várja, majd meghívja az
                                                   // interface fgv-ét
System.out.println(m.greet());}public static void Elsoproject(string args[]){MyClass o=new MyClass();o.üzenetKiÍrása(new Üzenet(){ // azt
                                                                                                                                   // a
                                                                                                                                   // fgv-t
                                                                                                                                   // meghívjuk
                                                                                                                                   // egy
                                                                                                                                   // uj
                                                                                                                                   // interface-el
public String greet(){return"Hello";}}) // és definiáljuk az interface fgv-ét paraméterként
}}
// HA class1-ba van egy private class2 => class1 on kívül nem érhető el a
// class2. hogy érjük el mégis? =>
// legyen a class1-ben egy public fgv1. ami példányosítja, majd meghívja => így
// már a fgv1 en keresztül kívülről is elérjük

Human ember=new Nő(); // a Nő-nek a metódusai fognak érvényesülni , ha van override-olt
                      // létrehoz egy Nő-t DE a mutató ember típúsú, vagyis amelyik metódus nem
                      // létezik a Human-ba
                      // azt nem fogjuk látni, csak az override olt metódusokat és a maradék Human fgv
                      // eit
ember=new Férfi(); // UTÁNNA rátudunk mutatni vele egy Férfi típusra is .
                   // arra törexünk, hogy minél magasabb szinten hozzunk létre változókat,
Human[]tomb=new Human[3]; // minél általánosabban, minél közelebb az Objekt oszájhoz
ember2=new Nő(); // azért mert ha késöbb majd egyszer létrehozunk új osztájokat, pl
                 // Transzvesztita, akkor
tomb[0]=ember; // az eddig megírt programunkba ahol eddig nőket és férfiakat , emberként
               // tároltuk
tomb[1]=ember2; // letudja kezelni azt Transzvesztitákra is (pl.:egy Human tömbbe tároljuk a
                // vevőket, Nőket, férfiakat)
// -----------------------------------------------------------------------------------------------------------------------
// objektum
Nő n_1=new Nő();Nő n_2=new Nő();n_1.equals(n_2); // false egyenlő e a 2 objektum, vis ugyanaz e? ugyanarra mutat e?
n_1==n_2; // false ez is...

// -----------------------------------------------------------------------------------------------------------------------
public interface Kicsi{ // csak abstract public metódusokat tartalmaz
public abstract void sit(); // amit nem muszáj kiírni => automatice az lesz
void eat();}Kicsi[]tomb={new Nő(),new Férfi()}; // lehet ilyet is, mint a szülős elv, csak azok a fgv ek látszanak
                                                // az ilyen uj elemeken, amik definiálva vannak a Kicsi interface-n
public static void fgv(Kicsi x){} // megmondhatom, hogy a fgv olyan paramétert várjon aki implementálta a Kicsi
                                  // interfacet
// -----------------------------------------------------------------------------------------------------------------------
// abstract osztály
public abstract class Dog implements Kicsi{ // nem lehet Dog példányt létrehozni
@Override public void sit(){ // nem muszáj mindent megvalósítani ami a Kicsi-be benne van
System.out.println("a kutya ül");}} // => aki kiterjeszti a Dog osztájt annak muszáj megvalósitania az eat()
                                    // metódust
public class Tacsko extends Dog{ // ami abba az interfacebe lett definiálva amit a Dog abstract Class használ
public void eat(){System.out.println("a kutya eszik");}} // a Tacsko-t lehet példányosítani

// -----------------------------------------------------------------------------------------------------------------------
// File kezelés
File f=new File("adatok.txt");

while(be.hasNextLine()) // az olvasáshoz

PrintWriter ki=new PrintWriter(f);ki.println("valami");ki.flush();ki.close();Scanner be=new Scanner(f);String S_1=be.nextLine();int i_0=be.nextInt();be.close();

FileOutputStream fos=new FileOutputStream("adatok.txt");fos.write(65); // "a"-t beleírja = 65
fos.flush();fos.close();FileOutputStream fost=new FileOutputStream("adatok.txt"); // FileOutputStream fost = new
                                                                                  // FileOutputStream("adatok.txt");
byte a[]="dsadsad".getBytes(); // BufferedOutputStream bout = new BufferedOutputStream(fost);
fost.write(a); // szöveg esetén // byte a[]="dsadsad".getBytes();
fost.flush(); // bout.write(a);
fost.close(); // bout.flush();bout.close();fost.close();
FileInputStream fis=new FileInputStream("adatok.txt");int i=fis.read();fis.close();FileInputStream fist=new FileInputStream("adatok.txt"); // FileInputStream
                                                                                                                                           // fist=
                                                                                                                                           // new
                                                                                                                                           // FileInputStream("adatok.txt");
int i=0;String s=""; // BufferedInputStream bis = new BufferedInputStream(fost);
while((i=fist.read())!=-1){s+=(char)i;} // int i = 0;String s=""; while((i=bis.read())!=-1){s+=(char)i;} fist.close();
fist.close();
// -----------------------------------------------------------------------------------------------------------------------
// kivételkezelés // try catch finally //
// https://www.youtube.com/watch?v=InU2TExFAHs&list=PL1WwhU4dv6tG8C8aGca5IxZliVTjvtweh&index=60
// olyankor kell használni amikor pl van egy fgv ünk ami visszatér egy int el,
// és vannak speciális esetek
// amiket lekéne kezelni if-ágakkal, speciális visszatérési értékekkel, =>
// lekéne map-elni speciális kimenetekkel
// => ez a map elés nem jó mert, rosz az ovlashatósága és x idő mulva
// elfelejtjük és dekódolnunk kell ujra és ujra
// => helyette a speciális eseteknél dobunk saját definiált kivételeket
// interface ek fgv ein definiálhatjuk a => throws SAJÁTKIVÉTEL -t
try{
// próbáld meg ezt végrehajtani
}catch(Exception e){ // hiba típusa és beceneve
// hiba esetén mi történjen
} // finally{} // mindenképp lefut // VIGYÁZNI KELL HOGY ITT NE dobódjon kivétel
  // mert a kiváltó hibát ami a catch vagy a try blokkba vannak eltakarhatja
  // a finally megelőzi a returnt, hiába van a tryba a return
// vagy egy feljebbi szintre dobjuk a hibát, de a feljebbi szinten körbe kell
// venni try catch-el
public static void main(String[]args)throws FileNotFoundException{}

File file=new File("C://file.txt");FileReader olvas=null;try{olvas=new FileReader(file);}catch(FileNotFoundException e){ // ha
                                                                                                                         // nem
                                                                                                                         // találja
                                                                                                                         // a
                                                                                                                         // fájlt.
System.out.println(e.toString());} // finally {
if(olvas!=null){olvas.close();} // mindig bekell zárni az erőforrásokat
// }
private void test()throws FileNotFoundException{File file=new File("C://file.txt"); // ha a fgvt így throw-oljuk akkor a
                                                                                    // problémát 1 el feljebbre küldjük
                                                                                    // =>
FileReader olvas=new FileReader(file); // ahol meghívjuk azt kell körülvenni a try, catch blockkal
}
// vagy
File file=new File("C://file.txt");try(FileReader olvas=new FileReader(file)){
// itt használjuk az olvas-t
} // így nem kell se catch és se finally block, a fájl hibákat így lekezeli
// + autoclose, vagyis magától bezárja a file-t + mi is ha csinálunk saját
// closeble osztájt
// => más kivételeket LEKELL kezelni

// Exception => ellenörzött kivétel => a fordító szól
// RuntimeException => nem ellenőrzött kivétel => csak futási időbe derül ki =>
// az Exception leszármazottja
// Ellenörzött kivétel pl: Thread.sleep(10_000L); 10_000 secundumot vár =>
// lekell kezelni vagy feljebbi szintre kell dobni

// Saját kivétel osztály:
static void fgv(int x)throws InvalidDayException{if(x<1||x>7){throw new DayOutOfBoundsException("a nap kívül esik az érvényes tartományon");}if(x==6||x==7){throw new DayIsOnWeekendException("ez hétvége");}if(x==5){throw new DayIsAFriidayException("a doki nem dolgozik pénteken");}}public class InvalidDayException extends Exception{ // vagy
                                                                                                                                                                                                                                                                                                                                             // RuntimeException
// superclass konstruktorainak a legenerálása => ezeket nem kapja meg
// automatice, cska a fgv eket
}public class DayOutOfBoundsException extends InvalidDayException{
// auto szupeclass konstruktorok
}public class DayIsOnWeekendException extends InvalidDayException{
// auto szupeclass konstruktorok
}public class DayIsAFriidayException extends InvalidDayException{
// auto szupeclass konstruktorok
}
// mainba
try{ // AZ ÁLTALÁNOSABB FELÉ KELL HALADNI => különben hibát ír a fordító
fgv(10);}catch(DayOutOfBoundsException|DayIsAFriidayException e){System.out.println(e.getMessage());}catch(DayIsOnWeekendException e){ // instanceof
                                                                                                                                       // ot
                                                                                                                                       // használja
System.out.println("a kövi hiba keletkezett?:"+e.getMessage());}catch(InvalidDayException e){System.out.println(e.getMessage());}
// -----------------------------------------------------------------------------------------------------------------------
// DATE objektumok
/*
 * LocalDate Represents a date (year, month, day (yyyy-MM-dd))
 * LocalTime Represents a time (hour, minute, second and nanoseconds
 * (HH-mm-ss-ns))
 * LocalDateTime Represents both a date and a time (yyyy-MM-dd-HH-mm-ss-ns)
 * DateTimeFormatter Formatter for displaying and parsing date-time objects
 */
DateTimeFormatter formatter=DateTimeFormatter.ofPattern("yyyy.MM.dd");LocalDate aktdate=LocalDate.parse("1991.03.21",formatter); // Dátummá
                                                                                                                                 // parsolás
long kulonbseg=ChronoUnit.DAYS.between(elozodate,aktdate); // 2 localdata különbsége
D_0.now(); // a most...
// a compareTo NEM nap különsléget mér, ha van a hó-ban eltérés akkor ahz HA az
// évben van eltérés akkor azt
// -----------------------------------------------------------------------------------------------------------------------
// reguláris kifejezések: Pattern, Matcher // tesztre: regex101.com
Pattern p=Pattern.compile("hello"); // amit keresünk
Matcher m=p.matcher("hellohello"); // ahol
m.find(); // => true mert a hello illeszkedik a hellohello-ra
m.find(); // => true
m.find(); // => false .. mert 3 adiknak már nem található
while(matcher.find()){counter++;} // => counter === 2 // bárhol a sz9vegen belül keres , és 2-őt talált
// addig fut, amig true val tér vissza, és onnan folytatja a keresést ahol
// abbahagyta

// pl:
Pattern.matches("[789]{1}[0-9]{9}","9953038949"); // => true [789]{1}=>az első szám 7 vagy 8 vagy 9 => 1x [0-9]{9} =>
                                                  // majd 9 szám
Pattern.matches("\\d","4443"); // false (digit but comes more than once)
Pattern.matches("\\D","1"); // false (digit)
/*
 * példák:
 * "h[ae]llo" => hallo hello
 * "hello." => hello(majd utánna bármilyen karakter)
 * "hello\\." => hello.
 * "H[a-z]+\\s" => H betűvel kezdődik => majd kisbetűkböl áll (+)=> ezekből a
 * kisbetűkből egy vagy több van => utánna valamilyen szóköz jön
 * "lo?" => l lo lo lo lo 0 vagy 1
 * "lo*" => l lo loo looo loooo stb... 0 vagy több
 * "o+" => o oo ooo oooo ooooo stb... 1 vagy több
 * "o{1,3}" => o oo ooo legalább 1, max 3
 * "^[\\w+-]+(?:\\.[\\w+-])*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$" => e-mail
 * 
 * ---------
 * escape-elés:
 * . => \\.
 * 
 * metakarakterek, előre definiált karakterosztályok:
 * . => 1 bármilyen karakter, ami NEM a \n
 * \\w => [A-Z] + [a-z] + [0-9] + [_] === [A-Za-z0-9_]
 * \\W => előző ellentetje
 * \\d => [0-9]
 * \\D => [^0-9]
 * \\s => white space karakter
 * \\S => NEM white space karakter
 * 
 * karakter osztályok, tartomány osztályok:
 * [abc] => ezek a betűk [0-9] => intervallum
 * [^abc] => ezek a betűk kizárása [^0-9] => számok kizárása
 * [a-z] => intervallum [A-Z] => intervallum [a-zA-Z] => intervallumok
 * => ezen intervallumok között mindegyik 1 db karaktert jelöl
 * [a-z][a-z] => ez már 2 karakter
 * 
 * unió osztály:
 * [a-f[u-z]] => abcdefuvwxyz => DE csak 1 karakter
 * 
 * metszet osztály:
 * [a-f&&[d-i]] => def => DE csak 1 karakter
 * 
 * mennyiség jelzők: az elötte lévő karakterre hat ami most az "n"
 * n? => 0 vagy 1 n{0,1}
 * n* => 0 vagy több n{0,}
 * n+ => 1 vagy több n{1,}
 * n{x,y} => legalább x, maximum y lehet {inclusive,inclusive}, maximumot
 * priorizálja: "zzzzzzzzzz" "z{2,5}" => 2
 * n{x,y}? => minimumot priorizálja: "zzzzzzzzzz" "z{2,5}?" => 5
 * n{x,} => legalább x, vagy több
 * n{x} => pontosan x dbszor n{x,x} => pontosan x-szer
 * 
 * horgonyok:
 * n$ => szöveg végén
 * ^n => szöveg elején
 * \\b => \\bnap\\b => Szó határ => [^A-Za-z0-9_] === váltó karakterek
 * "nap." "nap" => true "napok" "nap_ok"=> false
 * \\B => előző ellentetje, vagyis => [A-Za-z0-9_] veszik körül a szót
 * 
 * rögzítési csoport:
 * ()
 * "(\\d{1,3}%).*\\D+\\1" => \\1 az első rögzítési csoport értékét keresi vagyis
 * pont ugyanazt amit (\\d{1,3}%) adott eredményül
 * vis, ha ez 66 volt akkor a \\1 csak a 66 ot keresi, 55 re nem ad egyezést
 * \\1 => az első rögzítési csoport, \\2 => a második
 * (\\d+).*(\\d+).*\\1.*\\2 => asdas d 1234 dsad sad 5454 dsad ads 1234 sdsads
 * 5454 dsa => találat
 * 
 * "zzzzzzzzzz" "(?=(zzzzz))." => 6 db találat
 * (?= -> pozitív előretekintés kezdete
 * ( -> 1-es rögzítési csoport kezdete
 * a minta, amit keresünk
 * ) -> 1-es rögzítési csoport vége
 * ) : előretekintés vége
 * . : 1 akármilyen karakter, hogy előre lépjünk egyet
 * 
 * csak csoport: vagyis ami a ":" után jön az eggyütt van, vagyis ha (?:[a-z]+)?
 * ==> (a-z közti betük bül legalább 1) és ebböl 0 vagy 1 db
 * (?:)
 * 
 * flagek:
 */
Pattern p=Pattern.compile("[A-Z]+",Pattern.CASE_INSENSITIVE); // van sok más egyéb "konstans" flag amit | kapcsolattal
                                                              // tudunk többet érvényesíteni
Matcher m=p.matcher("zoli elment gyakorolni"); // Pattern.compile("[A-Z]+",Pattern.CASE_INSENSITIVE |
                                               // Pattern.valami_más)
db=0;while(m.find()){db++;} // 3, mert case_insensitive
// => Pattern.compile("[A-Z]+",Pattern.CASE_INSENSITIVE); ===
// Pattern.compile("(?i)[A-Z]+")
Pattern p=Pattern.compile("[A-Z]+#ide kommentet írhatunk",Pattern.COMMENTS); // komment írása
// === Pattern.compile("(?x)[A-Z]+#ide kommentet írhatunk");
Pattern p=Pattern.compile("[A-Z]+.*fáról",Pattern.DOTALL); // Pattern.compile("(?s)[A-Z]+.*fáról")
Matcher m=p.matcher("Zoli\nazalma a fáról");db=0;while(m.find()){db++;} // => 1 DE HA nincs Pattern.DOTALL akkor 0 MERT
                                                                        // akkor csak a \n ig vizsgál
Pattern p=Pattern.compile("[Az]",Pattern.LITERAL); // => konkrétan az [Az] -ra keres rá
Pattern p=Pattern.compile("!$",Pattern.MULTILINE); // Pattern.compile("(?m)!$");
Matcher m=p.matcher("Zoli!\nazalma a fáról!");db=0;while(m.find()){db++;} // => 2 lesz a találat, mert sorrol sorra
                                                                          // nézi, ha nincs Pattern.MULTILINE => csak 1
                                                                          // lenne

String input="""
            Több soros szöveg,
            nem kell \n a sor végére
            me automata kiteszi, mint js-ben
            a szöveg elötti szó közök nincsenek
            CSAK a \n-t teszi ki ...
            """
// egyéb fgvek
m.find(); // addig true amig ráillik a stringre, balról halad, ha ujra meghívjuk, akkor
          // onnan folytatja,
          // ahol abbahagyta, ha már nincs többb akkor false lesz
m.find(10); // 10. indextől indul a keresés
m.start(); // a találat kezdő indexe, akkor hívhatjuk csak meg, ha a m.find()-ot már
           // meghívtuk, különben Exception
           // akkor is Exception, ha meghívtuk a m.find()-ot, De nincs találat => Ha nincs
           // találat és meghívjuk === Exception
m.end(); // start párja... EXCLUSIVE ami már nem... [start;end[

Pattern p=Pattern.compile("alma");Matcher m=p.matcher("Az alma leesett");m.lookingAt();// false // MINDIG A string
                                                                                       // ELEJÉT NÉZI
Pattern p=Pattern.compile("Az alma");Matcher m=p.matcher("Az alma leesett");m.lookingAt();// true // MINDIG A string
                                                                                          // ELEJÉT NÉZI

m.matches(); // az egész input stringnek illeszkednie kell a reguláris kifejezésre
Pattern.matches("[789]{1}[0-9]{9}","9953038949"); // mit? hol? // m.matches() egy soros változata
// -----------------------------------------------------------------------------------------------------------------------
// Szálak, Threadek
// extends Thread vagy implements Runnable

class Tasker extends Thread{private volatile boolean futás=true; // volatile jelentése: egy máik szál modosíthatja
public void run(){for(int i;i<5;i++){System.out.print(i);}try{Thread.sleep(100) // kicsit vár
}catch(InterruptedException e){}}}
// main:
Tasker run1=new Tasker();Tasker run2=new Tasker();run1.start();run2.start();
// kimenet : 0011223344 egyszerre futnak

class Tasker implements Runnable{@Override public void run(){for(int i;i<5;i++){System.out.print(i);}try{Thread.sleep(100) // kicsit
                                                                                                                           // vár
}catch(InterruptedException e){}}}
// main:
Thread run1=new Thread(new Tasker());Thread run2=new Thread(new Tasker());run1.start();run2.start();
// -----------
// anoním osztály: olyan osztály amit helybe hozunk létre
private int c;Thread t1=new Thread(new Runnable(){public void run(){for(int i=0,i<12000;i++){c++;}}})Thread t2=new Thread(new Runnable(){public void run(){for(int i=0,i<12000;i++){c++;}}})t1.start();t2.start();System.out.println(c); // 0
                                                                                                                                                                                                                                         // Mert
                                                                                                                                                                                                                                         // ezen
                                                                                                                                                                                                                                         // a
                                                                                                                                                                                                                                         // ponton
                                                                                                                                                                                                                                         // 3
                                                                                                                                                                                                                                         // szállunk
                                                                                                                                                                                                                                         // van
                                                                                                                                                                                                                                         // és
                                                                                                                                                                                                                                         // a
                                                                                                                                                                                                                                         // main
                                                                                                                                                                                                                                         // elöb
                                                                                                                                                                                                                                         // ide
                                                                                                                                                                                                                                         // jut
                                                                                                                                                                                                                                         // és
                                                                                                                                                                                                                                         // még
                                                                                                                                                                                                                                         // 0
                                                                                                                                                                                                                                         // a
                                                                                                                                                                                                                                         // c
                                                                                                                                                                                                                                         // értéke
t1.join();t2.join(); // bevárom a t1 és t2 száll lefutását
System.out.println(c); // 14575 MERT a 2 száll egyszerre használta a c változót tehát előfodulhatott
                       // az:
                       // t1 kivette a c értékét 0
                       // t2 is kivette a c értékét 0
                       // t2 mövelte 1 el 1
                       // t1 is növelte 1 el 1
                       // t2 megkapta 1
                       // t1 megkapta és felülírta 1
                       // => NEM a várt 24000 jött ki eredményül
// -----------
// anoním osztály: olyan osztály amit helybe hozunk létre
private int c;public synchronized void add(){ // egyszerre csak 1 száll használhatja
c++;}Thread t1=new Thread(new Runnable(){public void run(){for(int i=0,i<12000;i++){add();}}})Thread t2=new Thread(new Runnable(){public void run(){for(int i=0,i<12000;i++){add();}}})t1.start();t2.start();t1.join();t2.join();System.out.println(c); // 24000
                                                                                                                                                                                                                                                        // =>
                                                                                                                                                                                                                                                        // synchronized
// -----------
class Zár{public ArrayList<Integer>number1=new ArrayList<>();public ArrayList<Integer>number2=new ArrayList<>();

public void doorOne(){number1.add(10);Thread.sleep(1);}public void doorTwo(){number2.add(10);Thread.sleep(1);}public void doWork(){for(int i=0;i<500;i++){doorOne();doorTwo();}}}
// main:
Zár zár=new Zár();long start=System.currentTimeMillis();// az akt idő
zár.doWork();long end=System.currentTimeMillis();// az akt idő
System.out.println(end-start); // 1073 => 1 szállon

class Zár{public ArrayList<Integer>number1=new ArrayList<>();public ArrayList<Integer>number2=new ArrayList<>();

public synchronized void doorOne(){number1.add(10);Thread.sleep(1);}public synchronized void doorTwo(){number2.add(10);Thread.sleep(1);}public void doWork(){for(int i=0;i<500;i++){doorOne();doorTwo();}}}long start=System.currentTimeMillis();Thread t1=new Thread(new Runnable(){public void run(){zár.doWork();}});Thread t2=new Thread(new Runnable(){public void run(){zár.doWork();}});t1.start();t2.start();t1.join();t2.join();long end=System.currentTimeMillis();System.out.println(end-start); // 2174
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // =>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // mert
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // a
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // synchronized
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // magát
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // az
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // objektumot
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // zárólja
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // nem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // a
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // fgv-t
// Megoldás:
class Zár{private Object lock1=new Object();private Object lock2=new Object();

public ArrayList<Integer>number1=new ArrayList<>();public ArrayList<Integer>number2=new ArrayList<>();

public void doorOne(){synchronized(lock1){number1.add(10);Thread.sleep(1);}}public void doorTwo(){synchronized(lock2){number2.add(10);Thread.sleep(1);}}public void doWork(){for(int i=0;i<500;i++){doorOne();doorTwo();}}}long start=System.currentTimeMillis();Thread t1=new Thread(new Runnable(){public void run(){zár.doWork();}});Thread t2=new Thread(new Runnable(){public void run(){zár.doWork();}});t1.start();t2.start();t1.join();t2.join();long end=System.currentTimeMillis();System.out.println(end-start); // 1002
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // //
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // 61
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // el
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // gyorsabb
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // mint
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // az
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // szálú
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // megoldás
// -----------
class TaskUnit implements Runnable{private int id;public TaskUnit(int id){this.id=id;}@Override public void run(){System.out.println(id)Thread.sleep(300);System.out.println(id)}}
// main:
ExecutorService e=Executors.newFixedThreadPool(2); // mennyi száll fér bele? => 2
for(int i=1;i<6;i++){e.submit(new TaskUnit(i)); // a fent definiált 2 száll elkezdi létrehozni => és futtatni az i edik
                                                // TaskUnit run metódusát
} // ha felszabadul egy szál -> akkor elkezdi
e.shutdown(); // kikell kapcsolni
e.awaitTermination(60,TimeUnit,SECONDS);// vár, és ha 10 másodperc letelik VAGY ha a szállak befejezték a melót =>
                                        // továbbmegy a main száll

// -----------------------------------------------------------------------------------------------------------------------
// egyéb STRING
S_0.codePointAt(10); // 10 es indexű elem UNICODE értékét adja vissza
S_0.codePointBefore(10); // 10-1 = 9 es indexű elem UNICODE értékét adja vissza
S_0.codePointCount(0,5); // 0 <= x <= 5 közötti indexű elemek közt mennyi db Unicode érték van?
S_0.hashCode(); // String hash kódját adja vissza

/*
 * format() Returns a formatted string using the specified locale, format
 * string, and arguments String
 * getBytes() Encodes this String into a sequence of bytes using the named
 * charset, storing the result into a new byte array byte[]
 * getChars() Copies characters from a string to an array of chars void
 * intern() Returns the canonical representation for the string object String
 * offsetByCodePoints() Returns the index within this String that is offset from
 * the given index by codePointOffset code points int
 * regionMatches() Tests if two string regions are equal boolean
 * subSequence() Returns a new character sequence that is a subsequence of this
 * sequence CharSequence
 * toCharArray() Converts this string to a new character array char[]
 */

// -----------------------------------------------------------------------------------------------------------------------
// Sorba rendezés gyenge megoldás: a classunkban:
@Override public int compareTo(Object a){int c=((Ember)a).getAge();return this.age-c; // növekvő
// return c-this.age; // csökkenő
}
// mainba:
Collection.sort(L_0); // sorba rendezi => probléma => DE ez csak 1 féle fajta sorbarendezés
// -----------------------------------------------------------------------------------------------------------------------
// egyéb algoritmusok :
int[]c={1,2};int total=4;fa(c,total,0); // összes különböző esetet ahol ez 1 eset 112 == 121
famin(c,total,0); // legrövidebb hossza
public static int fa(int[]c,int osszeg,int akti){if(osszeg=0){return 1;}if(osszge<0){return 0;}int combo=0;for(int i=akti;i<c.length;i++){combo+=fa(c,osszeg-c[i],i);}return combo;}

public static int famin(int[]c,int osszeg,int akti){if(osszeg=0){return 0;}int c_1=Integer.MAX_VALUE;

for(int i=akti;i<c.length;i++){if(c[i]<=osszeg){int subc=famin(c,osszeg-c[i],i);if(subc!=Integer.MAX_VALUE&&subc+1<c_1){c_1=subc+1;}}}return c_1;}

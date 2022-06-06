// https://editor.swagger.io/

//-------------------------------------------------------------------
// 3 rétegek:
// a kontroller csak meghívja a service-ben lévő fügvényt
// a service-ben van a fő logika
// a router a kontroller dolgait hívja meg, mivel lehet több controller is, Ő szedi össze a kontrollereket

//-------------------------------------------------------------------
// https://www.npmjs.com/package/swagger-autogen
require('swagger-autogen')()('./swagger-output.json', ['./src/index.js']);

//-------------------------------------------------------------------

//-------------------------------------------------------------------

/*

Főbb ajánlott fejezetek és videók

Architektúra
Standalone alkalmazások (konzolos, grafikus)
Központi adatbázis
Többrétegű alkalmazások
Webes alkalmazások
REST webszolgáltatások
Szoftverarchitektúrák
Egy szoftverrendszer struktúrájának leírása - eloszott rendszerekkel terjedt el. Az elosztás magával hozta, hogy pontos információkra van szükségünk arról, hogy melyik komponens hol van, mik a határok, hol válnak el az egyes komponensek. Az architektúra nem tartalmaz részleteket a szoftverrel kapcsolatban, inkább segít a különböző szereplőknek a kommunikációban. Az elosztott rendszerek legnagyobb előnye, hogy olyan komponensekre vannak bontva, amelyeknek jól meghatározott feladatuk van, így olyan számítógépekre lehet telepíteni őket, amelyek az adott feladat elvégzésére jobban megfelelnek, valamint az adott komponenst kell csak javítani vagy bővíteni probléma vagy kapacitáshiány esetén. Hátrányuk, hogy sokkal bonyolultabbak, nehezebben fejleszthetők. Az autentikáció és autorizáció itt alapvető fontosságú annak érdekében, hogy biztonságos legyen a kommunikáció a komponensek között. (authenticaton - azonosítás, authorization - jogosultság)

Standalone alkalmazások
A standalone alkalmazás olyan alkalmazás, amely helyileg fut az eszközön, és nem igényel semmi mást a működéséhez. Minden logika az alkalmazásba van beépítve, így nincs szüksége sem internetkapcsolatra, sem más telepített szolgáltatásra. A webes alkalmazásokkal ellentétben, amelyek egy böngészőben futnak, és nem kell telepíteni őket, a standalone alkalmazásoknak pont az ellenkezőjére van szükségük. Nincs szükségük böngészőre a futtatásukhoz, de gyakran igényelnek egy eszközt, amelyre telepíteni kell őket. A felhasználói felület lehet konzolos (CLI) vagy grafikus (GUI).

Központi adatbázis
A standalone szoftverek az adataikat az adott számítógépen tárolták, egy szöveges vagy bináris állományban. Ennek megvolt az a veszélye, hogy ha az adott számítógép esetleg megsérül, akkor az adatok is elvesznek. További hátránya az volt, hogy csak az adott szoftver tudta használni az adatokat, csak azon a számítógépen, amin telepítve volt. Amikor megjelentek az adatbázisok, ezek a problémák megszűntek. Az adatbázisok olyan szoftverek, amelyek adatok perzisztens tárolására, lekérdezésére és módosítására alkalmasak. A perzisztens szó itt azt jelenti, hogy hosszútávú, állandó. A különálló adatbázisok legnagyobb előnye, hogy nemcsak egy szoftver tud hozzá kapcsolódni, hanem tetszőleges számú szoftver el tudja érni. Egy szoftver a publikált API-n keresztül tud egy adatbázishoz hozzáférni. Ennek a rendszernek hátránya, hogy az összes szoftveres logika az adott kliensen kell fusson, amely távolról eléri az adatbázist. Ehhez pedig telepíteni kell a szükséges szoftvereket kliensenként, amely az üzemeltetési feladatokat igen megnehezíti, nagy rendszereknél el is lehetetleníti (pl. új verziók).

Többrétegű alkalmazások
A többrétegű alkalmazások megjelenésével tulajdonképpen a két rétegen felül még további rétegek jelentek meg. Valójában annyi történt, hogy bizonyos funkciókat az alkalmazásból átmozgattunk egy központi helyre. A többrétegű alkalmazások megjelenésekor a kliens oldalon, a felhasználónál futó szoftverekből kiemelték az üzleti logikát, a működést és áthelyezték egy külön rétegbe. Ezt a réteget egy központi, nagy teljesítményű számítógépen helyezték el, és így gyakorlatilag szétválasztották magát az alkalmazást kliensre és szerverre. A kliens oldalon maradt a felhasználói felület, amely közvetlenül a felhasználót szolgálja ki. Szerver oldalra pedig átkerült az üzleti logika, azaz a bonyolult számítási műveletek, az algoritmusok, az üzleti szabályok.

Webes alkalmazások
A kliens alkalmazások kliens számítógépekre való telepítése, majd karbantartása és frissítése továbbra is nagy üzemeltetői munkával jártak, annak ellenére, hogy nem tartalmaztak már sok logikát. A webes alkalmazásoknál elegendő a kliens számítógépen csak egy böngészőt telepíteni, ezt követően tulajdonképpen ebben a böngészőben fut a kliens oldal, tehát a böngésző jeleníti meg az alkalmazásnak a felhasználói felületét. Mivel böngésző várhatóan minden számítógépen van, ezért megszűnnek a telepítési és a frissítési problémák. A webes alkalmazást szokták vékony kliens alkalmazásnak is nevezni, utalva arra, hogy kliens oldalon nem kell bonyolult telepítési munkálatokat elvégezni, egyszerűen böngészővel használható az alkalmazás.

A többrétegű és webes alkalmazások előnyei (~10p):
https://www.youtube.com/watch?v=1o7bB4hUPew&t=1s

Play Video
Remek összefoglaló a SQL vs NoSQL témakörről:
https://www.youtube.com/watch?v=ZS_kXvOeQ5Y

Play Video
SEPARATION OF CONCERNS (SOC)

A vonatkozások szétválasztása elvnek a lényege, hogy a rendszert olyan egységekre kell felbontani, mely egységeknek a közös funkcionalitása a lehető legkisebb. Ideális esetben 0.

User Interface (UI)

Az a találkozási pont (grafikus) felület a user vagy és az applikáció (gép) között, ahol a user megadhatja a parancsokat, majd értelmezheti az eredményeket.

MVC architektúra
Model View Controller tervezési minta, elsősorban webalkalmazások tervezésére szolgál.



Három fő részből áll össze:

Model: Adatok kezelése
View: Adatok megjelenítési formája a felhasználók részére
Controller: A folyamatot, kiválasztásokat kontrolláló rész
Szerver oldalon az adatok szállításának, kontrollálásának egyik fő eszköze a DTO, avagy Data Transfer Object

Adatbiztonság és a mezők elnevezéseinek segítése (pl: server oldalon a dto és frontend oldalon a model elnevezése és mezői megegyeznek)

Főbb előnyök:

Logikailag összetartozó elemek csoportosíthatók.
Fejlesztés könnyedebbé tétele, egy időben több részen lehet dolgozni
Számos módon van lehetőség megjeleníteni az adatokat
Frontendes keretrendszerekben (pl:Angular) is megjelenhetnek ezek az elvek:

Model: a "model" ahogy egy adatot kezelünk, például egy felhasználóról=> pl: typescript interface egy felhasználóról + a service, ahol a CRUD műveletek vannak (itt az interface mezői egyeznek meg a szerver oldali DTO mezőivel)
View: a komponensek HTML template-jei (és a kapcsolódó CSS/SCSS fájlok), ahogy ténylegesen megjelennek a látható adatok
Controller: a komponensek typescript fájljai, ahogy ki vannak csoportosítva az egyes funkciók, itt hívjuk meg szükség esetén a service-ek metódusait DI-n keresztül, ide importáljuk be a szükséges adatokat
A RESTful API
Api fogalma:

Application Programming Interface:



Az a felület ("találkozási pont"), ahol a két applikáció vagy számítógép adatot cserél (ellentétben a UI-jal, ahol a felhasználó és az applikáció/számítógép cserél adatot)
egy API specifikációja mindig pontosan meghatározza, milyen végpontokon, metódusokat, kéréseket lehet az API-n meghívni
egyik célja az, hogy elrejtse egy rendszer belső működését, és kizárólag a specifikáció leírása alapján alkalmazható legyen a programozók számára a rendszer akkor is, ha a rendszer belső működése megváltozik
nem csak webAPI-k léteznek (mi ezekről fogunk tanulni), léteznek API-k programnyelvekhez, operációs rendszerekhez, számítógép hardverhez is Nagyon sok ilyen felhasználható API van a neten, itt egy szubjektív lista
REST fogalma:

avagy: REprestentational State Transfer

2000-ben jelent meg a REST koncepció. Amikor egy RESTful API-t hívnak meg, a szerver elküldi a kért erőforrás vagy adat(ok) állapotát, prezentációját. A művelet, amelyet a szervernek el kell végeznie az adott erőforráson, HTTP protokollon, metódusokon keresztül valósul meg. Főbb elvek és előnyök a REST koncepció használatakor:

egyszerű, jól skálázható, népszerű tervezési séma
user interface és az adatok tárolásának éles szétválasztása: => széleskörű platfrom használhatja, hozzáférhet az adatokhoz
Stateless (HTTP protokolhoz hasonlóan): minden egyes requestnek tartalmaznia kell a teljes információt, ami az adatok lekérdezéséhez szükséges
Főbb HTTP Metódusok: POST, PUT, GET, DELETE, PATCH, OPTION
Rétegezett (pl: 3-layer model). Minden egyes réteg élesen elkülön a többitől.
Bármilyen adattípus megengedett, de legjellemzőbbek: JSON, XML. Adatforma elnevezése: media type
Névkonvenció. Nagyon fontos elem. Elérési utak (url-path) elnevezése, maga az adatok-modellek, metódusok elnevezése utal a forrás típusára

https://en.wikipedia.org/wiki/Representational_state_transfer


OpenAPI és Swagger alapok
Mi az az OpenAPI?
Az OpenAPI specifikáció egy REST API leíró nyelv. Egy OpenAPI fájl segítségével részletesen definiálható az általunk fejlesztett API, beleértve a következőket:

Végpontok (pl.: /users) és műveletek a végpontokon (pl.: GET /users, POST/users)
Minden művelet bemeneti és kimeneti paraméterei
Autentikációs módok
Egyéb adatok (elérhetőség, licensz, felhasználási feltételek stb.)
Az API specifikációt YAML vagy JSON formátumban írhatjuk meg. Mindkettő könnyen megtanulható, olvasható és emberek és programok egyaránt értelmezni tudják.

Mi az a Swagger?
A Swagger egy open-source (nyílt forráskódú) eszköztár az OpenAPI specifikációhoz, amely segítségével könnyen tudunk tervezni, építeni, dokumentálni és meghívni különböző REST API-kat.

A legfőbb Swagger eszközök a következők:

Swagger Editor – böngészőben futtatható szerkesztő OpenAPI specifikáció készítéséhez
Swagger UI – OpenAPI specifikációk interaktív megjelenítéséhez, API meghívásához
Swagger Codegen – OpenAPI specifikációból szerver és kliens oldali kód generálása
Miért hasznos ez nekünk?
Egy teljesen nyelv és platformfüggetlen specifikációja egy REST API-nak számos módon segítheti a későbbiekben a fejlesztési folyamatokat:

Design-first megközelítés: a Swagger Codegen segítségével legenerálhatjuk a szerveroldali kód vázát a készülő API-nknak. Így mindössze annyi feladatunk marad, hogy a megfelelő hívásokat feltöltsük logikával.
A Swagger Codegen segítségével kliens oldali függvénykönyvtárakat generálhatunk több mint 40 programnyelven.
A Swagger UI segítségével a REST API felhasználói közvetlenül kipróbálhatják az egyes hívásokat a böngészőből az interaktív dokumentáción keresztül.
A specifikáció segítségével más eszközöket is könnyen csatlakoztathatunk az API-hoz, például automatikusan generálhatunk teszteket.
Alapvető struktúra
OpenAPI specifikációkat YAML vagy JSON nyelveken írhatunk. Mivel a YAML elterjedtebb a gyakorlatban, mi is azt fogjuk használni, de a JSON ugyanolyan helyesen működne.

Fontos: mi a későbbiekben az OpenAPI legújabb, 3-as verziójával foglalkozunk. Az interneten rengeteg néhány éves forrás található, ami a régebbi, 2-es verziót használja.

Egy egyszerű OpenAPI 3.0 definíció YAML-ben írva a következőképpen néz ki:

openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
Fontos megjegyezni, hogy minden kulcsszó esetében számít a kis- és nagybetűk közti különbség!

Metaadatok
Minden API definíciónak tartalmaznia kell, hogy az OpenAPI specifikáció melyik verzióját használja.

openapi: 3.0.0
Az OpenAPI verzió meghatározza a specifikáció formátumát, mit és hogyan kell dokumentálunk. A verziószámok a semantic versioning sémáját követik.

Az info szekció további információkat tartalmaz az API-val kapcsolatban:

info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
title: az API neve
description: az API részletes leírása szabad szövegként, lehet több soros is, támogatja a HTML és Markdown formázást
version: az API verziója (nem az OpenAPI specifikáció verziója!) – lehet szabad szöveg, természetesen ez is követheti a semantic versioning sémát, de nem kötelező
Szerverek
A szervereket, amelyeken az API-nk fut, a servers szekcióban adhatjuk meg. Megadhatunk több elérhetőséget is. (pl.: production, test, sandbox stb.)

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
Minden útvonal a server URL-hez relatív. Például a /users útvonal jelentése http://api.example.com/v1/users, illetve http://staging-api.example.com/users a fenti esetekben.

Útvonalak
A paths (útvonalak) szekció definiálja az API végpontjait (útvonalait), és a HTTP metódusokat (műveleteket/operációkat), amelyek az adott végpont támogat. Például a GET /users az alábbi módon definiálható:

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
Egy művelet definíciója tartalmazza a paramétereket, a HTTP kérés törzsét/tartalmát (body), a lehetséges válasz státusz kódokat (pl.: 200 OK, 404 Not Found) és a HTTP válasz tartalmát.

Paraméterek
A HTTP kéréseknek lehetnek paraméterei:

az útvonalban (pl.: /users/{userId} – userId paraméter)
az ún. query stringben (pl.: /users?role=admin – role paraméter admin értékkel)
a headerben (pl.: X-CustomHeader: Value)
cookie-ban (Cookie: debug=0)
Specifikálhatjuk a paraméter típusát, formátumát, azt, hogy kötelező-e, és további részleteket is:

paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description in CommonMark or HTML.
          schema:
            type : integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: OK
HTTP kérés törzs (body)
Ha a HTTP kéréssel tartalmaz body-t is, akkor a requestBody kulcsszóval tudjuk definiálni annak tartalmát.

paths:
  /users:
    post:
      summary: Creates a user.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
      responses:
        '201':
          description: Created
HTTP válasz
Minden művelet esetében definiáljuk a lehetséges státusz kódokat, mint például 200 (OK) vagy 404 (Not Found). Emellett a válasz törzsének a sémáját a schema kulcsszóval határozhatjuk meg.

paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: The ID of the user to return.
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: A user object.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    example: 4
                  name:
                    type: string
                    example: Jessica Smith
        '400':
          description: The specified user ID is invalid (not a number).
        '404':
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error
Modellek definíciója
A components/schemas szekcióban (értsd: components szekción belül egy schemas szekció) definiálhatjuk az API kommunikáció során használt adatstruktúrákat. Ezeket a dokumentumon belül a $ref kulcsszóval tudjuk hivatkozni. Vegyük például az alábbi, egyszerű JSON objektumot.

{
  "id": 4,
  "name": "Arthur King"
}
A fenti JSON objektum alapján a következő User sémát készíthetjük el:

components:
  schemas:
    User:
      properties:
        id:
          type: integer
        name:
          type: string
      # Both properties are required
      required:
        - id
        - name
Ezek után, ha azt szeretnénk kifejezni, hogy a HTTP kérés/válasz törzsében (body) User sémájú objektum szerepelhet JSON formátumban, azt az alábbi módon írhatjuk le:

paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users:
    post:
      summary: Creates a new user.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: Created
Autentikáció
Az API-nk által támogatott autentikációs módokat a securitySchemes és a security kulcsszavakkal definiálhatjuk.

components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
security:
  - BasicAuth: []
A támogatott autentikációs metódusok:

HTTP autentikáció: basic, bearer token stb.
API key headerben vagy query paraméterben
OAuth 2
OpenID
*/

openapi: 3.0.0
info:
  title: FunyBook API
  version: 1.0.0
  description: A joke site where you can do funny things
servers:
  - url: http://localhost:3000
    description: URL for local testing

paths:
  /login:
    post:
      tags:
        - auth
      summary: Login user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
      responses:
        "201":
          description: Successful login
          content:
            application/json:
              schema:
                type: object
                properties:
                  accessToken:
                    type: string
                  refreshToken:
                    type: string
                  user:
                    type: object
                    properties:
                      _id:
                        type: string
                      email:
                        type: string
                      userName:
                        type: string
                      rank:
                        type: integer
        "400":
          description: Missing parameters or Invalid Password
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: User does not exist
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /logout:
    post:
      tags:
        - auth
      summary: Logout user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken:
                  type: string
      responses:
        "200":
          description: Successful logout
        "401":
          description: Missing token
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Invalid token
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /refresh:
    post:
      tags:
        - auth
      summary: Refresh token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken:
                  type: string
      responses:
        "201":
          description: Successful refresh
          content:
            application/json:
              schema:
                type: object
                properties:
                  accessToken:
                    type: string
                  refreshToken:
                    type: string
                  user:
                    type: object
                    properties:
                      _id:
                        type: string
                      email:
                        type: string
                      userName:
                        type: string
                      rank:
                        type: integer
        "401":
          description: Missing token
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Invalid token
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /signup:
    post:
      tags:
        - auth
      summary: Signup user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
                userName:
                  type: string
      responses:
        "201":
          description: Successful signup
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  email:
                    type: string
                  userName:
                    type: string
                  rank:
                    type: integer
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /reaction:
    post:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Add reaction
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userID:
                  type: string
                reactionType:
                  type: string
                jokeImageID:
                  type: string
      responses:
        "201":
          description: Successful reaction
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  userID:
                    type: string
                  reactionType:
                    type: string
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /reaction/{reactionID}:
    put:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Update reaction
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userID:
                  type: string
                reactionType:
                  type: string
      parameters:
        - name: reactionID
          in: path
          required: true
          schema:
            type: string
      responses:
        "201":
          description: Successful update
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  userID:
                    type: string
                  reactionType:
                    type: string
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
    delete:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Delete reaction
      parameters:
        - name: reactionID
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Successful delete
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  userID:
                    type: string
                  reactionType:
                    type: string
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /keyword:
    post:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Add keyword
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                jokeImageID:
                  type: string
                userID:
                  type: string
                keywordText:
                  type: string
      responses:
        "201":
          description: Successful keyword
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  keywordText:
                    type: string
                  jokeImageID:
                    type: string
                  userID:
                    type: string
                  status:
                    type: string
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
    get:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Get keywords
      responses:
        "200":
          description: Successful keywords
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    keywordText:
                      type: string
                    jokeImageID:
                      type: string
                    userID:
                      type: string
                    status:
                      type: string
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /keyword/{keywordID}:
    put:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Update keyword
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                jokeImageID:
                  type: string
                userID:
                  type: string
                keywordText:
                  type: string
                status:
                  type: number
      parameters:
        - name: keywordID
          in: path
          required: true
          schema:
            type: string
      responses:
        "201":
          description: Successful update
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  keywordText:
                    type: string
                  jokeImageID:
                    type: string
                  userID:
                    type: string
                  status:
                    type: number
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /jokeimage:
    get:
      summary: Get joke images
      responses:
        "200":
          description: Successful joke images
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    src:
                      type: string
                    isOriginal:
                      type: boolean
                    keywords:
                      type: array
                      items:
                        type: string
                    reactions:
                      type: array
                      items:
                        type: object
                        properties:
                          _id:
                            type: string
                          userID:
                            type: string
                          reactionType:
                            type: string
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
    post:
      security:
        - bearerAuth: []
      tags:
        - admin
      summary: Add joke image
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                src:
                  type: string
                isOriginal:
                  type: boolean
                keywords:
                  type: array
                  items:
                    type: string
                userID:
                  type: string
      responses:
        "201":
          description: Successful joke image
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  src:
                    type: string
                  isOriginal:
                    type: boolean
                  keywords:
                    type: array
                    items:
                      type: string
                  reactions:
                    type: array
                    items:
                      type: object
                      properties:
                        _id:
                          type: string
                        userID:
                          type: string
                        reactionType:
                          type: string
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /comment:
    get:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Get comments
      parameters:
        - name: jokeImageID
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Successful comments
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    jokeImageID:
                      type: string
                    userID:
                      type: string
                    text:
                      type: string
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
    post:
      security:
        - bearerAuth: []
      tags:
        - simple
        - admin
      summary: Add comment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                jokeImageID:
                  type: string
                userID:
                  type: string
                text:
                  type: string
      responses:
        "201":
          description: Successful comment
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                  jokeImageID:
                    type: string
                  userID:
                    type: string
                  text:
                    type: string
        "400":
          description: Missing parameters
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: NotFound
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /fileUpload/jokeImage:
    post:
      security:
        - bearerAuth: []
      tags:
        - admin
      summary: Upload file
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
      responses:
        "201":
          description: Successful file upload
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  url:
                    type: string
        "400":
          description: Missing File
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /fileUpload/original:
    post:
      security:
        - bearerAuth: []
      tags:
        - admin
      summary: Upload file
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
      responses:
        "201":
          description: Successful file upload
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  url:
                    type: string
        "400":
          description: Missing File
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "500":
          description: InternalServerError
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

tags:
  - name: simple
    description: Access to SIMPLE user (rank 1)
  - name: admin
    description: Access to ADMIN user (rank 2)
  - name: auth
    description: Authentication handling

components:
  schemas:
    Error:
      type: object
      required:
        - hasError
        - message
      properties:
        has_error:
          type: boolean
        message:
          type: string

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

                
                
                
                
tags:
  - name: person
    description: Access to blog users          
  - name: post
    description: Access to blog posts  
  - name: auth
    description: Authentication handling
        
                          
components:
  schemas:
    Person:                  
      type: object
      required:
        - first_name
        - last_name
        - email
      properties:
        first_name:
          type: string
        last_name:
          type: string
        email:
          type: string
        posts:
          type: array
          items: 
            type: string
    Error:
      type: object
      required:
        - has_error
        - message
      properties:
        has_error:
          type: boolean
        message:
          type: string
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT 


SAVE as JAML

package java;
// Szerver
// tcp      -  biztonságos, de lassabb, van nyugtázás
// udp      -  adatfolyam, nem biztonságos
// request  -  kérés 
// response -  válasz
// -> header + body
// header : státusz kódok egy részét tartalmazza
//          1xx : informatív jelzésű
//          2xx : kérés elfogadva  200 : ok,    201: új erőforrás létrehozva,       202: elfogadva,         204 : minden ok válasz nem szükséges
//          3xx : átirányítás      301 : átirányítás végleges               304 : nem történt módosítás     307 : átirányítás ideiglenes
//          4xx : kliens hibák     400 : hibás lekérdezés       401 : hiányos jogosultság    403 : tiltott elérés   404 : nem található
//          5xx : szerver hiba     500 : belső szerver hiba     503 : a szolgáltatás nem elérhető
//          MIME Type: az oldal typusa: html, mp3, stb..
// Adatáramlás: XML, JSON, YAML
// XML,pl.:    <Persons> <Person> <name>Gyula</name> <age>21</age>  <Person> <name>Jani</name> <age>20</age> </Persons>
// JSON :     {"Persons":{"Person":{"name":"Gyula","age":21},{"name":"Jani","age":20}}}
// YAML :      --- Person: name: Gyula age:21
// java EE (csak alkalmazás szervereken lehet futtatni) VS Spring (Tomcat-en is lehet futtatni)


// servlet egy objektum, ami egy http kérést tud fogadni és választ adni (request, response)
// conf/tomcat-users.xml ->
<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<role rolename="manager-script"/>
<user username="admin" password="admin" roles="manager-gui,admin-gui,admin-script,manager-jmx,manager-status,manager-script"/>


//1x:   set "JAVA_HOME="
//      set "JRE_HOME=E:\programozás\java\jdk-15.0.2

// >cd /d e:\programozás\java\apache-tomcat-10.0.4\bin
// startup.bat

// böngészőbe: localhost:8080
// tomcat már működik... -> a spring keretrendszer ezt használja

// webalkalmazás/       WEB-INF/        lib/        függőségek, más helyről importált dolgok
//                                      src/        forráskód
//                                      classes/    lefordított kód
//                                      web.xml
//                      META_INF/
//                      html,js,css file-ok
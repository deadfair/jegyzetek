package java;

//----------------------------------------------------------------------------------------------------------------
// new sprigboot project: maven+jar
// RUN AS 			-> Springboot app
// localhost:8080 	-> on érhető el
//----------------------------------------------------------------------------------------------------------------
// Fájl Struktúra :
// ProjectNév/src/main/java/	com.projectnév/				=> main fgv helye, (ezek packages-ek)
//								com.projectnév.domain/		=> objektumok
//								com.projectnév.controller/	=> (Home-,Error-,Controller,ExceptionGeneral)	
//								com.projectnév.service/ 	=> repokat köti össze a controllerrekkel
//								com.projectnév.repository/  => az objektumoknak a repo-ja(kapcsolat az adatbázissal)
// ProjectNév/src/main/resources/static/    => (statikus anyagok pl.: css/=>css file-ok, images/=>képek)																    															
//								/templates/	=> (honlapok pl.: error.html,index.html,stb..)																						  
//								/application.properties 	=> globális speciális beállítások
//								/messages_x.properties      => x=hu,en,de,stb...
//								/data.sql		=> inicializáló sql utasitások
//								/data-h2.sql	=> is
//								/schema-h2.sql	=> tábla csinálók
// ProjectNév/pom.xml 		=> dependency-k
//----------------------------------------------------------------------------------------------------------------
// ProjectNév/pom.xml 		=> dependency-k
// web			=> mindig kelleni fog
// DevTools  	=> automata szerver restart mentéskor
// thymeleaf	=> front end ciklus (és a változók juttatása a modellben?)
// h2			=> egy teszt adatbázis
// jpa			=> java lekérdező nyelv, + 1 réteg
// postgresql	=> valós külső adatbázishoz csatlakozáshoz
// jdbc			=> jpa ellensége :) 
// security		=> bejelentkezés, jogosultságok
// thymeleaf security => thymleaf elér + adatokat
// mail			=> email küldéshez
//----------------------------------------------------------------------------------------------------------------
// application.properties 	=> globális speciális beállítások
// ANSI vagy UTF-8 ba kell menteni hogy működjön jól a szöveg
// a java kód kapcsolata a külvilággal, innen olvassuk ki a konstans szerű cuccokat email szerver stb..
/*
spring.web.locale-resolver=fixed
spring.web.locale=hu		// messages_x.properties //nyelv beállítása

spring.thymeleaf.cache=false

spring.h2.console.enabled=true
spring.h2.console.path=/db					// h2 adatbázis elérése
spring.datasource.url=jdbc:h2:mem:testdb	// h2 url-je

spring.jpa.open-in-view=false		// jpa

server.port =9001 					// a port most a 9001 es lesz amin elérhető
spring.profiles.active=dev			// mi az aktív profil? dev =>
=> ez! + 1 új fájl, új globális változókkal  application-dev.properties
// vagy run configuration -> arguments mezőbe:    --spring.profiles.active=dev
// @Profile("dev")  // így mondom meg, hogy a fgv melyiket használja

common.database.username=admin		// vagy lehet ilyen random dolgokat is definiálni
common.database.password=password
common.database.url=127.0.0.1
common.emailserver.url=127.0.0.1		
HomeController.msg=${random.value}          // random érték generálása
HomeController.msg=${random.int[0,100]}     // 0 és 10 közötti random szám
*/
// bárhol ezeket a konstansoakt kikérni:
@Value("${common.database.username}")
private String uname;
// csoportos összekötés:
/*
x.first-name=gyula                  //  felismeri a Person classt ha a nagy betűk elött 
x.lastName=nagy                     //  max 1 kötőjel szerepelhet és
x.age=10                            //  nem érzékeny a kis nagy betűkre
x.allname=${person.first-Name} NAGY //  más változó értéke    
@ConfigurationProperties(prefix="x")  + pom.xml-hez adás !!! ez clickelve automata is lehet
@Component
public class Person{...}
+ mainba:  @EnableConfigurationProperties */
/*
spring.datasource=jdbc:adatbázistípus:://elérésiút:port/adatbázisnév?egyébbeállítások		// szerver beállítások
spring.datasource.username=	
spring.datasource.password=	
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platfform=org.hibernate.dialect.PostgreSQLDialect

spring.jpa.hibernate.ddl-auto=create-drop	// adatbázis létrehozása, majd törlése(mint a h2)
							  create		// adatbázis létrehozás
							  update		// adatbázis módosítása
							  validate		// ellenörzi, módosítást nem végez

spring.datasource.platform=h2		// jdbc-nek, hogy a schema-h2.sql  működjön
*/
//----------------------------------------------------------------------------------------------------------------
// messages_x.properties		=> x=,hu,en,de,stb...
/*
messages.properties						// alapértelmezett
ip=Az Ip Címed
fText=Készült a kiki megbízásából...

messages_hu.properties					// magyar változók
ip=Az Ip Címed
fText=Készült a kiki megbízásából...

messages_en.properties					// angol változók
ip=your Ip adress
fText=english A kiki english
*/
//----------------------------------------------------------------------------------------------------------------
//	data.sql		=> inicializáló sql utasitások
//  data-h2.sql		=> szintén, jdbc s?????????
// insert into Blogger (age,name) Values (21,'gyula');
// insert into stories (cím,content,posted,author_id) 
// values ('teszt cím','teszt tartalom',CURRENT_DATE(),
// (select id from blogger where name='gyula'));
//  schema-h2.sql	=> Tábla csináló utasítások
//----------------------------------------------------------------------------------------------------------------
// com.projectnév/		=> main fgv helye, Spring boot indító osztály
@SpringBootApplication // => @Configuration + @EnableAutoConfiguration + @ComponentScan  
@ComponentScan ({"com.elsospring","com.masodikspring"})// ha másik package ba van a class ami kell
public class ElsoProjectApplication {

	@Beam		// main mellett így adhatunk át egy klasszt 
//	@Bean(name="gyula")	// becenév megadása => ct.getBean("gyula")
	public Person givMeAPerson(){
    	return new Person();}

	public static void main(String[] args) {
		SpringApplication.run(ElsoProjectApplication.class, args);
		ApplicationContext ct = SpringApplication.run(ElsoSpringApplication.class,arg);
		ct.getBean("person");}} // így érünk el objektumot amit már kitudunk írni a konsolra
// springframeworkből kell importálni, ct lesz a mr conténer

@Component // + jelezni kell a másik package-ban lévő elemnek is hogy ő egy komponens
public class SpyGirl {
  /* mindenfélefgv */} // pl ő itt van: "com.masodikspring"
// ----------------------------------------------------------------------------------------------------------------
// com.projectnév.domain/ => objektumok, POJO tárhely

@Entity(name = "stories") // adatbázis oldalán mi látszódjon, tábla // JPA
public class Index {
  @GeneratedValue(strategy = GenerationType.IDENTITY) // autoinkrement // JPA
  @Id // elsődleges kulcs // JPA
  private long id;
  @Column(name = "cím", length = 1000) // adatbázis oldalán mi látszódjon, + a string hossza // JPA
  private String title;
  @Column(columnDefinition = "TEXT") // adattípusváltoztatása // JPA
  private String content;
  private Date posted;
  @ManyToOne // belőlem, sok lehet, de a bloggerből csak 1 => // JPA
  private Blogger author; // 1 cikket 1 blogger ír de 1 blogger több cikket is írhat

  private Index() {
  }
} // + 1 private konstruktor
  // + getter setter, konstruktorok

@Entity // másik tábla // JPA
public class Blogger {
  @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA
  @Id // JPA
  private Long id;
  private String name;
  private int age;
  @JsonBackReference // ha objektumot akarunk adni a front end-nek akkor ez MUSZÁJ, különben az
                     // egymásbaágyazást nem tudja kezelni
  @OneToMany(mappedBy = "author") // az irányító az author // JPA
  private List<Index> indexek;

  private Blogger() {
  }
} // + 1 1 private konstruktor
  // + getter setter, konstruktorok

// ----------------------------------------------------------------------------------------------------------------
// com.projectnév.controller/ => (Home-,Error-,Controller,ExceptionGeneral)
@RestController // fogadhat requesteekt és adhat rá választ, beletehetünk üzeneteket és
                // kivehetünk üzeneteket
public class HomeController {
  @RequestMapping("/") // "/" -t várunk a "localhost/8080" után
  public String index() {
    return "hello";
  }
} // @RestController miatt ezt az üzenetet adja vissza hogy "hello"!!!
// --------

/*
 * Spring Bean Scope-ok:
 * singleton -> egy példány, default
 * prototype -> mindig új példány
 * request -> requestenként egy uj példány => 1 embernek a lap ujratöltésekor
 * mindig uj példány
 * session -> sessiononként egy új példány => 1 embernek 1, pl a kosár, vagy
 * mint süti
 * globalSession -> ...
 */
// =>
@Scope("session") // így működtetjük a scopot... @Scope("session")
public class SpyGirl {
  public String mondjValamit() {
    return "szia:)";
  }
}

@RestController
public class HomeController {
  private SpyGirl s;

  @Autowired // akkor kell autowired ha egy másik klasst tennénk a konstruktorba,
  public void setS(SpyGirl s2) { // igy csak akkor hivja meg ha megkell hívni,
    this.s = s2;
  } // ha nincs labda a kislánynak

  @RequestMapping("/") // "/" -t várjuk
  public String index() {
    return s.mondjValamit();
  }
}
// --------

@Controller // A Controller az "x".html-t jeleníti meg
public class HomeController { // index.html-nek a templates mappában kell lennie
  @RequestMapping("/")
  public String indexnevebármi(Model model) { // kérünk egy modellt,
    model.addAttribute("pageTitle", "az új érték"); // ami adatokat juttat a htmlre
    // amit átadunk: mit,értéke (pageTitle a változó, hogy a htmlbe mi a neve)
    System.out.println(locale.getLanguage());// így érem el a nyelvet + egyéb fgv eit
    model.addAttribute("indexek", iS.getIndexek());
    return "index";
  } // visszaadjuk a html-t amihez adtuk a változókat

  /*
   * Lehetne így egy itt kreállt Listát is átadni a model ben
   * a frontend-nek, de mi adatbázisból szedjük ki a dolgokat..
   * private ArrayList<Index> getIndex(){
   * ArrayList<Index> indexek= new ArrayList<>();
   * 
   * Index i1=new Index();
   * i1.setTitle("Első story");
   * i1.setPosted(new Date());
   * i1.setAuthor("kiki");
   * i1.setContent("<p>ÉLES adat</p>");
   * 
   * Index i2=new Index();
   * i2.setTitle("második story");
   * i2.setPosted(new Date());
   * i2.setAuthor("kiki2");
   * i2.setContent("<p>ÉLES adat ez is</p>");
   * 
   * indexek.add(i1);
   * indexek.add(i2);
   * return indexek;
   * }}
   */

  @RequestMapping("/inde") // az inde oldal hova vezessen?
  public String cicusk(Model model) {
    model.addAttribute("pageTitle", "az új érték");
    model.addAttribute("index", iS.getIndex());
    return "inde";
  } // inde.html, ugyanaz mint az index.html, csak ciklus nélkül

  @RequestMapping("/title/{title}") // az adatbázisnak szállítunk változót
  public String storyKeresés(@PathVariable(value = "title") String title, Model model) throws Exception {
    if (title == null) {
      throw new Exception("Nincs ilyen cimmel sztori");
    }
    model.addAttribute("pageTitle", "az új érték");
    model.addAttribute("index", iS.getSpecificStory(title));
    return "inde"; // egy cím alapján keres
  }

  @RequestMapping("/user/{id}")
  public String userKeresés(@PathVariable(value = "id") String id) throws Exception {
    if (id == null) {
      throw new Exception("Nincs ilyen ID-val felhasználó");
    }
    return "user";
  }

  @ExceptionHandler(Exception.class) // ez csak az itteni exceptionokat kezeli le
  public String exceptionHandler(HttpServletRequest ra, Exception ex, Model model) {
    model.addAttribute("errMessage", ex.getMessage());
    return "exceptionHandler"; // ide írányatjuk
  }

  private IndexService iS; // az összekötőnk

  @Autowired
  public void setiS(IndexService iS) {
    this.iS = iS;
  }
}
// --------

// a minden exceptiont lekezelő kontroller:
@ControllerAdvice
public class ExceptionGeneral {

  @ExceptionHandler
  public String exception(Exception ex, Model model) {
    model.addAttribute("exception", ex);
    return "exceptionlekezelőoldal"; // ez így minden kivételt ide irányít
  }
}

// --------
// az error page controller:
@Controller
public class ErrorPageController implements ErrorController {

  private static final String ERR_PATH = "/error";
  private ErrorAttributes ea;

  @Autowired
  public void setErrorAttributes(ErrorAttributes ea) {
    this.ea = ea;
  }

  @RequestMapping(ERR_PATH) // error fele irányuló kéréseket kapja el és adjon választ
  public String error(Model model, HttpServletRequest r) {
    ServletWebRequest rA = new ServletWebRequest(r);
    // vagy RequestAttribute ra = (RequestAttribute) new
    // ServletRequestAttributes(r);
    Map<String, Object> e = this.ea.getErrorAttributes(rA, true);
    model.addAttribute("timestamp", e.get("timestamp"));
    model.addAttribute("error", e.get("error"));
    model.addAttribute("message", e.get("message"));
    model.addAttribute("path", e.get("path"));
    model.addAttribute("status", e.get("status"));
    return "detailedError";
  }

  @Override
  public String getErrorPath() { // hova irányítsa a hibát?
    return ERR_PATH; // az errorra => @RequestMapping(ERR_PATH) ide
  }
}
// az uj errorpage: -----

// --------
// JSON objektum visszaadása front end-nek
@RestController
public class ApiController {

  private IndexService ie;

  @Autowired
  public void setIe(IndexService ie) {
    this.ie = ie;
  }

  @RequestMapping("/inde")
  public Index cicusk() {

    return ie.getIndex();
  }

  @RequestMapping("/title/{title}")
  public Index storyKeresés(@PathVariable(value = "title") String title) {

    return ie.getSpecificStory(title); // egy cím alapján keres
  }

  @RequestMapping("/index/{name}")
  public List<Index> storyKeresésNévAlapján(@PathVariable(value = "name") String name) {

    return ie.getStoriesByBloggerName(name); // egy név alapján keres
  }
}

// ----------------------------------------------------------------------------------------------------------------
// com.projectnév.service/ => repokat köti össze a controllerrekkel, Biznisz
// Logika
// @Service("beambecenév")
@Service
public class IndexService {

  private StoryRepository sR;
  private BloggerRepository bR;

  @Autowired
  public void setbR(BloggerRepository bR) {
    this.bR = bR;
  }

  @Autowired
  public void setsR(StoryRepository sR) {
    this.sR = sR;
  }

  public List<Index> getIndexek() {
    // init();// ezzel a probléma, hogy oldal frissitéskor ujra létrejön
    return sR.findAll();
  }

  public Index getIndex() {
    return sR.findFirstByOrderByPostedDesc();
  }

  public Index getSpecificStory(String title) {
    return sR.findByTitle(title); // itt kell lekezelni azt a hibát ha a kért adat nem létezik....!!!!
  }

  public List<Index> getStoriesByBloggerName(String name) {
    return sR.findAllByAuthorNameIgnoreCaseOrderByPostedDesc(name);
  }

  // @PostConstruct // így viszont 1x fog lefutni mindig a létrejöttekor
  // public void init() { // de az sql-s megoldás amit használni fogunk!!!
  // Blogger blog=new Blogger("belsőgyula",25);
  // bR.save(blog); // itt csak bloggereket
  // Index ind = new Index("belső cím","belső tartalom",new Date(),blog);
  // sR.save(ind);} // itt csak indexet vihetek fel
}

// ----------------------------------------------------------------------------------------------------------------
// com.projectnév.repository/ => az objektumoknak a repo-ja(kapcsolat az
// adatbázissal)
@Repository
public interface StoryRepository extends CrudRepository<Index, Long> { // JPA
  List<Index> findAll(); // SELECT * FROM stories

  Index findFirstByOrderByPostedDesc(); // Select * FROM stories where posted in (Select max(posted) From stories) limit
                                        // 1;
  // Index findByTitle(String title);}

  List<Index> findAllByAuthorNameIgnoreCaseOrderByPostedDesc(String name); // Index.author.name -eket keresi csökkenő
                                                                           // sorrendbe

  @Query(value = "select*from stories where cím=?1 limit 1", nativeQuery = true) // normál sql írása, cím=?1 => 1===első
                                                                                 // paraméter
  Index findByTitle(String title);

  // @Query(value="select*from stories where cím=:title limit 1",nativeQuery=true)
  // // cím=:title
  // Index findByTitle(@Param("title")String title); // @Param("title") //ezzel
  // egyenlő
  @Repository
  public interface BloggerRepository extends CrudRepository<Blogger, Long> {
    List<Blogger> findAll();
  }

  // jdbc repo:
@Repository
public class StoryRepository {
	private JdbcTemplate jdbc;
	@Autowired
	public StoryRepository(JdbcTemplate jdbc) {
		this.jdbc=jdbc;
	}
	public List<Index> findAll() {   // service-ben maradt minen
		String sql="select*from Story order by posted desc";
		return jdbc.query(sql, (rs,i)->new Index(
				rs.getLong("id"),
				rs.getString("title"),
				rs.getString("content"),
				rs.getDate("posted"),
				rs.getLong("blogger_id") // SQL tábla oszlopai
				));} // + kell inicializálóschema-h2.sql és data-h2.sql

	public Index findByTitle(String title) {
		String sql="select * from Story where title=?1 order by posted";
		return jdbc.queryForObject(
				sql, 
				 new Object[] {title},  // param átadás
				(rs,i)->new Index(
						rs.getLong("id"),
						rs.getString("title"),
						rs.getString("content"),
						rs.getDate("posted"),
						rs.getLong("blogger_id")
						));
	}
@Repository
public class BloggerRepository {
	private JdbcTemplate jdbc;
	@Autowired
	public BloggerRepository(JdbcTemplate jdbc) {
		this.jdbc=jdbc;
	}
}

//----------------------------------------------------------------------------------------------------------------
// thymleaf- es html ek
/* index.html:
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"    xmlns:th="http://www.thymeleaf.org">
	//fontos hogy jelen legyen a htmlben
<link rel="stylesheet" th:href="@{css/main.css}" href="../static/css/main.css"/>
// + hivatkozás a css-re:		// ezt írtuk mi				// ezt a dizájner
	<head>
		<title th:text="${pageTitle}"> régi title</title>
	</head>
	<body>
		<article th:each="index : ${indexek}">  // => ez egy for ciklus,
			<header>							// indexek változó jön a modellel
				<h1 th:text="${index.getTitle()}"></h1>
				<p th:text="${#dates.format(index.posted,'yyyy.MM.dd')}"></p> 
				// => a dátum formatálása fgv meghívással, a posted Date típusú...
				<p th:text="#{yourip}">101010</p>
				<p th:text="#{footerText}">101010</p>
			</header>
			<section th:utext="${index.content}"> </section> // tegeket eltünteti amit mi épitettünk bele 
			<footer>	// => nem kell a getContent() mert felismeri így is, még ha privát akkor is
				<address>
				Beküldve: <span th:text="${index.author.name}">anonimus</span>
				</address>
			</footer>
		</article>
	</body>
</html>*/
/* az uj error page:
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"    xmlns:th="http://www.thymeleaf.org">
<head>
	<title th:text="${pageTitle}"> régi title</title>
</head>
<body>
    <article >
    <header>
        <h1 th:text="${error}">ez a gond</h1>
    </header>
    <section > 
        <p th:text="${message}">ez az üzenet</p>
        <p th:text="${path}">elérési út</p>
        <p th:text="${status}">státusz</p>
        <p th:text="${timestamp}">időpont</p>
    </section>
    </article>
</body>
</html>*/
//----------------------------------------------------------------------------------------------------------------
/* uj dependency: spring-boot-starter-security
spring.security.user.name=abc
spring.security.user.password=abc		
spring.security.user.roles=USER,ADMIN

@RestController
public class APIController {

	@RequestMapping("/")				// a 8080 as port jelszót kér és felhasználónevet
	public String index() {
		return "Főoldal";
	}

	@Secured("ROLE_USER")
	@RequestMapping("/story")
	public String story() {
		return "story";
	}
	
	@Secured("ROLE_ADMIN")
	@RequestMapping("/delete")
	public String delete() {
		return "Delete";
	}
}

src/main/java/com.sec.config	// egy új package-be: SecConfig.java =>
*/
@EnableGlobalMethodSecurity(securedEnabled = true)
@Configuration
public class SecConfig extends WebSecurityConfigurerAdapter{

	@Autowired					// itt definiáljuk azt amit az application.properties -ben tesztelés céljából beállítottunk
	public void configureAut(AuthenticationManagerBuilder auth) throws Exception{
		auth
			.inMemoryAuthentication()
				.withUser("sfj")
				.password("{noop}pass")
				.roles("USER")
			.and()
				.withUser("sfjadmin")
				.password("{noop}pass")
				.roles("ADMIN");
	}
	@Override
	protected void configure(HttpSecurity httpSec) throws Exception{ // itt meg hogy ki mit érjen el
		httpSec
			.authorizeRequests()
				.antMatchers(HttpMethod.GET,"/").permitAll() // mindent engedéjezz ami a "/" csatornára jön
				.antMatchers("/delete").hasRole("ADMIN")	// aki a /delete-re megy annak adminnak kell lennie
				.antMatchers("/admin/**").hasRole("ADMIN") // admin/bármire ===** irányul
			.and()
				.formLogin().permitAll();  // a bejelentkező képernyőt így mindenki elérheti	
	}
	
	
}
//----------------------------------------------------------------------------------------------------------------
// thymleaf security 
// <html lang="en" layout:decorate="~{layouts/main}"> 	// azt mondjuk meg hogy mi veszi körül a html-t? => layouts/main.html
// <body> <div layout:fragment="loginContent"> </body> 	// a kapcsoló pont,fragment a main.html-ben "loginContent" néven fut 
// a main.html a telejs weboldal, ahol a css-ek megvannak hívva + minden más ami kell
// <div layout:fragment="loginContent"> </div>			// main.htmlben csak ennyi van

// <form name="login" th:action="@{/login}" method="post"> // a post form hova irányítson? => /login  -ra
// <div id="err" th:if="${param.error}" class="alert alert-danger">Hibás felhasználói név és jelszó</div>
// <div th:if="${param.logout}" class="alert alert-success">Sikeresen kijelentkeztél</div>
// th:if => csak akkor jelenik meg ez a div, ha igaz amivel egyenlő
// <span sec:authentication="name">Anonymous </span>   // a sec-ből kiveszi az authentikáló nevét, 
// ha bevan jelentkezve, ha nincs akkor azt írja ki hogy Anonymous
// <form sec:authorize="isAuthenticated()" id="frmlogout" th:action="@{/logout}" method="post" class="form-inline">
//| <a href="javascript:{}" onclick="document.getElementById('frmlogout').submit(); return false;">Kijelentkezés</a> </form>
// új form, sec:authorize="isAuthenticated()" => ha autentikálva vagy akkor jelenik meg a Kijelentkezés gomb ami /logout -ra irányít
@Override			// secConfig.java
protected void configure(HttpSecurity httpSec) throws Exception{
	httpSec
		.authorizeRequests()
			.antMatchers("/admin/**").hasRole("ADMIN") 	// admin/bármire ===** irányul
			.anyRequest().authenticated()  				// minden oldal autentikáció köteles
			.and()
		.formLogin()
			.loginPage("/login") // hova irányitson a fromlogin?
			.permitAll()		 // engedélyezem mindenki számára
			.and()
		.logout()
			.logoutUrl("/login?logout") // kijelentkezéskor a login oldalra irányits
			.permitAll();} 				// + 1 paramétert átadunk neki = logout
@Configuration		// WebConfig.java:    melyik oldal melyik mappába van?
public class WebConfig implements WebMvcConfigurer { // nézettel kapcsolatos dolgok, 
	@Override
	public void  addViewControllers(ViewControllerRegistry reg) {
		WebMvcConfigurer.super.addViewControllers(reg);
		reg.addViewController("/login").setViewName("aut/login"); // hol találja a / login-t? =>aut mappába
		reg.setOrder(Ordered.HIGHEST_PRECEDENCE);}}
// controllerbe:
@RequestMapping("/registration")
public String registration(Model m){
	m.addAttribute("user",new User());	// a felhasználótol az adatbázisba visszaszállítás egy modellen keresztül
	return "registration";				// létrehozzuk azt az új Usert
} // a form-ba jelezni kell az adatot amit szállítunk "user" néven
//< form name="registration" th:action=@{/reg} th:object="${user}" method="post">
//<input type="text" id="username" name="username" th:field="*{username}" placeholder="Felhasználói név"/>
//												   th:field="*{username}"  => AZ objektum osztályváltozójának a neve
@RequestMapping(value="/reg",method=RequestMethod.POST)
public String greetingSubmit(@ModelAttribute User user){ // User típusu paramétert átvesz  ami a front endtől jön
	user.getUsername(); // itt azt csinálunk vele amit akarunk
	return"aut/login";	// majd a bejelentkezés oldara irányítunk
}
// LOGOLÁS:
// application.properties
// logging.level.com.sec=DEBUG           // vagy INFO stb
// controllerbe:
private final Logger log = LoggerFactory.getLogger(this.getClass());
log.info("ezt az infoba teszszük");
log.debug("ezt a debugba teszszük");
//----------------------------------------------------------------------------------------------------------------
// email küldése:
// application.properties
// spring.mail.host: smtp.gmail.com
// spring.mail.port: 25
// spring.mail.username: ballerk@gmail.com
// spring.mail.password: 
// spring.mail.properties.mail.smtp.starttls.enable : true
// spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
// https://www.youtube.com/watch?v=OhmB8v1-3Z4&list=PLyriihBWoulxdsrKphv-dN022imGHDizM&index=14
//----------------------------------------------------------------------------------------------------------------
// application.properties alternatívája => src/main/resources  -> jobb klikk nyew file -> application.yaml
/*
common:
    database:
        username:admin
        username:password
        url:127.0.0.1
    emailserver:
        url:127.0.0.1
*/
//----------------------------------------------------------------------------------------------------------------
// Projekt létrehozása:
// groovy módzser: hello.groovy file létrehozása
/*->
@RestController
class WebApplication{
    @RequestMapping("/")        // egy futó szerveren, ami a / jel után van returnolja vissza a Hello World!-öt
    String home(){
        "Hello World!"}}        // return Hello World! */
// cmd-be: spring run hello.groovy
// localhost:8080 -on megjelenik a hello world!...
// cmd-be: spring run hello.groovy -- --server.port=9000
// localhost:9000 -on megjelenik a hello world!...


// https://start.spring.io/        gyorsan kezdeti projekt készítése

// 3 csomagoló rendszer: Ant, Maven, Gradle
// MAVEN módszer:
// ahova tettük az automatán generált filet, annak a mappályába belemegyünk.
// cd /d e:\programozás\java\
// majd: mvn install        // összes szükséges dependencia letöltése

// VAGY STS ECLIPSE segítégével ugyanez...

// cd /d E:\programozás\java\springbootworkspace\ElsoSpring
// mvn install
//-> összecsomagolja a target mappába a projektet
// cd target
// java -jar elsospring-0.1.jar         // -> a 8080 as porton elérhető a Tomcat szerver
//----------------------------------------------------------------------------------------------------------------

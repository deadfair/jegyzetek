/*------------------------------------------------------------------------------------------------------------------------------------------
// VSC kiegészítők: auto import,
npm install -g @angular/cli
/*------------------------------------------------------------------------------------------------------------------------------------------
CLI
ng new MyApp        	// létrehozza a MyApp új projectet
ng serve            	// live szerver indítása
ctr + c               // leállítása
ng build		          // a kész projektet elkészíti => kitehetjük weboldalra ,(deploy)

ng g c KomponensNév	// uj komponens generálása
ng g module MNév	  // uj modul generálása    // a modulok a komponenseket fogja össze
ng g s ServiceNév	  // uj szervice generálása
ng g class <ClassNév>
ng g pipe <PipeNév>
ng g directive <DirectiveNév>

ng g m products --route products --module app.module  // generál egy modult a products mappába, +route ami bekötve a fő route-ba, +app module is frissítve

ng			// összes parancs eflsorolása
ng update @angular/cli @angular/core

https://angular.io/cli
//------------------------------------------------------------------------------------------------------------------------------------------
// Konvenciók, good vs bad practice https://angular.io/guide/styleguide

1 file max 400 sor
1 fgv max 75 sor 
// név stratégiák:
fájl-név.típus.ts           // típusok: .service, .component, .pipe, .module, .directive
fájl-név.típus.spec.ts      // teszt file
fájl-név.e2e-spec.ts             // end to end teszt file

component-selector: kebab-case
class:              PascalCase
directivaSelector:  camelCase
pipeName:           camelCase

fentről lefelé a komponensbe :
public props, private props, constructor, public methods, private methods
komponensbe minél kevesebb logika legyen
output propertík NE "on"-al kezdődjenek
a logika a ts-be legyen NE a htmlbe => {{totalPowers / heroes.length}} helyett => {{avgPower}}
inputnak adjunk kezdőértéket */
//------------------------------------------------------------------------------------------------------------------------------------------
app.module.ts =>
@NgModule({                 // ö egy annotáció ő mondja meg hogy a AppModule egy Module
  declarations: [	          // komponensek helye  
    AppComponent
  ],
  imports: [		            // modulok helye      // pl.: bejelentkezésért felelős modul
    BrowserModule,	
    AppRoutingModule,
    StandAloneComponent     // ha standalone, akkor importok közé kell tenni
  ],
  providers: [// service-ek helye   // (pl.:lekér adatot a szervertől)
    {provide:PostService, useClass:PostMockService}   // mock servise neve a PostService lesz 
  ],		        
  bootstrap: [AppComponent]	// melyik az első komponens amit bekell tölteni?
})
export class AppModule{}
/*------------------------------------------------------------------------------------------------------------------------------------------
Angular jövője lehet a "Standalone", ami lehet: PIPE COMPONENT és DIRECTIVE
Ha mindenki standalone lesz, még a app.component is akkor nincs szükség app.module-ra, modulokra, 
a main.ts =>
bootstrapApplication(AppComponent);
// bootstrapApplication(AppComponent, { providers: [AnalyticsService] }); // 2. paramétere a service-k helye
// bootstrapApplication(AppComponent, { providers: [AnalyticsService, 
// importProvidersFrom(AppRoutingModule)] }); // ha van routing-module

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// lazy loading standalone componentel: 
loadComponent: () => import('./about/about.component').then((mod) => mod.AboutComponent),

// routes.ts : (csak ennyi kell ha egy alruteot akarunk lazí loaddal)
// export const ROUTES = [
	{
		path: '',
		component: DashboardComponent,
	},
	{
		path: 'today',
		component: TodayComponent,
	},
];
// app-routing-module:
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/routes').then((mod) => mod.ROUTES),
	},
/*------------------------------------------------------------------------------------------------------------------------------------------
app.component.ts =>*/
import {Component} from '@angular/core';
@Component({
  standalone: true,           // ettől lesz stand alone
  imports: [SModule,HDirective],	      // azé kell, hogy megkapja a SharedModule dolgait, 
// és a direktívát HA standalone a komponens és a direktíva is
  selector: 'app-root',  		            // <app-root></app-root>      
//selector: '.app-root',                // <div class="app-root"></div>     // NE IGY
//selector: '[app-root]',               // <div app-root></div>             // NE IGY      
  templateUrl: './app.component.html',  // melyik html-t töltse be? 
//template: '<h1>Hello World</h1>',     // vagy így is lehet helyben megcsinálni
  styleUrls: ['./app.component.css']	  // milyen style.ok tartozzanak hozzá?
//  styles: ['h1 { font-weight: normal; }']
})
export class AppComponent implements OnInit{  // app.component.ts
  constructor(/*service importok */){}       
  ngOnInit():void{}                     // akkor fut le amikor betölt a komponens
}
//------------------------------------------------------------------------------------------------------------------------------------------
// Lifecycle Hooks:         // minden komponensnek KELL lennie életciklusnak

// ngOnChanges(c:SimpleChanges) // Az ngOnInit() előtt hívódik (ha a komponensnek vannak kötött bemenetei), (@Input)  // c-be vannak a változások amiket érzékelt a komponens
//                          // és minden alkalommal, amikor egy vagy több adathoz kötött bemeneti tulajdonság megváltozik.(@Input)
// ngOnInit()               // Egyszer hívódik meg és minden esetbe lefut, ha van ngOnChanges(), akkor utánna
// ngDoCheck()              // Közvetlenül az ngOnChanges() után hívódik minden változásérzékelési futtatáskor, 
//                          // és közvetlenül az ngOnInit() után az első futtatáskor.
// ngAfterContentInit()     // Egyszer hívódik az első ngDoCheck() után. (ng-content init után)
// ngAfterContentChecked()  // Az ngAfterContentInit() és minden ezt követő ngDoCheck() után hívódik.
// ngAfterViewInit()        // Egyszer hívódik az első ngAfterContentChecked() után. (amikor kirenderelődött a view)
// ngAfterViewChecked()     // Az ngAfterViewInit() és minden ezt követő ngAfterContentChecked() után hívódik.
// ngOnDestroy()            // Közvetlenül azelőtt hívódik, hogy az Angular megsemmisíti a direktívát vagy a komponenst.
/*------------------------------------------------------------------------------------------------------------------------------------------
{{ name }}                          //  .ts  => HTML  // a name változó real time értéke, a .ts -ből                        // interpoláció
{{ getName() }}		                  // lehet fgv.
{{"A neve: "+ name}}		            // vagy bármilyen js kód is akár
routerLink="./edit/{{exam._id}}"    // lehet de inkáb prop bindingal az ilyet !!!

@Input('ilyenNévenKapomKivülről') props:string  // gyerekbe .ts   // dinamikusan változtathatjuk a prop értékét a szülőbe(kerülendő, csak akkor ha muszáj)
[prop]="value"            // szülő HTML     // .ts  => HTML       // a props: komponens inputja, a value: a .ts változója   // property bind-ing
[name]="fruit"      or name="{{fruit}}"                           // valós idejű 1 irányú kötés   // .ts  => HTML
[attr.name]="fruit" or attr.name="{{fruit}}"  

(clickEvent)="fgv($event)"                      // szülő HTML     // HTML  => .ts                                           // event bind-ing
fgv(value.string){this.valami=value}            // szülő .ts      // a this.value egyenlőlesz a 'valami value' -vel
@Output() clickEvent : EventEmitter<any> = new EventEmitter();    // gyerekbe .ts
(click)="fgvgyerek('valami value')""                              // gyerekbe html
fgvgyerek(value:string){this.clickEvent.emit(value)}              // gyerekbe .ts                                           

[(ngModel)]="prop" // HTML <=>  .ts   // a props: Ez a komponens változója, pl input komponensre kötjük, 
// így valós időbe változik a props, ha változik az input értéke, típusa string  // ngModel-hez kell a FormsModul      
/*------------------------------------------------------------------------------------------------------------------------------------------
// Default, beépített Angular Események, eventek
(click)="fgv()"	            // click eseményre meghívjuk a fgv()-t ami az akt. komponensbe van
(keyup.enter)="fgv()"       // enter lenyomása után, a fgv() lefut
(change)="fgv()"            // érték változáskor lefut a fgv
(dblclick)="fgv()"
(ngSubmit)="fgv()"          // form submit esemény
(btncClick)="fgv()"

<input #x (keyup)="0">                   // érzékeli a gomb lenyomását de nem hív meg fgv-t => olyankor jó, ha 
{{x.value}}                              // vhol megakarjuk jeleníteni amikor változik  
/*------------------------------------------------------------------------------------------------------------------------------------------
// Pipe-ok => az eredeti adatot nem módosítja, csak a megjelenést!
// Pipe-ok-at csak formázásra használjuk, a filter és sort erőforrás igényes NE
{{     | json}}                   // JSON formába alakít
{{     | async}}                  // Observable-t alakít értékre amikor emmittálódik +++ Observable<T> | Subscribable<T> | Promise<T>
{{name | titlecase}}              // nagybetűvel kezdődik
{{name | uppercase}}		          // a name változót futtassa át az uppercase-n ami a CommonModulba van benne 
{{name | lowercase}}		          //  
{{name | slice: -11}}		          // string slice fgv 
{{name | percent}}		            // 0.235 => 24%         https://angular.io/api/common/PercentPipe
{{name | percent:'4.1-5'}}	      // 0.235 => 0,023.5%    (tizedespont elötti számjegyek dbszáma).(-||- utáni MINIMÁLIS dbszáma)-(-||- MAXIMÁLIS dbszáma)  
{{name | percent:'4.1-5':'fr'}}	  // 0.235 => 0 023,5% 
{{name | number}}          {{name | number:'4.1-5'}}	      {{name | number:'4.1-5':'fr'}}	 
// ugyanaz mint a percent, csak % nélkül és nem szoroz 100-al
{{name | date: 'long'}}		        // dátum formázás   // {{name | date: 'short'}}	 // stb.	       
{{name | date: 'yyyy.MM.dd HH:mm'}} // stb.
{{ value | date [ : format [ : timezone [ : locale ] ] ] }}                                         https://angular.io/api/common/DatePipe
{{ value_expression | currency [ : currencyCode [ : display [ : digitsInfo [ : locale ] ] ] ] }}    https://angular.io/api/common/CurrencyPipe
// pénznem kiírás

/*---------------------------
Saját Pipe =>                         Ha name = "kiki" 
<p>{{name | myPipe}}</p>              Mr. kiki
<p>{{name | myPipe:'Herr.'}}</p>      Herr. kiki        // + paraméterek ":" után     */
import{Pipe,PipeTransform} from '@angular/core'
@Pipe({name:'myPipe'})      // Pipe neve
export class MyPipe implements PipeTransform{
  transform(value:string,prefix:string ="Mr. "):string{
    return `${prefix} ${value}`;
  }
}
//---------------------------
// ERŐFORRÁS IGÉNYES, LEHET DE FILTER ÉS SORTOT NE PIPE-AL !!!
// HTML:  // select   =>  [(ngModel)] = "szelekt" // inputba  =>  [(ngModel)] = "szürőszöveg"
// táblázat =>  *ngFor= let rows of list | szűrő :szürőszöveg: szelekt
// @Pipe({
//   name:'szűrő'  // Pipe neve
//   pure:false    // minden adatváltozáskor ujrahívódik, vis asyncron szerüvé teszi
// })      
// export class MyPipe implements PipeTransform{
//   transform(value:any[],phrase:string ="",key:string=""):any{       // ide az ngModel value értekei fognak becsöppenni
//     if (!phrase) {return value}
//     phrase = phrase.toLowerCase()
//     return value.filter(val=>{
//       if (!key || key==="notset") {
//         let isOk:boolean =false;
//         for (const k in val) {
//           let check = val[k].toString().toLowerCase()
//           if (check.indexOf(phrase)>-1) {
//             isOk = true;
//           }
//         }
//         return isOk;
//       }else{
//         let check = val[key].toString().toLowerCase()
//         return check.indexOf(phrase)>-1
//       }
//     })
//   }
// }
// => csak azokat jeleníti meg ami szerepel a beírt szövegnek
// Az App componentben =>
/*------------------------------------------------------------------------------------------------------------------------------------------
// Direktívák // a * jelöli azt hogy a direktíva struktúlális vagyis elem megjelenítéséért felel
// a motorháztető alatt az történik hogy 
<div *ngIf='feltétel'></div>          // ezt átalakítja =>
<ng-template [ngIf]='feltétel'>       // ezzé
  <div></div>
</ng-template>
//------------------------------------------------------------------------------------------------------------------------------------------
// *ngIf 
// <div hidden></div>                  // a div nem jelenik meg, OTTVAN de css property miatt nem látszik
// <div [hidden]="feltétel1()"></div>  // ha a feltétel1() igaz => akkor lesz hidden => nem látszik
// AZ *ngIf JOBB NAGYOBB FÁKON !!! =>

<div *ngIf="feltétel()"></div>                                    // így a divre értendő az IF
<div *ngIf="feltétel(); else nemIgazAg"></div>                
<div *ngIf="feltétel(); then igazAg else nemIgazAg"></div>        // CSAK AZ EGYIK LÉTEZIK
  <ng-template #igazAg></ng-template>                             // ha a feltétel igaz, akkor ez LÉTEZIK, 
  <ng-template #nemIgazAg></ng-template>                          // ha a feltétel nem Igaz, akkor ez az element LÉTEZIK
//------------------------------------------------------------------------------------------------------------------------------------------
// ngSwitch
<div [ngSwitch]="egyVáltozó">   // azért jó, mert NEM csak true és false eseteket tudunk lekezelni
  <div *ngSwitchCase="'Béla'"> Ha az egyVáltozó==='Béla', akkor ez jelenik meg </div>  
  <div *ngSwitchCase="'Jani'"> Ha az egyVáltozó==='Jani', akkor ez jelenik meg </div>  
  <div *ngSwitchDefault>       Default ág </div>  
</div> 
//------------------------------------------------------------------------------------------------------------------------------------------
// *ngFor
<ul>
	<li *ngFor="let user of users; index as i; let f = first">	    // for ciklussal kiírjuk a tömb elemeit
		{{user.name}} ({{user.age}}) - {{i}}      // "as" kulcsszóval importálhatunk a HTML-be értékeket, pl az indexet <= a tömb indexei !!!
	</li>
</ul>
// *ngFor export értékei:     amikket akár *ngIf-be lehet használni
index:number  =>  a tömb indexei
first:boolean =>  true, ha ez az első elem a tömbben
last:boolean  =>  true, ha ez az utolsó a tömbben
even:boolean  =>  true, ha ez akt elem páros indexű a tömbben
odd:boolean   =>  true, ha az akt elem páratlan indexű a tömbben
//------------------------------------------------------------------------------------------------------------------------------------------
// ngClass => dinamikus értékeket amiket felvehet => string, array, object, komponens fgv
[ngClass]="változó"   pl az one az a komponens css-ébe van benne  .one{}
[ngClass]="['változó', 'változó2']"
[ngClass]="{'one':false, 'two':true}"                               //  two van beállítva, a one az nincs
[ngClass]="fgv()"                                                   // a fgv visszatérési az elözö 3 variáció egyike:string,array,object
fgv(){return {'one':this.változó3.változó4=="valami", 'two':true}}  // feltételhez is köthető
// XXX.component.ts be =>  változó='one'; változó2='two'            // .scss-ben => .one{} .two{},  ezeket dinamikusan változgathatjuk...
//------------------------------------------------------------------------------------------------------------------------------------------
// ngStyle
[ngStyle]="{'background-color':'green'}"
[ngStyle]="{'background-color':'green','color':'black'}"
[ngStyle]="{'background-color': változó}"                           // dinamikusan változtathatjuk
[ngStyle]="{'width': skills.values[i] + '%'}"
[ngStyle]="{'background-color': változó==='valami'?'blue' : 'red'}" // feltétel
[ngStyle]="fgv()"     // visszatér egy object el
//------------------------------------------------------------------------------------------------------------------------------------------
// Alternatív DE NE
[class.one]="isSpecial"                                             // ha isSpecial igaz akkor a .one{} class hozzáadódik
[style.font-size]="isSpecial ? '10px':'30px' "                      // ugyanaz
//------------------------------------------------------------------------------------------------------------------------------------------
// Saját Directíva => delay.directive.ts

// constructor bemenetei
constructor(private elRef: ElementRef) {}                                   // => this.elementRef.nativeElement.style.backgroundColor = 'green';
constructor(private renderer:Renderer2, private elementRef:ElementRef) {}   // => this.renderer.setStyle(this.elementRef.nativeElement,'background-color','blue')
struktúrális '*' =>
constructor(private tr: TemplateRef<any>, private vc: ViewContainerRef){}   // => this.viewContainerRef.createEmbeddedView(this.templateRef)
//                      mit?                          hova?

// HostListener // esemény halgatására
class AppComponent {
  counter = 0;
  @HostListener('window:keydown', ['$event'])       // mit halgasson?   
  handleKeyDown(event: KeyboardEvent) {             // mi történjen?
    this.counter++;
  }
}

// HostBinding // dinamikusan lehet változtatni, hogy egy class v style létezzen e az elemen (true, false)
@HostBinding('style.color') color;    // ez arra jó, hogy változót kötünk a komponens stlyle.color értékéhez pl. DIREKTÍVÁBA
Igy majd a direktíva bemeneteivel tudjuk kontrolálni az elem style értékét

// Direktíva Inputai
@Input() defaultColor: string = 'transparent';
@Input('defaultátnevezettColor') defaultColor: string = 'blue';  // az inputot átneveznu így kell, pl magára a direktíva nevére
@Input() set time(time){}                                        // setterrel szebb
//------------------------------------------------------------------------------------------------------------------------------------------
// Saját Directíva példák =>
//---------------------------
@Directive({selector: '[appBasicDirective]'})                       // <p appBasicDirective> I have appBasicDirective</p>
export class BasicDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
//---------------------------
// ez a jobb megoldás =>
@Directive({selector: '[appBetterDirective]'})                      // <p appBetterDirective> I have appBetterDirective</p>
export class BetterDirective {
  constructor(private renderer:Renderer2, private elementRef:ElementRef) { }
  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement,'background-color','blue')
  }
}
//---------------------------
@Directive({selector: '[appHostListenHostBindingDirective]'})       // <p appHostListenHostBindingDirective> I have appHostListenHostBindingDirective</p>
export class HostListenHostBindingDirective {
  @HostBinding('style.backgroundColor') backgroundColor: string = "transparent";
  constructor() {}
  ngOnInit(): void {}
  @HostListener('mouseenter') mouseover(event: Event): void {
    this.backgroundColor = 'blue';
  }
  @HostListener('mouseleave') mouseleave(event: Event): void {
    this.backgroundColor = 'transparent';
  }
}
//---------------------------
// dinamikus adatátadás
@Directive({selector: '[appDinamicDirective]'})  <p [appDinamicDirective]="'yellow'" [defaultColor]="'red'"> I have appDinamicDirective </p>
export class DinamicDirectiveDirective {
  @Input() defaultColor: string = 'transparent';
  @Input('appDinamicDirective') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  constructor() {}
  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;               // default beállítása fontos, hogy az input utáni adat kerüljön ide
  }
  @HostListener('mouseenter') mouseover(event: Event): void {
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(event: Event): void {
    this.backgroundColor = this.defaultColor;
  }
}
//---------------------------
// strukturális direktíva pl egy ngIf ujracsinálása
@Directive({selector: '[appStructuralDirective]'})          // <p *appStructuralDirective="isOdd">Ha isOdd true megjelenek</p>
export class StructuralDirectiveDirective {
  @Input() set appStructuralDirective(condition: boolean){ 
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else{
      this.viewContainerRef.clear();
    }
  }
  constructor(private templateRef:TemplateRef<any>,private viewContainerRef:ViewContainerRef ) { }  // mit? hova?
}
//---------------------------
@Directive({selector:'[appStructuralDirective2]'})          // ===> <p *appStructuralDirective2="5000">5 sec mulva jelenik meg</p>
expot class StructuralDirective2{
  @Input() set appStructuralDirective2(time){
    let delayTimeout=setTimeout(()=>{
      clearTimeout(delayTimeout);                           // memóriábol eltávolítjuk a felesleges timeoutot
      this.vc.createEmbeddedView(this.tr)                   // hozzáadjuk a viewhoz az elementet
    },time);
  }
  constructor(private tr: TemplateRef<any>, private vc: ViewContainerRef){}
}
//---------------------------
// valós probléma, dropdown: 
@Directive({selector: '[appDropdown]'})
export class DropdownDirective {
	@Input('appDropdown') defaultValue: '' | 'show' = '';
	@HostBinding('class.show') isShow?: boolean;              // az elemre amire rakjuk a direktívát a ".show" class létezik e neki?
	@HostListener('click') click(event: Event): void {        // clickre fel, le szedjök a show class-t
		this.isShow = !this.isShow;
	}
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {      // ha máshova kattintunk zárja be a dropdown-ot
    this.isShow = this.elRef.nativeElement.contains(event.target) ? !this.isShow : false;
  }
  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
    if (this.defaultValue === 'show') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
}

// kód szinten komponens kreálása
<ng-template appPlaceholder></ng-template>

@Directive({
	selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}

private closeSubscription?: Subscription;
@ViewChild(PlaceholderDirective, { static: true })
dynamicChild?: PlaceholderDirective;

private showErrorAlert(error: string): void {
  const hostViewContainerRef = this.dynamicChild?.viewContainerRef;
  hostViewContainerRef?.clear();
  const componentRef = hostViewContainerRef?.createComponent(AlertComponent) as ComponentRef<AlertComponent>;
  componentRef.instance.message = error;
  this.closeSubscription = componentRef?.instance.close.subscribe(() => {
    this.closeSubscription?.unsubscribe();
    hostViewContainerRef?.clear();
  });
}
/*------------------------------------------------------------------------------------------------------------------------------------------
// Template reference, változó
<input #firstname (keyup)="0"></input>    // (keyup)="0"    =>   triggereli a billentyűt ha leütjük, vis frissít egyből
<h1>{{firstName.value}}</h1>              // az input értéke

<componentChild #componentRef></componentChild>
<h1>{{componentRef.selectedCustomer?}}</h1>
// copmponentChild :
public selectedCustomer?:string;   

// ElementRef
ViewChild("elementRef") private element?:ElementRef
// .ts =>
this.element.nativeElement.setAttribute('style','color:red')
this.element.nativeElement.value                // stb

// ng-contentbe átpasszolt elementnek a referenciája, vis a szülöbe rakjuk a #ref -et és a gyerekbe =>
ContentChild("elementRef") element?:ElementRef

//ng-content
<app-valami-component>valami kód</app-valami-component>    // defaultan nem veszi figyelembe a valami kód-ot
<ng-content></ng-content>    // DE ha az app-valami-component-be van vhol ng-content, akkor minden kódot oda pakol be
/*------------------------------------------------------------------------------------------------------------------------------------------
// FORMOK       // FormsModule
// NGMODEL      // ngModel-hez kell a FormsModule
// <input [value]="változó" (keyup.enter)="változó=$event.target.value; fgv()">	
// az input változó az "változó" de NINCS kötés 
// az enter lenyomása után, a komponens változó változója egyenlő lesz az input mező értékével, majd fgv() lefut
// => mostmár van kötés =>

[(ngModel)]=item.nums   // így akár hozzákötöthetem az input értékét egy Subjecthez aminek van nums propja !!! 
<input [(ngModel)]="változó" (keyup.enter)=fgv()>	          // a változó típusa string
// ugyanazt csinálja mint a fentebb lévő DE KELL a "FormsModulee"

<input [ngModel]="változó" (ngModelChange)="modelChange($event)">
public változó!:NgModel
public modelChange(value:string) {}   // value az input valós értéke ez, valós változást néz
// nincs meg az oda vissza kötés, vis ha elötte az oldalon vhol használtuk akkor az már nem változik

#firstName ="ngModel"     // kimentjük az ngModel-jét egy firstName változóba a html be
firstName.dirty           // elérem

[ngValue]= "true" // lehet bármi !! boolean is
value = "true"    // Ez csak string

ngModel részei:
value
touched       // true => ha már belekattintottunk az inputba majd kikattint 
untouched     // ha már belekattintottunk az inputba => false
dirty         // true => ha módosítottuk az értékét
pristine      // dirty ellentetje
valid         // ha az input mező valid => true
invalid       // ha az input mező valid => false                            
errors        // a hibák itt vannak => 
... *ngIf="változo.errors['required']" 
....*ngIf="változo.errors['minlength']" 
... *ngIf="változo.errors['email']" 
// ngModel része => consolba kiolvashatjuk pl. az akt. minlength értékét: változo.error.minlength.requiredLength          


/*--------------------------------
VALIDÁTOROK:    
Template driven (HTML-be) =>                                          Reactive (.ts-be) =>  
required                // muszáj megadni                             // Validators.required 
requiredTrue            // muszáj true nak lennie, pl.: checkboxnál   // Validators.requiredTrue 
email                   // érvényes email                             // Validators.email       
minlength="3"           // minimum 3 karakter                         // Validators.minLength(3)
maxlength="10"                                                        // Validators.maxLength(10)      
min=16                  // min értéke 16                              // Validators.min(16)      
max=16                  // max értéke 16                              // Validators.max(16)      
pattern="regex"         // [regex] /regex/                            // Validators.pattern("regex") 

egyéb validéátorok:
static nullValidator(control: AbstractControl<any, any>): ValidationErrors | null
static compose(validators: ValidatorFn[]): ValidatorFn | null
static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null

/*--------------------------------
// css osztálkyok a kontroll státuszokhoz =>
.ng-valid .ng-invalid .ng-pending .ng-pristine .ng-dirty .ng-untouched .ng-touched .ng-submitted (enclosing form element only)

input.ng-invalid.ng-touched{
	border: 1px solid red;  // + egyéb css
}




{{ showinputerrors() }}      // a hiba megjelenítését célszerű egy fgv-be kiszervezni ahol a hibától függően jelenítjük meg a hibát
<button [disabled]="!xxxForm.valid">button</button>         // ha nem valid a Form akkor disabled a gomb
//                  !xxxForm.form.valid                     // Template-driven esetén


FromGroup-ok: FromControll-okat és FormGroup-okat is tartalmazhatnak
// 2 út van elötte  =>   
    Reactive        => több kontroll és logika, komplexebb, unit tesztelhetőség
vs  Template-driven => egyszerübb formoknál szuper, könnyü, kevés kód  !!! logika a HTMLben !!!

/*------------------------------------------------------------------------------------------------------------------------------------------
// Template-driven

// form elérése 2 opció, name a property kulcsa amivel majd elérem!!!
<form #xxxForm="ngForm" (ngSubmit)="onSubmit(xxxForm)">     <form #xxxForm="ngForm" (ngSubmit)="onSubmit()"> 
<input ngModel name="email">                                <input ngModel name="email">

// .ts  =>                                                  // .ts  =>                        
onSubmit(xxxForm:NgForm){console.log(xxxForm)}              @ViewChild('xxxForm') form?:NgForm;
//                                                          onSubmit(){console.log(this.form)}
/*--------------------------------
<input ngModel name="email" required minlength="3">   // validátorok az inputra rakjuk 

<input ngModel name="email" #változo="ngModel">       // inputok egyesével történő validálása HTML-ben
<div *ngIf="változo.touched && !változo.valid">

<input [ngModel]="'ballerk@gmail.com'" name="email">  // default érték property bindingal
<input [(ngModel)]="'ballerk@gmail.com'" name="email">// 2 irányú kötés

<div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">     // userData alatt lessz aki a divbe van pl.: 
<p *ngIf="userData.invalid && userData.touched">User Data is invalid!</p> // => userData.email 

/*--------------------------------
// .ts-ben felülírás, kiolvasás=>

// ez reactiveba is igy van


@ViewChild('xxxForm') f?:NgForm;
this.f?.setValue(teljesObject)                                  // felülirja az összes props értéket
this.f?.form.patchValue({csakAmitFelülAkarunkcsapniPropok})     // updateeli
this.f?.value                                                   // a form értékei
this.f?.reset()                                                 // form resete

/*--------------------------------
// xxxForm.value => a form értékee kulcs érték párokként egy objektumba
<form #xxxForm="ngForm" (ngSubmit)="onSubmit(xxxForm)">         // xxxForm.form.valid és egyéb dolgok... az egész Formra
  <div ngModelGroup="name">                                     // egy belső formGroup => xxxForm.value.name.firstName
    <input required  minlength="3"                              // validátorok helye
      ngModel                                                   // ezzel mondjuk meg, hogy formControl legyél
// [(ngModel)]=person.firstname                                 // így hozzákötjük egy person objektum firstname változojához is 
// DEEEEEE ha nem szükséges a bekötés akkor => xxxForm.value.name.firstName jébe is benne van az érték submit után
      name="firstName"                // ezzel mondjuk meg, hogy a  formControl-ra milyen kulcsal hivatkozzunk "firstName" 
      #változo="ngModel">             // helyi HTML változóra tesszük az NgModel jét ennek az inputnak => tudjunk validálni
    <div *ngIf="változo.touched && !változo.valid">
      <div *ngIf="változo.errors.required"> 
        muszáj értéket adni
      </div>
      <div *ngIf="változo.errors.minlength"> 
        minimum {{változo.error.minlength.requiredLength}} karakter 
      </div>
    </div>
  </div>
  <div>
<form>

*///------------------------------------------------------------------------------------------------------------------------------------------
// Reactive     // app-module.ts: ReactiveFormsModule

// SIMPLE:
// HTML:
// <form [formGroup]="signupForm">
// <input formControlName="username" />
// [disabled]="signupForm.invalid"
// <span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"></span>
// .ts:
signupForm:FormGroup =new FormGroup({
  username:new FormControl("default value",[Validátorok], [asyncValidátorok]), // <input formControlName="title" 
  id:new FormControl('',[Validators.required]),
})


// NESTING:
// HTML:
// <form [formGroup]="signupForm">
// <div formGroupName="userData">
// <input formControlName="username" />
// <span *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"></span>
// .ts:
this.signupForm = new FormGroup({
  userData: new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
  }),
});

// FORMARRAY:
// HTML:
// <form [formGroup]="signupForm">
// <div formArrayName="hobbies">
// <button type="button" (click)="onAddHobby()">Add Hobby</button>
// <div class="form-group" *ngFor="let hobbyControl of getControls(); let i = index">
// <input type="text" class="form-control" [formControlName]="i" />
// .ts:
this.signupForm = new FormGroup({
  hobbies: new FormArray([]),
});
getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}
onAddHobby() {
  const control = new FormControl(null, Validators.required);
  (this.signupForm.get('hobbies') as FormArray).push(control);
}



// Errorok
<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']"

// form változásokra feliratkozni: 
this.signupForm.valueChanges.subscribe((data) => {
  console.log(data);
});
this.signupForm.statusChanges.subscribe((data) => {
  console.log(data);
});

// <div class="row" *ngFor="let ingredientControll of controls; let i = index" [formGroupName]="i">

export class RecipeEditComponent implements OnInit, OnDestroy {
	public recipeForm = this.createRecipeForm('', '', '', new FormArray<any>([]));
	public get controls() {
		// (<FormArray>this.recipeForm.get('ingredients')).clear(); // kitörli az egész arrayt
		return (<FormArray>this.recipeForm?.get('ingredients')).controls;
	}
	private selectedRecipe?: Recipe;
	private selectedRecipieSubscription?: Subscription;
	constructor(
		private storeRecipe: Store<Recipe>,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}

	public ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.storeRecipe.dispatch(setSelectedRecipeID(+params['id']));
		});
		this.selectedRecipieSubscription = this.storeRecipe.pipe(select(selectedRecipeSelector)).subscribe((recipe) => {
			if (recipe) {
				this.selectedRecipe = recipe;
				this.initForm();
			} else {
				this.selectedRecipe = undefined;
				this.initForm();
			}
		});
	}
	public ngOnDestroy(): void {
		this.selectedRecipieSubscription?.unsubscribe();
	}

	public onSubmit(): void {
		if (this.selectedRecipe) {
			this.storeRecipe.dispatch(updateRecipe({ ...this.recipeForm.value, id: this.selectedRecipe.id }));
		} else {
			this.storeRecipe.dispatch(addRecipe({ ...this.recipeForm.value, id: undefined }));
		}
		this.onCancel();
	}
	public onCancel(): void {
		this.router.navigate(['../'], { relativeTo: this.route });
	}
	public onDeleteIngredient(index: number): void {
		(<FormArray>this.recipeForm?.get('ingredients')).removeAt(index);
		this.storeRecipe.dispatch(deleteSelectedRecipeIngredientByIndex(index));
	}

	public onAddIngredient(): void {
		(<FormArray>this.recipeForm?.get('ingredients')).push(this.createIngredientFormGroup('', ''));
	}
	private createIngredientFormGroup(name: string, amount: number | ''): FormGroup<any> {
		return this.fb.group({
			name: [name, Validators.required],
			amount: [amount, [Validators.required, Validators.min(1)]],
		});
	}
	private createRecipeForm(
		name: string,
		description: string,
		imagePath: string,
		ingredients: FormArray<any>
	): FormGroup<any> {
		return this.fb.group({
			name: [name, Validators.required],
			description: [description, Validators.required],
			imagePath: [imagePath, Validators.required],
			ingredients: ingredients,
		});
	}
	private initForm(): void {
		let ingredients = new FormArray<any>([]);
		if (this.selectedRecipe) {
			const { name, description, imagePath } = this.selectedRecipe;
			if (this.selectedRecipe.ingredients) {
				for (const ingredient of this.selectedRecipe.ingredients) {
					ingredients.push(this.createIngredientFormGroup(ingredient.name, ingredient.amount));
				}
			}
			this.recipeForm = this.createRecipeForm(name, description, imagePath, ingredients);
		} else {
			this.recipeForm = this.createRecipeForm('', '', '', ingredients);
		}
	}
}








// FormGroup ÉS a formControllnak is lehet =>
// .status (VALID|INVALID|PENDING|DISABLED|PRISTINE)  // pillanatnyi validációs állapota  // formGroupnév.status==='INVALID'      // az egészre vonatkozik
// .value                      // egy objektum amely tárolja a FormControl-ok értékeit    // pl.: value.email,value.name        
// .controls                   // az objektum ami tárolja a group egy FormControl-ait     // formGroupnév.controls.title.valid    // title = a FormGroup egyik értéke
// .[add|remove|set]Control    // hozzáad, eltávolít, frissít egy FormControl-t
// .contains                   // az adott nevű FormControl megtalálható a group-ban?
// .reset                      // visszaállítja a FormControl-ok értékeit

// PL.: lehet egyszerre értéket adni =>
this.dishForm.setValue({image:"",...dish})  // dishformba feltölti a dish mezőít plusz az image mezőjét
this.name?.setValue(dish.name)              // vagy egyesével

// ezeket célszerű getterezni =>
get id():AbstractControl | null{return this.reactiveForm_0.get("id")}
// ====>
  reactiveForm: FormGroup;              // <form [formGroup]="reactiveForm" (ngSubmit)=submit()></form>
  nestedForm:FormGroup;       // akkor kell ha egybeágyazás van
  dynamicForm:FormGroup;      // akkor kell ha nem ugyanazt a referenciát akarjuk használni
  constructor(private fb:FormBuilder){}
  ngOnInit():void{
    this.reactiveForm=this.fb.group({   // <form [formGroup]="reactiveForm" (ngSubmit)=submit()></form>
      title:'',                         // <input formControlName="title"       // háttérbe =>  // title = new FormControl()
      body:'default',                   // <textarea formControlName="body"
      id:1
    })
    this.reactiveForm.valueChanges.subscribe(console.log); // debugolásra, minden változást konzol log oz
// NESTEDFORM
    const user =this.fb.group({           // usersablonok
      email:'',                           // <input formControlName="email"
      name:['',Validators.required]       // validátorok  Validators.required === muszáj megadni
    })
    const user2 =this.fb.group({
      email:'',
      name:['',[Validators.required,              // muszáj megadni
                Validators.pattern("regex...."),  // regex
                Validators.minLength(5),          // hossz min 5
                Validators.email,                 // érvényes email
                Validators.min(16)]]              // min értéke 16
    })
    this.nestedForm=this.fb.group({
      title2:'',
      body2:"",
      author:user,                    // <div formGroupName='author'
      editor:user2
    })
// DYNAMICFORM
    this.dynamicForm=this.fb.group({
      title2:'', 
      body2:"",
      users:this.fb.array([])       // <div form ArrayName="users"
    })                              // <div *ngFor="let user of userForm.controls; let i=index" [formGroupName]="i"
  }//                                                             =>
  get userForm():FormArray{                               //      => ez az userForm
    return this.dynamicForm.get('users') as FormArray;
  }
  get name(){
    return this.nestedForm.get('author.name') // ez azé kell hogy tudnjunk a htmlre rá hivatkozni
  }
  addUser(){
    const user =this.fb.group({
      email:'',
      name:''
    })
    this.userForm.push(user);
  }
  deleteUser(i:number): void{
    this.userForm.removeAt(i);
  }

  submitFrom():void{
    const values=this.reactiveForm.value;
    this.postService.addPost(values).subscribe(console.log);       // a postService nek van egy ilyen fgve
  }
}
// automatice dynamicForm Creator service => a FormGroup -ot hoz létre // => így a html-ben is ciklussal és if-ekkel legenerálhatjuk
export class QuestionControlService{
  constructor(){}
  toFormGroup(question:QuestionBase<any>[]){
    let group:any={}
    question.forEach(question=>{
      group[question.key]=question.required?
        new FormControl(question.value || '',Validators.required)
        : new FormControl(question.value || '')
    });
    return new FormGroup(group);
  }
}
export class QuestionService{           // lenyílófül generálás
  static questions:QuestionBase<any>[]=[
    new DropdownQuestion({
      key:"brave",
      label:"vmi label",
      options:[
        {key:'solid',value:"solid"},
        {key:'good',value:"Good"},
      ],
      order:2
    }),
    new TextboxQuestion({             // textbox
      key:"name",
      label:"name",
      type:"text",
      order:1
    })
  ]
}


/* post-create.component.html:
<form [formGroup]="reactiveForm" (ngSubmit)="submitForm()">   // ez a reactiveForm === reactiveForm: FormGroup; 
  value:{{reactiveForm.value | json}}                         // debugolásra      // (ngSubmit)="submitForm()"==> form submitoláskor mi történjen? 
  <mat-form-field>
    <mat-label>ez ugyanaz mint a placeholder</mat-label>
    <input formControlName="title">        // a reactiveForm nak az értékei, title, body, id...  
  </mat-form-field>
  <mat-form-field>
    <textarea formControlName="body"></textarea>
  </mat-form-field>
  <mat-form-field>
    <mat-select formControlName="id">      // lenyíló fül   
      <mat-option value="1">  a </mat-option>        // value az id értéke, mert formControlName="id"
      <mat-option value="2">  b </mat-option>   
      <mat-option value="3">  c </mat-option>   
    </mat-select>   
  </mat-form-field>
  <button [disabled]="form.invalid">küldés</button>
</form>             // [disabled]="form.invalid" => amig a form invalid addig a gomb disabled

nested form:
<form [formGroup]="nestedForm" fxLayout="column" >        // ez a nestedForm === nestedForm: FormGroup; 
  value:{{nestedForm.value | json}}                       // debugolásra      
  <mat-form-field>
    <input formControlName="title2">        
  </mat-form-field>
  <mat-form-field>
    <textarea formControlName="body"></textarea>
  </mat-form-field>
  <div formGroupName="author">                      // mivel author:user, ezért így már elérjük az értékeit: name, email
      <mat-form-field>
        <input formControlName="name"> 
        <mat-error *ngIf="name.error?.min && name.touched">   // ha a name értéke hibás őgy hogy min alatt van, és touched vagyis ki kattintottunk
        {{name.error.min.actual}} évesen tul fiatal vagy      // akkor kiírjuk hogy túl fiatal vagy ennyi évesen...
        </mat-error>
      </mat-form-field>      
      <mat-form-field>
        <input formControlName="email">   
        <mat-hint> ide kis tippek jönnek , pl : legalább ennyi és ennyi ilyen olyan betű szám stb..</mat-hint>
        <mat-error *ngIf="email.invalid && email.touched">   // általános hibvaüzenet ha az email invalid és kikattintottunk
            hibás e mail      
        </mat-error>     
      </mat-form-field>
  </div>
</form>

dynamic form:
<form [formGroup]="dinamicForm" fxLayout="column" >  
  value:{{dinamicForm.value | json}}                          
  <mat-form-field>
    <input formControlName="title">        
  </mat-form-field>
  <mat-form-field>
    <textarea formControlName="body"></textarea>
  </mat-form-field>
  <div formArrayName="users">                      // a tömb öt itt érem el
      <div *ngFor="let user of userForm.controls; let i=index" [formGroupName]="i" fxLayout="row" fxLayoutAlign="space-between center">    
      <mat-form-field>
        <input formControlName="name"> 
      </mat-form-field>      
      <mat-form-field>
        <input formControlName="email">        
      </mat-form-field>   
      <button (click)="deleteUser(i)">delete</button>
      </div>
  </div>
  <button (click)="addUser()">add</button>
</form>*/
//------------------------------------------------------------------------------------------------------------------------
// Custom Validator írása
// forbiddenWordsValidator(control: FormControl) {
//   if (this.forbiddenWords.contains(control.value)) {
//       return {'forbiddenWord': true};
//   }
//   return null;
// }
// 'nickname': new FormControl('', this.forbiddenWordsValidator.bind(this))

// zipValidator(zipInput: AbstractControl):ValidationErrors|null {
//   const pattern = /^\d{4}$/
//   return pattern.test(zipInput.value) ? null :{zipError:'do not match pattern 9999'}
// }                                    // null, ha minden rendbe van
// 'nickname': new FormControl('', [this.zipValidator])

// username: new FormControl(null, [ this.forbiddenNames.bind(this)]), 
// forbiddenNames(control: FormControl): { [s: string]: boolean } {
//   if (this.forbiddenUserNames.indexOf(control.value) !== -1) {  // ha class this-jét használom bindolni kell a thist
//     return { nameIsForbidden: true };
//   } else {
//     return null; // HA nincs probléma akkor null KELL
//   }
// }

// async validátor példa, amig tart a validálás addig PEDDING állapotba van
// email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
// forbiddenEmails(controll: FormControl): Promise<any> | Observable<any> {
//   const promise = new Promise<any>((resolve, reject) => {
//     setTimeout(() => {
//       if (controll.value === 'test@test.com') {
//         resolve({ emailIsForbidden: true });
//       } else {
//         resolve(null);
//       }
//     }, 1000);
//   });
//   return promise;
// }

// projectName: [
//   '',
//   [Validators.required, CustomValidators.invalidProjectName, CustomValidators.asyncInvalidProjectName],
// ],

// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';

// export class CustomValidators {
// 	static invalidProjectName(control: FormControl): null | { [s: string]: boolean } {
// 		if (control.value === 'Test') {
// 			return { invalidProjectName: true };
// 		} else {
// 			return null;
// 		}
// 	}

// 	static asyncInvalidProjectName(controll: FormControl): Promise<any> | Observable<any> {
// 		const promise = new Promise<any>((resolve, reject) => {
// 			setTimeout(() => {
// 				if (controll.value === 'TestAsync') {
// 					resolve({ invalidProjectName: true });
// 				} else {
// 					resolve(null);
// 				}
// 			}, 1000);
// 		});
// 		return promise;
// 	}
// }


//------------------------------------------------------------------------------------------------------------------------------------------
/* ROUTING: 
ng generate module app-routing --flat --module=app        // ha nincs routing module
//-------------
// routolás lépései: 
// 1. az app-routing.module.ts-be   definiálni kell hogy milyen url-re milyne komponens legyne aktív 
// 2. a navbáron                    routerLink eket definiálunk, hogy melyik gomb hova vigyen
// 3. a komponensekbe               az elem (click) eseményén meghívjuk a this.router.navigate(["/items"]) -et
// 4. amelyik komponens betöltődik  annál feliratkozunk az activatedRoute-jára és kiszedjük belőle a komponensnek a releváns adatokat, pl ID
// 4.:                              majd a kimentett dolgok alapján lekérjük egy service-ből a nekünk kellő adatokat, amit megjelenítünk
//-------------
<router-outlet></router-outlet>     // az adott router komponensét rendereli ki, dinamikus routerválasztás
//                                  // a router-outlet UTÁN jön létre a komponens, NEM BELE   */
//-------------
// app-routing.module.ts:         
// ngModule({ imports:[
// RouterModule.forRoot(routes)                   // routes -es változó a app-routing.modul.ts-ben
// RouterModule.forRoot(routes, {useHash: true})  // => berak egy # jelet, a szerver miatt, hogy 1 helyen legyen elérhető
// localhost:4200/home => localhost:4200/#/home
// RouterModule.forChild(routes)                  // lazy loading
// exports: [RouterModule]	                      // így exportáljuk az app.module.ts-be, majd ott importáljuk AppRoutingModule néven 

const routes: Routes = [          // sorrendbe fut le lefele
  {
    path:'myCompt',               // localhost:4200/myComp => töltse be a
//  path:'post/:id',              // id alapján  pl.: localhost:4200/post/1
//  path:'post/:id/:name          // id és név   pl.: localhost:4200/post/1/Max
//  path:'**',                    // nem létező route ra mi történjen? pl. fő oldal
    component: MyCompComponent,   // MyCompComponent-st <router-outlet></router-outlet> UTÁN
   	                              // HTML-be elérni => <a routerLink="/myComp"></a> 
    redirectTo:'myCompt',         // átirányítás => a localhost:4200/myComp -ra
    pathMatch:'full'              // átirányításkor típusa 
    // full === akkor irányít át ha nincs más tartalom az elérési útban
    // default === prefix === urlbe megadott útvonal KEZDŐDIK e a megadott útvonalba? =>
    // ha "" ezt akarjuk átirányítani akkor ez mindig át fog mert minden útvonal ezzel kezdődik
    canActivate: [AuthGuardService], 
    data: {                        // statikus adat olyan oldalaknak akik várnak statikusan adatot és ujrahasznosítanánk, pl hibaüzenetek megjelenítése 
			message: 'Page nottt found', // this.route.snapshot.data['message']; így szedem ki, vagy this.route.data.subscribe()
		},
    resolve: { resolvernekaneve: ServerResolverService },
    children: [                    // nested routes =>  ha pl a ServersComponent-ben is van egy router-outlet
      {
        path: ":id/edit",          // localhost:4200/myCompt/10/edit
        component: EditServerComponent,
      },
      {
        path: ":id",
        component: ServerComponent,
      },
    ],
},]    
  
// nem muszáj a lazy loadingal szarakodni, HA a gyökértől megy a route, akkor elég =>
// app modulba beimportálni az egész modult, az app router modulba NEM kell semmi rout neki
// DE a lazy loading optimalizál, csak azt a modult tölti le ami kell 

// admin.module.ts :  // KELL ADMIN MODULE aminek vannak ROUTE-s jai, amik ezek!! =>
ngModule({ import:RouterModule.forChild(routes), exports: [RouterModule]})export class AdminModule {}
const routes: Routes = [
  {                    
    path:'',   
    component:AdminMainComponent,
    children:[       // itt van a kövi réte router-outlet ha többet akarunk bekötni
      {path:'list',component:AdminListComponent},         // localhost:4200/admin/list
      {path:'settings',component:AdminSettingsComponent}  // localhost:4200/admin/settings 
    ]
  },
// DE a app-routing.module.ts be:
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)}
// ígymár ujrahaznosítható az admin module
// DE MOSTMÁR NEM KELL IMPORTÁLNI AZ app.module.ts-be mert a router fogja betölteni ha kell
];
// app-routing-module-ba lazy loadingnál :
imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
// { preloadingStrategy: PreloadAllModules } // optimalizálja a lazy loadingot, ahogy lesz ideje letölti majd a többi modulet is

//-------------
// routerLink           // navigáció a HTML-ben
// lehetőleg mindig abszolút út kell !! => '/valami'  // nem pedig relatív 'valami' === './valami' , a relatív az aktuális eléréshez írja hozzá
//<a routerLink="/myComp"></a>	// routerlinkeket ÍGY ÉRÜNK EL TILOS A href !!!
//   routerLink="/post/1"  => localhost:4200/post/1 -rt tölti be
//  [routerlink]="['/post',2,3,4]"      => localhost:4200/post/2/3/4 -et   // több paraméter esetén
//  [routerlink]="['/post',follower.id]" => localhost:4200/post/X          // X===follower.id
//  [routerlink]="['/post',1]" [queryParams]="{userId:'1',id:'2'}"  // => localhost:4200/post/1?userId=1&id=2
//  [routerlink]="['/post/',1]" [fragment]="'loading'"              // => localhost:4200/post/1#loading
//-------------
// az aktív linkre css rakás :
// <li routerLinkActive="active current" [routerLinkActiveOptions]="{exact:true}">< <a routerLink="/elso"></a></li>
//  routerLinkActive="active current"         // ha ezen az elemen vunk akkor a navbáron lévü li, kap egy active és current css osztályt
// [routerLinkActiveOptions]="{exact:true}"   // csak teljes eggyezésnél lesz aktív
// ha nem lenne beállítva az {exact:true}, akkor "/" és "/elso" re is active lenne egyszerre mert nem teljes eggyezést néz

//-------------
// Router                 // navigáció ts-ben               
constructor(private router: Router, private actRoute: ActivatedRoute) {}
navigateX(id):void{
  this.router.navigate(["/items"])      //       /items           // absolute
  this.router.navigate(["items"])      //        /items           // absolute  // alapból így mindig abszolút 
  this.router.navigate(["items"], { relativeTo: this.actRoute }); // így már relatív lesz
  this.router.navigate(["/items",id])   //        /items/id       // absolute
  this.router.navigate(["/servers", id, "edit"], {queryParams: { allowEdit: "i" }, fragment: "loading",}); // + query + fragment
  this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  // queryParamsHandling: 'preserve' // megtartja az össze eddigi queryparamot
  // queryParamsHandling: 'merge'    // az ujakat megtartja és mergeli a régivel
}
// ha azt akarjuk hogy pl a headerbe, egy komponens ne jelenjen meg ha épp pl az about pagen vunk
//<app-button *ngIf="hasRoute('/items')""  // ha most a /items en vunk akkor megjelenik
hasRoute(route:string){               // kell a Router, hogy lecsekkoljuk melyik odlalon vunk
  return this.router.url===route;     // ha azon amin kell akkor true, ha nem akkor false
}
// router.navigateByUrl(`/hero/${hero.id}`)               // ts-ben navigálunk
// state: RouterState = router.routerState;
// root: ActivatedRoute = state.root
//-------------

// ActivatedRoute:      // megadja hogy melyik Route-n vunk épp 
constructor(private activatedRoute: ActivatedRoute) {}                       
// activatedRoute.url.map(segments => segments.join(''))    // url    => az útvonal url-je
// activatedRoute.data.map(d=>d.user)                       // data   => a komponensnek átadott adatok
ngOnInit(): void {this.subsRouter = this.activatedRoute.paramMap.subscribe(paramMap => this.index = paramMap.get('index'))}
const routes: Routes = [{path:'items/:index', ...}]                            // <= itt az index a felettem lévő index

// 1x fut le                                    // folyamatosan figyeli, OBSERVER
// activatedRoute.snapshot                      // activatedRoute.ParamMap
//.get("index")                                 //.get("index")      // return az "index" nevü paraméter értéke mint string | null
this.router.navigate(['/items', { index: ['bar', 'baz'] } ]);
//.getAll("index")                              //.getAll("index")   // -||- string tömbbe adja vissza az index értékeit (HA több értéke is van..ezt kell használni get helyett) 
this.router.navigate(['/items', index]); 
//.has("index")                                 //.has("index")      // => true ha van olyan paraméternév hogy "index"
//.keys                                         //.keys              // string tömbben adja vissza az összes paraméter értékét
// this.activatedRoute.snapshot.params['id']    // this.activatedRoute.params.subscribe()          // mint a ParamMap
// this.activatedRoute.snapshot.queryParamMap   // this.activatedRoute.queryParams.subscribe()
// this.activatedRoute.snapshot.fragment        // this.activatedRoute.fragment.subscribe()

//-------------
/*
// ROUTER ESEMÉNYEK=> router.events.subscribe(e=>{if(event instanceof NavigationStart{})})
// NavigationStart(navigáció indításakor), 
// NavigationCancel(ha a navigáció védelme megszakítja a navigációt), 
// NavigationError(ha a navigáció váratlan hiba miatt sikertelen), 
// RoutesRecognized(az útvonal elemzés és felismerese esetén aktivált esemény)
// RouterConfigLoadStart(a konfiguráció betöltése előtt aktivált esemény)
// RouterConfigLoadEnd(a konfiguráció betöltése után aktivált esemény)
// NavigationEnd(a navigáció sikeres befejezése után aktivált esemény)

//------------------------------------------------------------------------------------------------------------------------------------------
// Guardok                      // sima service-k, csak más a nevük

CanActivate                     // egy interface, amit majd  implements-elni kell           // rámehetünk e az oldalra?
CanActivateChild                // egy vmi-guard.service védheti a CanActivateChild és CanActivate- et is egyszerre, csak majd a routerbe jü  helyre kell berakni
CanDeactivate<LoginComponent>   // védi a LoginComponent, hogy elnavigálhatunk e az oldalról?
Resolve                         // ha akarnéánk az adatot mielött megejelenítenénk 
CanLoad

// router objektbe =>
canActivate: [AuthGuardService],
canActivateChild: [AuthGuardService],
canDeactivate:[DeactivateGuardService]
resolve: { resolvernekaneve: ServerResolverService },

//---------------------------------------------------------
Resolve  // ha akarnéánk az adatot mielött megejelenítenénk 

// routingba:
resolve: { resolvernekaneve: ServerResolverService },

//component:
this.route.data.subscribe((data) => {
	this.server = data['resolvernekaneve']
})

// serverresolverservice:
interface Server {
	id: number;
	name: string;
	status: string;
}

@Injectable({
	providedIn: 'root',
})
export class ServerResolverService implements Resolve<Server> {
	constructor(private serversService:ServersService) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
		return this.serversService.getServer(+route.params['id']) // a server kell nekünk mielött megjelenítjük a komponenset 
	}
}


export class RecipeResolverService implements Resolve<Recipe[]> {
	constructor(private recipeService: RecipeCrudService, private storeRecipe: Store<Recipe>) {}
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
		const recipeID = +route.params['id'];
		// return this.recipeService.fetchRecipes();    // ez e nem ngrx es módszer kb csak kérni kell az adatot és megnézni hogy ez az adat létezik e
		return this.storeRecipe.pipe(
			select(selectRecipeByID(recipeID)),
			tap((recipe) => {
				if (!recipe) {
					this.storeRecipe.dispatch(getRecipes());
				}
			}),
			filter((recipe) => !!recipe),
			first()
		) as Observable<Recipe[]>;
	}
}
//---------------------------------------------------------
CanActivate

CanActivateGuardService implements CanActivate{
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(!this.auth.loggedInUser){
      return this.router.createUrlTree([""])    // navigate helyett van 
    }
    return true       // mehetek // aktiválódik a guard
  }
} 
//---------------------------------------------------------
class canActivateAdminUser implements CanActivate {
  public user$ = this.store.pipe(select(getUserSelector));
  private user?:User;
  private loginDone$ = this.store.pipe(select(getLoginDoneSelector));
  private loginDone = false;
  constructor(
    private store: Store<AuthState>,
    private toast: ToastService,
    private router: Router
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
    this.loginDone$.subscribe((loginDone) => {
      this.loginDone = loginDone;
    })
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):|Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    if(this.loginDone){     // ha befejeződött a login akkor az adatok megvannak
      return this.user ? this.isEligible(this.user) : false;
    }else{                  // ha nem akkor várjuk
      return this.user$.pipe(
        skip(1), // az első nem érdekel minket az a default érték // refreshnél minden esetbe 1x ujratöltöm a reducerbe az usert
        map(user => this.isEligible(user))
        )
    }
  }

  private isEligible(user: User):boolean{
    if(!this.isAdmin(user)){
      this.authorizationFaild();
    }
    return this.isAdmin(user)
  }
  private authorizationFaild():void{
    this.toast.showError(
      'Autentikációs hiba!',
      'Be kell jelentkezned, hogy a tartalomhoz hozzáférj!'
      );
      this.router.navigate(['/']);
  }
  private isAdmin(user:User):boolean{
    return user.rank === UserRank.ADMIN
  }
}
//---------------------------------------------------------
CanDeactivate

DeactivateGuardService implements CanDeactivate<LoginComponent>{
  canDeactivate(component:RegFormComponent,currentRoute:ActivatedRoute){
    if(component.loginForm.dirty && component.loginForm.value){
      return confirm('elakarod hagyni az oldalt?')?true:false
    }else{
      return true   // elmehet az odlalról
    }
  }
}
//---------------------------------------------------------
CanDeactivate jobb megoldás:

// ezt az interfacet a komponensnek implementálnia kell és a guardnak is, 
export interface CanComponentDeactivate {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
	providedIn: 'root',
})                    
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
	constructor() {}
	canDeactivate(
		component: CanComponentDeactivate,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return component.canDeactivate();
	}
}

// ez megy a komponensbe => mert HA a komponens dönti el hogy mehetek e
	canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
		if (!this.allowEdit) {
			return true;
		}
		if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
			return confirm('Do you want to discard the changes?');
		} else {
			return true;
		}
	}

//---------------------------------------------------------
Angularban a Guardokat arra használjuk, hogy megadjuk azt, hogy a felhasználó át tud-e navigálni egy adott útvonalra, vagy el tud-e navigálni a jelenlegi útvonalról.
Láttuk a Routingnál, hogy meghatározhatjuk, milyen részekre tud navigálni a felhasználó az applikációnkon belül, de célszerű korlátozni, 
illetve bizonyos feltételekhez kötni (pl. login) azt, hogy a felhasználó mely részeket érheti el.A Route Guardok erre a célra jöttek létre.
pl.:
egy navigációs utasítás jóváhagyása
megkérdezhetjük a felhasználót, hogy biztos el akarja-e hagyni az adott oldalt (pl. űrlapoknál mentés, küldés előtt)
bizonyos felhasználóknak adhatunk hozzáférést az app bizonyos részeihez
az elérési út paramétereinek validálása
HTTP kérések lefuttatása az adott részelem megjelenítése előtt

//------------------------------------------------------------------------------------------------------------------------------------------
// HTTP kérések: szükséges modulok:       // stateles-ek vis nem szükséges leiratkozni róluk, 1x lefutnak azt jól van
app.module.ts : HttpClientModule
services.ts-ben: 
constructor(private http:HttpClient){}
*/                                                                                                                                 
// MIT AKARUNK?     xxx.service.ts    yyyfgv():Observable<ModelTípusa>{}          xxx.component.ts: ngOnInit():                                     
// Lekérés, GET     return this.http.get<ModelTípusa>(url,httpOptions);           this.xxxService.getfgv().subscribe(data=>{this.model=data;})      
// Törlés, DELETE   return this.http.delete<ModelTípusa>(url+"/"+id,httpOptions); this.xxxService.deletefgv(model).subscribe();
// Update, PUT      return this.http.put<ModelTípusa>(url,model,httpOptions)      this.xxxService.putfgv(model).subscribe();
// Add, POST        return this.http.post<ModelTípusa>(url,model,httpOptions)     this.xxxService.postfgv(model).subscribe();
//                                  .patch                                                                  .subscribe((data)=>{"mellkhatás"})
// httpOptions : egy objektum, opcionális
{
  // params = new HttpParams().set('print', 'pretty'),     // urlbe: ...?print=pretty
  params = new HttpParams().append('print', 'pretty').append('print2', 'pretty2'),     
  // urlbe: ...?print=pretty&print2=pretty2
  headers = new HttpHeaders({ 'Custom-Header': 'Hello' }),
  responseType:'json',        //'text | blob | json',
  observe = "response" // mit akarunk megkapni? csak a body-t, az egész választ? 'body' | 'events' | 'response',
  // event => milyen esemény történt pl filefeltöltés send normál response stb
  // return this.http.delete(this._URL, {observe: 'events',})
  // .pipe(tap((event) => {console.log(event);
  //     if (event.type === HttpEventType.Response) {  // HttpEventType -al switchelem és oszthatom szét hogy mi történjen
  //       console.log(event.body);
  //     }
  //   })
  // );
}
// const httpOptions={headers:new HttpHeaders({"Content-Type":"application/json"})}

// get:     a model jön meg
// delete:  üres objektum jön vissza !!!
// post:    vissza jön a model, DE nem adunk ID-t, azt a szerver generálja majd,
// put:     az egész objektumot át kell adni mindenestűl + vissza jön a mentett model
// patch:   elég az ID + amit szeretnénk változtatni

// Hibakezelés:
// I opció a komponensbe ha kell neki az adat
.subscribe({
  next:(data)=>{this.data = data;},
  error:(e)=>{console.log(e)},
  complete:()=>{}   // itt zárjuk be az ablakot ha szükséges
})
// II opció a service-be egy Subject-el ha nem kell az adat a komponensek
private _error = new Subject<string>();
public createAndStore(post: Post): void {
  this.http.post<{ name: string }>(this._URL, post).subscribe({
    next: () => {},
    error: (err: { error: { error: string } }) => {
      this._error.next(err.error.error);
    },
    complete:() => {}
  });
}
// III opció az observabelbe
.pipe(catchError((errorRes) => {return throwError(() => errorRes);}))
.pipe(catchError(this.handleError('getfgv',[])))                         // get, az összes
.pipe(catchError(this.handleError<ModelTípusa>('getfgv id=${id}')))      // get, az adott id-jú
.pipe(catchError(this.handleError<ModelTípusa>('yyyfgv')))               // post, v delete v put
//------------------------------------------------------------------------------------------------------------------------------------------
// Interceptorok: akkor kell használni ha pl a kérésekhez hozzáakarunk mindig fűzni vmit, pl header, autc cuccokat
// app.module.ts:
// fontos a sorrend sorba halad
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi: true },
],
// service.ts:
@Injectable({
	providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
	constructor() {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('Request');
    const modifiledRequest = req.clone({ headers: req.headers.append('auth', 'xyz') });
// felülirni nem tudjuk a req- eztet direktbe, hanem csak módosítani és hozzáfűzni dolgokat, pl auth
		return next.handle(modifiledRequest); 
    // játszhatunk magával a res- al (válasszal) is !!! =>
    // return next.handle(modifiledRequest).pipe(tap((event) => {
		// 	if (event.type === HttpEventType.Response) {
		// 		console.log("body:");
		// 		console.log(event.body);
		// 	}
		// }));
	}
}
//------------------------------------------------------------------------------------------------------------------------------------------
// leiratkozás trükkök : 
// private destroySubject$ = new Subject<void>();
// this.signupForm.valueChanges.pipe(takeUntil(this.destroySubject$)).subscribe(...)
// ngOnDestroy():void {
//     this.destroySubject$.next();
//     this.destroySubject$.complete();
// }
//------------------------------------------------------------------------------------------------------------------------------------------
// UNIT Testelés
fdescribe // csak ez fut le   // 1 describe-be több describe is lehet + it-ek
xdescribe // ez nem fut le
fit// csak ez fut le
xit// ez nem fut le

// 99% ban beforeEach és afterEach  // 0,1% ban beforAll és afterAll

// PIPE:
// describe('ReversePipe', () => {
//   it('create an instance', () => {
//     const pipe = new ReversePipe();
//     expect(pipe.transform('hello')).toEqual('olleh');
//   });
// });

// KOMPONENS:
// describe('UserComponent', () => {
//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       declarations: [UserComponent],
//     });
//   });

//   it('should create', () => {
//     let fixture = TestBed.createComponent(UserComponent); // ezzel végzünk interakciókat a komponensen
//     let app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it('hold use the user name from the service', () => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     let userService = fixture.debugElement.injector.get(UserService);
//     fixture.detectChanges();
//     expect(userService.user.name).toEqual(app.user.name);
//   });
//   it('should display the user name if user is logged in', () => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     app.isLoggedIn = true;
//     fixture.detectChanges();
//     let compliled = fixture.debugElement.nativeElement;
//     expect(compliled.querySelector('p').textContent).toContain(app.user.name);
//   });
//   it('should display the user name if user is not logged in', () => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     fixture.detectChanges();
//     let compliled = fixture.debugElement.nativeElement;
//     expect(compliled.querySelector('p').textContent).not.toContain(
//       app.user.name
//     );
//   });
//   it('shouldn t fetch data successfully if not called asyncronously', () => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     let dataService = fixture.debugElement.injector.get(DataService);
//     let spy = spyOn(dataService, 'getDetails').and.returnValue(
//       Promise.resolve('Data')
//     );
//     fixture.detectChanges();
//     expect(app.data).toBe(undefined);
//   });
//   it('shouldn t fetch data successfully if called asyncronously', async () => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     let dataService = fixture.debugElement.injector.get(DataService);
//     let spy = spyOn(dataService, 'getDetails').and.returnValue(
//       Promise.resolve('Data')
//     );
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(app.data).toBe('Data');
//     });
//   });
//   it('shouldn t fetch data successfully if called asyncronously', fakeAsync(() => {
//     let fixture = TestBed.createComponent(UserComponent);
//     let app = fixture.debugElement.componentInstance;
//     let dataService = fixture.debugElement.injector.get(DataService);
//     let spy = spyOn(dataService, 'getDetails').and.returnValue(
//       Promise.resolve('Data')
//     );
//     fixture.detectChanges();
//     tick();
//     expect(app.data).toBe('Data');
//   }));
// });

//------------------------------------------------------------------------------------------------------------------------------------------
// Animation
// 1. limitált de könnyebb módsze:
// daneden.github.io/animate.css => npm install animate.css --save =>
// + <link rel="stylesheet" href="animate.min.css">  => class Name: bounce, flash ...
// 2. pro módszer, komplex Angular animations module-al:
// trigger() transition() state() animate() stb.
// states: void, default(*), custom
// void: nem része a DOM-nak még
//        Add item:   void => *      
//        Remove:     * => void
//-------------
// app.module.ts:
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import:[BrowserAnimationsModule]
// kell polyfills.ts is hogy a explower és edge is használni tudja az animációt
// megkeresni és eltünteni a kommentet: import 'web-animations-js'; majd => npm install web-animations-js --save 

// angular.io/api/animations/style  <= az ÚJ 
// az XXX.component.ts:
// speciális state nevek: 
// 'void': még nincs a doomba
// '*': minden
// 'minden más': state név
@Component({ // felkell venni egy új elemet, az animations-t
  animations: [
    trigger('fade',[      // 1 vagy több trigger // import @angular/animations(ÚJ) VAGY @angular/core(ez a régi)
                          // fade => A neve + a html-be => @fade-t írunk az elem cuccai közé
      state('void',style({backgroundColor:'yellow',opacity:0})),  // itt definiáltuk, hogy a 'void' mit jelentsen => törölhetjük az ismétlő sorokat          
      transition('void => *',[ // a tömb => regisztrálja az összes statet és transitions-t ami ehhez az animációhoz kell
        style({
          'background-color':'red',
          backgroundColor:'yellow', opacity:0   // kezdeti állapot
        }),
        animate(2000,style({                    //2000ms
          backgroundColor:'white', opacity:1    // vég állapot
        }))        // ELHAGYHATÓ: style({backgroundColor:'white', opacity:1}) MERT 'void => *'" 
      ]),
      transition('* => void',[  // az első style() kihagyható mert a *-ból(defaultból) indulunk ki
        animate(2000,style({backgroundColor:'yellow',opacity:0}))
      ])      
    ])
  ]
})// egyszerűsítés után =>
@Component({ // felkell venni egy új elemet, az animations-t
  animations: [
    trigger('fade',[      
      state('void',style({backgroundColor:'yellow',opacity:0})),  
      transition('void => *',[ 
        animate(2000)        
      ]),
      transition('* => void',[ 
        animate(2000)
      ])      
    ])
  ]
})// egyszerűsítés után =>
@Component({ 
  animations: [
    trigger('fade',[      
      state('void',style({backgroundColor:'yellow',opacity:0})),  
      transition('void => *,* => void',[ 
        animate(2000)        
      ])    
    ])
  ]
})// egyszerűsítés után =>
@Component({ 
  animations: [
    trigger('fade',[      
      state('void',style({backgroundColor:'yellow',opacity:0})),  
      transition('void <=> *',[ 
        animate(2000)        
      ])    
    ])
  ]
})// vagy  =>
@Component({ 
  animations: [
    trigger('fade',[      
      state('void',style({backgroundColor:'yellow',opacity:0})),  
      transition(':enter, :leave',[ 
        animate(2000)        
      ])    
    ])
  ]
})
// ezeket célszerű átrakni másik fileba: animations.ts:
export let fade = trigger('fade',[      
  state('void',style({backgroundColor:'yellow',opacity:0})),  
  transition(':enter, :leave',[ 
    animate(2000)        
  ])    
]); // ide importálni mindent amit kell :trigger,transition,state,animate,style
// XXX.component.ts : importálni a fade-et
@Component({ 
  animations: [
    fade
  ]
})

// <div @fade></div>

/*<zippy title="Shipping Address">
<p>ami itt van az akkor jelenik meg ha a zippi lenyiló fülre kattintok</p>
<zippy>*/ 

/*
//------------------------------------------------------------------------------------------------------------------------
// Materials =>  material.angular.io => 
// 1. telepíteni:
//    cd material-demo/
//    npm i --save @angular/cdk @angular/material @angular/animations hammerjs
// 2. css. be beleírni: 
//    @import "~@angular/material/prebuilt-themes/TÉMANEVE"
//    TÉMANEVE: indigo-pink.css || deeppurple-amber.css || pink-bluegrey.css || purple-green.css
// 3. app.module.ts:
//    import {BrowserAnimationsModule} from '@angular/platform-browser/animations';   // kell animáció
//    import {NoopAnimationsModule} from '@angular/platform-browser/animations';      // nem kell animáció
//    import:[BrowserAnimationsModule]
// 4. minden komponenst külön kell importálni
//     material.angular.io/components/KOMPONENSNÉV/api

//------------
// checkbox:
/* <md-checkbox
      #változo
      [value]=''
      [checked]="isCVálltozó"       // kötés XXX.component.ts-ben az isCVálltozó
    //checked="true"                // így csak a kezdeti állapotát változtatjuk 
      (change)="onChange($event)">  // XXX.component.ts-ben   : onChange($event){console.log($event)}     
    </md-checkbox>
<div *ngIf="változo.checked"></div>

// radio button
<md-radio-group value="0">        // alapbeállításként a '0' értékű lesz be chacked-olva
  <md-radio-button value='1'>male   </md-radio-button> 
  <md-radio-button value='0'>female </md-radio-button>      
</md-radio-group>

// drop-down list
<md-select [(MgModel)]="változo">     // HA pl a => változo = 2  => 2 es color.id lesz a default
  <md-option 
    *ngFor="let color of colors"
    [value]="color.id">{{color.name}}</md-option>
</md-select>

// input
<md-input-container>
  <input
    ngModel                                   // ez KELL mert ebbe vannak az error-ok
    #változo="ngModel"
    name="username"
    type="text" mdInput placeholder="Username" required></input>
  <md-hint>ide jönnek a hint-ek</md-hint>     // tippek
  <span mdSuffix>@domain.com</span>           // mdSuffix => az input mező után lévű konstans
  <span mdPrefix>admin.</span>                // mdPrefix => az input mező elött lévű konstans
  <md-error *ngIf="változo.invalid && változo.errors.required">nincs megadva az username</md-error>
</md-input-container>
/*-----------------------------------------------------------
// ember.model.ts egy Ember model-je hogy nézzen ki:

export interface Ember{
    name:string,
    age:number
  }
  model:Ember; // ahhoz hogy ezt engedje => tsconfig.json ba:
"noImplicitReturns": false,
"strictPropertyInitialization": false,
//------------------------------------------------------------------------------------------------------------------------------------------
// KONSTANS URL:
// xxx.service.ts:
class XxxService{
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
private baseUrl:string;
constructor(@Optional() @Inject(API_BASE_URL) baseUrl?:string){
  this.baseUrl=baseUrl ? baseUrl : 'pl alapértelmezett url';
  }
}// => baseUrl már felhasználható ennek az Xxx0Service fgveiben

// app.module.ts:
  export function getBaseUrl():string {return "https://abc.asdasd.com";}  // VAGY EZ 001
  providers:[
    {provide:API_BASE_URL, useFactory:getBaseUrl};            // VAGY EZ 001
    {provide:API_BASE_URL, useValue:environment.apiRoot}      // VAGY EZ 002
  ]

// enviroments.ts:
  apiRoot:'https://abc.asdasd.com';      // VAGY EZ 002
//------------------------------------------------------------------------------------------------------------------------------------------
Angular ikonok
angular-fontawesome... ng add @fortawesome/angular-fontawesome
=> minden ikont külön kell importálni, amelyik kell csak azt.. és CSAK oda ahol használjuk
button.component.ts:
import {faTimes} from '@fortawesome/free-solid-svg-isons'
változó=faTimes;
// button.component.html:
<fa-icon [icon]="változó"></fa-icon>
// vagy berakjunk az angularconfog css részéhez a fontawesome elérési útját és ezután régi normális módon működik => // <i></i>
//------------------------------------------------------------------------------------------------------------------------------------------
// JSON SZERVER:
// npm i json-server
// package.json:
"scripts":{
  "server":"json-server --watch db.json --port 5000",
}
// db.json:
{
  "emberek":[
    {
      "id":1,
      "name":"kiki"
    },
    {
      "id":2,
      "name":"Bia"
    }
  ]
}
// npm run server   => localhost:5000/emberek
//------------------------------------------------------------------------------------------------------------------------------------------
// Hibák megoldása:
npm install ajv@^6.9.1
npm install jasmine-core@3.8.0
npm i -f

// fullcalendar: 
npm install @fullcalendar/interaction

//------------------------------------------------------------------------------------------------------------------------------------------
Angular oldalon proxyzás, így nem kell cors
src/proxy.conf.json:
{
  "/**":{ // minden kérés ami az angul arra jön
    "target":"http://localhost:3000",  // menjen ide
    "secure":false,
    "logLevel":"debug"
  }
}
package.json:
scripts:
  "start":"ng serve --proxy-config proxy.conf.json"  // npm run start
//------------------------------------------------------------------------------------------------------------------------------------------
Buildelés a backendre: 
angular.json:
architect:{ 
  "build":{
    "options":{
      "outputPath":"../backend/public",
}
=> ng build
backend:
app.use("/",express.static(path.join(__dirname, "../public")));
app.get('*', (req, res) => {    // mindne végén
  // res.redirect('/');
  res.sendFile(path.join(__dirname, '../public/index.html'));
})
angular/package.json:
scripts: {
  "build": "ng build --prod"    // prod build, az env.prodbol szedi a környezetu válltozókat
}
backenden package.json:
scripts: { 
  "build": cd angular && npm i && npm run build
}


//------------------------------------------------------------------------------------------------------------------------------------------
Deploy 
When deploying your Angular app, it's really important to make sure that 
your server (like S3) is configured to always serve the index.html file.


//------------------------------------------------------------------------------------------------------------------------------------------
Deploy // Heroku v firebase 
// Heroku
1. npm i -g heroku        // Heroku cli letöltése
1.5 heroku login
2. heroku create <appnév> --buildpack heroku/nodejs // Új heroku projekt létrehozása
3. git push heroku main:master      // maint pusholom a masterre és nem az originra,hanem a heroku szerverére
4. @angular dev dependenciket átkell tenni a dependencies-ek közé
5. a dotenv filet NE pusholjuk, azt külön kulcs értékekként a Heroku oldalán kell beállítani
5. heroku logs // express logok
// firebase
1. npm i -g firebase-tools
1.5. firebase login
2. az oldalon beállítani 
3. firebase init   // projekt gyökerébe
4. functions + hosting + emulators // pipa
create new project
projektnév => yes => js => no => yes => public => yes => no
6. hosting + functions // emulátorok beállítása
7. 5001 => 5000 => 4000 => y
8. megkeresni a gépen
9. public mappába kell buildelni az angulart
10. functions mappa a backend
11. dotenv configja jó helyre mutasson
12. express: index.js:
const functions = require('firebase-functions')
app.listen helyett =>
exports.expressApi = function.https.onRequest(app)
package.json:
main : "index.js"
angularba: angular.json : 
outputPat:"../public"
13. firebase emulators:start --only functions,hosting // gyökérbe
14. firebase.json-ba proxyzás:
"rewrites":[
  {
    "source": "/api/**",        // minden ami ide jön
    "function": "expressApi"    // ide menjen
  }
]
const apiWrapper = express()
apiWrapper.use('/api',app)    // az egész express appot is tudjuk ruteolni
//------------------------------------------------------------------------------------------------------------------------------------------
// angular universal => lényege hogy server oldalo lesz a renderelés vis a szerver összerakja 
a front endet és azt küldi el, nem csak js fileokat...
https://angular.io/guide/universal
B opció a nest js el összehozni
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
// EXTRAPLUSSZPLUSSZ
//------------------------------------------------------------------------------------------------------------------------------------------
Animációk pluszz
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------
/* esemény öröklés

// PARENTS.component.html:            
<app-child-elem (eEmitter)="postfgv($event)"    // a gyerek, csak egy váz, van egy eseménye, DE itt a parentsbe mondjuk meg, hogy az esemény mit csináljon

=> PARENTS.service.ts: + PARENTS.component.ts: => a szokásos GET,DELETE,PUT,POST

// CHILD.component.html
<form (ngSubmit)="onSubmit()">
  <div>
    <label for="text">Task</label>
    <input type="text" name="text" id="text" playeholder="Add Task"
    [(ngModel)]="text"/>    // text:string; <= ez a text
  </div>
  <input type="submit" value="Save Task"/>
</form>

// CHILD.component.ts
@Output() eEmitter:EventEmitter<Task>=new EventEmitter();
text:string;          // [(ngModel)] miatt 2 irányú adatkötés
onSubmit(){
    const newTask={
      text:this.text,
    }
    this.eEmitter.emit(newTask);
    this.text='';
  }
}*/

/*
// komponenst -> másik komponensbe változó értékekkel
// Az adat változón keresztül FENTRŐL LE => Szülőtöl -> Gyerekig
// aholhasználjuk.component.html: 
<app-button 
  color="green" 
  text="gombszövege" 
  (btnClick)="fgv()"      // fgv() => aholhasználjuk.component.ts -be van megírva
></app-button>
// button.component.ts:
import {Input, Output, EventEmitter} from '@angular/core'     // Input:text,color,stb... miatt 
export class ButtonComponent implements OnInit{               // Output, Eventemitter: eventek miatt
  @Input() text:string;     // fentről jövő változók 
  @Input() color:string;    // amik benne vannak az akt komponens HTML-jébe is is
  @Output() btnClick = new EventEmitter()   // @Output() OnDeleteTask = new EventEmitter<Task>()
  onClick(){this.btnClick.emit()}           // OnDelete(task){this.OnDeleteTask.emit(task)}
}
// button.component.html:
<button 
  [ngStyle]="{'background-color':color}"
  (click)="onClick()"                       // (click)="OnDelete(task)"
>
  {{text}}
</button>

// Ugyanaz forciklussak =>
<app-task-item 
  *ngFor="let task of tasks" 
  [változó]="task"
  (onDeleteTask)="fgv(task)"  // fgv(task) => aholhasználjuk.component.ts -be van megírva
 ></app-task-item>        // magát a taskot is átküldhetjük
// a változó értékét vagyis az egyes task-okat lejjeb küldjük =>
@Input() változó:Ember;   // a lejjebbi XXX.component.ts-be
*/

//-------------
// RxJS => Subscription, Subject ....
/*
// az EventEmitter helyett =>

// ui.service.ts: 
private showAddTask:boolean=false;
private subject=new Subject<any>();
onObservable():Observable<any>{
  return this.subject.asObservable();
}
submit():void{
  this.showAddTask=!this.showAddTask;
  this.subject.next(this.showAddTask)
}

// xxx.component.ts:
showAddTask:boolean;
subscription:Subscription;
  OnInit{this.subscription=this.uiService.onObservable().subscribe(value=>this.showAddTask=value)}
  onSubmit(){this.uiService.submit()}

// xxx.component.html:
<app-button
  color="{{showAddTask ? 'red' : 'green'}}"
  text="{{showAddTask ? 'Close' : 'Add'}}"    // a gomb szövege függ..
  (btncClick)="onSubmit()">
</app-button>
*/
//-------------
// Lekérés, GET 
// xxx.service.ts:    
/*private baseUrl:string = "http://localhost:5000";

  getPosts_2():Observable<Array<Post>>{     //=== getPosts_2():Observable<Post[]>{
    let url=this.baseUrl+'/posts';
    return this.http.get<Array<Post>>(url);
  }
  getPost_Id(id:number):Observable<Post>{
    let url=`${this.baseUrl}/posts/${id}`;
    return this.http.get<Post>(url);
  }

xxx.component.ts :
  ngOnInit():void{
    this.postService.getPost_1().subscribe(data=>{          // data:Post[]   model:Post[]
      this.model=data;
    })
    if(id){this.postService.getPost(id).subsribe(data=>{
      this.model=data;
    })}
  }
*//*

//-------------
// Törlés, DELETE
XXX.service.ts:
deleteTask(task:Task):Observable<Task>{
  const url =`${this.apiUrl}/${task.id}`;
  return this.http.delete<Task>(url)
}

XXX.component.ts:
deleteTask(task:Task){
    this.taskService          // innen
      .deleteTask(task)       //
      .subscribe(             // ideág meghívja a serviceben lévő fgv-t
        ()=>(this.tasks = this.task.filter((t) => t.id !== task.id))
      );
}

//-------------
//Update 
XXX.service.ts:
const httpOptions={
  headers:new HttpHeaders({
    "Content-Type":"application/json"
  })
}
updateTask(task:Task):Observable<Task>{
  const url =`${this.apiUrl}/${task.id}`;
  return this.http.put<Task>(url,task,httpOptions)
}
XXX.component.ts:
toogleRemonder(task:Task){
  task.reminder=!this.reminder;       // csak váltjuk az értékét... true <=> false
  this.taskService.updateTask(task).subscribe();
}*/
/*

//-------------
// Add 
<form (ngSubmit)="onSubmit()">
  <div class="form-controll">
    <label for="text">Task</label>
    <input type="text" name="text" id="text" playeholder="Add Task"
    [(ngModel)]="text"/>    // text:string; <= ez a text
  </div>
  <div class="form-controll">
    <label for="text">Task</label>
    <input type="text" name="day" id="day" playeholder="Add Day & Time"
    [(ngModel)]="day"/>
  </div>
  <div class="form-controll form-controll-check">
    <label for="reminder">Set Reminder</label>
    <input type="checkbox" name="reminder" id="reminder"
    [(ngModel)]="reminder"/>
  </div>
  <input type="submit" value="Save Task" class="btn-block"/>
</form>

// eggyel feljebb:
<app-add-task (onAddTask)="addTask($event)"

// eggyel feljebb.component.ts:
addTask(task:Task){
this.taskService.addTask(task).subscribe((task)=>(this.tasks.push(task)))
}

XXX.component.ts
@Output() onAddTask:EventEmitter<Task>=new EventEmitter();
text:string;
day:string;
reminder:boolean=false;
onSubmit(){
  if(!this.text){
    alert('Please add a task');
    return;
    const newTask={
      text:this.text,
      day:this.day;
      reminder:this.reminder
    }
    this.onAddTask.emit(newTask);
    this.text='';
    this.day='';
    this.reminder=false;
  }
}
task.service.ts:
addTask(task:Task):Observable<Task>{
  return this.http.post<Task>(this.apiUrl,task,httpOptions);
}

app-module.ts:
import {FormsModule} from '@angular/forms'

//-------------
// ui.service.ts: // ha elküldtük a formot akkor a gomb változzon át
import {FormsModule} from '@angular/forms'
private showAddTask:boolean=false;
private subject=new Subject<any>();
toggleAddTask():void{
  this.showAddTask=!this.showAddTask;
  this.subject.next(this.showAddTask)
}
onToggle():Observable<any>{
  return this.subject.asObservable();
}

header.component.ts:
import {Subscription} from 'rxjs'
showAddTask:boolean;
subscription:Subscription;
constructor(private uiService:UiService){
  this.subscription=this.usService.onToggle().subscribe(value=>this.showAddTask=value)
}
toggleAddTask(){
  this.uiService.toggleAddTask()
}

//header.component.html:
<app-button
  color="{{showAddTask ? 'red' : 'green'}}"
  text="{{showAddTask ? 'Close' : 'Add'}}"    // a gomb szövege függ..
  (btncClick)="toggleAddTask()">
</app-button>

//-------------
// add-task.component.ts: // ha elküldtük a formot akkor tünjön el a kitöltő helyek
showAddTask:boolean;
subscription:Subscription;
constructor(private uiService:UiService){
  this.subscription=this.usService.onToggle().subscribe(value=>this.showAddTask=value)
}

add-task.component.html:
<form *ngIg="showAddTask"
  ...

*/

//------------------------------------------------------------------------------------------------------------------------------------------
// ROUTER MARADÉK



  // DE az paraméterek, pl ID alapján való betöltés speciális:
  // post.component.ts ben: 
  export class PostComponent implements OnInit{
    constructor(private activatedRoute:ActivatedRoute){} // rövidített dependency injection
    ngOnInit(){
      this.activatedRoute.paramMap
        .subscribe(params=>{
          console.log(params);  // a params egy objekt amiket átadtam azokat használhatom, id és userId
          let id = +params.get('id');   // visszaadja az id-t  <=  path:'post/:id',   A + jel => Numberré konvertál
            //.get .getAll .has .keys
          // service.getProfile(id); ezt egy service nek kéne átadnia
        })
    }
  }

  // VAGY
  export class PostComponent implements OnInit{
    model:Post; // Post az egy interface, hogy hogy néz ki egy post
    constructor(private activatedRoute:ActivatedRoute){} 
    ngOnInit():void{
      const id=Number(this.activatedRoute.snapshot.paramMap.get('id')); 
//ez az id kell: this.activatedRoute.snapshot.paramMap.get('id') ==== 'post/:id' (lehet több paramétert is átadni)    
      if(id!==null){
        this.model=POSTS.filter(x=>x.id==id)[0]; // ez a service?????
        // a POST az itt most egy statikus konstans Post-ok tömbje
      }
    }//==> mostmár a post.component.html ben elérjük a model-en keresztül*/
  } // .html-ben: routerLink="/post/1"  => localhost:4200/post/1 -rt tölti be
    //  [routerlink]="['/post/',2,3,4]" => localhost:4200/post/2/3/4 -et  // több paraméter esetén
    
    // VAGY html.ben [queryParams]-al , json formátumba 
    // [routerlink]="['/post/',1]" [queryParams]="{userId:'1',id:'2'}"
    // => localhost:4200/post/1?userId=1&id=2
    // post.component.ts ben:
      this.activedRoute.queryParams.subscribe(params=>{
      console.log(params)  // a params egy objekt amiket átadtam azokat használhatom, id és userId
      })
    // back end oldalon: posts.component.ts ben:
    // public onQuery():void{  // (click)-re kötve
    // this.router.navigate(['/post',1],{queryParams:{id:1,'userId':2}});
    // }=> localhost:4200/post/1?id=1&userId=2

        // VAGY ITT EGY POST-ra klikkelek, 
  export class PostsComponent implements OnInit{  // PostsComponent NEM PostComponent
    model:Array<Post>;
    constructor(private router:Router){}        // itt ROUTER-t akarunk átadni MERT
    ngOnInit():void{this.model=POSTS;}          // a navigate() fgv-ét akarjuk használni
    public onClick(post:Post):void{           
      this.router.navigate(['/post',post.id]);  // dinamikos onclickes navigáció id alapon
    }
  }
    
// paramMap vs queryParamMap => a queryParamMap az egyéb globális paramétereket is átadja, pl.: user/:id?tab=edit => a "tab"-ot

//-------------
// ha azt akarjuk hogy pl a headerbe egy komponens ne jelenjen meg ha épp pl az about pagen vunk
//header.component.ts:
constructor(private router:Router)    // kell a Router, hogy lecsekkoljuk melyik odlalon vunk
hasRoute(route:string){
  return this.router.url===route;     // ha azon amin kell akkor true, ha nem akkor false
}
//header.component.html:
//<app-button *ngIf="hasRoute('/')""  // ha most a / en vunk akkor megjelenik
//------------------------------------------------------------------------------------------------------------------------------------------
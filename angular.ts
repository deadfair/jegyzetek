/*------------------------------------------------------------------------------------------------------------------------------------------
// VSC kiegészítők: auto import,
npm install -g @angular/cli
/*------------------------------------------------------------------------------------------------------------------------------------------
CLI
ng new MyApp        	// létrehozza a MyApp új projectet
ng serve            	// live szerver indítása
ctr + c               // leállítása
ng build		          // a kész projektet elkészíti => kitehetjük weboldalra

ng g c KomponensNév	// uj komponens generálása
ng g module MNév	  // uj modul generálása    // a modulok a komponenseket fogja össze
ng g s ServiceNév	  // uj szervice generálása
ng g class <ClassNév>
ng g pipe <PipeNév>
ng g directive <DirectiveNév>

ng g m products --route products --module app.module  // generál egy modult a products mappába, +route ami bekötve a fő route-ba, +app module is frissítve

cd .\MyApp\        	// mappa váltás
cd..                // 1 mappával feljebb
ng			// összes parancs eflsorolása
ng update @angular/cli @angular/core

https://angular.io/cli

/*------------------------------------------------------------------------------------------------------------------------------------------
src\main.ts		        // program idulásának a helye
src\assets\		        // képek + szerverről letöltött dolgok
src\environments\	    // környezetek
src\app\		          // ide írunk
src\app\models		    // class,interface modellek
src\app\store         // NgRx		    
src\app\services		    
src\app\modules		    
src\app\components		        // + külön komponens a termékeknek,
src\app\components\get		    // azon bellűl külön komponens pl kilisázva, 
src\app\components\delete		  // delete termék oldalnak,   
src\app\components\create		  // create terméknek stb.  
src\app\components\update		    
angular.json                  // "styles":["ide kell betenni a bootstrap elérését"]
/*------------------------------------------------------------------------------------------------------------------------------------------
app.module.ts =>
*/
@NgModule({                 // ö egy annotáció ő mondja meg hogy a AppModule egy Module
  declarations: [	          // komponensek helye  
    AppComponent
  ],
  imports: [		            // modulok helye      // pl.: bejelentkezésért felelős modul
    BrowserModule,	
    AppRoutingModule,
  ],
  providers: [],		        // service-ek helye   // (pl.:lekér adatot a szervertől)
  bootstrap: [AppComponent]	// melyik az első komponens amit bekell tölteni?
})
export class AppModule{}
/*------------------------------------------------------------------------------------------------------------------------------------------
app.component.ts =>*/
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',  		            // <app-root></app-root>      <= az index.html-ben a HTML tag neve mi legyen?
//selector: '.app-root',                // <div class="app-root"></div>
  templateUrl: './app.component.html',  // melyik html-t töltse be? 
//template: '<h1>Hello World</h1>',     // vagy így is lehet helyben megcsinálni
  styleUrls: ['./app.component.css']	  // milyen style.ok tartozzanak hozzá?
})
export class AppComponent implements OnInit{  // app.component.ts
  constructor(/*service importok */){}       
  ngOnInit():void{}                     // akkor fut le amikor betölt a komponens
}

//------------------------------------------------------------------------------------------------------------------------------------------
// Lifecycle Hooks:       // minden komponensnek KELL lennie életciklusnak

// OnChanges()            // Az ngOnInit() előtt hívódik (ha a komponensnek vannak kötött bemenetei), 
//                        // és minden alkalommal, amikor egy vagy több adathoz kötött bemeneti tulajdonság megváltozik.
// OnInit()               // Egyszer hívódik meg és minden esetbe lefut, ha van ngOnChanges(), akkor utánna
// DoCheck()              // Közvetlenül az ngOnChanges() után hívódik minden változásérzékelési futtatáskor, 
//                        // és közvetlenül az ngOnInit() után az első futtatáskor.
// AfterContentInit()     // Egyszer hívódik az első ngDoCheck() után.
// AfterContentChecked()  // Az ngAfterContentInit() és minden ezt követő ngDoCheck() után hívódik.
// AfterViewInit()        // Egyszer hívódik az első ngAfterContentChecked() után.
// AfterViewChecked()     // Az ngAfterViewInit() és minden ezt követő ngAfterContentChecked() után hívódik.
// OnDestroy()            // Közvetlenül azelőtt hívódik, hogy az Angular megsemmisíti a direktívát vagy a komponenst.
/*------------------------------------------------------------------------------------------------------------------------------------------
{{ name }}                //  .ts  => HTML  // a name változó real time értéke, a .ts -ből                                  // interpoláció
{{ getName() }}		        // lehet fgv.
{{"A neve: "+ name}}		  // vagy bármilyen js kód is akár

[prop]="value"            // szülő HTML     // .ts  => HTML       // a props: komponens inputja, a value: a .ts változója   // property bind-ing
@Input props.string       // gyerekbe .ts                         // dinamikusan változtathatjuk a prop értékét a szülőbe

(clickEvent)="fgv($event)"                      // szülő HTML     // HTML  => .ts                                           // event bind-ing
fgv(value.string){this.valami=value}            // szülő .ts      // a this.value egyenlőlesz a 'valami value' -vel
@Output() clickEvent : EventEmitter<any> = new EventEmitter();    // gyerekbe .ts
(click)="fgvgyerek('valami value')""                              // gyerekbe html
fgvgyerek(value:string){this.clickEvent.emit(value)}              // gyerekbe .ts                                           

[(ng-model)]="prop" // HTML <=>  .ts      // a props: Ez a komponens változója, pl input komponensre kötjük, így valós időbe változik a props, ha változik az input értéke
/*------------------------------------------------------------------------------------------------------------------------------------------
// HTML 
<app-root></app-root>           // a componensek szelektora     // az angular program belépő pontja a HTML-ben  
<input #változó>                // HTML elemen lévő változó
/*------------------------------------------------------------------------------------------------------------------------------------------
// Pipe-ok => az eredeti adatot nem módosítja, csak a megjelenést!
{{     | json}}                   // JSON formába alakít
{{     | async}}                  // Observable-t alakít értékre
{{name | titlecase}}              // nagybetűvel kezdődik
{{name | uppercase}}		          // a name változót futtassa át az uppercase-n ami a CommonModulba van benne 
{{name | lowercase}}		          //  
{{name | percent}}		            // 0.235 => 24%         https://angular.io/api/common/PercentPipe
{{name | percent:'4.1-5'}}	      // 0.235 => 0,023.5%    (tizedespont elötti számjegyek dbszáma).(-||- utáni MINIMÁLIS dbszáma)-(-||- MAXIMÁLIS dbszáma)  
{{name | percent:'4.1-5':'fr'}}	  // 0.235 => 0 023,5% 
{{name | number}}          {{name | number:'4.1-5'}}	      {{name | number:'4.1-5':'fr'}}	 
// ugyanaz mint a percent, csak % nélkül és nem szoroz 100-al
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
}/*
/*------------------------------------------------------------------------------------------------------------------------------------------
// Események
<li (click)="fgv()"></li>		    // click eseményre meghívjuk a fgv()-t ami az akt. komponensbe van
<li (keyup.enter)="fgv()"></li> // enter lenyomása után, a fgv() lefut
    (change)="fgv()"            // érték változáskor lefut a fgv
    (dblclick)="fgv()"
    (ngSubmit)="fgv()"          // form-ba kell beletenni, a submit esemény
    (btncClick)="fgv()"

<a (click)="egyVáltozó='Béla'">JANI</a>  // clickre, értéket vált az egyVáltozó értéke és Béla lesz
<input #x (keyup)="0">                   // érzékeli a gomb lenyomását de nem hív meg fgv-t => olyankor jó, ha 
{{x.value}}                              // vhol megakarjuk jeleníteni amikor változik
/*------------------------------------------------------------------------------------------------------------------------------------------
// Direktívák
//-------------
// *ngIf
// <div hidden></div>                  // a div nem jelenik meg, OTTVAN de css property miatt nem látszik
// <div [hidden]="feltétel1()"></div>  // ha a feltétel1() igaz => akkor lesz hidden => nem látszik
// AZ *ngIf JOBB NAGYOBB FÁKON !!! =>

<div *ngIf="feltétel()"></div>                                // így a divre értendő az IF
<div *ngIf="feltétel(); then igazAg else nemIgazAg"></div>    // CSAK AZ EGYIK LÉTEZIK
  <ng-template #igazAg></ng-template>                         // ha a feltétel igaz, akkor ez LÉTEZIK, 
  <ng-template #nemIgazAg></ng-template>                      // ha a feltétel nem Igaz, akkor ez az element LÉTEZIK
/*------------------------------------------------------------------------------------------------------------------------------------------
// ngSwitch
<div [ngSwitch]="egyVáltozó">   // azért jó, mert NEM csak true és false eseteket tudunk lekezelni
  <div *ngSwitchCase="'Béla'"> Ha az egyVáltozó==='Béla', akkor ez jelenik meg </div>  
  <div *ngSwitchCase="'Jani'"> Ha az egyVáltozó==='Jani', akkor ez jelenik meg </div>  
  <div *ngSwitchDefault>       Default ág </div>  
</div> 
/*------------------------------------------------------------------------------------------------------------------------------------------
// *ngFor
<ul>
	<li *ngFor="let user of users; index as i">	// for ciklussal kiírjuk a tömb elemeit
		{{user.name}} ({{user.age}}) - {{i}}      // "as" kulcsszóval importálhatunk a HTML-be értékeket, pl az indexet <= a tömb indexei !!!
	</li>
</ul>
// *ngFor export értékei:     amikket akár *ngIf-be lehet használni
index:number  =>  a tömb indexei
first:boolean =>  true, ha ez az első elem a tömbben
last:boolean  =>  true, ha ez az utolsó a tömbben
even:boolean  =>  true, ha ez akt elem páros indexű a tömbben
odd:boolean   =>  true, ha az akt elem páratlan indexű a tömbben

// speciális attribútumnak így kell értéket adni for-ba
attr.aria-valuenow="{{skills.values[i]}}"
/*------------------------------------------------------------------------------------------------------------------------------------------
// ngClass => dinamikus értékeket amiket felvehet => string, array, object, komponens fgv
[ngClass]="változó"   pl az one az a komponens css-ébe van benne  .one{}
[ngClass]="['változó', 'változó2']"
[ngClass]="{'one':false, 'two':true}"   //  two van beállítva, a one az nincs
[ngClass]="fgv()"                       // a fgv visszatérési az elözö 3 variáció egyike:string,array,object
fgv(){return {'one':this.változó3.változó4=="valami", 'two':true}}  // feltételhez is köthető
// XXX.component.ts be =>  változó='one'; változó2='two' // .scss-ben => .one{} .two{},  ezeket dinamikusan változgathatjuk...

/*------------------------------------------------------------------------------------------------------------------------------------------
// ngStyle
[ngStyle]="{'background-color':'green'}"
[ngStyle]="{'background-color':'green','color':'black'}"
[ngStyle]="{'background-color': változó}"     // dinamikusan változtathatjuk
[ngStyle]="{'width': skills.values[i] + '%'}"
[ngStyle]="{'background-color': változó==='valami'?'blue' : 'red'}"     // feltétel
[ngStyle]="fgv()"     // visszatér egy object el
/*----*-------------------------------------------------------------------------------------------------------------------------------------
[class.one]="isSpecial"                           // ha isSpecial igaz akkor a .one{} class hozzáadódik
[style.font-size]="isSpecial ? '10px':'30px' "    // ugyanaz
/*------------------------------------------------------------------------------------------------------------------------------------------
// Saját Directíva => delay.directive.ts
import {Directive} from '@angular/core'
@Directive({selector:'[appDelay]'})
expot class DelayDirective{
  constructor(private vc: ViewContainerRef, private tr: TemplateRef<any>){}
  @Input() set appDelay(time){
    let delayTimeout=setTimeout(()=>{
      clearTimeout(delayTimeout);           // memóriábol eltávolítjuk a felesleges timeoutot
      this.vc.createEmbeddedView(this.tr)   // hozzáadjuk a viewhoz az elementet
    },time);
  }
}
===>      <p *appDelay="5000">5 sec mulva jelenik meg</p>

import {Directive} from '@angular/core'
@Directive({selector:'[appHighlight]'})
expot class HighlightDirective{
  colors:string[]=["red","yellow","purple"]
  @HostListener('click') onMouseClick(){              // Direktívában lévő eventlistener
    let index=Math.floor(Math.random() * this.colors.length)
    this.changeColor(this.colors[index])  
  }
  constructor(private el:ElementRef){                 // csak itt, mert nincs input elem mint a másik esetben
    this.changeColor("yellow")
  }
  changeColor(color:string){
    this.el.nativeElement.style.backgroundColor=color;
  }
  @Input() set appHighlight(color){
    this.changeColor(color)
  }
}
===>    <p *appHighlight>sárga háttér leszek</p>                // kattintásra változik a háttér    // INPUT NÉLKÜL
===>    <p [appHighlight]="'red'">red háttér leszek</p>         // HA VAN INPUT

// Az App componentben =>
class AppComponent {
  counter = 0;
  @HostListener('window:keydown', ['$event'])       // mit halgasson?   
  handleKeyDown(event: KeyboardEvent) {             // mi történjen?
    this.counter++;
  }
}

@HostBinding('style.color') color;    // ez arra jó, hogy változót kötünk a komponens stlyle.color értékéhez pl. DIREKTÍVÁBA
Igy majd a direktíva bemeneteivel tudjuk kontrolálni az elem style értékét
/*------------------------------------------------------------------------------------------------------------------------------------------
Angular ikonok
angular-fontawesome... ng add @fortawesome/angular-fontawesome
=> minden ikont külön kell importálni, amelyik kell csak azt.. és CSAK oda ahol használjuk
button.component.ts:
import {faTimes} from '@fortawesome/free-solid-svg-isons'
változó=faTimes;
// button.component.html:
<fa-icon [icon]="változó"></fa-icon>
/*------------------------------------------------------------------------------------------------------------------------------------------
// FORMOK
<form>
  <div >
    <label for="firstName"></label>                             // for <=> id     kötés az input és a label között
    <input id="firstName" name="firstName" >                    // name <=> .ts   name értéke, kötés a .ts-ben lévő változóval ami a firstName
  </div>
<form>
[name]="fruit" or name="{{fruit}}"                              // valós idejű 1 irányú kötés
[attr.name]="fruit" or attr.name="{{fruit}}"  
//------------
// NGMODEL
// <input [value]="változó" (keyup.enter)="változó=$event.target.value; fgv()">	
// az input változó az "változó" de NINCS kötés 
// az enter lenyomása után, a komponens változó változója egyenlő lesz az input mező értékével, majd fgv() lefut
// => mostmár van kötés

<input [(ngModel)]="változó" (keyup.enter)=fgv()>	    
// ugyanazt csinálja mint a fentebb lévő DE KELL a "FormsModule"

<input [ngModel]="változó">		    // FormsModule-ba van benne
// nincs meg az oda vissza kötés, vis ha elötte az oldalon vhol használtuk akkor az már nem változik

ngModel részei:
value
touched       // ha már belekattintottunk az inputba => true
untouched     // ha már belekattintottunk az inputba => false
dirty
pristine      // érintetlen, nem nyúltak hozzá
valid         // ha az input mező valid => true
invalid       // ha az input mező valid => false                            
errors        // a hibák itt vannak => ... *ngIf="változo.errors.required" .... *ngIf="változo.errors.minlength" ...
//            ngModel része => consolba kiolvashatjuk pl. az akt. minlength értékét: változo.error.minlength.requiredLength          


VALIDÁTOROK:
required          // muszáj megadni
minlength="3"     // minimum 3 karakter
maxlength="10"
pattern="regex"   // regex
FormBuilder-be =>
Validators.email,   // érvényes email
Validators.min(16)  // min értéke 16


{{ showinputerrors() }}      // a hiba megjelenítését célszerű egy fgv-be kiszervezni ahol a hibától függően jelenítjük meg a hibát
<button [disabled]="!xxxForm.valid">button</button>         // ha nem valid a Form akkor disabled a gomb
//                  !xxxForm.form.valid                     // Template-driven esetén


// 2 út van elötte  =>   
    Reactive        => több kontroll és logika, komplexebb, unit tesztelhetőség
vs  Template-driven => egyszerübb formoknál szuper, könnyü, kevés kód  !!! logika a HTMLben !!!

// Template-driven
<form #xxxForm="ngForm">                      // xxxForm.form.valid és egyéb dolgok... az egész Formra
  <div>
    <input                                    // az olvashatóság miatt ÍGY KELL TÖRDELNI
      required                                // validátorok itt is lehetnek
      minlength="3" 
      ngModel     
      name="firstName"                        // name értéke a "firstName" változó amit elérünk a .ts-ben is
      #változo="ngModel">                     // helyi változón keresztül NgModel
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
    <textarea 
      [(ngModel)]="hero.comment"               // hero.comment -el (.ts) van összekötve 2 irányú adatkötéssel a textarea 
      name="comment" 
    </textarea>
  </div>
<form>

// uj stilust pl. az invalid cuccokhoz úgy adunk hogy console-ba megnézzük az elem class="" értékeit és felülírjuk, amikor mind ott van.
=>  .form-controll.ng-touched.ng-invalid{}

// Reactive
új komponens: ng g c post-create
app-routing.module.ts: {path:'post\create',component:PostCreateComponent}
app-module.ts: FormsModule, ReactiveFormsModule
post-create.component.ts:*/
import{FormGroup,FormBuilder,FormArray, Validators,FormControl} from '@angular/forms';
export class PostCreateComponent implements OnInit{
// FormGroup:
// status (VALID|INVALID|PENDING|DISABLED|PRISTINE)  // pillanatnyi validációs állapota  // formGroupnév.status==='INVALID'      // az egészre vonatkozik
// value                      // objektum amely tárolja a FormControl-ok értékeit        
// controls                   // az objektum ami tárolja a group egy FormControl-ait     // formGroupnév.controls.title.valid    // title = a FormGroup egyik értéke
// [add|remove|set]Control    // hozzáad, eltávolít, frissít egy FormControl-t
// contains                   // az adott nevű FormControl megtalálható a group-ban?
// reset                      // visszaállítja a FormControl-ok értékeit
  reactiveForm_0:FormGroup =new FormGroup({
    title:new FormControl(""),        // <input formControlName="title" 
    body:new FormControl(""),
    id:new FormControl('',[Validators.required]),
  })
// ====>
  reactiveForm: FormGroup;
  nestedForm:FormGroup;   // akkor kell ha egybeágyazás van
  dynamicForm:FormGroup;  // akkor kell ha nem ugyanazt a referenciát akarjuk használni
  constructor(private fb:FormBuilder){}
  ngOnInit():void{
    this.reactiveForm=this.fb.group({   // <form [formGroup]="reactiveForm"
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
      name:['',[Validators.required,
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



//------------------------
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
*/
//------------------------------------------------------------------------------------------------------------------------------------------







//------------------------------------------------------------------------------------------------------------------------------------------
/* ROUTING: 
<router-outlet></router-outlet>     // az adott router komponensét rendereli ki, dinamikus routerválasztás
//                                  // a router-outlet UTÁN jön létre a komponens, NEM BELE   */

// app-routing.module.ts:         
// ngModule({  import:RouterModule.forRoot(routes)   // routes -es változó a app-routing.modul.ts-ben
// VAGY               RouterModule.forChild(routes)  // RouterModule = beépített Router modul
//             exports: [RouterModule]	             // ezt exportáljuk így az app.module.ts-be, HA ott importálva van

// routerLink
// <a routerLink="/myComp"></a>	// routerlinkeket ÍGY ÉRÜNK EL TILOS A href !!!
//    routerLink="/post/1"  => localhost:4200/post/1 -rt tölti be
//  [routerlink]="['/post/',2,3,4]"      => localhost:4200/post/2/3/4 -et   // több paraméter esetén
//  [routerlink]="['/post',follower.id]" => localhost:4200/post/X           // X===follower.id
//  [routerlink]="['/post/',1]" [queryParams]="{userId:'1',id:'2'}" => localhost:4200/post/1?userId=1&id=2
//  [routerlink]="['/admin/users']"      => childrenes    ???????????????????????????????????????????????????????????????

//  több egymás melletti routerlink esetén probléma, hogy az aktive-at jelölni kéne, mindegyikhez hozzáadjuk:
// <li routerLinkActive="active current" [routerLinkActiveOptions]="{exact:true}">< <a routerLink="/elso"></a></li>
// <li routerLinkActive="active current" [routerLinkActiveOptions]="{exact:true}">< <a routerLink="/masodik"></a></li>
// active és a current, mind2 css..      [routerLinkActiveOptions]="{exact:true}" => a pontos elérési utat figyelje 
//                                        ha ez nem lenne beállítva akkor "/" és "/elso" re is active lenne egyszerre

const routes: Routes = [          // sorrendbe fut le lefele
  {
    path:'myCompt',               // localhost:4200/myComp => töltse be a
//  path:'post/:id',              // id alapján  pl.: localhost:4200/post/1
//  path:'**',                    // nem létező route ra mi történjen? pl. fő oldal
    component: MyCompComponent,   // MyCompComponent-st <router-outlet></router-outlet> UTÁN
   	                              // HTML-be elérni => <a routerLink="/myComp"></a> 
    redirectTo:'/myCompt',        // átirányítás => a localhost:4200/myComp -ra
    pathMatch:'full'              // átirányításkor típusa
  },       
  
// admin.module.ts :  // KELL ADMIN MODULE aminek vannak ROUTE-s jai, amik ezek!! =>
// ngModule({ import:RouterModule.forChild(routes) 
// const routes: Routes = [
  {                    
    path:'admin',     
    children:[       
      {               
        path:'users', 
        component:PostsComponent
      },
      {
        path:'settings',
        component:PostsComponent
      }
    ]
  },// localhost:4200/admin/users     localhost:4200/admin/settings 
// DE a app-routing.module.ts be:
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
// ígymár ujrahaznosítható az admin module
];
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// Átadott paraméterek elérése, dependency injectionnal, ha van külön service akkor ott
constructor(private activatedRoute:ActivatedRoute){} //  

// ActivatedRoute:
// paramMap vs queryParamMap => a queryParamMap az egyéb globális paramétereket is átadja, pl.: user/:id?tab=edit => a "tab"-ot
  // queryParams:
    this.activedRoute.queryParams.subscribe(params=>{this.id= params['id']})
    // VAGY html.ben [queryParams]-al , json formátumba // [routerlink]="['/post/',1]" [queryParams]="{userId:'1',id:'2'}"
    // => localhost:4200/post/1?userId=1&id=2         => (queryparaméterek: userId=1, id=2)

  // paramMap:   
    //.get("id")      // return az "id" nevü paraméter értéke mint STRING vagy NULL, ha nincs ilyen
    //.getAll("id")   // -||- string tömbbe adja vissza az id értékeit (HA több értéke is van..ezt kell használni get helyett) 
    //.has("id")      // => true ha van olyan paraméternév hogy "id"
    //.keys           // string tömbben adja vissza az összes paraméter értékét
    this.activatedRoute.paramMap.subscribe(params=>{thi.id = +params.get('id');})   
    // visszaadja az id-t  <=  path:'post/:id',   A + jel => Numberré konvertál
    // a params egy objekt amiket átadtam azokat használhatom, id és userId
        

  // snapshot.paramMap:     NEM FRISSÜL, csak egyszer tölti be !!! 
    //.get("id")      //.getAll("id")   //.has("id")      //.keys 
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'));  // ==== 'post/:id' (lehet több paramétert is átadni)    

//-------------
// dinamikos onclickes navigáció akár id alapon
export class PostsComponent implements OnInit{  // PostsComponent NEM PostComponent
    model:Array<Post>;
    constructor(private router:Router){}        // itt ROUTER-t akarunk átadni MERT
    ngOnInit():void{this.model=POSTS;}          // a navigate() fgv-ét akarjuk használni
    public onClick(post:Post):void{           
      this.router.navigate(['/post',post.id]);  
  //  this.router.navigate(['/post']);  
    }
  }

//-------------
// ha azt akarjuk hogy pl a headerbe egy komponens ne jelenjen meg ha épp pl az about pagen vunk
// header.component.ts:
constructor(private router:Router)    // kell a Router, hogy lecsekkoljuk melyik odlalon vunk
hasRoute(route:string){
  return this.router.url===route;     // ha azon amin kell akkor true, ha nem akkor false
}
//header.component.html:
//<app-button *ngIf="hasRoute('/')""  // ha most a / en vunk akkor megjelenik
/*


// constructor(private aRoute:ActivatedRoute)             // megadja hogy melyik Route-n vunk épp 
// aRoute.params.map(p=>p.id)                             // params => az url paraméterei, pl id, DE ez OBSERVABLE vis subscribe-lni kell
// aRoute.url.map(segments => segments.join(''))          // url    => az útvonal url-je
// aRoute.data.map(d=>d.user)                             // data   => a komponensnek átadott adatok

// constructor(private route:Route){}
// router.navigateByUrl(`/hero/${hero.id}`)               // ts-ben navigálunk
// state: RouterState = router.routerState;
// root: ActivatedRoute = state.root

// ROUTER ESEMÉNYEK=> router.events.subscribe(e=>{if(event instanceof NavigationStart{})})
// NavigationStart(navigáció indításakor), 
// NavigationCancel(ha a navigáció védelme megszakítja a navigációt), 
// NavigationError(ha a navigáció váratlan hiba miatt sikertelen), 
// RoutesRecognized(az útvonal elemzés és felismerese esetén aktivált esemény)
// RouterConfigLoadStart(a konfiguráció betöltése előtt aktivált esemény)
// RouterConfigLoadEnd(a konfiguráció betöltése után aktivált esemény)
// NavigationEnd(a navigáció sikeres befejezése után aktivált esemény)




//------------------------------------------------------------------------------------------------------------------------------------------
// services: szükséges modulok: 
app.module.ts : HttpClientModule
services.ts-ben: HttpClient, HttpHeaders  from '@angular/common/http'
//               Observable               from 'rxjs'       
0. services.ts-ben:
  constructor(private http:HttpClient){}
1. XXX.component.ts:
  constructor(private xxxService:XxxService)
=> az xxxService változón keresztül elérünk mindent a servicesből
=> a service a kapcsolat az endpointal, oda írjuk meg azt a fgv-t aminek a visszatérési értéke egy tömb vagy érték
DE ez asszinkron adatfolyam (Observable) => ezért a xxx.componentbe :subscribe-olni kell
url === ha csak egy adott id-ju elem kell akkor => url =`${this.jsonUrl}/${id}`
*/                                                                                                                                 
// MIT AKARUNK?     xxx.service.ts    yyyfgv():Observable<ModelTípusa>{}      xxx.component.ts: ngOnInit():                                     
// Lekérés, GET     return this.http.get<ModelTípusa>(url);                   this.xxxService.getfgv().subscribe(data=>{this.model=data;})      
// Törlés, DELETE   return this.http.delete<ModelTípusa>(url);                this.xxxService.deletefgv(model).subscribe();
// Update, PUT      return this.http.put<ModelTípusa>(url,model,httpOptions)  this.xxxService.putfgv(model).subscribe();
// Add, POST        return this.http.post<ModelTípusa>(url,model,httpOptions) this.xxxService.postfgv(model).subscribe();
//                                                                                                          .subscribe((data)=>{"mellkhatás"})
// ++ => const httpOptions={headers:new HttpHeaders({"Content-Type":"application/json"})}
// hibakezelés a xxx.service.ts yyyfgv() ének a return után =>
// return this.http.......
// .pipe(catchError(this.handleError('getfgv',[])))                         // get, az összes
// .pipe(catchError(this.handleError<ModelTípusa>('getfgv id=${id}')))      // get, az adott id-jú
// .pipe(catchError(this.handleError<ModelTípusa>('yyyfgv')))               // post, v delete v put
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
@Component({ // felkell venni egy új elemet, az animations-t
  animations: [
    trigger('fade',[      // 1 vagy több trigger // import @angular/animations(ÚJ) VAGY @angular/core(ez a régi)
                          // fade => A neve + a html-be => @fade-t írunk az elem cuccai közé
      state('void',style({backgroundColor:'yellow',opacity:0})),  // itt definiáltuk, hogy a 'void' mit jelentsen => törölhetjük az ismétlő sorokat          
      transition('void => *',[ // a tömb => regisztrálja az összes statet és transitions-t ami ehhez az animációhoz kell
        style({
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
// ASZINKRON Kódoknál
/*
Observable: "Megfigyelhető" a jövőben meghívható értékek vagy események gyűjteménye.                                            // represents the idea of an invokable collection of future values or events.
Observer: "Megfigyelő" olyan callback-ok gyűjteménye, amely tudja, hogy hogyan halgassa 
az Observable által szállított értékeket. (a next,error,complete fgvek)                                                         // is a collection of callbacks that knows how to listen to values delivered by the Observable.
Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.
*/ 
















let button = document.querySelector("button");

// === button.addEventListener('click',(e)=>console.log(e))
Rx.Observable.fromEvent(button,'click')
    .throttleTime(1000)                     // 1000ms ig iratkozunk csak fel az eventre
    .map((data) => { return data.clientY})  // ne az egész eventet adjuk vissza, hanem csak az Y koordinátát
    .subscribe((coordY)=>console.log(coordY)      
    );   

let observer={
    next:function(value){   // akkor hívódik meg amikor emittelődik az új értékkel
        console.log(value)
    },
    error:function(error){  // amikor hiba lép fel pl nem kapunk választ a szervertől
        console.log(error)
    },
    complete: function(){   // amikor végére ért 
        console.log('Completed')
    }
}

Rx.Observable.fromEvent(button,'click')
.subscribe(observer);   // így átadtuk az observer-t és az az ág fut le aminek kell   

Rx.Observable.create(function(obs){     // kreálunk egy Observablet ami a doksi szerint observert(obs) kap ezt subscibe-ljük tovább
    obs.next('A value');                // az obs next-je a 'A value' értéket adja át a neki
    obs.error('Error');                
    obs.next('2. value');                
})
.subscribe(observer);                   
// A value          // ez az eredmény ami le is fut
// Error            // ez is mert befut az ágba
//                  // 2. value ez már nem mert errort kaptunk és nem fut le, mert error után már vége. (complete után is)

let subscription = Rx.Observable.create(function(obs){         // ez van mögötte, ugyanazt csinálja mint a fenti => Rx.Observable.fromEvent(button,'click')
    button.onclick =function(event){
        obs.next(event);
    }               
})
.subscribe(observer);  

setTimeout(function(){subscription.unsubscribe();},5000)    // 5000 sec mulva kikapcsoljuk a buttont




let subject=new Rx.Subject();
subject.subscribe({next: function(value){console.log(value)},complete:function(){console.log("complete")}})
subject.subscribe({next: function(value){console.log(value)}})
subject.next("uj adat");    // uj adat uj adat  // 2x irja ki mert feliratkoztunk 2-re
subject.complete();         // complete         // mind2 befejeződik, csak az egyik nem csinál semmit
subject.next("ez már nem hajtódik végre")



.map((data)=>{/*itt a datát átalakítjuk vmi mássá*/})
.throttleTime(1000) // csak 1000ms ig legyen feliratkozva => 1 s
.interval(1000)     // 1000ms onként meghívódik
.filter()

let observable =Rx.Observable.interval(1000);

observer
filter((value)=>{
    return value%2==0;                      // csak a párosokra lesz igaz vis azokat irja csak ki
})                                          // 0 2 4 6 .....
.subscribe({
    next: function(value){console.log(value)},
    error:function(err){console.log(err)}
})

let observable= Rx.Observable.fromEvent(input,'input')

observer
.map(event=>event.target.value)             // azért kell hogy érték menjen tovább ne pedig az esemény, 
// ha az esemény megy tovább akkor "x"=> "xsads" => "x" re is kiírja újra az "x"-et pedig MERT az event már új pedig "x"==="x"  
.debounceTime(2000)                         // 2s-et vár miután nem történt akt. adatváltozás pl inputba és azt adja tovább 
.distinctUnitChanged()                      // akkor adja tovább ha az uj érték különbözik a régitől
.subscribe({                                
    next: function(value){console.log(value)},
    error:function(err){console.log(err)}
})





let observable= Rx.Observable.fromEvent(input,'input')

observer
.pluck('target','value')            // ugyanaz mint a map, csak rövidebb, az első bemenete az objektumnak a prop-ja 'target' === event.target
.debounceTime(500)                  // utánna lévő bemenetei(több is lehet) a target-nek a propjai, amire szükségünk van 'value' === event.target.value
.distinctUnitChanged() 
.subscribe({                                
    next: function(value){console.log(value)},
})




let observable1= Rx.Observable.fromEvent(input1,'input')
.subscribe(                             
    (event)=> span.textContent=event.target.value  // a span egy html span elem
);

let observable2= Rx.Observable.fromEvent(input2,'input')
.subscribe(                             
    (event)=> span.textContent=event.target.value  // a span ugyanaz a html elem mint elöb
);
// most felülirják egymást ha egyik, másik változik, mert ugyanarra a span ra raktuk
// erre megoldás =>

let observable1= Rx.Observable.fromEvent(input1,'input')
let observable2= Rx.Observable.fromEvent(input2,'input')


observable1.mergeMap(
    event1 => {
        return observable2.map(
            event2 => event1.target.value+' '+event2.target.value
        )
    }
)
.subscribe(                               
    combinedValue => span.textContent=combinedValue
)   // igy a 2 imput eredményét összemappoltuk 



let observable1= Rx.Observable.fromEvent(button,'click')
let observable2= Rx.Observable.interval(1000)

observable1.subscribe(
    (event) => obs2.subscribe(
        (value) => console.log(value)
    )                   // click 1 re elindul 1s enként számol felfele, 
)                       // ujjabb clickekre megint és millió számolás lesz
// ezt nem akarjuk, azt akarjuk hogy a régi leáljon, csak az utolsó éljen
observable1.switchMap(
    event =>{
        return observable2
    }
).subscribe(
    (value)=>console.log(value)     // így csak a régi fut
)

let clickedEmitted=new Rx.BehaviorSubject('Not clicled');               // ezzel adunk neki egy default kezdeti értéket
button.addEventListener('click', ()=>clickedEmitted.next('Clicked!'));
clickedEmitted.subscribe(
    (value) => span.textContent=value                                   // majd minden click után valami történik
)

//----------------------------------------------------------------------------------------------------------
let observable=Observable.create( (observer)=>{
    try {
        observer.next('hey')
        setInterval(()=>{               // 2 secenként kiírja hogy 'I am good'
            observer.next('I am good')
        },2000)
        observer.complete()
        observer.next('heyy')        
    } catch (error) {
        observer.error(error)
    }
})

let observer= observable.subscribe(
    (x)=>console.log(x),            // hey
    (error)=>console.log(error),
    ()=>console.log('completed')    // 'I am good'   'I am good'    'I am good'   'I am good'   'I am good'
)    
setTimeout(()=>{
    let observer2= observable.subscribe(
        (x)=>console.log(x),            // ugyanazt csinálja mint a másik 1 sec- el késöbb és ez NEM áll le
    )   
},1000)

observer.add(observer2)             // mostmár lefog állni mert amikor unsubscibeljuk akkor a 2 est is..

setTimeout(()=>{
    observer.unsubscribe()
},6001)       // 6 s után leiratkozik

let observable=Observable.create( (observer)=>{
try {
    observer.next('hey')
    setInterval(()=>{               // 2 secenként kiírja hogy 'I am good'
        observer.next('I am good')
    },2000)
    observer.complete()
    observer.next('heyy')        
} catch (error) {
    observer.error(error)
}
}).share()                          // így a második feliratkozó nem azzal kezdi hogy "hey" hanem onnan hogy "heyy"
                                    // mert közbe csatlakozik be és már a hey lefutott és a kövi az 'I am good'
                                    // majd egyböl lefut a 2 es observer 'I am good' -ja is , hiába 1 secet vár ő csak,
                                    // megvárja míg a másik elkezdi

let observable =fromEvent(dosument,'mousemove')
setTimeout(()=>{observable.subscribe((x)=>console.log(x))},2000)    // 2 sec mulva feliratkozunk és elkezdjük kiírni..





// OPERÁTOROK

let observable = Observable.create((observer)=>{
    observer.next('HELY MÓNI')
})
let observable2 = Observable.create((observer)=>{
    observer.next('HELY FERI')
})

let newObs = merge(observable,observable2)
newObs.subscribe((x)=>console.log(x))           // 'HELY MÓNI'
                                                // 'HELY FERI'

from([                                          // objektumok tömbje
    {first:'ballér',last:'krisztian',age:'21'},
    {first:'ballér',last:'bia',age:'20'},
    {first:'kiss',last:'jani',age:'12'}
]).pluck('first')
.subscribe((x)=>console.log(x))


let observable=Observable.create((data)=>{
    let i;
    setInterval(()=>{
        data.next(i++)
    },1000)
})

observable2=new Subject;

setTimeout(()=>{
    observable2.next('HEY')
},3000)
let newObs=observable.skipUntil(observable2) // onservable addig amíg a observable 2 lenem futott
newObs.subscribe((x)=> console.log(x))       // 3 4 5 ...első 2 kimarad


//-----------------------------------------------------------------------------------------------------------------------------------
.forEach(value=>{}) // majdnem ugyanaz mint a subscribe, csak itt nem iratkozunk fel, ezt nem figyeljük, egyből megkapjuk az adatot, v nem 
// | async          // feliratkozik helyettünk egy Observable-re a HTML be


//-----------------------------------------------------------------------------------------------------------------------------------
// motorháztető alatt:
const observable = new Observable( (subscriber)=> {
    try {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
    } catch (err) {
        subscriber.error(err); 
    }
});
const observer = {
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
};
const subscription = observable.subscribe(observer);
subscription.unsubscribe();     // leiratkozás
//----------------------------------------
Observable.create((obs)=>{     
    obs.next('A value');              
    obs.complete();                 // véget ér tovább nem megy          
    obs.error('Error');    
    obs.next('2. value');                
})
.subscribe((data)=>console.log(data)); 
//----------------------------------------
this.listObservable=new Observable(observer=>{      // ez az asyncron adatfolyam
    observer.next("megjöttem");
    observer.complete();
})
this.listObservable,subscribe(                      // itt feliratkozunk rá, vagyis mit csináljunk az adattal ha megjött
    value=>console.log(value),
    error=>console.log(error),
    ()=> console.log("vége")
)
//-----------------------------------------------------------------------------------------------------------------------------------
// SUBJECT      // speciális Observable, lehetővé teszi több observer-hez való csatlakozást
const subject= new Subject()
const observer1 = subject.subscribe(
    data => console.log(data),
    err=>console.log(err),
    ()=>console.log('completed'))       // ez önmagábha nem fut le mert megkell neki mondani hogy next
subject.next('az első üzenet elment')   // most írja ki ezt de csak az első observer 
const observer2=subject.subscribe(
    data => console.log(data))
subject.next('az 2. üzenet elment')   // először az 1. majd a 2. observer
subject.next('az 3. üzenet elment')   // ezt is
observer2.unsubscribe()
subject.next('az 4. üzenet elment')   // ezt csak az első mert a 2. már leiratkozott
//----------------------------------------
const behaviorsubject= new BehaviorSubject("First") // az egyesnek ő lesz az első default elküldött értéke DE
//                                              DE a 2 es observer-nek az elötte lévő next lesz a default első vagyis => 'az első üzenet elment'
//----------------------------------------
const replaySubject= new ReplaySubject(2)       // a 2 es observer-nek a 2 vel elötte lévő lesz az első vagyis => 'az első üzenet elment' elötti, ha lenne :)
const replaySubject= new ReplaySubject(30,200)  // a 2 es observer-nek a 30 al elötte lesz az első next ÉS 200 milisecundummal elöttelévő   
//----------------------------------------
const asyncSubject= new AsyncSubject()   // csak az utolsó érték lesz elküldve, a complete() elötti, HA VAN complete()
//-----------------------------------------------------------------------------------------------------------------------------------
// Scheduler
/* Az Scheduler szabályozza, hogy mikor induljon el egy subscription, és mikor érkezzenek az értesítések. Három összetevőből áll.
Az Scheduler egy adatszerkezet. Tudja, hogyan kell tárolni és sorba állítani a feladatokat prioritás vagy más kritériumok alapján.
Az Scheduler egy végrehajtási környezet. Megjelöli, hogy hol és mikor kerül végrehajtásra a feladat (pl. azonnal, vagy egy másik visszahívási mechanizmusban, mint például a setTimeout vagy a process.nextTick, vagy az animációs képkocka).
Az Scheduler-nek van egy (virtuális) órája. Az "idő" fogalmát az ütemező now() getter metódusával biztosítja. Az adott ütemezőn ütemezett feladatok csak az adott óra által jelzett időhöz fognak igazodni.
Az Scheduler lehetővé teszi annak meghatározását, hogy egy megfigyelhető milyen végrehajtási kontextusban fog értesítéseket küldeni a megfigyelőjének.
//-----------------------------------------------------------------------------------------------------------------------------------
// valami => Observable
// ajax bindCallback bindNodeCallback defer empty from fromEvent fromEventPattern generate interval of range throwError timer iif
// valami = érték (lehet Object is)
of(1,2,3,4,5)
.subscribe(data => console.log(data))   // 1 2 3 4 5

of('world') 
.subscribe(data => console.log(data))   // world

const person:Person ={name:'david'};
const personObs:Observable<Person>=of(person);      
personObs.subscribe(data => console.log(data))

// valami = iterálható = tömb v string v Promise
from('world')
.subscribe(data=> console.log(data))    // w o r l d 

from([1,2,3,4,5])
.subscribe(data=> console.log(data))    // 1 2 3 4 5 

const person:Person ={name:'david'};
const personPromise:Promise<Person> = Promise.resolve(person);
const personObs:Observable<Person>=from(personPromise);      
personObs.subscribe(data => console.log(data))

// valami = event
fromEvent(document,'click')
.subscribe(data=> console.log(data))

// valami = időnkénti 
interval(1000).subscribe(data => console.log(data))    // 1 secenként => 0 1 2 3 4 ...
//-----------------------------------------------------------------------------------------------------------------------------------
// MULTI(HOT)   VS      SINGLE(COLD)
const cold = Observable.create((obs)=>{ obs.next(Math.random())});
cold.subscribe((data)=>console.log(data));      // => így 2x egymás után kiír egy-egy különböző random számot
cold.subscribe((data)=>console.log(data));      // vis mind2 más adatot kapott 

const hot = cold.pipe(share());                 
hot.subscribe((data)=>console.log(data)); 
hot.subscribe((data)=>console.log(data));       // => így 1x írja ki vis mind a 2 ugyanazt az adatot kapta meg

//-----------------------------------------------------------------------------------------------------------------------------------
// Operátorok
// Join Creation Operators:             combineLatest concat forkJoin merge partition race zip 
// Transformation Operators:            buffer bufferCount bufferTime bufferToggle bufferWhen concatMap concatMapTo exhaust
//                                      exhaustMap expand groupBy map mapTo mergeMap mergeMapTo mergeScan pairwise partition
//                                      pluck scan switchScan switchMap switchMapTo window windowCount windowTime windowToggle windowWhen
// Filtering Operators:                 audit auditTime debounce debounceTime distinct distinctUntilChanged distinctUntilKeyChanged 
//                                      elementAt filter first ignoreElements last sample sampleTime single skip skipLast skipUntil 
//                                      skipWhile take takeLast takeUntil takeWhile throttle throttleTime
// Join Operators:                      Also see the Join Creation Operators section above. combineLatestAll concatAll exhaustAll 
//                                      mergeAll switchAll startWith withLatestFrom
// Multicasting Operators:              multicast publish publishBehavior publishLast publishReplay share
// Error Handling Operators:            catchError retry retryWhen
// Utility Operators:                   tap delay delayWhen dematerialize materialize observeOn subscribeOn timeInterval 
//                                      timestamp timeout timeoutWith toArray
// Conditional and Boolean Operators:   defaultIfEmpty every find findIndex isEmpty
// Mathematical and Aggregate Operators:count max min reduce
//-----------------------------------------------------------------------------------------------------------------------------------
// filter 
fromEvent(document,'click')
.pipe(
    filter((event)=>{              
        event.clientX > 600;    // csak az olyan eventeked adja tovább kiírásra aminek a clientX-je 600 nál nagyobb 
    })      
).subscribe(console.log)
//-----------------------------------------------------------------------------------------------------------------------------------
// map          // leképezi az akt eventet bármi másra, pl 2 elemű tömbre
fromEvent(document,'click')
.pipe(
    map((event)=>{
        return [event.clientX, event.clientY];
    })
)
.subscribe(console.log)
//-----------------------------------------------------------------------------------------------------------------------------------
// reduce
of(1,2,3,4,5)
.reduce((total,currentValue)=>{
    return total + currentValue;
},0)                                            // kezdő érték
.subscribe({                                   
    next: function(value){console.log(value)},   // 15  // csak az összeget adja
})   
//-----------------------------------------------------------------------------------------------------------------------------------
// scan             // olyan mint a reduce, de ez közbe számol
of(1,2,3,4,5)
.scan((total,currentValue)=>{
    return total + currentValue;
},0)                                
.subscribe({                                     // 1
    next: function(value){console.log(value)},   // 3
})                                               // 6 ... összeadja és kiírja az akt összeget
//-----------------------------------------------------------------------------------------------------------------------------------
// tap           // ugyanaz mint a MAP de ő a manipuláció elötti értéket adja tovább NEM manipulálja az adatot
fromEvent(document,'click')
.pipe(
    tap((event)=>{              // ugyanaz mint a map, DE az eredeti objektumot adja tovább
        return event.clientX;   //  az itt töürténő manipulációk elöttit, DEBUGOLÁSRA
    })      
)
.subscribe(console.log)         // clickeventet írja ki

.pipe(
    tap(n => {
      if (n > 3) {              // hibaküldésnél, ha elötte leakarjuk csekkolni
        throw new TypeError(`Value ${n} is greater than 3`) 
      }
    })
   )
.subscribe(console.log);


.pipe(
    tap(console.log),           // a map-olás elött megnézzük mi volt az érték amit kaptunk
    map(n => n > 0.5 ? 'big' : 'small')
).subscribe(console.log);

of(1, 2, 3).pipe(
    concatMap(n => interval(1000).pipe(     // 1 sec-enként
      take(Math.round(Math.random() * 10)), // lefuttatjuk x-szer // x= generálunk egy random számot 0->10ig
      map(() => 'X'),                       // a kapott számokat X-é alakítjuk
      tap({                                 // majd ha befejeződött vis mind az x db ot elküldtük akkor
        complete: () => console.log(`Done with ${n}`)   // consolra írjuk ki hogy hányadik-nál jártunk 1?2?3?
      })
    ))
   )
   .subscribe(console.log);
//-----------------------------------------------------------------------------------------------------------------------------------
// switchMap           // egy observert bezár és elindít egy másikat // vagy esemény hatására RESTART, ujraindít egy adatfolyamot
fromEvent(document,'click')
.pipe(
    switchMap(()=>interval(1000))   // 1 sec-enként kiírjuk az értéket ami 0 1 2 3 4 5 6 ....
)                                   // click eseményre restartoljuk 0 rol indulunk
.subscribe(console.log)    

of(1, 2, 3).pipe(
    switchMap((x) => of(x, x ** 2, x ** 3)) // 1 1 1 2 4 8 3 9 27
).subscribe(console.log);           // vis úgy mappol hogy ha elfogy a feladat "of(x, x ** 2, x ** 3)" akkor ujraindul a kövivel előröl

postsObs=this.getPosts();
commentObs=this.getComments();
postsObs.pipe(
    switchMap(posts => {                    // bezárjuk a postObs-t ha elfogytak 
        return commentObs                   // és visszatérünk a commentObs-al       
            .pipe(
                tap(comments=>{
                    console.log(comments);
                    console.log(posts)      // így elérjük mind2 őt egy helyen
            })
        )
    })
)


//-----------------------------------------------------------------------------------------------------------------------------------
// share        // ha van egy adatfolyam amire feliratkoznak többen =>
const source = interval(1000)
  .pipe(
        map((x: number) => {
            console.log('Processing: ', x);
            return x*x;
        }),
);
source.subscribe(x => console.log('subscription 1: ', x));
source.subscribe(x => console.log('subscription 2: ', x));
// Processing:     0
// subscription 1: 0
// Processing:     0
// subscription 2: 0
// Processing:     1
// subscription 1: 1
// Processing:     1
// subscription 2: 1

const source = interval(1000)
  .pipe(
        map((x: number) => {
            console.log('Processing: ', x);
            return x*x;
        }),
        share()
);
source.subscribe(x => console.log('subscription 1: ', x));
source.subscribe(x => console.log('subscription 2: ', x));
// Processing:      0
// subscription 1:  0
// subscription 2:  0
// Processing:      1
// subscription 1:  1
// subscription 2:  1
//-----------------------------------------------------------------------------------------------------------------------------------
// debounceTime             // általába akkor használják, ha input mezőbe írunk 
fromEvent(document, 'click')
.pipe(debounceTime(1000))           // 1 sec-et vár amíg nincs event "click"
.subscribe(x => console.log(x));    // és csak utánna írja ki hogy => true
//-----------------------------------------------------------------------------------------------------------------------------------
// throttleTime             // az eventek csökkentésére
fromEvent(document, 'click')            // 1000ms onként csak 1x írja ki hogy true
.pipe(throttleTime(1000))
.subscribe(x => console.log(x));
//-----------------------------------------------------------------------------------------------------------------------------------
// bufferCount              // buffereli az adatokat
fromEvent(document, 'click')            
.pipe(
    bufferCount(20)                 // 20 as length-ű tömböket ad vissza
).subscribe(x => console.log(x));

//-----------------------------------------------------------------------------------------------------------------------------------
//.distinctUnitChanged()    // akkor adja tovább ha az uj érték különbözik a régitől

//-----------------------------------------------------------------------------------------------------------------------------------
// take, takeUntil, takeWhile, takeLast

fromEvent(document,'click')
.subscribe(()=>console.log('clicked on document'))  // így minden clicknél kiírja

// take(x)          // az első x = db 
fromEvent(document,'click')
.pipe(take(2))
.subscribe(()=>console.log('clicked on document'))  // így csak az első 2 clicknél írja ki
/*
fromEvent(document,'click')
.pipe(first())
.subscribe(()=>console.log('clicked on document'))  // így csak az első clicknél írja ki
*/

// takeWhile((x)=> feltétel)    // addig amíg a feltétel igaz
let counter=0;
fromEvent(document,'click')
.pipe(takeWhile(()=>counter<3))                     // így csak 3x tudunk clickelni 
.subscribe(()=>{
    console.log('clicked on document',counter);     // 0 1 2 
    counter++
})  

// takeLast(x)      // utolsó x = db ot adja tovább
of(1,2,3,4)
.pipe(takeLast(2))                                  // így csak az utolsó 2 megy tovább
.subscribe((value)=>{
    console.log('clicked on document',value);       // 3 4 
})  

// takeUntil("a folyamot befejező event")   // amíg benem következik egy másik event
interval(1000)                              // 1 secenként számolunk felfele 0 1 2 3 4 5 6 7 ...
.pipe(
    takeUntil(fromEvent(document,'click'))  // click eseményre leáll a számolás 
).subscribe(console.log)

onStop=new Subject<void>();
fromEvent(document,'click')
.pipe(takeUntil(this.onStop))               // addig amig a "él" az onStop
.subscribe(()=>{
    console.log('clicked on document');       
})  
stop(){                                     // ez egy gombra van kötve
    this.onStop.next();
    this.onStop.complete();
}

const clicks = fromEvent(document, 'click');
interval(1000)
.pipe(takeUntil(clicks));
.subscribe(x => console.log(x));
//-----------------------------------------------------------------------------------------------------------------------------------
// mergeMap  
const carColorObs:Observable<Color>=this.getColor();
const carDriverObs:Observable<Driver>=this.getDriver();

const carObs : Observable<Car>=carColorObs.pipe(
    mergeMap(color=>{               // kombináltuk a 2 Obs-t eggyé
        return carDriverObs.pipe(
            map(driver =>{
                const car:Car={
                    driver:driver,
                    color:color
                };
                return car;
            })
        )
    })
).subscribe(data=>console.log(data))

of('a', 'b', 'c').pipe(                     // átadjuk az elemeket egyesével
    mergeMap(x => interval(1000).pipe(      // 1 secenként mapolunk
            map(i => x+i))),
).subscribe(x => console.log(x));           // a0 b0 c0 a1 b1 c1 ...



//-----------------------------------------------------------------------------------------------------------------------------------
// concatWith       sorosan egymás mögé teszi a 2 Obs-t

fromEvent(document, 'click').pipe(
    map(() => 'click'),                         
    take(1),                                    // az első 'click' után csak 'move' 'move' 'move' 'move'
    concatWith(
        fromEvent(document, 'mousemove').pipe(
            map(() => 'move')
        )
    )
)
.subscribe(x => console.log(x));
//-----------------------------------------------------------------------------------------------------------------------------------
// forkJoin     // tömbként adja vissza a bejövő adatokat, adatfolyamnál az utolsókkat adja tovább
const postObs = this.getPosts();
const commentsObs = this.getComments();
forkJoin(postObs,commentObs)
.subscribe(data => console.log(data))   // egy tömbként adja vissza => [posts[],comments[]]

forkJoin([
    of(1, 2, 3, 4),
    Promise.resolve(8),
    timer(4000),                            
]).subscribe({
    next: value => console.log(value),                      // [4, 8, 0] after 4 seconds
    complete: () => console.log('This is how it ends!'),    // "This is how it ends!" immediately after
});

forkJoin({
    foo: of(1, 2, 3, 4),                                    // foo: 4       // az utolsó elem
    bar: Promise.resolve(8),                                // bar: 8       // csak egy van az az utolsó
    baz: timer(4000),                                       // baz: 0       // vár 4 sec-et szóval 0  wtf
}).subscribe({
    next: value => console.log(value),                      // { foo: 4, bar: 8, baz: 0 } after 4 seconds
    complete: () => console.log('This is how it ends!'),    // "This is how it ends!" immediately after
});


























// redux devtools letöltése CROME ÉS FIREFOXRA
// npm install @ngrx/store-devtools
// app.module.ts => imports: [StoreDevtoolsModule.instrument({logOnly:environment.production,})]

// 1. npm i @ngrx/store
// 2. xxx.state.ts
// 3. xxx.actions.ts
// 4. xxx.reducer.ts
// 5. app.modul.ts => imports:[,StoreModule.forRoot({xxx: xxxReducer, yyy:yyyReducer})]
// 6. xxx-child.component.ts -be injectálás => action : this.store.dispatch(reducerfgv()) 
//                                             data   : this.store.select('stateértéke')   

// 2. xxx.state.ts
export interface CounterState{
    counter:number;
}

export const initialState: CounterState={
    counter:0
}

// 3. xxx.actions.ts
import {createAction} from '@ngrx/store';
export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customIncrement=createAction('customincrement',     // action.type="customincrement"   
props<{count:number,value2:number,...}>());                     // action.count:number 

// 4. xxx.reducer.ts
import {createReducer} from '@ngrx/store';
import {initialState} from './xxx.state';

const _xxxReducer = createReducer(
    initialState,
    on(increment,(state)=>{
        return {
            ...state,
            counter:state.counter+1,
        }
    }),on(decrement,(state)=>{
        return{
            ...state,
            counter:state.counter+1,
        }
    }),on(reset,(state)=>{
        return{
            ...state,
            counter:0,
        }
    }),on(customIncrement,(state,action)=>{
        return{
            ...state,
            counter:state.counter + action.count,
        }
    }),
)
export function xxxReduxer(state,action){
    return _xxxReducer(state,action);
}
// 5. app.modul.ts => 
imports:[,StoreModule.forRoot({counter: counterReducer, yyy:yyyReducer})]

// 6. xxx-child1.component.ts   // Ahol az event van
constructor(private store:Store<{counter:CounterState}>){}  // xxx === az app. modulba lévő xxx
onIncrement(){
    this.store.dispatch(increment());
}
onDecrement(){
    this.store.dispatch(decrement());
}
onReset(){
    this.store.dispatch(reset());
}
/*// 6. xxx-child2.component.ts
constructor(private store:Store<{counter:CounterState}>){}
counter:number;
counterSubscription:Subscription;
ngOnInit():void{
    this.counterSubscription = this.store
        .select('counter')
        .subscribe(data=>{
            this.counter=data.counter;
    })
}
ngOnDestroy(): void {
    if(this.counterSubscription){
        this.counterSubscription.unsubscribe();
    }
}*/

// 6. xxx-child2.component.ts REFAKT    // Ahol a megjelenő érték van
constructor(private store:Store<{counter:CounterState}>){}
counter$:Observable<{counter:number}>;              // =>HTML-ben: {{(counter$ | async).counter}}
ngOnInit():void{
    this.counter$=this.store.select('counter')      // "counter" === app modulba lévő 'xxx', <= Storemodule.forRoot({xxx: xxxReducer})
}

// 7. xxx-child3.component.ts           // Ahol a input is van
value:number;                           // [(ngModel)]="value"          // import Formsmodul-a van...
constructor(private store:Store<{counter:CounterState}>){}
onAdd(){
this.store.dispatch(customIncrement({count: +this.value}))          // +this.value  === numberré konvertál
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
// A probléma
// xxx.state.ts
export interface CounterState{
    counter:number;
    channelName:string;
}

export const initialState: CounterState={
    counter:0;
    channelName:"kiki";
}

// xxx-child1.component.ts
constructor(private store:Store<{counter:CounterState}>){}
channelName:string;
ngOnInit():void{
    this.store.select('counter').subscribe(data=>{                          // [1]  // A PROBLÉMA HOGY [1] ÉS [2] MINDIG LEFUT HA AZ EGYIK LEFUT
            this.channelName=data.channelName;                              //      // MERT REFERENCIA
    })
}
// xxx-child2.component.ts
constructor(private store:Store<{counter:CounterState}>){}
counter:number;
ngOnInit():void{
    this.store.select('counter').subscribe(data=>{                          // [1]  // A PROBLÉMA HOGY [1] ÉS [2] MINDIG LEFUT HA AZ EGYIK LEFUT
            this.counter=data.counter;                                      //      // MERT REFERENCIA
    })
}

// xxx.actions.ts       // plusz
export const changeChannelName = creatAction('changeChannelName');

// xxx.reducer.ts    // plusz
,on(customIncrement,(state)=>{
    return{
        ...state,
        channelName:'uj channelnév',
    }
}),

// ahol a button van
onChangeChannelName(){
    this.store.dispatch(changeChannelName());
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// Megoldás:  // így csak az a rész módosul aminek kell 
// xxx.selector.ts
import {createFeatureSelector} from '@ngrx/store';

const getCounterState = createFeatureSelector<CounterState>('counter');      // xxx.state=counter.state   // 'xxx'='counter' <= app modulba lévő xxx

export const getCounter=createSelector(getCounterState,state=>{
    return state.counter;
})
export const getChannelName=createSelector(getCounterState,state=>{
    return state.channelName;
})
/*// xxx-child1.component.ts
ngOnInit():void{
    this.store.select(getChannelName).subscribe(channelName=>{                          
            this.channelName=channelName;                                      
    })
}
// xxx-child2.component.ts
ngOnInit():void{
    this.store.select(getCounter).subscribe(counter=>{                          
            this.counter=counter;                                      
    })
}*/
// refakt: MERT IGY NEM KELL UNSCIPRTION
// xxx-child1.component.ts
channelName$:Observable<string>;
ngOnInit():void{
    this.channelName$ = this.store.select(getChannelName)       // DE HTML-ben kell a {channelName$ | async}
}
// xxx-child2.component.ts
counter$:Observable<number>;
ngOnInit():void{
    this.counter$ = this.store.select(getCounter)               // DE HTML-ben kell a {counter$ | async}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// Routing ngrx-el
// app-routing.module.ts
import{NgModule} from "@angular/core";
import{Routes} from "@angular/router";
const routes:Routes=[
    {
        path:"",
        component:HomeComponent,
    },
    {
        path:'counter',
        component:CounterComponent,
    },
    {
        path:'posts',
        component:PostListComponent,
    },
]
@NgModule({
    import:[RouterModule.forRoot(routes)],
    export:[RouterModule]
})
export class AppRoutingModule{}
// app.module.ts:           imports:[AppRoutingModule],
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// több state létrehozása:
// app/models/post.models.ts
export interface Post{
    id:string;
    title:string;
    description:string;
}
// post/state/post.state.ts
export interface PostsState{
    posts:Post[];
}
export const initialState:PostsState={
    posts:[
        {
            id:'1',
            title:'a cím',
            descriptor:"asdad"
        },
        {
            id:'1',
            title:'a cím',
            descriptor:"asdad"
        }
    ]
}
// post/state/post.reducer.ts
const _postReducer=createReducer(initialState,on(addPost,(state,action)={
    let post={...action.post};
    post.id=(state.post.length+1).toString();
    return {
        ...state,
        post:[...state.post,post]
    }
})
);

export function postsReducer(state,action){
    return _postReducer(state,action)
}
// post/state/post.actions.ts
export const ADD_POST_ACTION='[post page] add post';

export const addPost=createAction(ADD_POST_ACTION,props<{post:Post}>())

// app/store/app.state.ts
export interface AppState{
    counter:CounterState;
    post:PostsState;
}
export const appReducer={
    counter:counterReducer,
    posts:postsReducer,
}

// 5. app.modul.ts => 
imports:[,Storemodule.forRoot(appReducer)]

// post/state/post.selector.ts
const getPostsState = createFeatureSelector<PostsState>('posts');   // hogy reprezentálja az // app/store/app.state.ts -ben ? 'posts'
export const getPosts = createSelector,(state)=>{                   // így érjük el ezen a fgven keresztül a
    return state.posts;
}

// post/post-list/post-list.component.ts
posts:Observable<Post[]>;
constructor(private store:Store<AppState>){}  // ÖSSZES CONSTRUCTORBA CSERE KELL ERRE AMI ITT VAN!!!!!!!!!!!!!!!!!!!!!!!!

ngOnInit():void{
    this.posts = this.store.select(getPosts);   // HTMLBEN => <tr *ngFor="let post of posts | async">        // kell az async!!!
}
// DE EGY JOBB HTML MEGOLDÁS =>
// <table *ngIf="posts | async as postsData">
// ....
// <tr *ngFor="let post of postsData">

// xxx.components.ts
constructor(private store:Store<AppState>){}  
onAddPost(){
    this.store.dispatch(addPost({post}))
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
/*State management lifecycle

Van egy adatbázisunk, ehhez kapcsolódik egy szerver, így az adatbázis nem közvetlenül kommunikál az interneten, 
továbbá a védelmi mechanizmusok be vannak építve.

A service felel az adatok kezeléséért, ez kapja meg az adatokat. Az effect jelzi azt, hogy adat érkezett 
(ez az úgynevezett „mellékhatása” az adatnak – side-effect), illetve itt van leírva, hogy melyik adatért melyik service-metódus felel.

Ez kapcsolatban áll az action-nel (esemény), amely ha megtörténik, a reducer a kapott adatokat átalakítja olyan formára, amilyet szeretnénk látni. 
Az adatok bekerülnek a store-ba, amely megjegyzi, cache-eli adatokat: ebben vannak benne azok az adatok, amelyekkel az alkalmazás éppen dolgozik

Ha egy adatot szeretnék megkapni, akkor a komponensből nem érem el közvetlenül a store-t, ezért írok egy szelektort, 
amely kiválasztja a nekem szükséges adatot (erre fel tudok iratkozni, mert Observable-t ad vissza).

Majd triggerelem, dispatch-elem az action-t, elindítom az eseményt a komponensből, lefut a reducer, és a store-ból a selector szolgáltatja az adatot.

Az előnye ennek a folyamatnak az, hogy szabványos, előre leírt módon érjük el az adatokat, az pedig sok hibát kiküszöböl, 
hogy nem lehet egymásnak ellentmondó módon elérni az adatokat, hiszen a körforgás révén mindig ugyanabban az irányban mennek.

adatbázis <=> service <=> effects <=> Action => Reducer! => store => selector => component => Action!
*/
/*
ng add @ngrx/store
npm i @ngrx/effects
*/


// app.modul.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

imports: [
    StoreModule.forRoot({ users: UserReducer }),
    EffectsModule.forRoot([ UserEffect ]),
  ],

// app/store/XXX/XxxActions.ts
import { createAction, props } from '@ngrx/store';
import { Xxx } from 'src/app/model/xxx';

export const getItems = createAction('[Xxx] get items');                            
export const loadItems = createAction('[Xxx] load items',props<{items: Xxx[]}>());
export const errorItem = createAction('[Xxx] error items',props<{message: string}>());



// Elkészítjük az effect-eket, ezek tartják a kapcsolatot a service-szel; 
// az action és a service között helyezkednek el, és a megfelelő esemény hatására váltódnak ki.


// app/store/XXX/XxxEffects.ts                  // services és az actions között a kapcsolat
import {Injectable} from '@angular/core'
import {Actions} from '@ngrx/effects'
import {XxxService} from ''

@Injectable()
export class XxxEffect {
    constructor(
      private actions$: Actions,
      private xxxService: XxxService,
    ) { }
    loadItems$ = this.actions$.pipe(
        ofType(getItems),                           // akkor fusson csak le ha ez a típus.. kommunikál az effects a services-el
        switchMap( () => this.xxxService.get() ),   // lekéri az összes adatot..            elindul a kommunikáció
        switchMap( users => of({ type: '[User] load items', items: users })),       // kiváltom az eseményt
        catchError( error => of({ type: '[User] error item', message: error })),    // ha hiba volt
      );
};
// A loadItems$ (this.actions$) egy Observable-t ad vissza, amelyet továbbpipe-olok. 
// Az ofType-pal meg tudom adni, hogy melyik típusúnál fusson le: ha nem jó a típus, nem fut le.
//  Esetünkben a getItems a típus, ezért importáljuk is. A switchMap segítségével meghívjuk a get-et, 
//  lekérjük a felhasználókat, és a load items items néven megkapja a felhasználók tömbjét. Ha hiba történt, azt lekezeljük.




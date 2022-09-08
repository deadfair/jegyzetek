// VUE === single file component
// Options API
<script>
export default {
	data() {          // state
    let localX = 0;
		return {
			count: localX,
      localX
		};
	},
    methods: {
    increment() {   // fgvek
      this.count++
    }
  },

    mounted() {      // lifecicle dolgok
    console.log(`The initial count is ${this.count}.`)
  }
};
</script>

<template>
	<button @click="count++">Count is: {{ count }}</button>
</template>
//---------------------------------------------------------
<style scoped>
button {
	font-weight: bold;
}
</style>

// Composition API
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
//---------------------------------------------------------

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

<div id="app"></div>
app.mount('#app')



// események
<button @click="count++">Add 1</button>

<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>

<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>

Mouse Button Modifiers#
.left
.right
.middle


this.$set(this.adat,'prop','value') // ha kívülröl jön az adat kell neki egy ilyen
objektnél és tömbnél is


<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

rawHtml = <span style="color: red"></span>

<div v-bind:id="dynamicId"></div>          // dinamikus attribute bind-ing
<div :id="dynamicId"></div>   // rövidítés

data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
<div v-bind="objectOfAttrs"></div>

<p v-if="seen">Now you see me</p>


<a v-on:click="doSomething"> ... </a>   // esemény binding
<a @click="doSomething"> ... </a>



<a v-bind:[attributeName]="url"> ... </a>   // atributum binding dinamikus
<a :[attributeName]="url"> ... </a>

<a v-on:[eventName]="doSomething"> ... </a>
<a @[eventName]="doSomething">


<form @submit.prevent="onSubmit">...</form>
// módosítók, 

// klassz binding
<div v-bind:class="{ active: isActive }"></div>
<div :class="{ active: isActive }"></div>
<div :class="klasszváltozó"></div> // dinamikusan változtathatom melyik klassz legyen rajta

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"  // kötőjeles nél muszáj stringbe tenni
></div>

// nyilván ki lehet suzervezni
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
<div :class="classObject"></div>


// milyen klasszók kerüljenek rá dinamukisan sok
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
<div :class="[activeClass, errorClass]"></div>
// kombinált
<div :class="[{ active: isActive }, errorClass]"></div>


// SLOTOK
<div id="app">Hello {{what}}
<UserDetail>Morci</UserDetail> // felülirja a slotot
<UserDetail>
  <template v-slot:keresztnév>
    Jani
  </template>
  <template #keresztnév>
    Jani
  </template>
</UserDetail> // felülirja a slotot

</div>

const UserDetail = {
  name:"UserDetail";     // default tartalom
  template:'<div>user: 
  <slot>Kedves</slot>
  <slot name="keresztnév">Kedves</slot>  
  {{name}}</div>',
  data() {
    return{
    name:'béla'
    }
  }
}
export default {
  name:'RootComponent',
  components:{
    UserComponent
  },
  data(){
    return{
      what:'world'
    }
  }
}



<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>






// mixinek

var myMixin = {
  created:function(){
    this.hello();
  }
  methods:{
    hello:function(){
      console.log('hello');
    }
  }
}


export default {
	data() {          // state
	},
    methods: {
  },
  component:{
    Comp1,
    Comp2,
  }
  mixins:[myMixin],
    mounted() {      // lifecicle dolgok
  }
};


html attribútumok:
attr ='omg'           // konstans
v-bind:attr='omg'     // változó
:attr='omg'           // változó
:attr="'omg'"         // konstans

v-on:click='fgv'
@click='fgv'

data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
<li v-for="item in items">
  {{ item.message }}
</li>

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>

<div v-for="item of items"></div>

<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>

Mutation Methods#
Vue is able to detect when a reactive array's mutation methods are called and trigger necessary updates. These mutation methods are:

push()
pop()
shift()
unshift()
splice()
sort()
reverse()
más esetbe =>
this.$set(this.users,'length',0)

computed:{
  parosok(){
    return this.users.filter(user=> user.age%2===0)
  }
}


vuex=> vue state managment
vuelidate => form validáláshoz
https://vuelidate-next.netlify.app/

props{
  prop1{
    type:String,
    required:true,
    default:"100"d
    default:function(){   // objektum esetén
      return {message:'hello'}
    }
    validator:function(value){   // bonyolultabb custom validátor
      return ['success','warning','error'].indexOf(value) !==-1
    }
  }
}

:prop1='változó'

computed:{
  getID:()=> bossId   // vmi megváltoztathatatlan readonly getter

this.$emit('deleteme')   // emittálás filters
@deleteme=deleteUser(id)
this.$emit('makeMeABoss', user.id)

new Vue({
  el:'#app',
  data:{
    message:'Hello Vue.js!'
  }
})

2 irányu kötés
{{message}}
<input v-model='message'>

npm install -g @vue/cli
vue create my-project


$nextTick // minden renderelésnél lefut

watch:{   // ha vmi változik lefut
  msg(val,oldVal){
    this.increse()
  }
}

3
5
3 10
4 7
9
4
utso elötti
7
6
3

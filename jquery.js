// npm i jquery           
// https://developers.google.com/speed/libraries#jquery       // CDN linkek

// $ === egy fgv
$(/* css szelektorok stringként*/)    // elem(ek) selector(a), amin jqueris fgvek hívhatók !!!

$().val();                // value értéke (input)
$().css('color',"red")    // css propja és értéke 
$().css({color:"red"})    // css propja és értéke 

$().attr("data-paused")     // a data-paused attribútum értéke
$().attr("data-paused","0") // a data-paused attribútum beállítása "0"-ra
$().removeAttr("class");    // eltávolítjuk az attribútumát ami most a class vis removeClass()-al egyenlő

$().addClass();
$().hasClass();
$().removeClass();
$().toggleClass('class')                     // ha nincs rajta a class, akkor felrakja, ha van, akkor leszedi

$().text(`innerText`)
$().html(`innerHTML`)

$("ul").append(`<li>Added list item </li>`)      // appendChild mint innerHTML
$("ul").prepend(`<li>Added list item </li>`);
$(`<li>Added list item </li>`).appendTo("ul");
$(`<li>Added list item </li>`).prependTo("ul");
$().after();
$().before();
/*// ul before
<ul>
  // ul prepend, ul prependTo
  <li></li>
  <li></li>
  <li></li>
  // ul append, ul appendTo
</ul>
// ul after */

$().parent()                // szülője
$().parents('.card')        // megkeresi a legfiatalabb .card szülőjét
$().find('.card')           // bármilyen mélységig megkeresi azt a gyereket akinek van -card-ja
$().siblings()
$().siblings(".card")       // akik .card -ok
$().siblings().not(".twist")// minden tesó aki nem .twist

$().empty();                // kiüríti

$().get(0);                 // html elemként adja vissza
$().eq(0);                  // jqueri elemként adja vissza 
$().eq(0).html(`innerHTML`) // felülírja
$().eq(0).html()            // így visszaadja a innerHtml-t

$(".pause").remove()        // minden .pause classú elemet eltávolít a htmlből
$("div").remove(".pause")   // minden .pause classú elemet eltávolít a divek közül
//---------------------------------------------------------------
$().blur();
$().change();
$().click(()=>{
  $("html").animate({scrollTop:0})  // a tetejére görgetünk lehet plusz paramétereket megadni
});

//---------------------------------------------------------------
$().hide(1000)                // elrejt 1000ms alatt                                  // ő a poziciót változtat
$().show(1000,()=>{console.log("mi csináljon amikor befejeződött az animáció");})
$().toggle()                  // show -> hide -> show -> hide
$().fadeOut(700)              // átmenetes váltás, az átmenet időtartalma ms          // ő opacity-t
$().fadeIn(300)
$().fadeTo(300,0.25)                                                                  // opacity-t 0.25-re
$().fadeOut(700).fadeIn(300)  // láncolható, oda visssza vált mint egy animation

$().slideUp(1000)             // összemegy
$().slideDown(1000)

$().animate({top:350},{duration:1000,complete:()=>{/*ha befejeződött az animáció akokr mi történjen*/}})
//---------------------------------------------------------------
$(()=>{                         // egyböl lefuttatja azt a fügvényt amit így vár
  $(window).on("keyup", e => {  // bekapcsolja az eseményeket
    //pause
    if (e.keyCode === 80) {
      console.log("p");
    } else if(e.keyCode === 27){
      console.log("esc");
    }
  })
})

$(window).off()                 // kikapcsoljuk az előbb csinált keyup eseményt
$(window).one()                 // egyszer fut le
//---------------------------------------------------------------
// AJAX
$.getJSON("http://localhost:8000/setting",data => {console.log(data);})           // kiment a kérés erre a oldalra és object formatumba megkapom
$.post("http://localhost:8000/setting",{name:"kiki"},data=>{console.log(data);})  // visszaadja ID-val és beszúrja az uj adatot
$.ajax("http://localhost:8000/setting/1",{
  dataType:'json',
  method:'put',       // a teljes adatot felülírja
  data:{name:'bia'},
  complete:(data)=>{console.log(data);}
})
$.ajax("http://localhost:8000/settings/1",{
  method:'delete', 
  complete:(data)=>{console.log(data);}
})


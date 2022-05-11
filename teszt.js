
// jestjs.io              // a dokumentáció
// npm i jest -D          // tesztelésre
// npm i jest -g          // globálosan telepít, ahol állunk ott indítjuk a tesztelést 
// "scripts": {
//   "test": "jest"
// },
// npm i eslint-plugin-jest -D    // eslint-hez ...
// .eslintrc.json =>
// "env":{
//   "jest/globals": true
// },
// "plugins":[
//   "jest"
// ]

// teszt lefedettség:
// jest --coverage


//-------------------------------
// src/.js
const sum = (a, b) => {
  if(Number.isFinite(a) && Number.isFinite(b)) {return a + b}
  throw new Error('Parameters must be numbers')
}
const generateItems = (arr,callback) => arr.map(callback)
const getData = callback => {setTimeout(() =>{callback('data')},1000)}
const convertToUpperCase = (str)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(typeof str === 'string'){
        resolve(str.toUpperCase())
      }else{
        reject(new TypeError())
      }
    })
    },2000)
}
// module.exports = sum


//-------------------------------
// test/.test.js

// const sum = require('../src/sum')

describe('Testing sum function',() => {       // describe === milyen fgv-t tesztelek?
  test('sum 1 + 2 should be 3',() => {        // test     === mire tesztelem?
    expect(sum(1,2)).toBe(3)                  // egész számoknál, v stringek, pontos érték összehasonlítás
  })
  test('sum 0.1 + 0.2 should be 0.3',() => {
    expect(sum(0.1,0.2)).toBeCloseTo(0.3)     // tört számoknál, közelítőleg eggyezik e?
  })
  test('sum gives an error if a parameter is not a number',() => {
    [null, undefined, true, false, {}, [],"", "a", NaN].forEach(param => {
      expect(() => sum(param,2)).toThrow()   // dobott e hibát?
    })
  })
})

// CALLBACK
describe('Test generateItems',()=>{
  test('Should return value',()=>{
    const arr = [1,2]
    const callback = x => x * 2
    const actual = generateItems(arr,callback)
    expected = [2,4]
    expect(actual).toEqual(expected)                // tömbök esetén minden elem megeggyezik e? sorrendet is nézi
    // expect(actual).toStrictEqual(expected)       // a properík és azok tipusai is megeggyeznek e?
  })
  test('generateItems callback runs items times',()=>{
    const mockCallback = jest.fn()
    const arr = [1,2];
    const actual = generateItems(arr,mockCallback)
    expect(mockCallback).toHaveBeenCalled()         // meghívódott e ez a callback?
    expect(mockCallback).toHaveBeenCalledTimes(2)   // 2x futott e le?
  })

  test('generateItems callback return value',()=>{
    const mockCallback = jest.fn(x=>x*2)            // akkor kell implementálni ha érdekel az eredmény
    const arr = [2,4];
    generateItems(arr,mockCallback)
    // visszatérési érték vizsgálat
    expect(mockCallback.mock.results[0].value).toBe(4);
    expect(mockCallback.mock.results[1].value).toBe(8);
  })
})

// ASYNC fügvényeknél
describe('getData test', () => {
  test('getData should return data', (done) => {
    const callback = (str) => {
      expect(str).toBe('data');
      done();     // itt lesz a vége a tesztnek, ha ezt nem teszem be akkor a teszt nem várja meg a callback-t
    }
    getData(callback)
  })
})

// PROMISE
describe('PromiseConvert',()=>{
  // ASYNC módon done-al
  test('"test" param should be "TEST"',(done)=>{
    convertToUpperCase('test').then(str => {
      expect(str).toBe('TEST')    // sikeresen lefut e? és megkapom e amit vártam?
      done()
    })
  })
  // VAGY returnoljuk !!!
  test('"test" param should be "TEST"', ()=>{
    return convertToUpperCase('test').then(str => {
      expect(str).toBe('TEST')    // sikeresen lefut e? és megkapom e amit vártam?
    })
  })
  // error tesztelés
  test('reject, not string param return error', ()=>{
    return convertToUpperCase(10).catch(err => {
      expect(err).toBeInstanceOf(TypeError)   // ennek a klassznak a példánya e?
      // expect(err).toEqual(TypeError())
    })
  })
})
// ASYNC AWAIT MÓD
describe('test convertToUpperCase function in the new way',()=>{
  test('"test" param should be "TEST" V2', async ()=>{
    await expect(convertToUpperCase('test')).resolves.toBe('TEST')  // mit resolvált a promise?
  })

  test('reject, not string param return error V2', async ()=>{
    await expect(convertToUpperCase(10)).rejects.toBeInstanceOf(TypeError)
  })
  test('"test" param should be "TEST" V3',  () => {
    return expect(convertToUpperCase('test')).resolves.toBe('TEST')
  })
})

//--------------------------------------------------------------
// SNAPSHOT testing vagyis olyan adatokat akarok tesztelni ami időbe változhat
// igy maga a teszt adatok és teszt eredmények is változnak

expect.addSnapshotSerializer({
  test: (val) => val.title && val.emoji,          // mit akarunk tesztelni
  print: (val) => `${val.title} ${val.emoji}`      // hogy nézzen ki a snapshot fileba az adat?
})

expect(fgv('vmi')).toMatchSnapshot()
// jest --updateSnapshot   // igy frissítem a snapshot file-t


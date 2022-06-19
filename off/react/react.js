// npx create-react-app appnév
// cd appnév
// npm start
// npm install sass   // => App.css átnevezése => App.scss  +// App.js => importnál átírni App.scss-re

//--------------------------------------------------------------------------------------------------------------------------
// egy JSX kódba a class helyett className -t kell írni!!! 
// return (                           // a return értéke zárójelbe !!!
//   <button onClick={handleClick} >Increment</button>
// )
<select>
    {
       numbers.map(el => <option value={el} key={el}> {el} </option>)   // ngfor
    }
</select>

//--------------------------------------------------------------------------------------------------------------------------
// HOOKOK // csak fgvbe használhatjuk
// NEM NESZTELHETŐEK csak felső szinten lehet, semmi if kondíción bellül nem lehet
// useState
// ha a count értéke megváltozik akkor újra rajzoljuk a komponenset
const [count,setCount] = useState(0)                // 0 === kezdő értéke a countnak
// const [count,setCount] =  useState(fgv())        // minden renderelésnél meghívódik
const [count,setCount] =  useState(()=>fgv())       // csak 1 x
const [count,setCount] =  useState({a=10,b=1})       


onClick = {() => setCount(4)}                                 // 4 re álltja a count értékét
onClick = {() => setCount(prevState => prevState + 1)}        // 1 - el növeli
onClick = {() => setCount(prevState => {...prevState, prevState.a + 1})}        // 1 - el növeli

// VAGY
const handleClick = useCallback(() => {   // azé kell így mert ha nem így lenne akkor mindig létrejönne a fgv
  setCount(prevState => prevState + 1)
},[setCount])     // a függőségek megadása tömbben
onClick={handleClick} 

//------------------
// useEffect
// mindne változásnál meghívódik, hogy mikre figyel azt a 2. paraméter adja meg
useEffect(() => {     
  // count = 10 // a count értéke egy állapot, manuálisan tilos változtatni!!
  setCount(10)  // helyette így
})              // így függőség nélkül mindig lefut
useEffect(() => {     
  setCount(10)  
},[])              // a függőségek megadása tömbben, akkor hívja meg ha vmelyik megváltozik így csak 1x fut le
useEffect(() => {     
  // feliratkozás
  return () =>{
    // leiratkozás
  }
},[])             


//--------------------------------------------------------------------------------------------------------------------------
// FETCH
fetch("https://api.github.com/users/kamil-kamil")
  .then(response => response.json())
  .then(data => console.log(data))
API_URL = "https://api.github.com/users/kamil-kamil"

const searchMovies = async (titles) => {
  const response = await fetch(`${API_URL}/&s=${titles}`)
  const data = await response.json()
}

useEffect(() => {
  searchMovies('Spiderman')
})



//--------------------------------------------------------------------------------------------------------------------------
// Components
// component.jsx       // jsxkiterjesztés

const Component = ({prop})=> {
  return prop
}

// =>
<Component prop = {"bármi"}/>


//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------











class Parent extends React.Component {
  handleChildClicked = () => {
      console.log('child clicked');
  }
  render() {
    <Child onClick={this.handleChildClicked} />
  }
}

const Child = (props: Props) => {
const { onClick } = props;
return (
  <button onClick={onClick}>Clicky!</button>
);
};

// https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=Fight
// https://www.mediawiki.org/wiki/API:Main_page
// https://www.mediawiki.org/wiki/API:Search#JavaScript


// https://www.freecodecamp.org/news/how-to-build-wikipedias-api-search-with-ramdajs-b3c1a069d7af/


// https://en.wikipedia.org/w/api.php
// ?action=opensearch
// &search=zyz          # search query
// &limit=1             # return only the first result
// &namespace=0         # search only articles, ignoring Talk, Mediawiki, etc.
// &format=json         # jsonfm prints the JSON in HTML for debugging.












import { Routes ,Route } from 'react-router-dom';
import './App.scss';
import List from'./pages/List'
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route strict exact path="/"  element={<Search/>} />
        <Route path="/search" element={<Search/>} />
        <Route strict exact path="/:id"  element={<List/>} />
      </Routes>
    </div>
  );
}

export default App;




import {useQuery,gql} from '@apollo/client'

const GET_CHARACTER = gql`
query SearchMovies {
  searchMovies(query: "fight club") {
    id
    name
    overview
    releaseDate
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}`
export const useCaracters = () => {
  const {error,data,loading} = useQuery(GET_CHARACTER)
  return {error,data,loading}
}
import {useQuery,gql} from '@apollo/client'

const GET_CHARACTER = gql`
query GetCharacter($id: ID!) {
  searchMovies(id: $id) {
    id
    name
    overview
    releaseDate
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}`
export const useCaracters = (id) => {
  const {error,data,loading} = useQuery(GET_CHARACTER,{
    variables:{id}
  })
  return {error,data,loading}
}

import React from 'react'
import { useCaracters } from '../hooks/useCaracters';
import { Link, useParams } from 'react-router-dom';



export default function IDList() {

  const {id} = useParams()
  const {error ,data,loading} = useCaracters(id)

  console.log({error,data,loading})

  if(loading) return <p>Loading...</p>

  return (
    <div className="List">{
      data.searchMovies.map(movie =>{
        return <Link to={`${movie.id}`}>{movie.name}</Link>
      })
    }
</div>
  )
}



import React from 'react'
import Button from '@mui/material/Button';
import { useCaracters } from '../hooks/useCaracters';



export default function List() {


  const {error ,data,loading} = useCaracters()

  console.log({error,data,loading})

  if(loading) return <p>Loading...</p>

  return (
    <div className="List">{
      data.searchMovies.map(movie =>{
        return <div>{movie.name}</div>
      })
    }
  <Button variant="text">Text</Button>
  <Button variant="contained">Contained</Button>
  <Button variant="outlined">Outlined</Button>
</div>
  )
}







import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useCaracters } from '../hooks/useCaracters';

import {useQuery,gql, useLazyQuery} from '@apollo/client'

const GET_CHARACTER = gql`
query SearchMovies ($name: String!) {
  searchMovies(name: $name) {
    id
    name
    overview
    releaseDate
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}`

export default function Search() {


  const [name,setName] = useState("")

  const [getLocations,{loading,error,data}]=useLazyQuery(GET_CHARACTER,{
    variables:{name}
  })

  return (
    <div className="Search">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={()=> getLocations()} variant="contained">Search</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {data && (
        <ul>
          { data.searchMovies.map(movie =>{
            return <li key={movie.id}>{movie.name}</li>
          })}
        </ul>
        )}
      </div>
  )
}


import { Routes ,Route } from 'react-router-dom';
import './App.scss';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route strict exact path="/"  element={<Search/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </div>
  );
}

export default App;

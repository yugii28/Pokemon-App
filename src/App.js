import React, {useState} from 'react'  
import Form from './Components/Form';
import './App.css';

function App() {

  const [image, setImage] = useState(["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"]);
   //storing pokemon image
  const [shiny_image, setShinyImage] = useState (["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png"])
  //storing second pokemon image
  const [name, setName] = useState (["eevee"]); //storing pokemon name
  const [id, setId] = useState ([133]); //storing pokemon id
  const [height, setHeight] = useState ([3]); //storing pokemon height
  const [stat, setStat] = useState (["hp"]); //storing pokemon stat
  const [stat_value, setStatValue] = useState ([55]); //storing pokemon stat value
  const [move, setMove] = useState (["pay-day"]); //storing pokemon move 
  const [base_experience, setBaseExperience] = useState (["65"]) //storing pokemon base experience
  const [ability, setAbility] = useState (["run-away"]) //storing pokemon ability
  const [weight, setWeight] = useState(["65"]) //storing pokemon weight
  const [type, setType] = useState(["normal"]) //storing pokemon type
  const [local_storage_pokemon_name, setLocal_Storage_Name] = useState ([])
  const [name_array, setname_array] = useState([])
  const [is_there_error, setIsThereError] = useState(false)
  const [input, setInput] = useState ([]) //name of the pokemon that the user enters
  const [count, setCount] = useState(0) //number of times user submits input

async function GetPokemonData (e) { //this function is responsible for making the api call
  try{
    const pokemonname = e.target.elements.pokemonName.value; //accessing the name that the user entered in the form
    setInput(pokemonname)
    e.preventDefault();
    const api_call= await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonname}`); //making the api call
    const pokemon_data_json=  await api_call.json (); //storing data from api in json format
    console.log(pokemon_data_json)
    
    //storing all the data from the api 
    setImage(pokemon_data_json.sprites.front_default)
    setShinyImage(pokemon_data_json.sprites.front_shiny)
    setName(pokemon_data_json.name)
    setLocal_Storage_Name(pokemon_data_json.name)
    setId(pokemon_data_json.id)
    setHeight(pokemon_data_json.height)
    setStat(pokemon_data_json.stats[0].stat.name)
    setStatValue(pokemon_data_json.stats[0].base_stat)
    setMove(pokemon_data_json.moves[0].move.name)
    setBaseExperience (pokemon_data_json.base_experience)
    setAbility(pokemon_data_json.abilities[0].ability.name)
    setWeight(pokemon_data_json.weight)
    setType(pokemon_data_json.types[0].type.name)
    setIsThereError(false)
    setCount(prevCount => prevCount + 1)
    }
  catch(e){ //checking if the correct pokemon name has been entered
    if(e){
      setIsThereError (true)
    }
  }

  //storing all the pokemon names the user enters into local storage
  var datas = JSON.parse(localStorage.getItem('datas') || "[]")
  var data = {
    pokemon_name: local_storage_pokemon_name,
  }

  //storing the recently searched pokemon names in an array
  datas.push(data)
  localStorage.setItem ('datas', JSON.stringify(datas))
  setname_array([...name_array, {
    value: (local_storage_pokemon_name)
  }])
}

  return (

    // heading and input form
    <div>
      <div>
        <h2 class = 'heading1'>Please enter a Pokemon name below</h2>
        <h1 class = 'heading2'>Try "pikachu", "charizard", or "mew"</h1>
      </div>
      <div class = 'form'>
        <Form getPokemonData = {GetPokemonData}/>
      </div>

      {/* //checking for errors */}
      {is_there_error ? <h1 class = 'text'>The pokemon you entered, {input}, was not found! Please try again!</h1> : 
        <div>
          <div class = 'recentlysearchedcard'>
            <div class = 'cardbackground'>
              <p class = 'cardtitle'>Recently Searched</p>
            </div>
            {/* front-end code for recently searched pokemon */}
            <div> 
            {count <= 1 ? <h1></h1> :
              <div class = 'pokemon1'>
                Pokemon name: {JSON.stringify(name_array[count-2].value)} 
                <br/>
              </div>
            }
            {count <= 2 ? <h1></h1> :
              <div class = 'pokemon2'>
                Pokemon name: {JSON.stringify(name_array[count-3].value)} 
                <br/>
              </div>
            }
            {count <= 3 ? <h1></h1> :
              <div class = 'pokemon3'>
                Pokemon name: {JSON.stringify(name_array[count-4].value)} 
              </div>
            }
          </div>
        </div>

      {/* //front end code for the flipping card which shows pokemon information from the API */}
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img class= 'imagesize' alt = "pokemon" src ={image} width= "195"/>
            <div class = 'namedata'>
              {name}<sup>{id}</sup>
            </div>
            <div class="moves">
              <ul>
              <li>Height: {height} decimeters</li>
              <li>{stat}: {stat_value}</li>
              <li>Moves: {move}</li>
              </ul>
            </div>
          </div>
          <div class="flip-card-back">
          <img class= 'imagesize2' alt = "pokemon" src ={shiny_image} width= "150"/> 
            <h1 class = 'details'>More {name} information!</h1>
            <ul>
              <li>Base Experience: {base_experience}</li>
              <li>Ability: {ability}</li>
              <li>Weight: {weight} Hectograms</li>
              <li>Type: {type}</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
}
</div>
);
}
export default App;

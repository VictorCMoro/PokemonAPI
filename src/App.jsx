import { useState } from "react"
import Axios from 'axios'

export default function App(){
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemonInformation, setPokemonInformation] = useState({
        name: "",
        species: "", 
        image: "",
        hp: "",
        attack: "",
        defense: "",
        types: ""  
  })


  const searchPokemon = () => {
    const lowerCasePokemonName = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemonName}`).then(
      (response) => {
        const types = response.data.types.map((type) => type.type.name)
      setPokemonInformation({
        name: lowerCasePokemonName,
        species: response.data.species.name, 
        image: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        types: types.join(", ")  })
    })
    setPokemonChosen(true)

  }
  return(
    <div className="App">
      <div className="TitleSection">    
        <h1>Pokemon Stats</h1>
        <input type="text" value={pokemonName} onChange={(ev) => {setPokemonName(ev.target.value)}}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? 
          (<h1>Please search for a pokemon</h1>) 
        : (
          <>
            <h1>{pokemonInformation.name}</h1>
            <img src={pokemonInformation.image} alt="" />
            <h3>Species: {pokemonInformation.species}</h3>
            <h3>
                Type:  
                {pokemonInformation.types.split(', ').map((type, index) => (
                  <span key={index} className={type}>
                    {type}
                    {index < pokemonInformation.types.split(', ').length - 1 && ', '}
                  </span>
                ))}
            </h3>
            <h4>Attack: {pokemonInformation.attack}</h4>
            <h4>Hp: {pokemonInformation.hp}</h4>
            <h4>Defense: {pokemonInformation.defense}</h4>
          </>
        )}
      </div>
    </div>
  )
}
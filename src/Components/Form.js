import React from 'react';

const Form= props => ( // the user input from Form attribute in the App.js file is stored in the props keyword 
    <form onSubmit= {props.getPokemonData} >
        <div>
        <input className = 'input' type= "text" name= "pokemonName"/>
        </div>
        <button className = 'button'>Submit </button>
    </form>   
)
        
export default Form;
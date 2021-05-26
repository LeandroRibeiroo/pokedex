const poke_container = document.getElementById('poke_container');
const pokemon_numbers = 150;
let pokemons = [];
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
};
const main_types = Object.keys(colors);

const fecthPokemons = async () => {
    for (let i = 1; i <= pokemon_numbers; i++) {
        await getPokemon(i);
    }
};

const search_box = document.getElementById('search_box');

search_box.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredPokemons = document.querySelectorAll('.pokemon .info .name');
    filteredPokemons.forEach((item) => {
        if (item.textContent.toLowerCase().indexOf(searchString) != -1)  {
            item.closest('div').style.display = "block";
        }else{
           item.closest('table').style.display = "none";
        }
    })
});

search_box.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredPokemons = document.querySelectorAll('.pokemon .info .name');
    filteredPokemons.forEach((item) => {
        if (!item.textContent.toLowerCase().indexOf(searchString)) {
            item.closest('table').style.display = "table";
        }else{
           item.closest('table').style.display = "none";
        }
    })
    
});


const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    const res = await fetch(url);
    pokemons = await res.json();
    
    createPokemonCard(pokemons);
};

fecthPokemons();

function createPokemonCard (pokemon) {
    const pokemonElement = document.createElement('table');
    pokemonElement.classList.add('pokemon');


    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonElement.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, 0)}</span>
            <p class="name">${name}</p>
            <small class="type">Type: <span>${type}</span></small> 
        </div>
        
    `

    pokemonElement.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonElement);
};




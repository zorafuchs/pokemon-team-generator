const pokemonTypes1 = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
    "dragon", "dark", "steel", "fairy"
]

const pokemon_cookie = decodeURIComponent(document.cookie
        .split('; ')
        .find(row => row.startsWith('pokemon_team=')));
const pokemon_cookie_value = pokemon_cookie ? pokemon_cookie.split('=')[1] : "";
const pokemons1 = pokemon_cookie_value ? JSON.parse("[" + pokemon_cookie_value + "]") : [];
Vue.createApp({
    data() {
        return {
            pokemonTypes: pokemonTypes1,
            pokemons: pokemons1
        }
    }
}).mount('#vue-js-app');

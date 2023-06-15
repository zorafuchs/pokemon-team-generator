const pokemonTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
    "dragon", "dark", "steel", "fairy"
]

function getPokemonFromCookie() {
    const pokemonCookie = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('pokemon_team=')))
    const pokemonCookieValue = pokemonCookie ? pokemonCookie.split('=')[1] : ""
    return pokemonCookieValue ? JSON.parse("[" + pokemonCookieValue + "]") : []
}

Vue.createApp({
    data() {
        return {
            pokemonTypes: pokemonTypes,
            pokemons: getPokemonFromCookie()
        }
    }
}).mount('#vue-js-app')

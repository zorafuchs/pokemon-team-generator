var relevantRequestId = 0;

function showPokemonFormErrors() {
  const pokemonLevelInput = document.getElementById("level")
  const pokemonLevelError = document.getElementById("level-error")
  const pokemonNameInput = document.getElementById("name")
  const pokemonNameError = document.getElementById("name-error")

  if (! pokemonLevelInput.checkValidity()){
    pokemonLevelError.hidden = false
  }

  if (! pokemonNameInput.checkValidity() || name.value == ""){
    pokemonNameError.hidden = false
  }
}

function validatePokemonLevel() {
  const pokemonLevelInput = document.getElementById("level")
  const pokemonLevelError = document.getElementById("level-error")

  if (pokemonLevelInput.value > 0 && pokemonLevelInput.value < 101) {
    pokemonLevelInput.style.backgroundColor = "green"
    pokemonLevelError.hidden = true
  } else {
    pokemonLevelInput.style.backgroundColor = "red"
  }
}

async function fillFormWithValidPokemonData(pokemonJSON) {
  const pokemonNameInput = document.getElementById("name")
  const pokemonNameError = document.getElementById("name-error")
  const pokemonType1Dropdown = document.getElementById("type1")
  const pokemonType2Dropdown = document.getElementById("type2")
  const pokemonIdInput = document.getElementById("pokemon_id")

  pokemonNameInput.style.backgroundColor = "green"
  pokemonIdInput.value = pokemonJSON.id
  pokemonType1Dropdown.value = pokemonJSON.types[0].type.name
  if (pokemonJSON.types.length > 1) { pokemonType2Dropdown.value = pokemonJSON.types[1].type.name } else { pokemonType2Dropdown.value = "none" }
  pokemonNameInput.setCustomValidity("")
  pokemonNameError.hidden = true
}

function showPokemonInvalidity() {
  const pokemonNameInput = document.getElementById("name")
  pokemonNameInput.style.backgroundColor = "red"
  pokemonNameInput.setCustomValidity("This Pokemon does not exist")
}


async function loadPokemonByName(requestId, pokemonName) {
  const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase()

  const pokeApiRequest = await fetch(pokemonUrl)
  if (pokeApiRequest.ok && requestId == relevantRequestId) {
    const pokemonData = await pokeApiRequest.json()
    fillFormWithValidPokemonData(pokemonData)
  } else if (requestId == relevantRequestId) {
    showPokemonInvalidity()
  }
}

function validatePokemonName() {
  const pokemonNameInput = document.getElementById("name")

  if (pokemonNameInput.value == ""){
    pokemonNameInput.setCustomValidity("Pokemon name must not be empty")
  } else{
    relevantRequestId++
    const requestId = relevantRequestId
    loadPokemonByName(requestId, pokemonNameInput.value)
  }
}
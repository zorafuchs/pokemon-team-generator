var active = true
var randomPokemonId = Math.floor(Math.random() * 1009)
var randomX = Math.floor(Math.random() * 201)
var randomY = Math.floor(Math.random() * 101)

async function fillFormWithName() {
  const url = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonId
  const pokemonNameInput = document.getElementById("name")

  const pokeApiResponse = await fetch(url)
  if (pokeApiResponse.ok) {
    const pokemonData = await pokeApiResponse.json()
    pokemonNameInput.value = pokemonData.name
    validatePokemonName()
  }
}

function showChosenPokemon() {
  const randomizerCanvas = document.getElementById("randomizer")
  const randomizerCanvasPainter = randomizerCanvas.getContext("2d")

  const chosenPokemonImage = new Image;
  chosenPokemonImage.onload = function(){
    randomizerCanvasPainter.drawImage(chosenPokemonImage, randomX, randomY)
    fillFormWithName()
  }
  chosenPokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + randomPokemonId + '.png'

  randomizerCanvasPainter.strokeStyle = "red"
  randomizerCanvasPainter.clearRect(0, 0, 296, 196)
  randomizerCanvasPainter.beginPath()
  randomizerCanvasPainter.moveTo(randomX, randomY)
  randomizerCanvasPainter.lineTo(randomX+96, randomY)
  randomizerCanvasPainter.stroke()
  randomizerCanvasPainter.beginPath()
  randomizerCanvasPainter.moveTo(randomX+96, randomY)
  randomizerCanvasPainter.lineTo(randomX+96, randomY+96)
  randomizerCanvasPainter.stroke()
  randomizerCanvasPainter.beginPath()
  randomizerCanvasPainter.moveTo(randomX+96, randomY+96)
  randomizerCanvasPainter.lineTo(randomX, randomY+96)
  randomizerCanvasPainter.stroke()
  randomizerCanvasPainter.beginPath()
  randomizerCanvasPainter.moveTo(randomX, randomY+96)
  randomizerCanvasPainter.lineTo(randomX, randomY)
  randomizerCanvasPainter.stroke()
}

function drawPokemonImage() {
  const randomizerCanvas = document.getElementById("randomizer")
  const randomizerCanvasPainter = randomizerCanvas.getContext("2d")
  const pokemonImage = new Image;

  pokemonImage.onload = async function(){
    randomizerCanvasPainter.drawImage(pokemonImage, randomX, randomY)
    const waitPromise = new Promise((resolve) => { setTimeout(() => {resolve()}, 100) })
    await waitPromise
    randomPokemonId = Math.floor(Math.random() * 1009)
    randomX = Math.floor(Math.random() * 201)
    randomY = Math.floor(Math.random() * 101)
    if(active) { drawPokemonImage() }
  }
  pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + randomPokemonId + '.png'
}

function toggleRandomizerCanvas() {
  const toggleRandomizerButton = document.getElementById("randomizer-button")

  if (toggleRandomizerButton.value == "Stop Pokemon Randomization"){
    active = false
    toggleRandomizerButton.value = "Start Pokemon Randomization"
    showChosenPokemon()
  } else if (toggleRandomizerButton.value == "Start Pokemon Randomization"){
    active = true
    toggleRandomizerButton.value = "Stop Pokemon Randomization"
    drawPokemonImage()
  }
}

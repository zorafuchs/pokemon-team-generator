var active = true
var randomPokemonId = Math.floor(Math.random() * 1009)
var randomX = Math.floor(Math.random() * 201)
var randomY = Math.floor(Math.random() * 101)

async function fillFormWithName() {
  var url = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonId

  const pokeApiResponse = await fetch(url)
  if (pokeApiResponse.ok) {
    const pokemonData = await pokeApiResponse.json()
    var pokemonNameInput = document.getElementById("name")
    pokemonNameInput.value = pokemonData.name
    validatePokemonName()
  }
}

function showChosenPokemon() {
  var randomizerCanvas = document.getElementById("randomizer");
  var randomizerCanvasPainter = randomizerCanvas.getContext("2d");

  randomizerCanvasPainter.strokeStyle = "red";
  randomizerCanvasPainter.clearRect(0, 0, 296, 196);
  randomizerCanvasPainter.beginPath();
  randomizerCanvasPainter.moveTo(randomX, randomY);
  randomizerCanvasPainter.lineTo(randomX+96, randomY);
  randomizerCanvasPainter.stroke();
  randomizerCanvasPainter.beginPath();
  randomizerCanvasPainter.moveTo(randomX+96, randomY);
  randomizerCanvasPainter.lineTo(randomX+96, randomY+96);
  randomizerCanvasPainter.stroke();
  randomizerCanvasPainter.beginPath();
  randomizerCanvasPainter.moveTo(randomX+96, randomY+96);
  randomizerCanvasPainter.lineTo(randomX, randomY+96);
  randomizerCanvasPainter.stroke();
  randomizerCanvasPainter.beginPath();
  randomizerCanvasPainter.moveTo(randomX, randomY+96);
  randomizerCanvasPainter.lineTo(randomX, randomY);
  randomizerCanvasPainter.stroke();

  var chosenPokemonImage = new Image;

  chosenPokemonImage.onload = function(){
    randomizerCanvasPainter.drawImage(chosenPokemonImage, randomX, randomY);
    fillFormWithName();  
  }
  chosenPokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + randomPokemonId + '.png';
}

function drawPokemonImage() {
  randomPokemonId = Math.floor(Math.random() * 1009)
  randomX=Math.floor(Math.random() * 201);
  randomY=Math.floor(Math.random() * 101);

  var randomizerCanvas = document.getElementById("randomizer");
  var randomizerCanvasPainter = randomizerCanvas.getContext("2d");
  var pokemonImage = new Image;

  pokemonImage.onload = async function(){
    randomizerCanvasPainter.drawImage(pokemonImage, randomX, randomY);
    const waitPromise = new Promise((resolve) => { setTimeout(() => {resolve()}, 100); })
    await waitPromise
    if(active) { drawPokemonImage() }
  }
  pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + randomPokemonId + '.png';
}

function stopRoulette() {
  var button = document.getElementById("randomizer-button");
  console.log(button.value);
  if (button.value == "Stop Pokemon Randomization"){
    active = false;
    button.value = "Start Pokemon Randomization";
    showChosenPokemon()
  } else if (button.value == "Start Pokemon Randomization"){
    active = true;
    button.value = "Stop Pokemon Randomization";
    drawPokemonImage();
  }
}

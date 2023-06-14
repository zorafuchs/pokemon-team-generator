function showError() {
  level = document.getElementById("level");
  levelError = document.getElementById("level-error")
  input = document.getElementById("name");
  inputError = document.getElementById("name-error")
  if (! level.checkValidity()){
    levelError.hidden = false;
  }

  if (! input.checkValidity() || name.value == ""){
    inputError.hidden = false;
  }
}

function validateLevel() {
  level = document.getElementById("level")
  levelError = document.getElementById("level-error")
  if (level.value > 0 && level.value < 101) {
    level.style.backgroundColor = "green";
    levelError.hidden = true
  } else {
    level.style.backgroundColor = "red";
  }
}

function loadGivenPokemon() {
  input = document.getElementById("name")
  inputError = document.getElementById("name-error")
  type1 = document.getElementById("type1")
  type2 = document.getElementById("type2")
  pokemon_id = document.getElementById("pokemon_id")
  console.log(input.value)
  var url = 'https://pokeapi.co/api/v2/pokemon/' + input.value.toLowerCase();

  fetch(url)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(data => {
    input.style.backgroundColor = "green";
    pokemon_id.value = data.id
    type1.value = data.types[0].type.name
    if(data.types.length > 1){ type2.value = data.types[1].type.name } else {type2.value = "none"}
    input.setCustomValidity("");
    inputError.hidden = true
    })
    .catch(error => {
      input.style.backgroundColor = "red";
      input.setCustomValidity("This Pokemon does not exist");
    });
}

function validateName() {
  setTimeout(loadGivenPokemon,500)
}
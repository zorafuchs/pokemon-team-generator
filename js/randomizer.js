var active = true;
var random_pokemon=Math.floor(Math.random() * 1009);
var random_x=Math.floor(Math.random() * 201);
var random_y=Math.floor(Math.random() * 101);

function get_name() {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + random_pokemon;

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
        var input = document.getElementById("name");
        input.value = data.name;
    })
    .catch(error => {
      input.style.backgroundColor = "red";
    });
}

function show_chosen_pokemon() {
    
        var canvas = document.getElementById("randomizer");
        var painter = canvas.getContext("2d");
        painter.strokeStyle = "red";
        painter.clearRect(0, 0, 296, 196);
        painter.beginPath();
        painter.moveTo(random_x, random_y);
        painter.lineTo(random_x+96, random_y);
        painter.stroke();
        painter.beginPath();
        painter.moveTo(random_x+96, random_y);
        painter.lineTo(random_x+96, random_y+96);
        painter.stroke();
        painter.beginPath();
        painter.moveTo(random_x+96, random_y+96);
        painter.lineTo(random_x, random_y+96);
        painter.stroke();
        painter.beginPath();
        painter.moveTo(random_x, random_y+96);
        painter.lineTo(random_x, random_y);
        painter.stroke();
        var image = new Image;

        image.onload = function(){
            painter.drawImage(image, random_x, random_y);
        }
        image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + random_pokemon + '.png';
        get_name();
        validateName();
}

function stopRoulette() {
    var button = document.getElementById("randomizer-button");
    console.log(button.value);
    if (button.value == "Stop"){
        active = false;
        button.value = "Start";
        setTimeout(show_chosen_pokemon,300)
    } else if (button.value == "Start"){
        active = true;
        button.value = "Stop";
        draw_image();
    }
}

function draw_image() {
    random_pokemon = Math.floor(Math.random() * 1009)
    random_x=Math.floor(Math.random() * 201);
    random_y=Math.floor(Math.random() * 101);

    var canvas = document.getElementById("randomizer");
    var painter = canvas.getContext("2d");
    var image = new Image;

    image.onload = function(){
        painter.drawImage(image, random_x, random_y);
    }
    image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + random_pokemon + '.png';
    if(active){setTimeout(draw_image,100)}
}

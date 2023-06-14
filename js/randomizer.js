var active = true;
var random_pokemon=Math.floor(Math.random() * 1009);
var random_x=Math.floor(Math.random() * 201);
var random_y=Math.floor(Math.random() * 101);

async function get_name() {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + random_pokemon;

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      var input = document.getElementById("name")
      input.value = data.name
      validateName()
    }
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
            get_name();  
        }
        image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + random_pokemon + '.png';
}

function stopRoulette() {
    var button = document.getElementById("randomizer-button");
    console.log(button.value);
    if (button.value == "Stop Pokemon Randomization"){
        active = false;
        button.value = "Start Pokemon Randomization";
        show_chosen_pokemon()
    } else if (button.value == "Start Pokemon Randomization"){
        active = true;
        button.value = "Stop Pokemon Randomization";
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

    image.onload = async function(){
        painter.drawImage(image, random_x, random_y);
        const waitPromise = new Promise((resolve) => { setTimeout(() => {resolve()}, 100); })
        await waitPromise
        if(active){draw_image()}
    }
    image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + random_pokemon + '.png';
}

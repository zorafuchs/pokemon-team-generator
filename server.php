<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <title>My Pokemon Team</title>
  </head>
  <body>
    <section id="information" class="w3-container">

      <?php

        $pokemon_types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

        class Pokemon {
          public $name;
          public $type1;
          public $type2;
          public $level;
          public $pokemon_id;
          public $left_till_full_level;

          public function print_pokemon() {
            echo '<article class="w3-quarter w3-panel w3-border w3-round-xxlarge w3-blue w3-cell w3-mobile">';
            echo "<p><strong>$this->name</strong></p>";
            echo "<p>Level: $this->level</p>";
            echo "<p>Types: $this->type1, $this->type2</p>";
            echo "</article>";
          }

          public function set_name($name) {
            $response = file_get_contents('https://pokeapi.co/api/v2/pokemon/'.strtolower($name));
            if ($response) {
              $this->name = $name;
              return true;
            } else {
              echo "<p>Invalid Name</p>";
              return false;
            }
          }

          public function set_type1($type) {
            if (in_array($type, $GLOBALS['pokemon_types'])) {
              $this->type1 = $type;
              return true;
            } else {
              echo "<p>Invalid Type 1</p>";
              return false;
            }
          }

          public function set_type2($type) {
            if (in_array($type, $GLOBALS['pokemon_types']) || "none") {
              $this->type2 = $type;
              return true;
            } else {
              echo "<p>Invalid Type 2</p>";
              return false;
            }
          }

          public function set_level($level) {
            if (is_numeric($level) && $level > 0 && $level < 101) {
              $this->level = $level;
              $this->left_till_full_level = 100 - $level;
              return true;
            } else {
              echo "<p>Invalid Level</p>";
              return false;
            }
          }

          public function add_to_team() {
            if (isset($_COOKIE['pokemon_team'])) {
              setcookie("pokemon_team", $_COOKIE['pokemon_team'] . ',' . json_encode($this));
            } else {
              setcookie("pokemon_team", json_encode($this));
            }
          }
        }

        $current_pokemon = new Pokemon();

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          if($current_pokemon->set_name($_POST["new-pokemon-name"]) && $current_pokemon->set_type1($_POST["new-pokemon-type1"]) && $current_pokemon->set_type2($_POST["new-pokemon-type2"]) && $current_pokemon->set_level($_POST["new-pokemon-level"])) {
            $current_pokemon->pokemon_id = $_POST["new-pokemon-id"];
            $current_pokemon->add_to_team();
            echo "<h1>Created Pokemon</h1>";
            $current_pokemon->print_pokemon();
          } else {
             echo "<p>Pokemon could not be added to Team</p>";
          }
        } else {
          echo "<p>No pokemon in your team yet</p>";
        }
      ?>
      <p><a class="w3-input w3-btn w3-round-xlarge w3-blue" href="index.html">Back to my Team</a></p>
    </section>
  </body>
</html>
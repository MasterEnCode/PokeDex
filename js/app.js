$(document).ready(function () {
  pickPokemon(1)
});

let numPokemon = 1;

const getPokemones = async () => {
  const json = "../utils/poke.json";
  const response = await fetch(json);
  const data = await response.json();
  return data;
};

const getPokemon = async (id) => {
  const pokeDex = await getPokemones();
  const pokemon = pokeDex.filter((poke) => {
    return poke.id == id;
  });
  return pokemon[0];
};

const getPokemonByType = async (typeP) => {
  const pokeDex = await getPokemones();
  const pokemon = pokeDex.filter((poke) => {
    return poke.type.includes(typeP);
  });
  return pokemon;
};

const getPokemonByName = async (nameP) => {
  const pokeDex = await getPokemones();
  const pokemon = pokeDex.filter((poke) => {
    let name = poke.name.toLowerCase();
    let namePoke = nameP.toLowerCase();
    return name.includes(namePoke);
  });
  return pokemon[0];
};

const showPokemon = (num) => {
  if (numPokemon === 0) {
    numPokemon = 1;
    return null;
  }
  switch (num) {
    case 0:
      numPokemon++;
      pickPokemon(numPokemon);
      break;
    case 1:
      numPokemon--;
      pickPokemon(numPokemon);
      break;
    default:
      break;
  }
};


$(".modal-trigger").click(function(e){
  e.preventDefault();
  dataModal = $(this).attr("data-modal");
  $("#" + dataModal).css({"display":"block"});
  // $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
});

$(".close-modal, .modal-sandbox").click(function(){
  $(".modal").css({"display":"none"});
  // $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
});

const pickPokemon = (num) => {
  const pokeDex = getPokemon(num); 
  pokeDex.then((poke) => {
    $('#pokeModal').text('About '+poke.name)
    $('#image').attr("src",  poke.ThumbnailImage)
    $('#modalName').text(poke.name)
    $('#name').text(poke.name)
    $('#type').text(poke.type)
    $('#height').text(poke.height)
    $('#weight').text(poke.weight)
    $('#abilities').text(poke.abilities)
    $('#weakness').text(poke.weakness)
    $('#index').text(poke.number)
  });
};

$( "#inputIndex" ).keyup(function(e) {
  let num = e.target.value;
  if (num > 0 && num < 152) {
    pickPokemon(num)
  }else{
    $("#inputIndex").val("")
  }
});


$("#next").bind("click", () => showPokemon(0));
$("#prev").bind("click", () => showPokemon(1));

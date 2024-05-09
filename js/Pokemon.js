
const pokemonName = document.querySelector('.pokemon__nome'); 
const pokemonNumber = document.querySelector('.pokemon__numero'); 
const pokemonImage = document.querySelector('.pokemon__imagem'); 

const form = document.querySelector('.form');
const input = document.querySelector('.input__buscar'); 
const buttonAnterior = document.querySelector('.anterior'); 
const buttonProximo = document.querySelector('.proximo'); 

let searchPokemon = 1; 

const fetchPokemon = async (pokemon) => { 
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
  if (APIResponse.status === 200) { 
    const data = await APIResponse.json(); 
    return data; 
  }
}

const renderPokemon = async (pokemon) => { 
  pokemonName.innerHTML = 'Loading...'; 
  pokemonNumber.innerHTML = ''; 

  const data = await fetchPokemon(pokemon); 

  if (data) { // 
    pokemonImage.style.display = 'block'; 
    pokemonName.innerHTML = data.name; // Define o nome do Pokemon
    pokemonNumber.innerHTML = data.id; // Define o numero do Pokemon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Define a imagem do pokemon na APi
    input.value = ''; // Limpa o campo de entrada de pesquisa.
    searchPokemon = data.id; // Atualiza o número do Pokémon pesquisado.
  }
}

form.addEventListener('submit', (event) => { 
  event.preventDefault(); 
  renderPokemon(input.value.toLowerCase()); // Ele permite pesquisar como maiusculo ou minusculo o nome do pokemon
});

buttonAnterior.addEventListener('click', () => { // botão de Pokémon anterior.
  if (searchPokemon > 1) { // Verifica se o número do Pokémon pesquisado é maior que 1.
    searchPokemon -= 1; 
    renderPokemon(searchPokemon); //  número do Pokémon atualizado.
  }
});

buttonProximo.addEventListener('click', () => { // Clique no botão de Pokémon seguinte.
  searchPokemon += 1; // número do Pokémon pesquisado.
  renderPokemon(searchPokemon); 
});

renderPokemon(searchPokemon); 

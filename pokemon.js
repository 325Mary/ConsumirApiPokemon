async function fetchPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    const pokemonList = document.getElementById('pokemon-list');

    for (const pokemon of data.results) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        console.log(pokemonData);

        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('card');
        pokemonElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <h2>${pokemonData.name}</h2>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                </div>
                <div class="card-back">
                    <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                    <p>Fuerza: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                    <p>Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                    <p>Rapidez: ${pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                </div>
            </div>
        `;
        pokemonList.appendChild(pokemonElement);
    }
}

fetchPokemonData();


// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

// Parametros para consulta na API, metodo e header
const options = {
    method: 'GET',
    // params: { 'sort-by': 'alphabetical' },
    headers: {
        'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

let pai_de_todos = document.getElementById("home_jogos");

function consultar_API() {
    fetch(url, options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
            MostrarJogos(response);
        })

        .catch(err => console.error(err))

}

consultar_API();

function MostrarJogos(response) {

    for (i = 0; i < response.lenght; i++) {
        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = "jogo_1"
        let conteudo = `<img src="${response[i].thumbnail}" alt="" id="thumbnail">
                    <p id="title" class="title">${response[i].title}</p>
                    <p id="short_description" class="short_description">${response[i].short_description}</p>`

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);
    }

}

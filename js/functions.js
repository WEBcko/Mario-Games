
// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

const video_banner = document.getElementsByName("teste_imagem")
const load_more = document.getElementById("botao_carregar_mais");

// Parametros para consulta na API, metodo e header
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

async function consultar_API() {
    try {

        const response = await fetch(url, options);
        let data = await response.json();

        return data;
    }
    catch (err) {
        console.log(err);
    }

}


let agora = 0;

const botoes_categoria = document.querySelectorAll(".games");
botoes_categoria.forEach(el => el.addEventListener('click', MostrarJogos(this)));

async function MostrarJogos(el) {

    let data = await consultar_API();
    console.log(el);

    let pai_de_todos = document.getElementById("home_jogos");

    for (i = agora; i < agora + 3; i++) {
        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = "jogo"

        let conteudo = `<a href="#user" class="jogo_conteudo">
                        <img src="${response[i].thumbnail}" alt="" id="thumbnail">
                        <p id="title" class="title">${response[i].title}</p>
                        <p id="short_description" class="short_description">${response[i].short_description}</p>
                        </a> `

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);
    }

    agora += 10;
}

MostrarJogos();


load_more.addEventListener("click", consultar_API);


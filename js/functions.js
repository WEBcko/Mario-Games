
// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

// Parametros para consulta na API, metodo e headers
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

async function consultar_API(link) {
    try {

        const response = await fetch(link, options);
        let data = await response.json();

        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function filtrar(category = null, plataform = 'all', sorted = 'popularity'){

    let link = url + '?sort-by' + sorted;

    if (category) {
        link += "&category=" + category;
    }

    if (plataform) {
        link += "&plataform=" + plataform;
    }

    console.log(link);

}

filtrar();

function MostrarJogos(data) {

    let pai_de_todos = document.getElementById("home_jogos");

    for (i = agora; i < agora + 3; i++) {
        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`;
        corpo.className = "jogo";

        let conteudo = `<a href="#user" class="jogo_conteudo">
                        <img src="${data[i].thumbnail}" alt="" id="thumbnail">
                        <p id="title" class="title">${data[i].title}</p>
                        <p id="short_description" class="short_description">${data[i].short_description}</p>
                        </a> `;

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);
    }

    agora += 10;
}



let agora = 0;
const video_banner = document.getElementsByName("teste_imagem")
const load_more = document.getElementById("botao_carregar_mais");

const botoes_categoria = document.querySelectorAll(".category");
botoes_categoria.forEach(el => el.addEventListener('click', MostrarJogos.bind(el.target)));

load_more.addEventListener("click", consultar_API);

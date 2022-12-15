// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

// Parametros para consulta na API, metodo e header
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

let jogosNow;

// DIV DE JOGO EM DESTAQUE
const jogo_banner = document.getElementById("home_jogo_destaque");

// DIV DE LISTA JOGOS
let pai_de_todos = document.getElementById("home_jogos");

// DIV COM LOADING PUCMAN
const pucman = document.querySelector('.loading-pucman');

// Faz o request e formata para json
const consultAPI = async (cmp = "") => {
    try {
        const response = await fetch(url + '?sort-by=popularity' + cmp, options);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function filterGames(cho) {

    cho.parentElement.querySelector(".selected").classList.remove('selected');
    cho.classList.add("selected");

    let category = document.querySelector(".categorys").querySelector(".selected").dataset.category;

    let plataform = document.querySelector(".plataforms").querySelector(".selected").dataset.plataform;
 
    jogo_banner.innerHTML = null;
    pai_de_todos.innerHTML = null;
    
    let filterC, filterP;

    filterC = `&category=${category}`;
    filterP = `&plataform=${plataform}`;

    if (category === "home") {
        filterC = null;
    }

    let cmp = filterP + (filterC ? `${filterC}` : "");

    pucman.style.display = 'block';
    MostrarJogos(await consultAPI(cmp));

}

function MostrarJogos(data = jogosNow) {   
    
    // REMOVE LOADING
    pucman.style.display = 'none';

    jogosNow = data;
    
    let quant_jogos = document.querySelectorAll(".jogo").length;

    favoritos_salvos = getFavoritos();

    let conteudo_jogo_destaque = `  <div class="video_content" >
                                        <video autoplay="true" loop="true" id="video_destaque">
                                            <source src="https://www.freetogame.com/g/${data[0].id}/videoplayback.webm" type="video/webm">
                                        </video>
                                    </div>
                                    <div class="destaque_descricao">
                                        <div class="destaque_imagem"> 
                                        <a  href="${data[0].game_url}" target="_blank"> 
                                            <img id="teste_imagem" src="${data[0].thumbnail}" alt=""> 
                                        </a>
                                        </div>
                                        <div class="conteudo_destaque">
                                            <div class="alinha_botao">
                                                <p class="jogo_destaque_conteudo_title">${data[0].title}</p>
                                                <div class="div_jogos_destaque_botao_favoritos jogo_destaque_conteudo">
                                                    <button class="${favoritos_salvos.indexOf((data[0].id).toString()) != -1 ? " favoritados" : ""}" type="button" value="${data[0].id}" onclick="favoritos(this)"><i class="fa-solid fa-star ${favoritos_salvos.indexOf((data[0].id).toString()) != -1 ? "favoritado" : ""}"></i></ button>
                                                </div>
                                            </div>
                                        <p class="jogo_destaque_conteudo">${data[0].short_description}</p>
                                        </div>
                                    </div>`

    jogo_banner.innerHTML = conteudo_jogo_destaque;

    // fim do banner de destaque

    pai_de_todos.innerHTML = "<section class='wrapper'> <div id='stars'></div><div id='stars2'></div><div id='stars3'></div></section>"

    for (i = quant_jogos + 1; i < quant_jogos + 10; i++) {

        if (data[i] == undefined || data[i] == null) {
            break;
        }

        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = `jogo`
        corpo.setAttribute("onmouseover", "hoverVideo(this)");
        corpo.setAttribute("onmouseout", "hoverVideo(this)");

        let conteudo = `<div class="container_jogo_imagem">
                            <a href="${data[i].game_url}" target="_blank" class="jogo_conteudo">
                                <img src="${data[i].thumbnail}" alt="" id="thumbnail" class="imagem_jogo">
                                <video loop="true" muted="muted" id="video_jogo">
                                    <source src="https://www.freetogame.com/g/${data[i].id}/videoplayback.webm" type="video/webm">
                                </video>
                            </a> 
                        </div>
                        <div> 
                            <p id="short_description" class="short_description">${data[i].short_description}</p> 
                        </div>
                        <div class="div_jogo_conteudo_footer">
                            <p id="title" class="title">${data[i].title}</p>
                            <button  type="button"  value="${data[i].id}" onclick="favoritos(this)"> <i class="fa-solid fa-star ${favoritos_salvos.indexOf((data[i].id).toString()) != -1 ? "favoritado" : ""}"></i></button>
                        </div>`

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);

    }

}

function hoverVideo(div_jogo){
    const video = div_jogo.querySelector('#video_jogo'); // Pega o video 

    let rodando = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA; // Verifica se ele ta rodando

    if (!rodando) { // SENÃO ESTIVER RODANDO DA PLAY
        video.play();
        return;
    }

    // SE O VIDEO ESTIVER RODANDO RESETA E PAUSA
    video.currentTime=0; 
    video.pause();
}


// EXIBE OS JOGOS POR POPUALRIDADE NA HOME
consultAPI().then(data => {
    
    MostrarJogos(data);
    
});

// CARREGA MAIS JOGOS NO SCROOL
window.onscroll = function (e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 70) { // VERIFICA SE THUMB DO SCROLL CHEGOU NO FIM
        pucman.style.display = 'block';
        MostrarJogos();
    }
};

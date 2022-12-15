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

    console.log(cmp);
    MostrarJogos(await consultAPI(cmp));

}

function MostrarJogos(data = jogosNow) {   
    
    jogosNow = data;
    
    let quant_jogos = document.querySelectorAll(".jogo").length;

    favoritos_salvos = localStorage.getItem("favoritos");
    favoritos_salvos = JSON.parse(favoritos_salvos);

    if (favoritos_salvos == undefined) {
        localStorage.setItem("favoritos", JSON.stringify([]));
        favoritos_salvos = localStorage.getItem("favoritos");
    }

    let conteudo_jogo_destaque = `  <div class="video_content" >
                                        <video autoplay="true" loop="true" id="video_destaque">
                                            <source src="https://www.freetogame.com/g/${data[0].id}/videoplayback.webm" type="video/webm">
                                        </video>
                                    </div>
                                    <div class="destaque_descricao">
                                        <div class="destaque_imagem"> 
                                            <img id="teste_imagem" src="${data[0].thumbnail}" alt=""> 
                                        </div>
                                        <div class="conteudo_destaque">
                                            <div class="alinha_botao">
                                                <p class="jogo_destaque_conteudo">${data[0].title}</p>
                                                <div class="div_jogos_destaque_botao_favoritos jogo_destaque_conteudo">
                                                    <button class="${favoritos_salvos.indexOf((data[0].id).toString()) != -1 ? " favoritados" : ""}" type="button" value="${data[0].id}" onclick="favoritos(this)"><i class="fa-solid fa-star ${favoritos_salvos.indexOf((data[0].id).toString()) != -1 ? "favoritado" : ""}"></i></ button>
                                                </div>
                                            </div>
                                        <p class="jogo_destaque_conteudo">${data[0].short_description}</p>
                                        </div>
                                    </div>`

    jogo_banner.innerHTML = conteudo_jogo_destaque;

    // fim do banner de destaque

    for (i = quant_jogos + 1; i < quant_jogos + 10; i++) {

        if (data[i] == undefined || data[i] == null) {
            break;
        }

        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = `jogo`
        corpo.setAttribute("onmouseover", "this.querySelector('#video_jogo').play()");
        corpo.setAttribute("onmouseout", "this.querySelector('#video_jogo').pause();this.querySelector('#video_jogo').currentTime=0;");

        let conteudo = `<div class="container_jogo_imagem">
                            <a href="${data[i].game_url}" class="jogo_conteudo">
                                <img src="${data[i].thumbnail}" alt="" id="thumbnail" class="imagem_jogo">
                                <video loop="true" id="video_jogo">
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

// EXIBE OS JOGOS POR POPUALRIDADE NA HOME
consultAPI().then(data => {
    
    MostrarJogos(data);
    
});




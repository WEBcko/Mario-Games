// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

// Parametros para consulta na API, metodo e header
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};


// aqui sera mostrado o banner de jogo em destaque//
const jogo_banner = document.getElementById("home_jogo_destaque");

//aqui sao os jogos que seram mostrados
let pai_de_todos = document.getElementById("home_jogos");

// Faz o request e formata para json
const consultAPI = async (cmp = "") => {
    try {
        const response = await fetch(url + cmp, options);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function filterGames(cho) {

    let plataform = cho.dataset.plataform;
    let category = cho.dataset.category;

    choDad = cho.parentElement;
    choDad.querySelector(".selected").classList.remove('selected');

    cho.classList.add("selected");

    if (cho.dataset.category == undefined){
       category = document.querySelector(".categorys").querySelector(".selected").dataset.category;
    }

    if (cho.dataset.plataform == undefined){
        plataform = document.querySelector(".plataforms").querySelector(".selected").dataset.plataform;
    }

    jogo_banner.innerHTML = null;
    pai_de_todos.innerHTML = null;
    agora = 1;
    
    let filterS, filterC, filterP;

    filterC = `category=${category}`;
    filterP = `plataform=${plataform}`;
    filterS = 'sort-by=popularity'

    if (category === "home"){
        filterC = null;
    }

    let cmp = "?" + filterP + (filterC ? `&${filterC}` : "") +  `&${filterS}`;

    console.log(cmp);
    MostrarJogos(await consultAPI(cmp));

}

const load_more = document.getElementById("botao_carregar_mais");

let agora = 1;

function MostrarJogos(data) {

    favoritos_salvos = localStorage.getItem("favoritos");
    favoritos_salvos = JSON.parse(favoritos_salvos);

    if (favoritos_salvos == undefined) {
        localStorage.setItem("favoritos", JSON.stringify([]));
        favoritos_salvos = localStorage.getItem("favoritos");
    }

    console.log(data)
    let conteudo_jogo_destaque = ` <img id="teste_imagem" src="${data[0].thumbnail}" alt=""> 
                                      <video autoplay="true" loop="true" id="video_destaque">
                                        <source src="https://www.freetogame.com/g/${data[0].id}/videoplayback.webm" type="video/webm">
                                      </video>
                                      <div class="destaque_descricao">
                                          <div class="alinha_botao">
                                            <p class="jogo_destaque_conteudo">${data[0].title}</p>
                                            <div class="div_jogos_destaque_botao_favoritos jogo_destaque_conteudo">
                                               <button  class="${favoritos_salvos.indexOf((data[0].id).toString()) != -1 ? "favoritados" : "" }" type="button" value="${data[0].id}" onclick="favoritos(this)" >FAVORITAR</button>
                                            </div>
                                          </div>
                                          <p class="jogo_destaque_conteudo">${data[0].short_description}</p>
                                      </div>`

    jogo_banner.innerHTML = conteudo_jogo_destaque;
    //fim do banner de destaque//


    for (i = agora; i < agora + 10; i++) {

        if (data[i] == undefined || data[i] == null){
            break;
        }

        let corpo_hover = document.createElement("div");
        corpo_hover.className = `jogo_hover${i}`

        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = `jogo`

        let conteudo = `<a href="${data[i].game_url}" class="jogo_conteudo">
                            <img src="${data[i].thumbnail}" alt="" id="thumbnail" class="imagem_jogo">
                            
                            <video autoplay="true" loop="true" id="video_jogo">
                                        <source src="https://www.freetogame.com/g/${data[i].id}/videoplayback.webm" type="video/webm">
                            </video>
                        
                        </a> 
                        <div> 
                            <p id="short_description" class="short_description">${data[i].short_description}</p> 
                        </div>
                        <div class="div_jogo_conteudo_footer">
                            <p id="title" class="title">${data[i].title}</p>
                            <button  type="button"  value="${data[i].id}" onclick="favoritos(this)"> <i class="fa-solid fa-star ${favoritos_salvos.indexOf((data[i].id).toString()) != -1 ? "favoritado" : "" }"></i></button>
                        </div>`


        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);


        // if (favoritos_salvos.indexOf((data[0].id).toString()) == 0){

        // }
    }

    // let teste = (data[0]).toString();
    // console.log(teste)
    // console.log(favoritos_salvos.indexOf((data[0].id).toString()));

    agora += 10;

}

// filterGames(document.querySelector(".category"));
// MostrarJogos();

// load_more.addEventListener("click", MostrarJogos);




// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity'

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

let agora = 1;

const botoes_categoria = document.querySelectorAll(".games");
botoes_categoria.forEach(el => el.addEventListener('click', MostrarJogos));

async function MostrarJogos(el) {

    let data = await consultar_API();
    console.log(el);

    

    // aqui sera mostrado o banner de jogo em destaque//
    const jogo_banner = document.getElementById("home_jogo_destaque");

    let conteudo_jogo_destaque = `<img id="teste_imagem" src="${data[0].thumbnail}" alt="">
                                      <video autoplay="true" loop="true" id="video_destaque">
                                        <source src="https://www.freetogame.com/g/${data[0].id}/videoplayback.webm" type="video/webm">
                                      </video>
                                      <div class="div_jogo_destaque_descricao">
                                          <div class="alinha_botao">
                                            <p class="jogo_destaque_conteudo">${data[0].title}</p>
                                            <div class="div_jogos_destaque_botao_favoritos jogo_destaque_conteudo">
                                               <button type="button" value="${data[0].id}" onclick="favoritos(this)" >FAVORITAR</button>
                                            </div>
                                          </div>
                                          <p class="jogo_destaque_conteudo">${data[0].short_description}</p>
                                      </div>`


    jogo_banner.innerHTML = conteudo_jogo_destaque;
    //fim do banner de destaque//

    let pai_de_todos = document.getElementById("home_jogos");

    for (i = agora; i < agora + 10; i++) {
        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = `jogo`

        let conteudo = `<div onmouseover="hover_in(this)" onmouseout="hover_out(this)" class="teste_12">
                            <input type="hidden" name="descricao_jogo_${i}" value="${data[i].short_description}"></input>
                            <a href="#user" class="jogo_conteudo">
                                <img src="${data[i].thumbnail}" alt="" id="thumbnail" class="imagem_jogo">
                            </a> 
                            <div class="div_jogo_conteudo_footer">
                                <p id="title" class="title">${data[i].title}</p>
                                <button type="button"  value="${data[i].id}" onclick="favoritos(this)">FAVORITAR</button>
                            </div>
                        </div>
                        `
            // < p class="jogo_destaque_conteudo" > ${ data[0].short_description }</p >

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);
    }

    agora += 10;
}

function hover_in(data){
    // document.querySelector(".teste_12").style = "display:none;"
    let corpo_hover = document.createElement("div"); 
    corpo_hover.className = `corpo_hover` 
    // console.log(data)
    let conteudo = `<a href="#user" class="jogo_conteudo_hover">
                        <img src="${data.querySelector("img").src}" alt="" id="thumbnail" class="imagem_jogo_hover">
                    </a> 
                    <div class="div_jogo_conteudo_footer">
                        <p id="title" class="title_hover">${data.querySelectorAll("p")[0].title}</p>
                        <button type="button"  value="${data.querySelectorAll("button")[0].value}" onclick="favoritos(this)" >FAVORITAR</button>
                    </div>
                        <p class="jogo_destaque_conteudo_hover">${data.querySelector("input").value}</p>
                    </div>`

    // console.log(data.querySelectorAll("button").value)
    corpo_hover.innerHTML = conteudo;
    document.getElementById("jogo_1").appendChild(corpo_hover);

}

function hover_out(data){
    let conteudo = `<a href="#user" class="jogo_conteudo_hover">
                        <img src="${data.querySelector("img").src}" alt="" id="thumbnail" class="imagem_jogo_hover">
                    </a> 
                    <div class="div_jogo_conteudo_footer">
                        <p id="title" class="title_hover">${data.querySelectorAll("p")[0].title}</p>
                        <button type="button"  value="${data.querySelectorAll("button")[0].value}" onclick="favoritos(this)" >FAVORITAR</button>
                    </div>
                     <p class="jogo_destaque_conteudo_hover">${data.querySelector("input").value}</p>
                    `
                    //    window.alert(`asd`)

    // corpo.innerHTML = conteudo;
    document.getElementById("jogo_1").innerHTML=conteudo;
    // pai_de_todos.appendChild(corpo);
}

MostrarJogos();

load_more.addEventListener("click", MostrarJogos);



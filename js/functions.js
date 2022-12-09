
// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity'


const load_more = document.getElementById("botao_carregar_mais");



let contador = 0;




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

        let conteudo = `<div>
                        <a href="#user" class="jogo_conteudo">
                        <img src="${data[i].thumbnail}" alt="" id="thumbnail">
                        </a> 
                        <div class="div_jogo_conteudo_footer"><p id="title" class="title">${data[i].title}</p>
                        
                        <button type="button"  value="${data[i].id}" onclick="favoritos(this)" >FAVORITAR</button></div>
                        </div>
                        `

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);

        // <p id="short_description" class="short_description">${data[i].short_description}</p>

    }

    agora += 10;

}







MostrarJogos();

load_more.addEventListener("click", MostrarJogos);



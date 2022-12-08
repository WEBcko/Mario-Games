
// Url da API
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity'


const load_more = document.getElementById("botao_carregar_mais");



let contador = 0;


//funcao de favoritos (salvo em LOCAL STORAGE)
function favoritos(a) {
    //pega o item "favoritos" no LocalStorage
    let favoritos = localStorage.getItem("favoritos");
    //transforma o JSON em Array para ser utilizado 
    let dale = JSON.parse(favoritos);
    console.log(dale);
    //procura o valor o ID do jogo
    let index = dale.indexOf(a.value);
    console.log(index);
    //se o ID do jogo for encontrado entao deleta ele do array, se nao existir o ID do jogo adiciona ele ao arry
    index != -1 ? dale.splice(index, 1) : dale.push(a.value);
    //Salva ele no LocalStorage novamente 
    localStorage.setItem('favoritos', JSON.stringify(dale))

}

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
botoes_categoria.forEach(el => el.addEventListener('click', MostrarJogos(this)));

async function MostrarJogos(el) {

    let data = await consultar_API();
    console.log(el);

    // aqui sera mostrado o abnner de jogo em destaque//
    const jogo_banner = document.getElementById("home_jogo_destaque");

    let conteudo_jogo_destaque = `<img id="teste_imagem" src="${data[0].thumbnail}" alt="">
                                      <video autoplay="true" loop="true" id="video_destaque">
                                        <source src="https://www.freetogame.com/g/${data[0].id}/videoplayback.webm" type="video/webm">
                                      </video>
                                      <div class="div_jogo_destaque_descricao">
                                          <div class="alinha_botao">
                                            <p class="jogo_destaque_conteudo">${data[0].title}</p>
                                            <div class="div_jogos_destaque_botao_favoritos jogo_destaque_conteudo">
                                               <button type="button"  value="${data[0].id}" onclick="favoritos(this)" >FAVORITAR</button>
                                            </div>
                                          </div>
                                          <p class="jogo_destaque_conteudo">${data[0].short_description}</p>
                                      </div>`


    jogo_banner.innerHTML = conteudo_jogo_destaque;
    //fim do banner de destaque//

    let pai_de_todos = document.getElementById("home_jogos");

    for (i = agora; i < agora + 9; i++) {
        let corpo = document.createElement("div");
        corpo.id = `jogo_${i}`
        corpo.className = "jogo"

        let conteudo = `<a href="#user" class="jogo_conteudo">
                        <img src="${data[i].thumbnail}" alt="" id="thumbnail">
                        <p id="title" class="title">${data[i].title}</p>
                        <p id="short_description" class="short_description">${data[i].short_description}</p>
                        </a> 
                        <button type="button"  value="${data[i].id}" onclick="favoritos(this)" >FAVORITAR</button>`

        corpo.innerHTML += conteudo;
        pai_de_todos.appendChild(corpo);


    }
    
    agora += 10;



    //   function TesteHoverEntra(){
    //     var box = document.getElementById("jogo_1");
    //     // var box2 = document.getElementByClassName("category");
    
    //     box.addEventListener("mouseover", function(){
    
    //         alert("OII");
    //     })
    
    //     // box.addEventListener("")
    //   }  

    //   function TesteHoverSair(){
    //     var box = document.getElementById("jogo_1");
    //     // var box2 = document.getElementByClassName("category");
    
    //     box.addEventListener("mouseout", function(){
    
    //         alert("TA FORA");
            
    //     })
    //   }

    //   TesteHoverEntra();
    //   TesteHoverSair();
}



MostrarJogos();



load_more.addEventListener("click", MostrarJogos);




//funcao de favoritos (salvo em LOCAL STORAGE)
function favoritos(a) {
    //pega o item "favoritos" no LocalStorage
    let favoritos_salvos = localStorage.getItem("favoritos");
    //verifica se existe se nao tiver executa o IF abaixo
    if (favoritos_salvos == undefined){
        //cria o item LOCAL com chave "favoritos" e valor array vazio
        localStorage.setItem("favoritos", JSON.stringify([]));
        //atualiza a variavel favoritos com o valor novo que ao e nulo
        favoritos_salvos = localStorage.getItem("favoritos");
    }

    //transforma o JSON em Array para ser utilizado
    let dale = JSON.parse(favoritos_salvos);
    // console.log(dale);
    //procura o valor o ID do jogo
    let index = dale.indexOf(a.value);
    // console.log(index);
    //se o ID do jogo for encontrado entao deleta ele do array, se nao existir o ID do jogo adiciona ele ao arry
    index != -1 ? dale.splice(index, 1) : dale.push(a.value);
    // console.log(dale);
    //Salva ele no LocalStorage novamente 
    localStorage.setItem('favoritos', JSON.stringify(dale))


    const icon = a.querySelector("i");
    let verf_hover = icon.classList.contains("teste_hover");

    if (verf_hover) {
        icon.classList.remove("teste_hover")
    } else {
        icon.classList.add("teste_hover")
    }
}


async function printarFavoritos() {

    let ids = localStorage.getItem('favoritos');
    ids = JSON.parse(ids);
    let fav = [];

    data = await consultAPI();

    for (let i = 0; i < ids.length; i++) {
        let indice = data.findIndex(p => p.id == ids[i]);
        fav.push(data[indice]);
    }   

    document.getElementById("home_jogo_destaque").innerHTML = null;

    document.getElementById("home_jogos").innerHTML = null;

    MostrarJogos(fav);
} 
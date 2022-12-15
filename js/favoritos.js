function favoritos(a) {
   
    let dale = getFavoritos();
    let index = dale.indexOf(a.value);

    index != -1 ? dale.splice(index, 1) : dale.push(a.value);

    //Salva ele no LocalStorage novamente 
    localStorage.setItem('favoritos', JSON.stringify(dale))


    const icon = a.querySelector("i");
    let verf_hover = icon.classList.contains("favoritado");

    if (verf_hover) {
        icon.classList.remove("favoritado")
    } else {
        icon.classList.add("favoritado")
    }
}   

// RETORNA OS FAVORITOS EM ARRAY, CASO O CAMPO NÃO EXISTA ELE É CRIADO COM ARRAY VAZIO
function getFavoritos (){
    //pega o item "favoritos" no LocalStorage
    let favoritos_salvos = localStorage.getItem("favoritos");

    if (favoritos_salvos == undefined){
        localStorage.setItem("favoritos", JSON.stringify([]));

        favoritos_salvos = localStorage.getItem("favoritos");
    }

    //transforma o JSON em Array para ser utilizado
    let dale = JSON.parse(favoritos_salvos);

    return dale;
}

async function printarFavoritos() {
    
    let ids = localStorage.getItem('favoritos');
    ids = JSON.parse(ids);

    let fav = [];

    let data = await consultAPI();

    console.log(ids.length);
    
    // data.forEach(jogo=> {

    //     jogo.id == ids[i] ? fav.push(jogo) : null;
        
    // });

    for (let i = 0; i < ids.length; i++) {
        let indice = data.findIndex(p => p.id == ids[i]);
        fav.push(data[indice]);
    }   

    document.getElementById("home_jogo_destaque").innerHTML = null;

    document.getElementById("home_jogos").innerHTML = null;

    MostrarJogos(fav);
} 
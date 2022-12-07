// const url = `https://www.freetogame.com/api/games`

// fetch(url)

// .then((response) => {
//   response.json()
//   // .then(data => console.log(data));
// })

// .catch(() => window.alert(`error`));
let agora = 3;

const short = document.getElementById("botao_pvp");

let pai_de_todos = document.getElementById("home_jogos");
let corpo1 = document.createElement("div");
corpo1.className = "jogo_1"

const options = {
  method: 'GET',
  // params: { 'sort-by': 'alphabetical' },
  headers: {
    'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'


function consultar_API() {
  fetch(url, options)
    .then(response => response.json())
    .then(function (response) {
      // console.log(response);
      MostrarJogos(response);
    })
    .catch(err => console.error(err))
    
}

function MostrarJogos(response) {
  
  for(i=0; i < agora;i++){
     let corpo = document.createElement("div");
     corpo.id = `jogo_${i}`
     corpo.className = "jogo_1"

     let conteudo = `<img src="${response[i].thumbnail}" alt="" id="thumbnail">
                    <p id="title" class="title">${response[i].title}</p>
                    <p id="short_description" class="short_description">${response[i].short_description}</p>`

     corpo.innerHTML += conteudo;
     pai_de_todos.appendChild(corpo);
   }

   agora +=3;
}



// function adicionar(){
//   agora = teste;
//   teste = teste + 3;
//   console.log(teste)
// }


short.addEventListener("click", consultar_API);









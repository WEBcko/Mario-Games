// const url = `https://www.freetogame.com/api/games`

// fetch(url)

// .then((response) => {
//   response.json()
//   // .then(data => console.log(data));

// })

// .catch(() => window.alert(`error`));
let pai_de_todos = document.getElementById("home_jogos");
let corpo = document.createElement("div");
corpo.id = "jogo_1"
corpo.className = "jogo_1"
let corpo1 = document.createElement("div");
corpo1.className = "jogo_1"
let corpo2 = document.createElement("div");
corpo2.className = "jogo_1"

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '895715e8famsh85b72032fa5579ap1093c5jsn34e7b49cd053',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

  let dale;

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)

  .then(response => response.json())
  .then(function (response){
    let nome_jogos = response[0].title;
    let img_jogos =  response[0].thumbnail;
    let descricao_jogos =  response[0].short_description;
    // console.log(response);

    let conteudo = `<img src="${img_jogos}" alt="" id="thumbnail">
                    <p id="title">${nome_jogos}</p>
                    <p id="short_description">${descricao_jogos}</p>`

    corpo.innerHTML = conteudo;
    pai_de_todos.appendChild(corpo);

    corpo1.innerHTML = conteudo;
    pai_de_todos.appendChild(corpo1);

    corpo2.innerHTML = conteudo;
    pai_de_todos.appendChild(corpo2);
  })

  .catch(err => console.error(err))

  




  



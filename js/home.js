// const url = `https://www.freetogame.com/api/games`

// fetch(url)

// .then((response) => {
//   response.json()
//   // .then(data => console.log(data));

// })

// .catch(() => window.alert(`error`));

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
    // document.getElementById("thumbnail").src = response[0].thumbnail;
  })

  .catch(err => console.error(err))





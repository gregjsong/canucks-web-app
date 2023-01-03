
ready(function () {

  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        callback(this.responseText);
      } else {
        alert("Error: " + this.status);
      }
    }
    xhr.open("GET", url);
    xhr.send();
  }

  // for standings

    let container = document.getElementById("standings-container");
    ajaxGET("/standings", (data) => {
      container.innerHTML = data;
    });

  // leaderboards
  let lbc = document.getElementById("leaderboards-container");
  ajaxGET("/leaderboards", function (data) {
    let parsedData = JSON.parse(data);
    let lbc = document.getElementById("leaderboards-container");

    let str = "<h3>Leaderboards>/h3>";

    for (let i = 0; i < parsedData.length; i++) {
      let item = parsedData[i];

      const card = document.createElement('div');
      card.classList.add('card');

      // card-img-container div
      const cardImgContainer = document.createElement('div');
      cardImgContainer.classList.add('card-img-container');

      const img = document.createElement('img');
      const imgSrc = "/img/" + item["lname"].toLowerCase() + ".png";
      img.setAttribute('src', imgSrc);
      
      const alt = item["fname"] + " " + item["lname"];
      img.setAttribute('alt', alt);

      cardImgContainer.appendChild(img);

      //card-text-container div
      const cardTextContainer = document.createElement('div');
      cardTextContainer.classList.add('card-text-container');

      let cardTextPlayer = '<div class=\"card-text-player\"><h4>' + item["leadCat"] + '</h4><h5>' + item["fname"] + " " + item["lname"] +'</h5><p>' + item["number"] + " Van " + item["position"] + "</p></div>";

      let cardTextStat = '<div class=\"card-text-stat\"><h5>' + item["leadCatStat"] + '</h5><p>' + item["leadCat"] + '</p></div>';

      let divs = cardTextPlayer + cardTextStat;

      cardTextContainer.innerHTML = divs;

      // appending
      card.appendChild(cardImgContainer);
      card.appendChild(cardTextContainer);

      lbc.appendChild(card);
    }
  });
});

// callback function declaration
function ready(callback) {
  if (document.readyState != "loading") {
      callback();
  } else {
      document.addEventListener("DOMContentLoaded", callback);
  }
}

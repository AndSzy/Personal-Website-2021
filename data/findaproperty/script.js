// FORM INPUT
/////////////////////////////////////////////////////////////////////////////////
var markers = new Array();

let morena;

let place = document.getElementById("place");

let morenaDB = "https://rocky-basin-55272.herokuapp.com/morena";
let koscierzynaDB = "https://rocky-basin-55272.herokuapp.com/koscierzyna";
let abingdonDB = "https://rocky-basin-55272.herokuapp.com/abingdon";
let fetchDB = morenaDB;
let centerMap = { lat: 54.35453, lng: 18.571451 };

function update() {
  if (place.value == "morena") {
    fetchDB = morenaDB;
    centerMap = { lat: 54.35453, lng: 18.571451 };
  } else if (place.value == "koscierzyna") {
    fetchDB = koscierzynaDB;
    centerMap = { lat: 54.123709, lng: 17.985705 };
  } else if (place.value == "abingdon") {
    fetchDB = abingdonDB;
    centerMap = { lat: 51.673465, lng: -1.283544};
  }

  //  REMOVING OLD MARKERS FROM MAP
  /////////////////////////////////////////////////////////////////////////////

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;

  start();
}

// EVENT LISTENERS - for the form
/////////////////////////////////////////////////////////////////////////////////

place.addEventListener("change", update);

// IMPLEMENTING MAP
/////////////////////////////////////////////////////////////////////////////////
var map;
function initMap() {
  let options = {
    zoom: 13,
    center: { lat: 54.35453, lng: 18.571451 }
  };

  map = new google.maps.Map(document.getElementById("map"), options);
}

// STARTING THE APP
/////////////////////////////////////////////////////////////////////////////////

function start() {
  // DATA FROM JSON FILE - PROMISE !!
  /////////////////////////////////////////////////////////////////////////////////

  const fetchPromise = fetch(fetchDB);
  fetchPromise
    .then(response => {
      return response.json();
    })
    .then(morena => {
      // REMOVING LOADING DIV
      let loading = document.getElementById('loading');
      loading.classList.add('notVisible');

      // CHANGING THE CENTER OF MAP
      //////////////////////////////////
      map.setCenter(centerMap);

      // APPENDING DATA TO DOM
      /////////////////////////////////////////////////////////////////////////////////

      const left = document.querySelector("#left");
      const right = document.querySelector("#right");
      let card;



      // Creating Elements
      function createCard() {
        card = document.createElement("div");
        card.className = "card";

        const cardHolder =
          '<img src="" alt="" class="card-img-top insert"><div class="card-body"><h5 class="card-title insert">#</h5><p class="my-0">Powierzchnia: <span class="insert">#</span></p><p class="my-0">Pietro: <span class="insert">#</span></p><p class="my-0">Liczba pokoi: <span class="insert">#</span></p><p class="my-0">Rok budowy: <span class="insert">#</span></p><p>Data: <span class="insert">#</span></p></div>';

        card.innerHTML = cardHolder;
      }

      // Adding content to Card
      function addContent(i, side) {
        let cardElements;
        if (side == left) {
          cardElements = document.querySelectorAll("#left .insert");
        } else {
          cardElements = document.querySelectorAll("#right .insert");
        }

        let cardElementsTail = Array.prototype.slice.call(
          cardElements,
          cardElements.length - 7,
          cardElements.length
        );
        card.id = morena[i].id;
        cardElementsTail[0].src = morena[i].img;
        cardElementsTail[1].innerText = morena[i].cena;
        cardElementsTail[2].innerText = morena[i].powierzchnia;
        cardElementsTail[3].innerText = morena[i].pietro;
        cardElementsTail[4].innerText = morena[i].pokoje;
        cardElementsTail[5].innerText = morena[i].rok;
        cardElementsTail[6].innerText = morena[i].data;
      }

      //Removing previous entries from DOM

      left.innerHTML = "";
      right.innerHTML = "";

      for (let i = 0; i < morena.length; i++) {
        createCard();

        if (i % 2) {
          right.append(card);
          addContent(i, right);
        } else {
          left.append(card);
          addContent(i, left);
        }
      }

      // RESIZING MAP
      /////////////////////////////////////////////////////////////////////////////////

      const divToResize = document.getElementById("map");
      const flatsToSell = document.getElementById("flatsToSell");
      let windowHeight = document.documentElement.clientHeight;
      let offsetTop = divToResize.getBoundingClientRect().top;

      function resizeMap() {
        let resizedHeight = windowHeight - offsetTop;
        divToResize.style.height = resizedHeight - 10 + "px";
        flatsToSell.style.height = resizedHeight - 10 + "px";
        flatsToSell.style.overflowY = "auto";
      }

      window.addEventListener("load", resizeMap());
      window.addEventListener("resize", function() {
        windowHeight = document.documentElement.clientHeight;
        offsetTop = divToResize.getBoundingClientRect().top;
        resizeMap();
      });

      // ADDING MARKERS TO MAP
      //////////////////////////////////////////////////////////////////////////////////
      for (let i = 0; i < morena.length; i++) {
        addMarker(morena[i]);
      }

      // Add Marker Function
      function addMarker(props) {
        var marker = new google.maps.Marker({
          position: props.position,
          map: map
        });

        marker.setMap(map);

        if (props.iconImage) {
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: "black",
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: props.iconImage,
            fillOpacity: 1,
            rotation: 0,
            scale: 5.0
          });
        }

        var infoWindow = new google.maps.InfoWindow({
          content: `<div><img src="${props.img}" height="80" width="120" class="mb-2"><h5 class="mb-0">${props.cena}</h5></div>`
        });

        marker.addListener("mouseover", function() {
          infoWindow.open(map, marker);
        });

        marker.addListener("mouseout", function() {
          infoWindow.close(map, marker);
        });

        marker.addListener("click", function() {
          window.open(props.album, "_blank");
        });

        markers.push(marker);
      }

      // EVENT LISTENERS
      ////////////////////////////////////////////////////////////////////////////////

      let cards = document.querySelectorAll(".card");

      cards.forEach(function(card) {
        card.addEventListener("mouseover", function() {
          markers[this.id - 1].setAnimation(google.maps.Animation.BOUNCE);
        });
      });

      cards.forEach(function(card) {
        card.addEventListener("mouseleave", function() {
          markers[this.id - 1].setAnimation(null);
        });
      });

      cards.forEach(function(card) {
        card.addEventListener("click", function() {
          window.open(morena[this.id - 1].album, "_blank");
        });
      });
    });
}

start();

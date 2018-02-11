//Task 1
var TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE = { 'flat': 'Квартира',  'bungalo': 'Бунгало', 'house': 'Дом' };
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var map = document.querySelector(".map");

//Получаем случайное число между min и max
function getRandomBetween(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

//Создаем массив с объектами

function fillOffersData() {
  var offers = [];

  for (var i = 0; i < 8; i++) {

    var X_LOCATION = getRandomBetween(300, 900);
    var Y_LOCATION = getRandomBetween(150, 500);

  var feature = FEATURES.filter(function() {
  return Math.random() >= 0.5; // иногда undefind проскакивает
});

    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': TITLE[i],
        'address': X_LOCATION + " , " + Y_LOCATION,
        'price': getRandomBetween(1000, 1000000),
        'type': typeRoom(),
        'rooms': getRandomBetween(1,5),
        'guests': getRandomBetween(1,10),
        'checkin': CHECKIN[getRandomBetween(0, 2)],
        'checkout': CHECKOUT[getRandomBetween(0, 2)],
        'features': feature,

        'description': " ",
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
                  ]
      },
      'location': {
        'x': X_LOCATION,
        'y': Y_LOCATION
      }
    })
  }
  return offers;
}

//Тип команаты
function typeRoom() {
  var keys = Object.keys(TYPE);
  return keys[Math.floor(Math.random() * keys.length)];
}




//Task 2
// Активируем карту
function switchMap() {
  map.classList.remove('map--faded');
  //document.querySelector(".map").classList.remove('map--faded');

}

//Task 3
//Добавялем метки в документ

function makePin() {
  var documentFragment = document.createDocumentFragment();
  var offers =  fillOffersData();
    offers.forEach(function(elem, i) {
    var button = document.createElement('button');
    button.style.left = offers[i].location.x + "px";
    button.style.top = offers[i].location.y + "px";
    button.classList.add('map__pin');

    var img = document.createElement('img');

    img.src = offers[i].author.avatar;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.draggable = "false";
    button.appendChild(img);
    documentFragment.appendChild(button);
  });

  return documentFragment;

}

//Task 4
//Отображаем на карте метки

function renderPins() {
  var mapPins = document.querySelector('.map .map__pins');
  var donePins = makePin();
  mapPins.appendChild(donePins);

}

//Task 5
//Добавляем фото в объявление

function addPhoto(arr) {
  var template = document.querySelector('template').content.querySelector('.popup');
  var fragment = document.createDocumentFragment();  
  
  arr.forEach(function(elem, i) {
    var li = template.querySelector(".popup__pictures").querySelector("li").cloneNode(true);

    li.querySelector('img').src = arr[i];
    li.querySelector('img').width = '70';
    fragment.appendChild(li);
  });
    return fragment;
}

//Случайный выбор удобств




function addFeature(arr) {
  var fragment = document.createDocumentFragment();
  arr.offer.features.forEach(function(elem, i) {
    var li = document.createElement("li");
    li.className = "feature " + "feature--" + arr.offer.features[i];
    fragment.appendChild(li);
  });
  return fragment;
}

//Показываем объявление
/****
function fillCard() {
  var offers = fillOffersData();
  var template = document.querySelector('template').content;
  var mapCard = template.querySelector(".map__card , .popup").cloneNode(true);
  var mapFilters = document.querySelector('.map__filters-container');
  
  mapCard.querySelector('h3').textContent = offers[0].offer.title; //title
  mapCard.querySelector('p small').textContent = offers[0].offer.address; 
  mapCard.querySelector('.popup__price').textContent = offers[0].offer.price + "\u20BD" + "/ночь";
  mapCard.querySelector('h4').textContent = TYPE[offers[0].offer.type]; //type
  mapCard.querySelector('h4 + p').textContent = offers[0].offer.rooms + " комнаты для " + offers[0].offer.guests + " гостей"; //
  mapCard.querySelector('h4 + p + p').textContent = "Заезд после " + offers[0].offer.checkin + ", выезд до " + offers[0].offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = "";
  mapCard.querySelector('.popup__features').appendChild(addFeature(offers[0]));
  mapCard.querySelector(".popup__features + p").textContent = offers[0].offer.description;
  mapCard.querySelector('.popup__avatar').src = offers[0].author.avatar;
  mapCard.querySelector('.popup__pictures').innerHTML = '';
  mapCard.querySelector('.popup__pictures').appendChild(addPhoto(offers[0].offer.photos));
  map.insertBefore(mapCard, mapFilters);
  //map__filters.insertAdjacentHTML('beforebegin', divtest);

  renderPins();
  switchMap();

}

fillCard();

*//////


function fillCard() {
  var offers = fillOffersData();
  var template = document.querySelector('template').content;
  var fragment = document.createDocumentFragment()
  var mapFilters = document.querySelector('.map__filters-container');
  

  for (var i = 0; i < offers.length; i++) {
  
    var mapCard = template.querySelector(".map__card , .popup").cloneNode(true);
    mapCard.classList.add('hidden');
    mapCard.querySelector('h3').textContent = offers[i].offer.title; //title
    mapCard.querySelector('p small').textContent = offers[i].offer.address; 
    mapCard.querySelector('.popup__price').textContent = offers[i].offer.price + "\u20BD" + "/ночь";
    mapCard.querySelector('h4').textContent = TYPE[offers[i].offer.type]; //type
    mapCard.querySelector('h4 + p').textContent = offers[i].offer.rooms + " комнаты для " + offers[i].offer.guests + " гостей"; //
    mapCard.querySelector('h4 + p + p').textContent = "Заезд после " + offers[i].offer.checkin + ", выезд до " + offers[i].offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = "";
    mapCard.querySelector('.popup__features').appendChild(addFeature(offers[i]));
    mapCard.querySelector(".popup__features + p").textContent = offers[i].offer.description;
    mapCard.querySelector('.popup__avatar').src = offers[i].author.avatar;
    mapCard.querySelector('.popup__pictures').innerHTML = '';
    mapCard.querySelector('.popup__pictures').appendChild(addPhoto(offers[i].offer.photos));
    fragment.appendChild(mapCard);
  }

  map.insertBefore(fragment, mapFilters);
  //map__filters.insertAdjacentHTML('beforebegin', divtest);

  renderPins();
  switchMap();

}

fillCard();





    var pins = document.querySelectorAll(".map__pin[style]");
    pins.forEach(function(elem) {
      elem.addEventListener('click', listener);
      console.log(event);
    });
 

 /*
    var mapPopup = document.querySelectorAll(".map__card, .popup");
    mapPopup.forEach(function(elem) {
      elem.addEventListener('',);

      if(event.keyCode == 27) {
      mapPopup[str-1].style.display = "none";
    }
    });

 */


function listener() {
    switchMap();

  var mapPopup = document.querySelectorAll(".map__card, .popup");
    for(var i = 0; i < mapPopup.length; i++) {
      console.log(mapPopup[i]);
      mapPopup[i].classList.add('hidden');
  }

var pin = this.querySelector("img").getAttribute('src');
      
      var position  = pin.indexOf("user");
      var str = Number(pin.slice(position + 4 , pin.length - 4));
      mapPopup[str-1].classList.remove('hidden');
   
   document.addEventListener('keydown', function(evt) {
    console.log(evt.keyCode);
    if (evt.keyCode === 27) {
      mapPopup[str-1].classList.add('hidden') ;
    }
  });
}




//listener();






/*
function fillCard() {
  var offers = fillOffersData();
  var template = document.querySelector('template').content;
  var mapFilters = document.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offers) {
    var mapCard = template.querySelector(".map__card , .popup").cloneNode(true);
  console.log(offers);
  mapCard.querySelector('h3').textContent = offers.offer.title; //title
  mapCard.querySelector('p small').textContent = offers.offer.address; 
  mapCard.querySelector('.popup__price').textContent = offers.offer.price + "\u20BD" + "/ночь";
  mapCard.querySelector('h4').textContent = TYPE[offers.offer.type]; //type
  mapCard.querySelector('h4 + p').textContent = offers.offer.rooms + " комнаты для " + offers.offer.guests + " гостей"; //
  mapCard.querySelector('h4 + p + p').textContent = "Заезд после " + offers.offer.checkin + ", выезд до " + offers.offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = "";
  mapCard.querySelector('.popup__features').appendChild(addFeature(offers));
  mapCard.querySelector(".popup__features + p").textContent = offers.offer.description;
  mapCard.querySelector('.popup__avatar').src = offers.author.avatar;
  mapCard.querySelector('.popup__pictures').innerHTML = '';
  mapCard.querySelector('.popup__pictures').appendChild(addPhoto(offers.offer.photos));
  fragment.appendChild(mapCard);

  });
  
  map.insertBefore(mapCard, mapFilters);
  //map__filters.insertAdjacentHTML('beforebegin', divtest);

 
  return mapCard;

}
*/
//--------------------
/*
function getMakePins() {
  
  var mapFilters = document.querySelector('.map__filters-container');
  var fragment = createDocumentFragment();
  //var offers = fillOffersData();
  
  offers.forEach(function(elem) {
  
  var template = document.querySelector("template").content.querySelector(".map__card, .popup").cloneNode(true);
      fragment.appendChild(template);
  
  });

  map.insertBefore(mapCard, mapFilters);
  renderPins();
  switchMap();
  fillCard(offers);
  return fragment;


for(var i = 0; i < 8; i++) {
  var template = document.querySelector("template").content.querySelector(".map__card, .popup").cloneNode(true);
  fragment.appendChild(template); 
}


}


*/
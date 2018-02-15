//Task 1
var TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
 
var ESC_BUTTON = 27;
var fieldset = document.querySelectorAll('fieldset');
 
var mainPin = document.querySelector(".map__pin--main");
var map = document.querySelector(".map");
var address = document.querySelector('#address');

//Удаляет класс у элемента
function removeClass(selector, className) {
  var node = document.querySelector(selector).classList.remove(className);
}
 
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
        'rooms': getRandomBetween(1, 5),
        'guests': getRandomBetween(1, 10),
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
}
 
//Task 3
//Добавялем метки в документ
 
function makePin() {
  var documentFragment = document.createDocumentFragment();
  var offers = fillOffersData();
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
 
function fillCard() {
  var offers = fillOffersData();
  var template = document.querySelector('template').content;
  var fragment = document.createDocumentFragment();
  var mapFilters = document.querySelector('.map__filters-container');
 
  offers.forEach(function(elem) {
    var mapCard = template.querySelector(".map__card").cloneNode(true);
    mapCard.classList.add('hidden');
    mapCard.querySelector('h3').textContent = elem.offer.title; //title
    mapCard.querySelector('p small').textContent = elem.offer.address;
    mapCard.querySelector('.popup__price').textContent = elem.offer.price + "\u20BD" + "/ночь";
    mapCard.querySelector('h4').textContent = TYPE[elem.offer.type]; //type
    mapCard.querySelector('h4 + p').textContent = elem.offer.rooms + " комнаты для " + elem.offer.guests + " гостей"; //
    mapCard.querySelector('h4 + p + p').textContent = "Заезд после " + elem.offer.checkin + ", выезд до " + elem.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = "";
    mapCard.querySelector('.popup__features').appendChild(addFeature(elem));
    mapCard.querySelector(".popup__features + p").textContent = elem.offer.description;
    mapCard.querySelector('.popup__avatar').src = elem.author.avatar;
    mapCard.querySelector('.popup__pictures').innerHTML = '';
    mapCard.querySelector('.popup__pictures').appendChild(addPhoto(elem.offer.photos));
    fragment.appendChild(mapCard);
  });
 
  map.insertBefore(fragment, mapFilters);
  //map__filters.insertAdjacentHTML('beforebegin', divtest);
 
}
 
//----------------------
//в поле адрес указываем координаты метки
address.value = address.value = mainPin.offsetLeft + " , " + mainPin.offsetHeight;

//Определяем метку 
function findPin() {
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function(elem) {
    elem.addEventListener('click', function(evt) {
      closeAdver();
 
      if (this.className == 'map__pin') {
        var src = this.firstElementChild.src;
        openAdver(src);
        //buttonClose();
      }
      //buttonClose();
      document.addEventListener('keydown', escButton);
      
    });
  });
}

//открываем объявление 
function openAdver(src) {
  var mapCard = document.querySelectorAll('.map__card');
  mapCard.forEach(function(elem) {
    if (src == elem.firstElementChild.src) {
      elem.classList.remove('hidden');
    }
  });

}
 
//зыкрываем объявление 
function closeAdver() {
  var mapCard = document.querySelectorAll('.map__card');
  mapCard.forEach(function(elem) {
    elem.classList.add('hidden');
  });
}
 
//закрываем объявление кнопкой Esc 
function escButton(evt) {
  if (evt.keyCode == ESC_BUTTON) {
    document.querySelector('.map__card:not(.hidden)').classList.add('hidden');
  }
}
 
//закрываем объявление крестиком
function buttonClose(src) {
  var popupClose = document.querySelectorAll('.popup__close');
  popupClose.forEach(function (elem) {
    elem.addEventListener("click", function(evt) {
      evt.currentTarget.parentElement.classList.add('hidden');
     });
  });
}

// выключаем форму
function disableFieldset() {
  fieldset.forEach(function(elem) {
    elem.disabled = true;
  });
}
 
disableFieldset();
 
// Активация карты
function activateMap() {
  switchMap();
  removeClass('.notice__form', 'notice__form--disabled');
  renderPins();
  fillCard();
  findPin();
  buttonClose();
  fieldset.forEach(function(elem) {
    elem.disabled = false;
  });
 
  mainPin.removeEventListener('mouseup', activateMap);
 
}
 
mainPin.addEventListener('mouseup', activateMap);
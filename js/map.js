//Task 1
var TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};
var NUMBER_OFFER = 8;
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PRICES = { 'flat' : 1000, 'bungalo' : 0, 'house' : 5000, 'palace' : 10000 };
var ESC_BUTTON = 27;

var map = document.querySelector(".map");
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector(".map__pin--main");
var fieldset = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector(".notice__form");
var address = document.querySelector('#address');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var priceField = document.querySelector("#price");
var typeField = document.querySelector("#type");
var roomNumber = document.querySelector("#room_number");
var capacityGuest = document.querySelector("#capacity");


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
 
  for (var i = 0; i < NUMBER_OFFER; i++) {
 
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
        'title': TITLES[i],
        'address': X_LOCATION + " , " + Y_LOCATION,
        'price': getRandomBetween(1000, 1000000),
        'type': typeRoom(),
        'rooms': getRandomBetween(1, 5),
        'guests': getRandomBetween(1, 10),
        'checkin': CHECK_TIME[getRandomBetween(0, 2)],
        'checkout': CHECK_TIME[getRandomBetween(0, 2)],
        'features': feature,
         'description': " ",
        'photos': [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
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
  var keys = Object.keys(TYPES);
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
  //var mapPins = document.querySelector('.map .map__pins');
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
    mapCard.querySelector('h4').textContent = TYPES[elem.offer.type]; //type
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
}
 
//----------------------
//в поле адрес указываем координаты метки
address.value = address.value = mainPin.offsetLeft + " , " + mainPin.offsetTop;
//Определяем метку 
function findPin() {
  var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function(elem) {
    elem.addEventListener('click', function(evt) {
      closeAdver();
 
      if (this.className == 'map__pin') {
        var src = this.firstElementChild.src;
        openAd(src);
      }
      document.addEventListener('keydown', escButton);
    });
  });
}

//открываем объявление 
function openAd(src) {
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


//синхронизация поле заезда и выезда
timein.addEventListener('click', function(evt) {
  timeout.selectedIndex = evt.currentTarget.selectedIndex;
});
timeout.addEventListener('click', function(evt) {
  timein.selectedIndex = evt.currentTarget.selectedIndex;
});
 
// Активация карты
function activateMap() {
  switchMap();
  noticeForm.classList.remove('notice__form--disabled');
  renderPins();
  fillCard();
  findPin();
  //priceRoom();
  buttonClose();
  fieldset.forEach(function(elem) {
    elem.disabled = false;
  });
 
  mainPin.removeEventListener('mouseup', activateMap);
 
}
 
mainPin.addEventListener('mouseup', activateMap);


//Стоимость жилья
/*
function priceRoom() {
  typeField.addEventListener("change", function() {
    if(this.selectedIndex == 0) {
      priceField.placeholder = PRICES[0];
      }
    else if(this.selectedIndex == 1) {
      priceField.placeholder = PRICES[1];
      }
    else if(this.selectedIndex == 2) {
      priceField.placeholder = PRICES[2];
      }
    else if(this.selectedIndex == 3) {
      priceField.placeholder = PRICES[3];
      }
  });
}
*/
typeField.addEventListener("change", function(evt) {
  var type = evt.currentTarget.value;
  priceField.placeholder = PRICES[type];
});

//Количество мест
/*
1 : 1
2 : 1 || 2
3 : 1 || 2 || 3
100 : не для гостей
*/

//Проверка на соответствие комнат и гостей.
function checkRoom(value) {
  for(var i = 0; i < capacityGuest.length; i++) {
    capacityGuest[i].disabled = true;
    }
    /*
    if(value == 100) {
      capacityGuest[3].selected = true;
    } else {
      capacityGuest[2].selected = true;
    }
*/
    value == 100 ? capacityGuest[3].selected = true : capacityGuest[2].selected = true;

   switch (value) {
     case '1':
       capacityGuest[2].disabled = false;
       break;
     case '2':
       capacityGuest[1].disabled = false;
       capacityGuest[2].disabled = false;
       break;
     case '3':
       capacityGuest[0].disabled = false;
       capacityGuest[1].disabled = false;
       capacityGuest[2].disabled = false;
       break;
     case '100':
       capacityGuest[3].disabled = false;
     default:
       console.log("Ok");
   }
 }


roomNumber.addEventListener('change', function(evt) {
  checkRoom(evt.currentTarget.value);
  });

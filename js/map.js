//Task 1
 
var TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE = ["flat", "house", "bungalo"];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var map =   document.querySelector(".map");
 
//Получаем случайное число
 
function getRandomNumber(num) {
  return 1 + Math.floor(Math.random() * num);
}
 
//Получаем случайное число между min и max
function getRandomBetween(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
 
//Создаем массив с объектами
 
function fillOffersData(num) {
  var offers = [];
 
  for (var i = 0; i < num; i++) {
 
    var X_LOCATION = getRandomBetween(300, 900);
    var Y_LOCATION = getRandomBetween(150, 500);
 
    var featureCount = [];
    featureCount = FEATURES.sort(function(a, b) {
      return Math.random() - 0.5
    });
    featureCount = featureCount.slice(0, getRandomNumber(5));
 
    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': TITLE[i],
        'address': X_LOCATION + " , " + Y_LOCATION,
        'price': getRandomBetween(1000, 1000000),
        'type': TYPE[getRandomBetween(0, 2)],
        'rooms': getRandomNumber(5),
        'guests': getRandomNumber(10),
        'checkin': CHECKIN[getRandomBetween(0, 2)],
        'checkout': CHECKOUT[getRandomBetween(0, 2)],
        'features': featureCount,
        'description': " ",
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'] 
      },
      'location': {
        'x': X_LOCATION,
        'y': Y_LOCATION
      }
    })
  }
  return offers;
}
 
//Task 2
// Активируем карту
function switchMap() {
  map.classList.remove('map--faded');
  //document.querySelector(".map").classList.remove('map--faded');
 
}
 
//Task 3
//Добавялем метки в документ
 
function Makepin(num) {
  var documentFragment = document.createDocumentFragment();
  var makepins = fillOffersData(num);
 
  for (var i = 0; i < makepins.length; i++) {
    if(num > 8) {
      break;
    } else {
    var button = document.createElement('button');
 
    button.style.left = makepins[i].location.x + "px";
    button.style.top = makepins[i].location.y + "px";
    button.classList.add('map__pin');
 
    var img = document.createElement('img');
 
    img.src = makepins[i].author.avatar;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.draggable = "false";
 
    button.appendChild(img);
    documentFragment.appendChild(button);
    }
  }
  return documentFragment;
 
}
 
Makepin.number = 0;
 
//Task 4
 
//Отображаем на карте метки
function renderPins() {
  var mapPins = document.querySelector('.map .map__pins');
  var num = 8;
  
        if(Makepin.number === 0) {
           var donePins = Makepin(num);
            mapPins.appendChild(donePins);
            Makepin.number += 9;
        } else if(Makepin.number === 9)  {
            console.log("нельзя сделать больше 8 меток");
        }
      }
renderPins.pins = 0;
 
 
      //Task 5
//Тип команаты
      
function typeRoom(arr) {
  var type = arr.offer.type; 
  var check;
 
  switch (type) {
    case 'flat':
      check = "Квартира"; 
      break;
    case 'bungalo':
      check = "Бунгало";
      break;
    case 'house':
      check = "Дом"; 
      break; 
  }
  return check;
 
}
//Случайный выбор удобств
 
function addFeature(arr) {
  var li = document.createElement('li');
  var fragment = document.createDocumentFragment();
  var len = arr.offer.features.length;
  for (var i = 0; i < len; i++) {
    var li = document.createElement("li");
    li.className = "feature " + "feature--" + arr.offer.features[i];
    fragment.appendChild(li);
  }
  return fragment;
}
 
//Показываем объявление
 
function fillCard() {
  switchMap();
  var makepins = fillOffersData(8);
  renderPins();
 
  var template = document.querySelector('template');
  var post = template.content.querySelector('.map__card').cloneNode(true);
  //var template = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
  //var mapPins = document.querySelector('.map__pins');    
  var mapFilters = document.querySelector('.map__filters-container');
 
  post.querySelector('h3').textContent = makepins[0].offer.title;
  post.querySelector('p small').textContent = makepins[0].offer.address;
  post.querySelector('.popup__price').textContent = makepins[0].offer.price + "\u20BD" + "/ночь";
  post.querySelector('h4').textContent = typeRoom(makepins[0]);
  post.querySelector('h4 + p').textContent = makepins[0].offer.rooms + " комнаты для " + makepins[0].offer.guests + " гостей";
  post.querySelector('h4 + p + p').textContent = "Заезд после " + makepins[0].offer.checkin + ", выезд до " + makepins[0].offer.checkout;
 
  var popUpFeatures = post.querySelector('.popup__features');
  popUpFeatures.innerHTML = "";
  popUpFeatures.appendChild(addFeature(makepins[0]));
  post.querySelector('.popup__avatar').src = makepins[0].author.avatar;
  
 
  var popUpPictures = post.querySelector('.popup__pictures img');
  popUpPictures.style.width = "70px";
  popUpPictures = post.querySelector('.popup__pictures img').src = makepins[0].offer.photos;
 
  //title.textContent = makepins[0].offer.title;
  //address.textContent = makepins[0].offer.address;
  //price.textContent = makepins[0].offer.price + " &#x20bd;/ночь";
  //type.textContent = makepins[0].offer.type;
  //roomGuest.textContent = makepins[0].offer.rooms + " комнаты для " +  makepins[0].offer.guests + " гостей";
  //checkInOut.textContent = "Заезд после, " + makepins[0].offer.checkin + " выезд до " + makepins[0].offer.checkout;
 
  map.insertBefore(post, mapFilters);
 
  //map.insertBefore(post, mapFilters);
  //map__filters.insertAdjacentHTML('beforebegin', divtest);
}
 
fillCard();
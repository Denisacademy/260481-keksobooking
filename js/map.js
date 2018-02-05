//Task 1

var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var type = ["flat", "house", "bungalo"];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

function randomNum(num) {
  return 1 + Math.floor(Math.random() * num);
}

function randomHorizon(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function genObj(num) {
  var createMass = [];

  for (var i = 0; i < num; i++) {

    var x = randomHorizon(300, 900);
    var y = randomHorizon(150, 500);

    var zab = [];
    zab[num] = features.slice(0, randomNum(5));

    createMass[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        'price': randomHorizon(100, 200)
      },
      'offer': {
        'title': title[i],
        'address': 'location.' + x + " " + 'location.' + y,
        'price': randomHorizon(1000, 1000000),
        'type': type[randomHorizon(0, 2)],
        'rooms': randomNum(5),
        'guests': randomNum(10),
        'checkin': checkin[randomHorizon(0, 2)],
        'checkout': checkout[randomHorizon(0, 2)],
        'features': zab[num],
        'description': " ",
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      'location': {
        'x': x,
        'y': y
      }
    }
  }
  return createMass;
}


//Task 2

function switchMap() {
  document.querySelector(".map--faded").classList.remove('map--faded');
}

switchMap();

//Task 3

var makepins = genObj(8);

function Makepin() {
  //var makepins = genObj(8);
  var documentFragment = document.createDocumentFragment();
  
  for (var i = 0; i < makepins.length; i++) {
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
	button.appendChild(img);
    documentFragment.appendChild(button);
   }
   //console.log(documentFragment);
  return documentFragment;
  
  //return button;
}

//Task 4


function renderPins() {
	var mapPins = document.querySelector('.map__pins');
	var donePins =  Makepin();
	mapPins.appendChild(donePins);
}

renderPins();

//Task 5

function typeRoom(type) {
	switch (type) {
		case flat: 'Квартира'; 
		case house:  'Дом'; 
		case bungalo: 'Бунгало';  
	}
}



function fillCard() {
	var template = document.querySelector('template');
	var post = template.content;
	
	post.cloneNode(true);
	
	
	
	var title = post.querySelector('h3');
	var address = post.querySelector('p small');
	var price = post.querySelector('.popup__price');
	var type = post.querySelector('h4');


	title.textContent = makepins[0].offer.title;
	address.textContent = makepins[0].offer.address;
	price.textContent = makepins[0].offer.price + " &#x20bd;/ночь";
	type.textContent = makepins[0].offer.type;

	var divtest = document.createElement("div");
	var textDiv = document.createTextNode("Hello world");
	divtest.appendChild(textDiv);
	
	
	var mapPins = document.querySelector('.map__pins');	
	var map__filters = document.querySelector('.map__filters-container');
	map__filters.before(mapPins, divtest);
	//map__filters.insertAdjacentHTML('beforebegin', divtest);
}

fillCard();





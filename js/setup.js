'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210,' +
' 55)', 'rgb(0, 0, 0)'];
var coatsCopy = coats.slice();
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];
var eyesCopy = eyes.slice();
var fireball = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var numberPerson = 4;

// генерация случайного числа от 0 до n
function random(n) {
  return Math.floor(Math.random() * (n + 1));
}

function getRandomItemOfArr(arr) {
  return arr.splice(random(arr.length - 1), 1).toString();
}

function makeArrayPerson() {
  var arr = [];
  for (var i = 0; i < numberPerson; i++) {
    arr.push({
      name: getRandomItemOfArr(names) + ' ' + getRandomItemOfArr(lastNames),
      coatColor: getRandomItemOfArr(coats),
      eyesColor: getRandomItemOfArr(eyes),
    });
  }
  names = null;
  lastNames = null;
  coats = null;
  eyes = null;
  return arr;
}

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
  .querySelector('.setup-similar-item');

var persons = makeArrayPerson();

function makeMug(obj) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = obj.name;
  wizardElement.querySelector('.wizard-coat').style.fill = obj.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
  return wizardElement;
}

function createDomElements() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < persons.length; i++) {
    fragment.appendChild(makeMug(persons[i]));
  }
  similarListElement.appendChild(fragment);
}

createDomElements();
document.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var KEY_ENTER = 'Enter';
var KEY_ESC = 'Escape';
var userNameInput = document.querySelector('.setup-user-name');
var magCoat = document.querySelector('.setup-wizard .wizard-coat');
var magEyes = document.querySelector('.setup-wizard .wizard-eyes');
var magFireball = document.querySelector('.setup-fireball-wrap');
var fbInput = magFireball.querySelector('input');
var eyesInput = userDialog.querySelector('#eyes');
var coatInput = userDialog.querySelector('#coat');

// меняем цвет мантии, глаз и фаерброла
var getColorMag = function (target, array, input) {
  target.addEventListener('click', function () {
    var color = array[random(array.length - 1)];
    target.style.fill = color;
    input.value = color;
  });
};
getColorMag(magCoat, coatsCopy, coatInput);
getColorMag(magEyes, eyesCopy, eyesInput);

magFireball.addEventListener('click', function () {
  var color = fireball[random(fireball.length - 1)];
  magFireball.style.backgroundColor = color;
  fbInput.value = color;
});

// показ окна setup
var onPopupEscPress = function (evt) {
  if (evt.key === KEY_ESC && document.activeElement !== userNameInput) {
    closePopup();
  }
};
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  }
});



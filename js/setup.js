'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210,' +
' 55)', 'rgb(0, 0, 0)'];
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];

// генерация случайного числа от 0 до n
function random(n) {
  return Math.floor(Math.random() * (n + 1));
}

function getRandomItemOfArr(arr) {
  return arr.splice(random(arr.length - 1), 1).toString();
}

function makeArrayPerson() {
  var arr = [];
  for (var i = 0; i < 4; i++) {
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < persons.length; i++) {
  fragment.appendChild(makeMug(persons[i]));
}
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
userDialog.classList.remove('hidden');

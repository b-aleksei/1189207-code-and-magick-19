'use strict';

(function () {

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210,' +
  ' 55)', 'rgb(0, 0, 0)'];
  var copyCoats = coats.slice();
  var eyes = ['black', 'red', 'blue', 'yellow', 'green'];
  var copyEyes = eyes.slice();
  var numberPerson = 4;

  // генерация случайного числа от 0 до n
  var random = function (n) {
    return Math.floor(Math.random() * (n + 1));
  };

  var getRandomItemOfArr = function (arr) {
    return arr.splice(random(arr.length - 1), 1).toString();
  };

  var makeArrayPerson = function () {
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
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');

  var persons = makeArrayPerson();

  var makeMug = function (obj) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = obj.name;
    wizardElement.querySelector('.wizard-coat').style.fill = obj.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
    return wizardElement;
  };

  var createDomElements = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < persons.length; i++) {
      fragment.appendChild(makeMug(persons[i]));
    }
    similarListElement.appendChild(fragment);
  };

  createDomElements();
  document.querySelector('.setup-similar').classList.remove('hidden');

  window.creationMug = {
    coats: copyCoats,
    eyes: copyEyes,
    random: random,
  };
})();

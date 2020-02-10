'use strict';
window.creationMug = (function () {

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

  return {
    coats: copyCoats,
    eyes: copyEyes,
    random: random,
  };
})();

(function () {

  var coatsCopy = window.creationMug.coats;
  var eyesCopy = window.creationMug.eyes;
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var userNameInput = document.querySelector('.setup-user-name');
  var magCoat = document.querySelector('.wizard-coat');
  var magEyes = document.querySelector('.wizard-eyes');
  var magFireball = document.querySelector('.setup-fireball-wrap');
  var fireball = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var startCoordinats = {};
  var fbInput = magFireball.querySelector('input');
  var eyesInput = userDialog.querySelector('#eyes');
  var coatInput = userDialog.querySelector('#coat');

  // меняем цвет мантии, глаз и фаерброла
  magCoat.addEventListener('click', function () {
    var color = coatsCopy[window.creationMug.random(coatsCopy.length - 1)];
    magCoat.style.fill = color;
    coatInput.value = color;
  });

  magEyes.addEventListener('click', function () {
    var color = eyesCopy[window.creationMug.random(eyesCopy.length - 1)];
    magEyes.style.fill = color;
    eyesInput.value = color;
  });

  magFireball.addEventListener('click', function () {
    var color = fireball[window.creationMug.random(fireball.length - 1)];
    magFireball.style.backgroundColor = color;
    fbInput.value = color;
  });

  // показ окна setup
  var onPopupEscPress = function (evt) {
    if (evt.key === KEY_ESC && !evt.target.classList.contains('setup-user-name')) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    startCoordinats = {
      x: userDialog.offsetLeft,
      y: userDialog.offsetTop,
    };
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.style.left = startCoordinats.x + 'px';
    userDialog.style.top = startCoordinats.y + 'px';

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
})();


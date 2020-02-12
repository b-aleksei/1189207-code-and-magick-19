'use strict';

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

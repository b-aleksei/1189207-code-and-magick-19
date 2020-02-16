'use strict';

(function () {

  var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210,' +
  ' 55)', 'rgb(0, 0, 0)'];
  var eyes = ['black', 'red', 'blue', 'yellow', 'green', 'purple', 'orange'];
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

  // генерация случайного числа от 0 до n
  var random = function (n) {
    return Math.floor(Math.random() * (n + 1));
  };
  // меняем цвет мантии, глаз и фаерброла
  magCoat.addEventListener('click', function () {
    var color = coats[random(coats.length - 1)];
    magCoat.style.fill = color;
    coatInput.value = color;
    window.render.onCoatChange(color);
  });

  magEyes.addEventListener('click', function () {
    var color = eyes[random(eyes.length - 1)];
    magEyes.style.fill = color;
    eyesInput.value = color;
    window.render.onEyesChange(color);
  });

  magFireball.addEventListener('click', function () {
    var color = fireball[random(fireball.length - 1)];
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

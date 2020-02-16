'use strict';

(function () {

  var coatColor;
  var eyesColor;
  var arrWizards = [];

  var getRank = function (objWizard) {
    var rank = 0;

    if (objWizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (objWizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.setup.render(arrWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  // Перезаписываем обработчики-пустышки,
  // объявленные в render.js
  var onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  // И обработчик на смену цвета мантии
  var onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };

  var successHandler = function (arr) {
    arrWizards = arr;
    window.setup.render(arr);
    // updateWizards();
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.render = {
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange
  };

})();

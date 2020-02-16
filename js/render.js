'use strict';

(function () {

  var magCoat = document.querySelector('.wizard-coat');
  var coatColor = magCoat.style.fill;
  var eyesColor = 'black';
  var arrWizards = [];

  var getRank = function (objWizard) {
    var rank = 0;
    if (objWizard['colorCoat'] === coatColor) {
      rank += 2;
    }
    if (objWizard['colorEyes'] === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    return left - right;
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
  // отслеживаем изменение цвета мантии и глаз
  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });


  var successHandler = function (arr) {
    arrWizards = arr;
    window.setup.render(arr);
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.render = {
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange,
  };

})();

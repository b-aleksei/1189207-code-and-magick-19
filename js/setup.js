'use strict';

(function () {

  var numberPerson = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');

  var makeMug = function (obj) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = obj.name;
    wizardElement.querySelector('.wizard-coat').style.fill = obj.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = obj.colorEyes;
    return wizardElement;
  };

  var successHandler = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < numberPerson; i++) {
      fragment.appendChild(makeMug(arr[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(successHandler, window.backend.errorHandler);
  document.querySelector('.setup-similar').classList.remove('hidden');

})();

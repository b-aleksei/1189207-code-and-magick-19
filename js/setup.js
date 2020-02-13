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
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
  document.querySelector('.setup-similar').classList.remove('hidden');

})();

'use strict';

(function () {

  var TIMEOUT_IN_MS = 1000;
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var errorType = {
    200: 'OK',
    404: 'Cтраница не найдена, проверьте коректность адреса',
    500: 'Сервер временно не доступен, скоро все заработает',
    unknown: 'Неизвестная ошибка, попробуйте позднее',
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: fixed;' +
      ' left: 0; right: 0; font-size: 30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 3000);
  };

  var startRequest = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200 :
          success(xhr.response);
          break;
        case 404 :
          error(xhr.status + ' ' + errorType[404]);
          break;
        case 500 :
          error(xhr.status + ' ' + errorType[500]);
          break;
        default :
          error(xhr.status + ' ' + errorType.unknown);
      }
    }, {once: true});

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения. Проверьте подключение к интернет');
    }, {once: true});

    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    }, {once: true});

    return xhr;
  };

  var load = function (success, error) {
    var xhr = startRequest(success, error);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, success, error) {
    var xhr = startRequest(success, error);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler,
  };

})();

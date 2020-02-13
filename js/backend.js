'use strict';

(function () {

  var TIMEOUT_MS = 1000;
  var DELAY_ERROR_MS = 3000;
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
    }, DELAY_ERROR_MS);
  };
  /* eslint-disable */
  var onHandlerLoad = function (success, error) {
    switch (this.status) {
      case 200 :
        success(this.response);
        break;
      case 404 :
        error(this.status + ' ' + errorType[404]);
        break;
      case 500 :
        error(this.status + ' ' + errorType[500]);
        break;
      default :
        error(this.status + ' ' + errorType.unknown);
    }
  };

  var onHandlerTimeOut = function (error) {
    error('Запрос не успел выполниться за ' + this.timeout + 'мс');
  };

  /* eslint-enable */
  var load = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;
    xhr.open('GET', URL_LOAD);
    try {
      xhr.send();
    } catch (e) {
      error('Произошла ошибка соединения. Проверьте подключение к интернет');
    }

    xhr.addEventListener('load', onHandlerLoad.bind(xhr, success, error));
    xhr.addEventListener('timeout', onHandlerTimeOut.bind(xhr, error));
  };

  var save = function (data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_SAVE);
    try {
      xhr.send(data);
    } catch (e) {
      error('Произошла ошибка соединения. Проверьте подключение к интернет');
    }

    xhr.addEventListener('load', onHandlerLoad.bind(xhr, success, error));
    xhr.addEventListener('timeout', onHandlerTimeOut.bind(xhr, error));
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler,
  };

})();

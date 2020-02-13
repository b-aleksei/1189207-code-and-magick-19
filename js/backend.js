'use strict';

(function () {

  var TIMEOUT_IN_MS = 1000;
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var OK = 200;

  var onError = function (code) {
    // eslint-disable-next-line no-console
    console.error(code);
  };

  var onLoad = function (data) {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  var onHandlerLoad = function (success, error) {
    if (this.status === OK) {
      success(this.response);
      console.log(this); // срабатывает дважды
    } else {
      error('Ошибка соединения : ' + this.status + ' ' + this.statusText);
    }
  };


  var load = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL_LOAD);
    xhr.send();

    xhr.addEventListener('load', onHandlerLoad.bind(xhr, success, error));
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var save = function (data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_SAVE);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      if (xhr.status === OK) {
        success(xhr.response);
      } else {
        error('Ошибка соединения : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  window.backend = {
    load: load,
    save: save,
  };

})();

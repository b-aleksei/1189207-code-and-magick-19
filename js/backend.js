'use strict';

(function () {

  var TIMEOUT_IN_MS = 1000;
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var OK = 200;

  var onError = function (code) {
    console.error(code);
  };

  var onLoad = function (data) {
    console.log(data);
  };

  var onHandlerLoad = function (success, error) {
    if (this.status === OK) {
      success(this.response);
    } else {
      error('Соединение завершилось с ошибкой : ' + this.status + ' ' + this.statusText);
    }
  };

  var onHandlerTimeOut = function () {
    onError('Запрос не успел выполниться за ' + this.timeout + 'мс');
  };

  var onHandlerError = function () {
    onError('Произошла ошибка соединения');
  };


  var load = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL_LOAD);
    xhr.send();

    xhr.addEventListener('load', onHandlerLoad.bind(xhr, success, error));
    xhr.addEventListener('error', onHandlerError);
    xhr.addEventListener('timeout', onHandlerTimeOut.bind(xhr));
  };

  var save = function (data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_SAVE);
    xhr.send(data);

    xhr.addEventListener('load', onHandlerLoad.bind(xhr, success, error));
    xhr.addEventListener('error', onHandlerError);
    xhr.addEventListener('timeout', onHandlerTimeOut.bind(xhr));
  };

  window.backend = {
    load: load,
    save: save,
  };

  // load(onLoad, onError);
  // window.backend.save(onLoad, onError);

})();

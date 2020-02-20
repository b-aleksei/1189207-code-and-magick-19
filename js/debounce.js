'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (callback) {
    var lastTimeout = null;

    return function (arg) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL, arg);
    };
  };
})();

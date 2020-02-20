'use strict';

(function () {
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var blob = new Blob([file]);
      preview.src = URL.createObjectURL(blob);

    }
  });

})();

'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var SHADOW = 'rgba(0, 0, 0, 0.7)';
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR = -150;
var FONT = '16px PT Mono';
var getRandomPercent = function () {
  return Math.random().toFixed(2) * 100;
};

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

function makeRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
}

function makeText(ctx, text, x, y, font, color) {
  ctx.fillStyle = color || '#000000';
  ctx.font = font || FONT;
  ctx.fillText(text, x, y);
}

window.renderStatistics = function (ctx, names, time) {
  makeRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW);
  makeRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');
  ctx.textBaseline = 'hanging';
  makeText(ctx, 'Ура вы победили!', CLOUD_X + CLOUD_X + GAP * 4, CLOUD_Y + GAP * 2);
  makeText(ctx, 'Список результатов:', CLOUD_X + CLOUD_X + GAP * 3, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(time);

  for (var i = 0; i < time.length; i++) {
    var barHeight = MAX_BAR * time[i] / maxTime;
    var x = (CLOUD_X + GAP * 3) + (BAR_WIDTH + BAR_GAP) * i;
    makeText(ctx, names[i], x, CLOUD_HEIGHT - GAP * 2);
    makeText(ctx, Math.round(time[i]), x, barHeight + CLOUD_HEIGHT - GAP * 4);
    var colorBar = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(255,' + getRandomPercent() + '%, 50%)';
    makeRect(ctx, x, CLOUD_HEIGHT - GAP * 2, BAR_WIDTH, barHeight, colorBar);
  }
};

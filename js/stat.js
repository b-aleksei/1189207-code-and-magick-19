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

function makeCloud(ctx, x, y, color) {
  ctx.fillStyle = SHADOW;
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

window.renderStatistics = function (ctx, names, time) {
  makeCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_X + GAP * 4, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_X + GAP * 3, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(time);

  for (var i = 0; i < time.length; i++) {
    var barHeight = MAX_BAR * time[i] / maxTime;
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], (CLOUD_X + GAP * 3) + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.round(time[i]), (CLOUD_X + GAP * 3) + (BAR_WIDTH + BAR_GAP) * i, barHeight + CLOUD_HEIGHT - GAP * 4);
    ctx.fillStyle = 'hsl(255,' + getRandomPercent() + '%, 50%)';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect((CLOUD_X + GAP * 3) + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2, BAR_WIDTH, barHeight);
  }
};

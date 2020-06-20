
const CODE = 'code';
const PLAY = 'play';
let view = 'CODE';
let errorEl;
let canvasEl;
let ctx;

function run() {
  $('#code').hide();
  $('#playarea').show();
}

function back() {
  $('#playarea').hide();
  $('#code').show();
}

function reset_canvas() {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
}

function speed_change(e) {
  errorEl.value = e.target.value;
}

function init() {
  console.log('loading...');
  errorEl = document.getElementById('error')
  canvasEl = document.getElementById('canvas');
  ctx = canvasEl.getContext('2d');
  reset_canvas();

  $('#run').on('click', run);
  $('#back').on('click', back);
  $('#speed').on('input', speed_change)

}


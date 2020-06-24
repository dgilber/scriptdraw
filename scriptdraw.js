
const CODE = 'code';
const PLAY = 'play';
let view = 'CODE';
let errorEl;
let canvasEl;
let ctx;

function run() {
  reset_canvas();
  let code = $('#editor').val();
  $('#error').val('').hide()
  $('#code').hide()
  $('#playarea').show();
  try {
    localStorage['code'] = code;
    execute(code);
  } catch (err) {
    $('#error').val(err.message);
  }
}

function back() {
  $('#playarea').hide();
  $('#code').show();
}

function reset_canvas() {
  // ctx.scale = 1;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FFFFFF';

}

function speed_change(e) {
  localStorage['speed'] = e.target.value;
}

function isInt(v) {
  return typeof v === 'number' && Math.floor(v) === v;
}

// validation functions
function checkByte(b, name) {
  if (!isInt(b) || b < 0 || b > 255) {
    throw new Error(`Byte out of range: ${name} (${b})`);
  }
  return b;
}


const canvasFunctions = {
  color: function (r, g, b) {
    let color
        = 'rgb(' + checkByte(r, 'r')
        + ', ' + checkByte(g, 'g')
        + ', ' + checkByte(b, 'b')
        + ')';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
  },
  rect: function (x, y, w, h, doFill) {
    if (doFill) {
      ctx.fillRect(x, y, w, h);
    } else {
      ctx.strokeRect(x - .5, y - .5, w, h);
    }
  },
  ellipse: function (x, y, w, h, start = 0, end = 2 * Math.PI, rotation = 0) {
    ctx.ellipse(x, y, w / 2, y / 2, rotation, start, end);
    ctx.stroke();
  },
  fill: function () {
    ctx.fill();
  }
  
};


function execute(code) {
  let regex = /^(\w+)\s*\((.*)\)$/
  let lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line !== '') {
      let match = regex.exec(line);
      if (!match) {
        throw new Error(`Invalid syntax: ${line}\n  line ${i}`);
      }
      let name = match[1];
      if (!canvasFunctions[name]) {
        throw new Error(`Function not found: ${name}\n  line ${i}`);
      }
      // TODO - fix corners cut here!
      let args = match[2].split(/\s*,\s*/).map(s => parseInt(s))
      console.log(name, args);
      canvasFunctions[name].apply(this, args);
    }
  }
}

function init() {
  console.log('initializing...');
  errorEl = document.getElementById('error')
  canvasEl = document.getElementById('canvas');
  ctx = canvasEl.getContext('2d');
  reset_canvas();

  $('#run').on('click', run);
  $('#back').on('click', back);
  $('#speed').on('input', speed_change).val(localStorage['speed'] || 250);
  $('#editor').val(localStorage['code'] || '');

  console.log('initialization complete.')
}

var partitions = {
  easy : {
    one : [
      [0,1,1],
      [0,0,1],
      [1,0,0],
      [0,1,0],
      [1,1,0]
    ],
    two : [
      [0,1,1],
      [0,0,1],
      [1,0,0],
      [0,1,0],
      [1,1,0]
    ]
  },
  normal : {
    one : [
      [0,1,1,0],
      [0,0,1,1],
      [1,0,0,1],
      [0,1,0,1],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,1,1],
      [1,0,0,1],
      [0,1,0,1],
      [1,1,0,0]
    ],
    two : [
      [0,1,1,0],
      [0,0,1,1],
      [1,0,0,1],
      [0,1,0,1],
      [1,1,0,0]
    ]
  },
  hard: {
    one : [
      [0,1,1,0,0],
      [0,0,1,1,1],
      [1,0,0,1,0],
      [0,1,0,1,1],
      [1,1,0,0,0],
    ],
    two : [
      [0,1,1,0,0],
      [0,0,1,1,1],
      [1,0,0,1,0],
      [0,1,0,1,1],
      [1,1,0,0,0]
    ]
  }
};

var map = {
  32: false, // Space
  90: false, // Z
  69: false, // E
  82: false, // R
  84: false  // T
};

var suit = [];

var ui = {
  playButton : document.getElementById('playButton'),
  diffSelect : document.getElementById('diffSelect'),
  keyArea : document.getElementById('keyArea'),
  header: document.getElementById('header'),
  lines: document.querySelectorAll('.lines'),
  timer: document.getElementById('timerValue')
};

var wave = 0,
    bubbleInterval,
    mediator;

ui.playButton.addEventListener('click', function() {
  launcher();
});

window.addEventListener('keydown', function(e) {
  compareKey(e.keyCode);
});

window.addEventListener('keyup', function(e) {
  suit = [];
  if (e.keyCode in map) {
    map[e.keyCode] = false;
  }
});

function compareKey(keycode) {
  if (keycode in map) {
    map[keycode] = true;
    for (key in map) {
      if (map[key] == true && suit.length < 4 && keycode !== 32) {
        suit.push(1);
      } else if (map[key] !== true && suit.length < 4 && keycode !== 32) {
        suit.push(0);
      }
    }
    console.log(suit);
    if (map[32] && map[90] || map[32] && map[69] || map[32] && map [82] || map[32] && map[84]) {
      for (key in map) {
        if (map[key] == true) {
          for (var i = 0; i < ui.lines.length; i++) {
            if (ui.lines[i].dataset.key == key && ui.lines[i].childNodes.length > 0) {
              checkBubble(ui.lines[i]);
            }
          }
        }
      }
    }
  }
}

function checkBubble(line) {
  var bblPos = (line.childNodes[0].offsetHeight / 2) + line.childNodes[0].offsetTop + ui.header.offsetHeight;
  var start = ui.keyArea.offsetTop;
  var end = start + ui.keyArea.offsetHeight;
  console.log(start, end, bblPos);
  if (bblPos > start && bblPos < end) {
    line.removeChild(line.childNodes[0]);
  }
}

function launcher() {
  if (!bubbleInterval) {
    console.log(bubbleInterval);
    bubbleInterval = window.setInterval(genBubble, 1500);
  }
}

function genBubble() {
  if (wave < partitions.normal.one.length) {
    for (let i = 0; i < ui.lines.length; i++) {
      if (partitions.normal.one[wave][i] == 1) {
        var bubble = document.createElement('div');
        bubble.classList.add('bubbles');
        bubbleStyle(bubble, i);
        ui.lines[i].appendChild(bubble);
        if (ui.lines[i].lastChild !== null) {
          translateBubble(ui.lines[i].lastChild, ui.lines[i]);
        }
      }
    }
    wave++;
    ui.timer.textContent = wave;
  } else {
    window.clearInterval(bubbleInterval);
    var clear = window.setTimeout(clearArea , 5000);
  }
}

function translateBubble(bbl, line) {
  var pos = 0;
  var animInterval = setInterval( function() {
    if (pos > 100) {
      clearInterval(animInterval);
    } else {
      pos++;
      bbl.style.top = pos + '%';
    }

  }, 50);
}

function bubbleStyle(bbl, index) {
  if (ui.lines[index].dataset.key == 90) {
    bbl.style.background = "red";
  }
  else if (ui.lines[index].dataset.key == 69) {
    bbl.style.background = "green";
  }
  else if (ui.lines[index].dataset.key == 82) {
    bbl.style.background = "white";
  }
  else if (ui.lines[index].dataset.key == 84) {
    bbl.style.background = "orange";
  }
}

function clearArea() {
  for (let i = 0; i < ui.lines.length; i++) {
    var myNode = ui.lines[i];
     while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
     }
  }
  wave = 0;
}

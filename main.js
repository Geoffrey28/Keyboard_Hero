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

var keys = {
  90: false, // Z
  69: false, // E
  82: false, // R
  84: false  // T
};

var ui = {
  playButton : document.getElementById('playButton'),
  diffSelect : document.getElementById('diffSelect'),
  lines: document.querySelectorAll('.lines'),
  timer: document.getElementById('timerValue')
};

var wave = 0,
    bubbleInterval;

ui.playButton.addEventListener('click', function() {
  launcher();
});

window.addEventListener('keydown', function(e) {
  userPressKey(e.keyCode);
});

function userPressKey(keycode) {
  if (keycode in keys) {
    keys[keycode] = true;
    for (let i = 0; i < ui.lines.length; i++) {
      var dataKey = ui.lines[i].dataset.key;
      console.log(dataKey);
    }
  }
  keys[keycode] = false;
}

function verifyBubble(line, key) {
  if ( line.dataset.key == key) {
    console.log(key);
  }
}

function launcher() {
  bubbleInterval = window.setInterval(genBubble, 1000);
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
          translateBubble(ui.lines[i].lastChild);
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

function translateBubble(bbl) {
  var pos = 0;
  var animInterval = setInterval( function() {
    if (bbl.offsetTop >= 1000) {
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
}

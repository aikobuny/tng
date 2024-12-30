function fc() {
  let elem = document.getElementById('button')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

function fc2() {
  document.body.webkitRequestFullScreen();
}

function z(n) {
  return ('0' + n).slice(-2)
}

// Time
function updateTime() {
  var d = new Date()
  document.getElementsByClassName('time')[0].innerHTML = `<br>${z(d.getDay())}/${z(d.getMonth())}/${z(d.getFullYear())} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;  
}

function requestAmount() {
  amount = prompt('amount')
  if (amount == '') {
    return
  }
  document.getElementById('amount').innerHTML = `RM <span>${Number(amount).toFixed(2)}</span>`
  updateTime();
}

updateTime();

window.navigator.standalone = true
var PRESETS;

fetch('/presets.json').then(x => x.json()).then(data => {
  let parent = document.getElementById('_preset');
  PRESETS = data
  PRESETS.forEach(e => {
    let option = document.createElement('option');
    option.innerHTML = e.name
    option.setAttribute('value', e.name);
    parent.appendChild(option)
  });
})
var SELECT = document.getElementById('_preset')
SELECT.addEventListener('change', function() {
  let _receiver = document.getElementById('_receiver');
  let _remark = document.getElementById('_remark');
  let r = PRESETS.find(item => item.name === SELECT.value)

  _receiver.value = r.receiver;
  _remark.value = r.remark ? _receiver.value: _receiver.value
})

function z(n) {
  return ('0' + n).slice(-2)
}

// Time
function updateTime() {
  var d = new Date();
  console.log(d);
  let m = d.getMonth();
  if (m <= 11) {
    m++
  }
  document.getElementsByClassName('time')[0].innerHTML = `${z(d.getDate())}/${z(m)}/${z(d.getFullYear())} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;  
}

function requestAmount() {
  amount = prompt('amount')
  if (amount == '') {
    return
  }
  document.getElementById('amount').innerHTML = `RM <span>${Number(amount).toFixed(2)}</span>`
  updateTime();
}

function back() {
  document.getElementsByClassName('panel')[0].style.display = 'block';
  document.getElementsByClassName('receipt')[0].style.display = 'none';
}

function submit() {
  let _amount = document.getElementById('_amount');
  let _receiver = document.getElementById('_receiver');
  let _remark = document.getElementById('_remark');
  let _preset = document.getElementById('_preset');

  if (_preset.value != "none") {

  }

  document.getElementById('amount').innerHTML = `RM <span>${Number(_amount.value).toFixed(2)}</span>`;
  document.getElementsByClassName('receiver')[0].innerHTML = `${_receiver.value.replace(/ /g, "<br>")}`
  document.getElementsByClassName('remark')[0].innerHTML = `${_remark.value ? _receiver.value: "Fund Transfer"}`

  document.getElementsByClassName('panel')[0].style.display = 'none';
  document.getElementsByClassName('receipt')[0].style.display = 'block';
  updateTime();
}

window.navigator.standalone = true
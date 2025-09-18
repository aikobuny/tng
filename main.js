var PRESETS;

function generateTransactionRef() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD
  const serviceIdentifier = "TNGD";
  function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const uniquePart1 = getRandomString(8);
  const uniquePart2 = getRandomString(8);
  return `${dateStr}${serviceIdentifier}${uniquePart1}<br>${uniquePart2}`;
}

function generateEwalletRef() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const transactionId = Array.from({ length: 14 }, () => Math.floor(Math.random() * 2)).join('');
  const serviceIdentifier = "TNG";
  function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const secondaryRef = getRandomString(18);
  return `${dateStr}${transactionId}${serviceIdentifier}${secondaryRef}`;
}

fetch('presets.json').then(x => x.json()).then(data => {
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
  let _points = document.getElementById('_points');
  let _ern = document.getElementById('_ern');
  let _pm = document.getElementById('_pm');
  let _share = document.getElementById('_share');
  let _notification = document.getElementById('_notification');
  let r = PRESETS.find(item => item.name === SELECT.value)

  _receiver.value = r.receiver;
  _remark.value = r.remark ? r.remark : "";
  _points.checked = r.points ? true : false;
  _ern.value = r.ern ? "yes" : "";
  _pm.value = r.pm ? r.pm : "";
  _share.checked = r.share ? true : false;
  _notification.checked = r.notification ? true : true;
})

function z(n) {
  return ('0' + n).slice(-2)
}

// Time
function updateTime() {
  var d = new Date();
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
  document.getElementById('amount').innerHTML = `RM <span style="letter-spacing: 1px;">${Number(_amount.value).toFixed(2)}</span>`;

  let selectedMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
  document.getElementById('transferred').innerHTML = selectedMethod;

  let _receiver = document.getElementById('_receiver');
  document.getElementsByClassName('receiver')[0].innerHTML = `${_receiver.value}` // .replace(/ /g, "<br>")

  let _remark = document.getElementById('_remark');
  document.getElementsByClassName('remark')[0].innerHTML = `${_remark.value ? _remark.value: "Fund Transfer"}`;
  document.getElementById('remark').style.display = _remark.value.length > 0 ? "block" : "none";
  // document.getElementById('remark').style.display 

  let _ern = document.getElementById('_ern');
  document.getElementsByClassName('ern')[0].innerHTML = _ern.value === 'yes' ? generateEwalletRef() : _ern.value;
  document.getElementById('ern').style.display = _ern.value.length > 0 ? "block" : "none";

  let _pm = document.getElementById('_pm');
  document.getElementsByClassName('pm')[0].innerHTML = (_pm.value && _pm.value !== 'yes') ? _pm.value : (_pm.value === 'yes' ? 'eWallet Balance' : '');
  document.getElementById('pm').style.display = _pm.value.length > 0 ? "block" : "none";

  let _preset = document.getElementById('_preset');

  let _points = document.getElementById('_points');
  document.getElementById('points').style.display = _points.checked ? "block" : "none";
  document.getElementById('points').style.color = Number(_amount.value).toFixed(2) >= 0 ? "#3170d2" : "#f50c00";
  document.getElementById('points').style.backgroundColor = Number(_amount.value).toFixed(2) >= 0 ? "#eef2fe" : "#FEE0DF";
  document.getElementById('points').innerText = `+ ${_amount.value} points`
  document.getElementById('section').style.marginTop = _points.checked ? "250px" : "200px";

  let _ad = document.getElementById('_ad');
  document.getElementById('ad').style.display = _ad.checked ? "block" : "none";

  let _share = document.getElementById('_share');
  document.getElementById('share').setAttribute('src', _share.checked ? "assets/share_done.png" : "assets/done.png");

  if (_preset.value != "none") {

  }

  document.querySelectorAll('#section .row').forEach(row => {
    let valueEl = row.querySelector('.value');
    if (!valueEl) return;

    requestAnimationFrame(() => {
      let lineHeight = parseFloat(window.getComputedStyle(valueEl).lineHeight);
      let lineCount = Math.round(valueEl.offsetHeight / lineHeight);

      let baseMargin = 14;
      row.style.marginBottom = `${lineCount * baseMargin}px`;

      /*
      console.log(
        "lineHeight:", lineHeight,
        "offsetHeight:", valueEl.offsetHeight,
        "lineCount:", lineCount,
        "text:", valueEl.textContent,
        "marginBottom:", lineCount * baseMargin
      );
      */
    });
  });


  document.getElementsByClassName('panel')[0].style.display = 'none';
  document.getElementsByClassName('receipt')[0].style.display = 'block';
  updateTime();

  if (_notification.checked && Notification.permission === 'granted') {
    console.log('Showing notification');
    console.log('Notification permission:', Notification.permission);
    console.log('Document visibility:', document.visibilityState);
    console.log('Window focus:', document.hasFocus());
    
    const notification = new Notification('Transfer Successful.', {
      body: `RM ${Number(_amount.value).toFixed(2)} has been successfully transferred to ${_receiver.value}`,
    });
    
    notification.onshow = () => console.log('✅ Notification displayed');
    notification.onerror = (e) => console.log('❌ Notification error:', e);
    notification.onclick = () => console.log('Notification clicked');
  }
}

window.navigator.standalone = true

panaginip-Nicole paki remove lang

const lines = [
  { text:"PAULIT-ULIT KANG", time:0 },
  { text:"TUMATAKBO SA ISIP", time:6 },
  { text:"PAULIT-ULIT NA LANG", time:14 },
  { text:"PINAPANALANGIN KA", time:20 },
  { text:"MAAARI BANG HAWAKAN", time:27 },
  { text:"ANG IYONG MGA KAMAY?", time:33 },
  { text:"TAYO NA", time:41 },
  { text:"LILIPAD NA NANG SABAY", time:47 },
  { text:"", time:55 },
  { text:"PARANG PANAGINIP", time:56 },
];

const totalDuration = lines[lines.length - 1].time + 6;

const typeLineEl = document.getElementById('typeLine');
const dotsEl = document.getElementById('dots');

lines.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot';
  d.id = 'dot' + i;
  dotsEl.appendChild(d);
});

let currentIndex = -1;
let typeTimer = null;

function typeText(text){
  clearInterval(typeTimer);
  typeLineEl.textContent = '';
  let i = 0;
  const speed = 270;
  typeTimer = setInterval(() => {
    if(i < text.length){
      typeLineEl.textContent += text[i];
      i++;
    } else {
      clearInterval(typeTimer);
    }
  }, speed);
}

function showLine(index){
  typeText(lines[index].text);
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  document.getElementById('dot' + index).classList.add('active');
  currentIndex = index;
}

function clearLine(){
  clearInterval(typeTimer);
  typeLineEl.textContent = '';
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  currentIndex = -1;
}

let startTime = null;

function tick(ts){
  if(!startTime) startTime = ts;
  const elapsed = (ts - startTime) / 1000;

  if(elapsed < lines[0].time){
    requestAnimationFrame(tick);
    return;
  }

  let activeIndex = 0;
  for(let i = 0; i < lines.length; i++){
    if(elapsed >= lines[i].time) activeIndex = i;
  }
  if(activeIndex !== currentIndex){
    showLine(activeIndex);
  }

  if(elapsed < totalDuration){
    requestAnimationFrame(tick);
  } else {
    clearLine();
    startTime = null;
    setTimeout(() => { requestAnimationFrame(tick); }, 1200);
  }
}

requestAnimationFrame(tick);

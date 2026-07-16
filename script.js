const CONFIG = {
  noButtonDodges: true,     // set to false if you don't want the "No" button to run away
  maxDodges: 6,             // how many times "No" escapes before it just says something cute
  noCaptions: [
    "wait, no, come back 🥺",
    "are you sure...?",
    "hmm 🤔 think again",
    "one more try...",
    "it's giving 'no' energy, respectfully declined",
    "okay you're stuck with just the one button now 💗"
  ],
  heartCount: 18            // how many ambient floating hearts drift up the background
};

/* ambient floating hearts */
(function initHearts(){
  const field = document.getElementById('heart-field');
  const symbols = ['💗','💕','💓','♡'];
  for (let i = 0; i < CONFIG.heartCount; i++){
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    el.style.animationDuration = (10 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    el.style.fontSize = (16 + Math.random() * 14) + 'px';
    field.appendChild(el);
  }
})();

/* the playful "No" button */
let dodgeCount = 0;

function dodge(){
  if (!CONFIG.noButtonDodges) return;

  const row = document.getElementById('button-row');
  const btn = document.getElementById('no-btn');
  const caption = document.getElementById('no-caption');

  if (dodgeCount >= CONFIG.maxDodges){
    caption.textContent = CONFIG.noCaptions[CONFIG.noCaptions.length - 1];
    return;
  }

  const rowBounds = row.getBoundingClientRect();
  const btnBounds = btn.getBoundingClientRect();

  btn.classList.add('dodging');

  const maxX = Math.max(0, rowBounds.width - btnBounds.width);
  const maxY = Math.max(0, rowBounds.height - btnBounds.height);

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  btn.style.left = newX + 'px';
  btn.style.top = newY + 'px';

  caption.textContent = CONFIG.noCaptions[dodgeCount % CONFIG.noCaptions.length];
  dodgeCount++;
}

/* saying yes 💗 */
function sayYes(){
  burstConfetti();
  const overlay = document.getElementById('celebration');
  const frame = document.getElementById('gif-frame');
  overlay.classList.add('show');

  frame.classList.remove('rise');
  void frame.offsetWidth; // force reflow so the animation can replay
  frame.classList.add('rise');
}

function closeCelebration(){
  document.getElementById('celebration').classList.remove('show');
}

function burstConfetti(){
  const symbols = ['💗','💕','🎉','✨','💓'];
  const count = 26;
  for (let i = 0; i < count; i++){
    const el = document.createElement('span');
    el.className = 'confetti';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-40px';
    el.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
    el.style.fontSize = (16 + Math.random() * 16) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
}
/* ==========================================================
   NEGRO Y MORADO - FLORES AMARILLAS & CANCIÓN PERSONALIZADA
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const surpriseBtn = document.getElementById('surpriseBtn');
  const heroSection = document.getElementById('heroSection');
  const revealSection = document.getElementById('revealSection');
  const flowerContainer = document.getElementById('flowerContainer');
  const replayBtn = document.getElementById('replayBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicText = document.getElementById('musicText');
  const bgAudio = document.getElementById('bgAudio');

  // Canvas setup for yellow petal explosion & rain against dark purple background
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  /* ==========================================================
     1. PETAL PARTICLE SYSTEM (HTML5 CANVAS)
     ========================================================== */
  class Petal {
    constructor(isBurst = false) {
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      if (isBurst) {
        this.x = width / 2;
        this.y = height / 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 3;
      } else {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2.5 + 1.2;
      }

      this.size = Math.random() * 14 + 10;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 4;
      this.opacity = Math.random() * 0.55 + 0.45;
      this.gravity = 0.04;
      this.drag = 0.98;

      // Bright radiant yellow/gold tones that glow against purple backdrop
      const colors = ['#FFD700', '#FFC107', '#FFE082', '#FFCA28', '#FFB300', '#FFF59D', '#E0AAFF'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.vx *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx + Math.sin(this.y * 0.02) * 0.8;
      this.y += this.vy;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soft center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.lineTo(0, this.size / 2);
      ctx.stroke();

      ctx.restore();
    }
  }

  const petals = [];
  let isAnimatingPetals = false;

  function initPetals(count = 80, isBurst = false) {
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(isBurst));
    }
    if (!isAnimatingPetals) {
      isAnimatingPetals = true;
      animatePetals();
    }
  }

  function animatePetals() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    requestAnimationFrame(animatePetals);
  }

  /* ==========================================================
     2. FLOWER SVG GRAPHICS GENERATOR (YELLOW FLOWERS)
     ========================================================== */
  const flowerSVGs = [
    // Sunflower (Centerpiece)
    `
    <div class="single-flower sway-1">
      <svg class="flower-svg" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 90 Q58 135 60 180" stroke="#4CAF50" stroke-width="6" stroke-linecap="round"/>
        <path d="M60 130 Q35 120 20 135 Q45 150 60 140" fill="#43A047"/>
        <path d="M60 110 Q85 100 100 115 Q75 130 60 120" fill="#388E3C"/>

        <g fill="#FFC107">
          <ellipse cx="60" cy="20" rx="10" ry="25" />
          <ellipse cx="60" cy="100" rx="10" ry="25" />
          <ellipse cx="20" cy="60" rx="25" ry="10" />
          <ellipse cx="100" cy="60" rx="25" ry="10" />
          <ellipse cx="32" cy="32" rx="12" ry="25" transform="rotate(-45 32 32)" />
          <ellipse cx="88" cy="32" rx="12" ry="25" transform="rotate(45 88 32)" />
          <ellipse cx="32" cy="88" rx="12" ry="25" transform="rotate(45 32 88)" />
          <ellipse cx="88" cy="88" rx="12" ry="25" transform="rotate(-45 88 88)" />
        </g>

        <g fill="#FFD700">
          <ellipse cx="60" cy="22" rx="8" ry="22" />
          <ellipse cx="60" cy="98" rx="8" ry="22" />
          <ellipse cx="22" cy="60" rx="22" ry="8" />
          <ellipse cx="98" cy="60" rx="22" ry="8" />
          <ellipse cx="33" cy="33" rx="9" ry="22" transform="rotate(-45 33 33)" />
          <ellipse cx="87" cy="33" rx="9" ry="22" transform="rotate(45 87 33)" />
          <ellipse cx="33" cy="87" rx="9" ry="22" transform="rotate(45 33 87)" />
          <ellipse cx="87" cy="87" rx="9" ry="22" transform="rotate(-45 87 87)" />
        </g>

        <circle cx="60" cy="60" r="22" fill="#5D4037" />
        <circle cx="60" cy="60" r="18" fill="#4E342E" stroke="#795548" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="60" cy="60" r="10" fill="#3E2723" />
      </svg>
    </div>
    `,

    // Blooming Yellow Rose
    `
    <div class="single-flower sway-2">
      <svg class="flower-svg" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 85 Q65 130 60 180" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
        <path d="M62 125 Q88 115 98 130 Q75 142 62 135" fill="#388E3C"/>
        <path d="M58 140 Q30 130 20 145 Q45 158 58 150" fill="#2E7D32"/>

        <circle cx="60" cy="55" r="34" fill="#FFCA28" />
        <path d="M30 50 Q60 10 90 50 Q60 90 30 50" fill="#FFD700"/>
        <path d="M25 55 Q60 95 95 55 Q60 30 25 55" fill="#FFC107"/>

        <circle cx="60" cy="52" r="20" fill="#FFE082"/>
        <path d="M48 50 C48 38, 72 38, 72 50 C72 62, 54 62, 54 52 C54 46, 66 46, 66 52" 
              stroke="#FFA000" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      </svg>
    </div>
    `,

    // Yellow Tulip
    `
    <div class="single-flower sway-3">
      <svg class="flower-svg" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 85 Q55 130 60 180" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
        <path d="M58 120 Q32 110 22 125 Q45 138 58 130" fill="#388E3C"/>

        <path d="M32 60 Q22 25 50 15 Q60 40 60 75 Q40 75 32 60 Z" fill="#FFCA28"/>
        <path d="M88 60 Q98 25 70 15 Q60 40 60 75 Q80 75 88 60 Z" fill="#FFC107"/>
        <path d="M40 70 Q60 10 80 70 Q60 88 40 70 Z" fill="#FFD700"/>
        <path d="M50 65 Q60 30 70 65 Q60 78 50 65 Z" fill="#FFF176"/>
      </svg>
    </div>
    `
  ];

  function renderFlowers() {
    flowerContainer.innerHTML = '';
    const bouquetIndices = [2, 1, 0, 1, 2];
    bouquetIndices.forEach((idx) => {
      flowerContainer.innerHTML += flowerSVGs[idx];
    });
  }

  /* ==========================================================
     3. AUDIO CONTROL FUNCTIONS
     ========================================================== */
  function playAudio() {
    if (bgAudio) {
      bgAudio.volume = 0.85;
      bgAudio.play().then(() => {
        musicText.textContent = 'Pausar Música';
        musicToggleBtn.classList.add('highlight');
      }).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }
  }

  function toggleAudio() {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      bgAudio.play();
      musicText.textContent = 'Pausar Música';
      musicToggleBtn.classList.add('highlight');
    } else {
      bgAudio.pause();
      musicText.textContent = 'Reproducir Música';
      musicToggleBtn.classList.remove('highlight');
    }
  }

  /* ==========================================================
     4. EVENT LISTENERS
     ========================================================== */

  // SURPRISE BUTTON CLICK
  surpriseBtn.addEventListener('click', () => {
    // Play background song
    playAudio();

    // Start petal particle burst
    initPetals(90, true);
    heroSection.classList.add('hidden-hero');

    setTimeout(() => {
      renderFlowers();
      revealSection.classList.remove('hidden');
    }, 400);
  });

  // REPLAY FLOWERS BUTTON
  replayBtn.addEventListener('click', () => {
    initPetals(60, true);
    renderFlowers();
    if (bgAudio && bgAudio.paused) {
      playAudio();
    }
  });

  // MUSIC TOGGLE BUTTON
  musicToggleBtn.addEventListener('click', () => {
    toggleAudio();
  });
});

/* ==========================================================================
   HAPPY BIRTHDAY KB - INTERACTIVE JAVASCRIPT
   Clean, beginner-friendly & full of romantic magic!
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BACKGROUND SPARKLES & FLOATING HEARTS CANVAS
     ========================================================================== */
  const canvas = document.getElementById('sparkleCanvas');
  const ctx = canvas.getContext('2d');

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height + canvas.height;
      this.size = Math.random() * 8 + 3;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
      this.color = Math.random() > 0.5 ? '#F4C2C2' : (Math.random() > 0.5 ? '#E5C158' : '#7A1C30');
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      if (this.y < -20) {
        this.reset();
        this.y = canvas.height + 20;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size * 1.8}px serif`;
        ctx.fillText('❤️', this.x, this.y);
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Create initial particle pool
  const particleCount = window.innerWidth < 768 ? 25 : 50;
  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height; // populate screen initially
    particles.push(p);
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* ==========================================================================
     2. COUNTDOWN TIMER TO 7TH OCTOBER
     ========================================================================== */
  function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();

    // Target date: October 7th
    let targetDate = new Date(currentYear, 9, 7, 0, 0, 0); // Month is 0-indexed (9 = Oct)

    // If Oct 7th has already passed this year, count down to next year's Oct 7th
    if (now > targetDate && !(now.getDate() === 7 && now.getMonth() === 9)) {
      targetDate = new Date(currentYear + 1, 9, 7, 0, 0, 0);
    }

    const diff = targetDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const birthdayMsgEl = document.getElementById('birthdayTodayMsg');

    // Check if today is Oct 7th!
    if (now.getDate() === 7 && now.getMonth() === 9) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (birthdayMsgEl) birthdayMsgEl.classList.remove('hidden');
      return;
    }

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
      if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
      if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     3. INTERACTIVE SURPRISE LETTER
     ========================================================================== */
  const openLetterBtn = document.getElementById('openLetterBtn');
  const interactiveEnvelope = document.getElementById('interactiveEnvelope');
  const waxSeal = document.getElementById('waxSeal');

  function openLetter() {
    if (!interactiveEnvelope.classList.contains('open')) {
      interactiveEnvelope.classList.remove('closed');
      interactiveEnvelope.classList.add('open');

      // Scroll smoothly to letter paper
      setTimeout(() => {
        const letterPaper = document.getElementById('letterPaper');
        if (letterPaper) {
          letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);

      // Trigger extra confetti burst
      createBurstConfetti();
    }
  }

  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', openLetter);
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', openLetter);
  }

  /* ==========================================================================
     4. PHOTO GALLERY LIGHTBOX MODAL
     ========================================================================== */
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  polaroids.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-full') || card.querySelector('img').src;
      const captionText = card.getAttribute('data-caption') || card.querySelector('.note-text').textContent;

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxCaption) lightboxCaption.textContent = captionText;
      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     5. INTERACTIVE BIRTHDAY CAKE & BLOWING CANDLES
     ========================================================================== */
  const birthdayCake = document.getElementById('birthdayCake');
  const flames = document.querySelectorAll('.flame');
  const wishRevealMsg = document.getElementById('wishRevealMsg');
  const cakeInstruction = document.getElementById('cakeInstruction');

  let candlesBlown = false;

  function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.classList.add('extinguished');
      }, index * 150);
    });

    setTimeout(() => {
      if (wishRevealMsg) wishRevealMsg.classList.remove('hidden');
      if (cakeInstruction) cakeInstruction.textContent = "✨ Wish sent to the stars! ✨";
      createBurstConfetti();
    }, 600);
  }

  if (birthdayCake) {
    birthdayCake.addEventListener('click', blowCandles);
  }

  /* ==========================================================================
     6. ROMANTIC MUSIC PLAYER & SYNTH AUDIO FALLBACK
     ========================================================================== */
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const soundWaves = document.getElementById('soundWaves');

  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;

  // Romantic gentle lullaby notes frequencies
  const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 329.63, 293.66];
  let noteIndex = 0;

  function playSynthMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    synthInterval = setInterval(() => {
      if (!isPlaying) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[noteIndex], audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);

      noteIndex = (noteIndex + 1) % notes.length;
    }, 600);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        musicIcon.className = 'fa-solid fa-pause';
        soundWaves.classList.add('playing');
        playSynthMelody();
      } else {
        musicIcon.className = 'fa-solid fa-play';
        soundWaves.classList.remove('playing');
        stopSynthMelody();
      }
    });
  }

  /* ==========================================================================
     7. NAVBAR SCROLL & MOBILE DRAWER
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  /* ==========================================================================
     8. CONFETTI CELEBRATION BURST HELPER
     ========================================================================== */
  function createBurstConfetti() {
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = (Math.random() * 10 + 6) + 'px';
      confetti.style.height = (Math.random() * 10 + 6) + 'px';
      confetti.style.backgroundColor = ['#7A1C30', '#F4C2C2', '#D4AF37', '#FFF'][Math.floor(Math.random() * 4)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.zIndex = '3000';
      confetti.style.pointerEvents = 'none';
      confetti.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 3s ease';

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
        confetti.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        confetti.remove();
      }, 3200);
    }
  }



});

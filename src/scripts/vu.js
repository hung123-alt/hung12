// Retro Neon Party interactions for Vũ
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);

  const overlay = $('#overlay');
  const startBtn = $('#startBtn');
  const playToggle = $('#playToggle');
  const openGift = $('#openGift');
  const replay = $('#replay');
  const modal = $('#modal');
  const closeModal = $('#closeModal');
  const xClose = $('#xClose');
  const bgm = $('#bgm');

  let isPlaying = false;

  function playMusic(){
    if (!bgm) return;
    const p = bgm.play();
    if (p && typeof p.then === 'function') {
      p.then(() => { isPlaying = true; updatePlayToggle(); })
       .catch(() => { /* Autoplay prevented until user gesture */ });
    } else {
      isPlaying = true;
      updatePlayToggle();
    }
  }

  function pauseMusic(){
    if (!bgm) return;
    bgm.pause();
    isPlaying = false;
    updatePlayToggle();
  }

  function updatePlayToggle(){
    if (!playToggle) return;
    playToggle.textContent = isPlaying ? '⏸ Tạm dừng' : '▶️ Phát nhạc';
  }

  function startParty(){
    document.body.classList.add('started');
    if (overlay) overlay.style.display = 'none';
    playMusic();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function openModal(){
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModalFn(){
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  }

  function replayParty(){
    // Restart subtle animations by toggling the class
    document.body.classList.remove('started');
    void document.body.offsetWidth; // force reflow
    document.body.classList.add('started');
    // Reset and play music
    if (bgm){ bgm.currentTime = 0; playMusic(); }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Event bindings
  if (startBtn) startBtn.addEventListener('click', startParty);
  if (overlay) overlay.addEventListener('click', (e)=>{
    // Only start if user clicks within inner area or anywhere on overlay
    if (e.target === overlay || e.target.closest('.overlay-inner')) startParty();
  });

  if (playToggle) playToggle.addEventListener('click', ()=>{
    if (isPlaying) pauseMusic(); else playMusic();
  });

  if (openGift) openGift.addEventListener('click', openModal);
  if (closeModal) closeModal.addEventListener('click', closeModalFn);
  if (xClose) xClose.addEventListener('click', closeModalFn);

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeModalFn();
  });

  if (replay) replay.addEventListener('click', replayParty);

  // Initial UI sync
  updatePlayToggle();
})();

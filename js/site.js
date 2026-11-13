const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
}));

// Visualização ampliada dos mapas.
const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogTitle = document.getElementById('dialog-title');
const originalLink = document.getElementById('open-original');
function showMapImage(button) {
  const src = button.dataset.image;
  const title = button.dataset.title || 'Mapa EcoRota';
  dialogImage.src = src;
  dialogImage.alt = title;
  dialogTitle.textContent = title;
  originalLink.href = src;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else window.open(src, '_blank', 'noopener');
}
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => showMapImage(button)));
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

// Progresso de leitura: pequeno indicador, sem interferir na rolagem.
const progressBar = document.querySelector('.scroll-progress span');
let progressTicking = false;
function updateScrollProgress() {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  progressTicking = false;
}
window.addEventListener('scroll', () => {
  if (!progressTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    progressTicking = true;
  }
}, { passive: true });
updateScrollProgress();

// Revelação ao entrar na tela, sem esconder conteúdo quando o recurso não existe.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.intro-strip, .section-heading, .map-card, .map-disclaimer, .project-note, .closing'
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach((element, index) => {
    element.classList.add('motion-reveal');
    if (element.classList.contains('map-card')) element.style.setProperty('--reveal-delay', `${(index % 3) * 110}ms`);
    element.querySelectorAll(':scope > *').forEach((child, childIndex) => {
      child.style.setProperty('--child-index', childIndex);
    });
    revealObserver.observe(element);
  });
}

// Brilho localizado: efeito decorativo inspirado em Glare Hover, apenas em ponteiros precisos.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer && !reducedMotion) {
  document.querySelectorAll('.hero-art, .map-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--spot-x');
      card.style.removeProperty('--spot-y');
    });
  });
}


// Magnet suave inspirado nas microinterações do React Bits.
// O deslocamento é pequeno e não altera o tamanho dos alvos clicáveis.
if (finePointer && !reducedMotion) {
  document.querySelectorAll('.magnet').forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      element.style.setProperty('--magnet-x', `${(x * 5).toFixed(2)}px`);
      element.style.setProperty('--magnet-y', `${(y * 4).toFixed(2)}px`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--magnet-x', '0px');
      element.style.setProperty('--magnet-y', '0px');
    });
  });
}

// Pausa os loops decorativos quando a seção sai da tela, para não gastar CPU/GPU à toa.
if (!reducedMotion && 'IntersectionObserver' in window) {
  const loopSections = document.querySelectorAll('.hero, .maps-section, .project-note, .closing');
  const pauseObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-paused', !entry.isIntersecting));
  }, { rootMargin: '120px 0px' });
  loopSections.forEach(section => pauseObserver.observe(section));
}

// "Voltar ao topo" e marca do cabeçalho: sobe ao topo de forma previsível (o #topo é o header sticky, que deixava o scroll incompleto).
document.querySelectorAll('a[href="#topo"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});

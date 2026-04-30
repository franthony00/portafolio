// NAV: agrega clase al hacer scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// REVEAL: animación de entrada por scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// SKILLS: animación de los círculos de progreso
const circles = document.querySelectorAll('.fg-ring');
const circumference = 2 * Math.PI * 54;

const circleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const ring = entry.target;
      const percent = parseInt(ring.dataset.percent, 10);
      const offset = circumference - (circumference * percent / 100);
      ring.style.strokeDashoffset = offset;
      circleObserver.unobserve(ring);
    }
  });
}, { threshold: 0.5 });
circles.forEach(c => circleObserver.observe(c));

// MODAL: visor de certificados
const modal = document.getElementById('certModal');
const modalTitle = document.getElementById('certModalTitle');
const modalBody = document.getElementById('certModalBody');
const modalClose = document.getElementById('certModalClose');
const modalBackdrop = document.getElementById('certModalBackdrop');

document.querySelectorAll('.cert-view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.src;
    const title = btn.dataset.title;

    modalTitle.textContent = title;
    // Para PDFs: #view=FitH ajusta el ancho completo en el visor del navegador
    const iframeSrc = btn.dataset.type === 'pdf' ? `${src}#view=FitH&toolbar=1` : src;
    modalBody.innerHTML = `<iframe src="${iframeSrc}" title="${title}"></iframe>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Limpiar iframe con delay para evitar parpadeo
  setTimeout(() => { modalBody.innerHTML = ''; }, 300);
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

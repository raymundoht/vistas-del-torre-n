/**
 * Vistas del Torreón - Script de interactividad
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Acordeón inteligente para FAQ (cierra las demás preguntas al abrir una)
  const faqDetails = document.querySelectorAll('.faq details');
  faqDetails.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        faqDetails.forEach((otherDetail) => {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });

  // 2. Smooth scroll con compensación de la barra de navegación
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Garantizar reproducción automática de videos de fondo en navegadores móviles/ahorro de batería
  const bgVideos = document.querySelectorAll('video');
  bgVideos.forEach((video) => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // En caso de bloqueo por el navegador, reintentar al primer toque/clic
        const onFirstInteraction = () => {
          video.play();
          window.removeEventListener('click', onFirstInteraction);
          window.removeEventListener('touchstart', onFirstInteraction);
        };
        window.addEventListener('click', onFirstInteraction, { once: true });
        window.addEventListener('touchstart', onFirstInteraction, { once: true });
      });
    }
  });
});

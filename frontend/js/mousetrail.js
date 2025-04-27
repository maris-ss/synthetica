let lastTime = 0;

// Cores suaves tipo fumaça
const colors = ['#F1C4ED', '#7D8CE7', '#E3E5B4'];

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTime < 60) return; // controla frequência
  lastTime = now;

  const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
  if (
    elementBelow?.closest('#hero') ||
    elementBelow?.closest('#contexto') ||
    elementBelow?.closest('#header')
  ) {
    const bubbleCount = Math.floor(Math.random() * 3) + 2; // 2 a 4 fumacinhas

    for (let i = 0; i < bubbleCount; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-trail';

      // Tamanho e posição randômica ao redor do cursor
      const size = Math.random() * 30 + 20;
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;

      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.left = `${e.pageX + offsetX}px`;
      smoke.style.top = `${e.pageY + offsetY}px`;
      smoke.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      smoke.style.opacity = Math.random() * 0.5 + 0.3;

      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1200);
    }
  }
});

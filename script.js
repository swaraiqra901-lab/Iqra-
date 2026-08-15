const grid = document.querySelector('#feedback-grid');
const button = document.querySelector('#view-more');

button.addEventListener('click', () => {
  const expanded = grid.classList.toggle('expanded');
  button.setAttribute('aria-expanded', expanded);
  button.innerHTML = expanded ? 'Show Less Feedback <span>↑</span>' : 'View More Feedback <span>↓</span>';
  if (!expanded) button.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

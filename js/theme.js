const logo = document.getElementById('logo');
const themeLink = document.getElementById('theme-link');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

function setTheme(theme) {
  themeLink.href = theme === 'dark' ? '../styles/themes/dark.css' : '../styles/themes/light.css';
  logo.src = theme === 'dark' ? '../assests/logo-dark.png' : '../assests/logo-light.png';
  themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
}

themeToggle.addEventListener('click', toggleTheme);

// Автоматически применяем системную тему при первом входе
(function () {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

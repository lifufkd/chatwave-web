const logo = document.getElementById('logo');
const themeLink = document.getElementById('theme-link');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

function setTheme(theme) {
  themeLink.href = theme === 'dark' ? '../styles/themes/dark.css' : '../styles/themes/light.css';
  logo.src = theme === 'dark' ? '../assests/logo-dark.png' : '../assests/logo-light.png';
  themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill text-white' : 'bi bi-moon-fill text-dark';
  localStorage.setItem('theme', theme);
}

function updateAllIcons(theme) {
  const icons = document.querySelectorAll('.bi'); // выбираем все иконки Bootstrap Icons

  icons.forEach(icon => {
    // Удалим старые классы цвета
    icon.classList.remove('text-dark', 'text-white');

    // Добавим нужный
    if (theme === 'dark') {
      icon.classList.add('text-white');
    } else {
      icon.classList.add('text-dark');
    }
  });
}


function toggleTheme() {
  const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  updateAllIcons(current);
  setTheme(current);
}

themeToggle.addEventListener('click', toggleTheme);

// Автоматически применяем системную тему при первом входе
(function () {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    updateAllIcons(savedTheme);
    setTheme(savedTheme);
  } else {
    updateAllIcons(prefersDark ? 'dark' : 'light');
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

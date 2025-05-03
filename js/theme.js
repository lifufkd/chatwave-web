const logo = document.getElementById('logo');
const logoMobile = document.getElementById('logo-mobile');
const themeLink = document.getElementById('theme-link');
const themeToggle = document.getElementById('toggle-theme');
const themeTogglerMobile = document.getElementById('toggle-theme-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

function setTheme(theme) {
  themeLink.href = theme === 'dark' ? '../styles/themes/dark.css' : '../styles/themes/light.css';
  logo.src = theme === 'dark' ? '../assests/logo-dark.svg' : '../assests/logo-light.svg';
  if (logoMobile) {
    logoMobile.src = theme === 'dark' ? '../assests/logo-dark.svg' : '../assests/logo-light.svg';
  }
  UpdateThemeTogglerIcon(themeIcon, theme);
  if (themeIconMobile) {
    UpdateThemeTogglerIcon(themeIconMobile, theme);
  }
  localStorage.setItem('theme', theme);
}

function UpdateThemeTogglerIcon(icon_obj, theme) {
  icon_obj.classList.remove("bi-sun-fill", "bi-moon-fill");

  if (theme === 'dark') {
    icon_obj.classList.add('bi-moon-fill');
  } else {
    icon_obj.classList.add('bi-sun-fill');
  }
}

function UpdateIconsColor(theme) {
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
  UpdateIconsColor(current);
  setTheme(current);
}

themeToggle.addEventListener('click', toggleTheme);
if (themeTogglerMobile) {
  themeTogglerMobile.addEventListener('click', toggleTheme);
}

// Автоматически применяем системную тему при первом входе
(function () {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    UpdateIconsColor(savedTheme);
    setTheme(savedTheme);
  } else {
    UpdateIconsColor(prefersDark ? 'dark' : 'light');
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

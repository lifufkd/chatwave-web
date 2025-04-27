export function getCookie(name) {
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map(c => c.split('='))
    );
    return cookies[name] || null;
  }

export function formatDate(isoString) {
    if (!isoString) return '—';
    const date = convertUTCDateToLocalDate(new Date(isoString));
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDateTime(isoString) {
    if (!isoString) return '—';
    const date = convertUTCDateToLocalDate(new Date(isoString));
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatChatDateTime(isoString) {
  if (!isoString) return '—';
  const date = convertUTCDateToLocalDate(new Date(isoString));

  const pad = (num) => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Месяцы с 0 начинаются
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}


export function removeExtension(filename) {
  return filename.split('.').slice(0, -1).join('.');
}


export function reloadImage(image_obj) {
  const currentSrc = image_obj.src.split('?')[0]; // убираем старые параметры если были
  image_obj.src = `${currentSrc}?t=${new Date().getTime()}`; // добавляем метку времени
}

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}
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
  if (!isoString) return '';
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

export function extractUserIds(groups) {
  const userIds = [];
  for (const group of groups) {
    if (group.members) {
      for (const member of group.members) {
        if (member.user_id !== undefined) {
          userIds.push(member.user_id);
        }
      }
    }
  }
  return userIds;
}

export function extractConversationsIds(conversations) {
  const conversationsIds = [];
  for (const conversation of conversations) {
    conversationsIds.push(conversation.id)
  }
  return conversationsIds;
}

export function filterFoundedUsers(users, forbiddenUserIds) {
  return users.filter(user => !forbiddenUserIds.includes(user.id));
}

export function getConversationById(id, conversations) {
  return conversations.find(convo => Number(convo.id) === Number(id)) || null;
}

export function getUserById(user_id, users) {
  const user = users.find(msg => msg.id === user_id);
  return user
}

export function getLastMessageByConversationId(conversationId, messages) {
  const message = messages.find(msg => msg.conversation_id === conversationId);
  return message
}
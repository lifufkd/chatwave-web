import { EmojiButton } from '@joeattardi/emoji-button';

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('emoji-button');
    const input = document.getElementById('chat-message-input');

    const picker = new EmojiButton({
      position: 'top-start',
      theme: 'light',
      zIndex: 1050, // выше Bootstrap modal
      autoHide: true,
      rootElement: document.querySelector('#chat-footer'),
    });

    picker.on('emoji', emoji => {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = input.value;
      input.value = text.slice(0, start) + emoji + text.slice(end);
      input.setSelectionRange(start + emoji.length, start + emoji.length);
      input.focus();
    });

    button.addEventListener('click', () => {
      console.log(2222);
      picker.togglePicker(button);
    });
  });
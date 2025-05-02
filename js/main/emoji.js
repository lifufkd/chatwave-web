const { createPopup } = window.picmoPopup;

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('emoji-button');
    const chat_container = document.getElementById('emoji-container');
    const input = document.getElementById('chat-message-input');

    const picker = createPopup({}, {
      referenceElement: button,
      triggerElement: button,
      position: 'top-start',
      theme: 'light'
    });
  
    button.addEventListener('click', () => {
      picker.toggle();
    });
  
    picker.addEventListener('emoji:select', (selection) => {
      input.value += selection.emoji;
    });
  });
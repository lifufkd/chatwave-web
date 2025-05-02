let touchStartX = 0;
let touchEndX = 0;
const edgeThreshold = 80;
const swipeThreshold = 50;

document.addEventListener('touchstart', function (e) {
    console.log(e.changedTouches);
    touchStartX = e.changedTouches[0].clientX;
  }, false);
  
document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
}, false);
  
function isAnyOffcanvasOpen() {
    return document.querySelector('.offcanvas.show') !== null;
}
  
function handleSwipeGesture() {
    console.log(1);
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < swipeThreshold) return;
    console.log(2);
    if (isAnyOffcanvasOpen()) return;
    console.log(swipeDistance);

    // Свайп вправо от левого края
    if (swipeDistance > 0 && touchStartX <= edgeThreshold) {
        console.log(4);
        const settingsOffcanvas = new bootstrap.Offcanvas(document.getElementById('settingsOffcanvas'));
        settingsOffcanvas.show();
    }

    // Свайп влево от правого края
    else if (swipeDistance < 0 && touchStartX >= window.innerWidth - edgeThreshold) {
        const dialogsOffcanvas = new bootstrap.Offcanvas(document.getElementById('dialogsOffcanvas'));
        dialogsOffcanvas.show();
    }
}
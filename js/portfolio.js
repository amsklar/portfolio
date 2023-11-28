
// Resources: https://stackoverflow.com/questions/9334084/moveable-draggable-div
// https://stackoverflow.com/questions/9334084/moveable-draggable-div
// https://javascript.info/mouse-drag-and-drop
// https://stackoverflow.com/questions/48169491/add-and-drag-new-item-by-click
// https://stackoverflow.com/questions/16999189/addeventlistener-mousemove-on-document-ready
// https://www.w3schools.com/howto/howto_css_modals.asp
// inspiration: https://www.sydneykleinrock.com/

const speedFactor = 0.7;

const draggables = document.querySelectorAll('.draggable');

let zIndexCounter = 1;

draggables.forEach((draggable) => {
  let posX = parseInt(draggable.style.left, 10) || 0;
  let posY = parseInt(draggable.style.top, 10) || 0;
  let zIndex = zIndexCounter++;

  draggable.addEventListener('mousedown', (e) => {
    e.preventDefault();

    draggable.style.zIndex = zIndexCounter++;

    let startX = e.clientX;
    let startY = e.clientY;

    const moveHandler = (e) => {
      const deltaX = (e.clientX - startX) * speedFactor;
      const deltaY = (e.clientY - startY) * speedFactor;

      posX += deltaX;
      posY += deltaY;

      posX = Math.max(0, Math.min(posX, containerWidth - draggable.width));
      posY = Math.max(0, Math.min(posY, containerHeight - draggable.height));

      draggable.style.left = `${posX}px`;
      draggable.style.top = `${posY}px`;

      startX = e.clientX;
      startY = e.clientY;
    };

    const upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  });

  draggable.addEventListener('click', () => {
    draggable.style.zIndex = zIndexCounter++;
  });

  draggable.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
      draggable.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
  }
});

const container = document.getElementById('container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;


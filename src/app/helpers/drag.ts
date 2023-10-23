const paddingFix = 12;

const getMousePositions = (event: MouseEvent | TouchEvent) => {
  const clientX =
    event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  const clientY =
    event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
  return { clientX, clientY };
};

export default function dragElement(elmnt: HTMLElement) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  elmnt.ontouchstart = dragMouseDown;

  function dragMouseDown(e: MouseEvent | TouchEvent) {
    e = e || window.event;
    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    const { clientX, clientY } = getMousePositions(e);

    pos3 = clientX;
    pos4 = clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e: MouseEvent | TouchEvent) {
    e = e || window.event;
    if (e instanceof MouseEvent) {
      e.preventDefault();
    } else {
      if ((e.target as HTMLElement).id === 'category-list') {
        return;
      }
    }

    const { clientX, clientY } = getMousePositions(e);

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;
    const newTop = elmnt.offsetTop - pos2;
    const newLeft = elmnt.offsetLeft - pos1;

    const normalizedTop = newTop < paddingFix ? paddingFix : newTop;
    const normalizedLeft = newLeft < paddingFix ? paddingFix : newLeft;

    elmnt.style.top = normalizedTop + 'px';
    elmnt.style.left = normalizedLeft + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchend = null;
  }
}

function checkPosition(childElement: HTMLElement) {
  const { top: childTop, left: childLeft } =
    childElement.getBoundingClientRect();
  if (childTop < paddingFix) childElement.style.top = paddingFix + 'px';
  if (childLeft < paddingFix) childElement.style.left = paddingFix + 'px';
}

export { checkPosition };

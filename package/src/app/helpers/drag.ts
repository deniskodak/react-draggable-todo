const paddingFix = 12;

export default function dragElement(elmnt: HTMLElement) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
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
  }
}

function checkPosition(childElement: HTMLElement) {
  const { top: childTop, left: childLeft } =
    childElement.getBoundingClientRect();
  if (childTop < paddingFix) childElement.style.top = paddingFix + 'px';
  if (childLeft < paddingFix) childElement.style.left = paddingFix + 'px';
}

export { checkPosition };

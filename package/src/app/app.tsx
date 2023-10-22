import { useEffect, useRef, useState } from 'react';
import {
  ArrowConfig,
  ExtendedCssProperties,
  ScrollDirection,
} from './app.interface';
import './app.scss';
import { Category } from './Components/Category';
import { Header } from './Components/Header';
import dragElement, { checkPosition } from './helpers/drag';
import useLongPress from './helpers/useLongPress';

const categoryHolderStyles: React.CSSProperties = {
  display: 'inline-block',
  cursor: 'move',
  position: 'absolute',
};

const SCROLL_UNIT = 10;
const INITIAL_ZOOM = 100;
const SCROLL_DELAY = 50;

const ARROW_DATA: ArrowConfig[] = [
  { label: '←', direction: ScrollDirection.Left },
  { label: '↑', direction: ScrollDirection.Up },
  { label: '→', direction: ScrollDirection.Right },
  { label: '↓', direction: ScrollDirection.Down },
];

export default function App() {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const listRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const arrowHandlers = useLongPress(
    {
      onLongPress: scrollElement,
      onClick: scrollElement,
    },
    { delay: SCROLL_DELAY }
  );

  useEffect(() => {
    if (!categoryRef.current || !listRef.current) return;
    dragElement(categoryRef.current);
    (listRef.current.style as ExtendedCssProperties).zoom = `${zoom}%`;
    checkPosition(categoryRef.current);
  }, [zoom]);

  function scrollElement(
    event: React.MouseEvent<unknown, MouseEvent> | React.TouchEvent<unknown>
  ) {
    const arrowElement = event.target as HTMLElement;
    const direction = arrowElement.id as ScrollDirection;
    const element = listRef.current;
    if (!element) return;

    switch (direction) {
      case ScrollDirection.Right:
        element.scrollLeft += SCROLL_UNIT;
        break;
      case ScrollDirection.Left:
        element.scrollLeft -= SCROLL_UNIT;
        break;
      case ScrollDirection.Down:
        element.scrollTop += SCROLL_UNIT;
        break;
      case ScrollDirection.Up:
        element.scrollTop -= SCROLL_UNIT;
        break;
    }
  }

  return (
    <div className="App">
      <Header zoom={zoom} updateZoom={setZoom} />
      {ARROW_DATA.map((config: ArrowConfig) => (
        <span
          className={'scroll-arrow ' + config.direction}
          id={config.direction}
          {...arrowHandlers}
        >
          {config.label}
        </span>
      ))}
      <div id="category-list" ref={listRef}>
        <div ref={categoryRef} style={categoryHolderStyles}>
          <Category isRoot />
        </div>
      </div>
    </div>
  );
}

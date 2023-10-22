export interface ArrowConfig {
  label: string;
  direction: ScrollDirection;
}

export enum ScrollDirection {
  Left = 'left',
  Down = 'down',
  Up = 'up',
  Right = 'right',
}

export type ExtendedCssProperties = CSSStyleDeclaration & { zoom: string }
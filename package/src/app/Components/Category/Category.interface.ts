export interface CategoryEntity {
  id: number;
}

export interface CategoryProps {
  isRoot?: boolean;
  onDelete?: () => void;
  leftDivider?: boolean;
  rightDivider?: boolean;
  midDivider?: boolean;
}

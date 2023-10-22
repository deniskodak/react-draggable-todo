import {HeaderProps} from './Header.interface';

const ZOOM_STEP = 10;

const Header = ({ zoom = 0, updateZoom }: HeaderProps) => {
  const handleChangeZoom = (step: number) => updateZoom((curZoom) => curZoom + step);

  return (
    <div className="header">
      <h1 className="header-title">Services</h1>
      <div className="header-actions">
        <button onClick={() => handleChangeZoom(-ZOOM_STEP)}>-</button>
        <span>{zoom}%</span>
        <button onClick={() => handleChangeZoom(ZOOM_STEP)}>+</button>
      </div>
    </div>
  );
};

export { Header };
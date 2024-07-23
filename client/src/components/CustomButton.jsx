import './CustomButton.scss';
import { noop } from '@/utils/is';

function CustomButton({
  children,
  style = {},
  color = 'primary',
  disabled = false,
  onClick = noop
}) {
  return (
    <button
      className={`custom-button ${color}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export default CustomButton;

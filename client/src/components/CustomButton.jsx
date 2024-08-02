import './CustomButton.scss';

import { noop } from '@/utils/is';
import { defaultProps } from './defaultProps.js';

function CustomButton(props) {
  const {
    children,
    color = 'primary',
    disabled = false,
    onClick = noop,
    className,
    style
  } = { ...defaultProps, ...props };

  return (
    <button
      className={`custom-button ${color}${className ? ` ${className}` : ''}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CustomButton;

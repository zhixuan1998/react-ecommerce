import './CustomSeparator.scss';

import { defaultProps } from './defaultProps';

function CustomSeparator(props) {
  const { fully = false, text = '', className, style } = { ...defaultProps, ...props };

  return (
    <div
      className={`separator${fully ? ' fully' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, marginBottom: text ? '-18px' : 0 }}
    >
      <div className="left"></div>
      {text && <div className="text">{text}</div>}
      <div className="right"></div>
    </div>
  );
}

export default CustomSeparator;

import './CustomErrorMessage.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { defaultProps } from './defaultProps';

function CustomErrorMessage(props) {
  const { isIconVisible = false, message = '', className, style } = { ...defaultProps, ...props };
  return (
    <div className={`error-message-item${className ? ` ${className}` : ''}`} style={style}>
      {isIconVisible && <FontAwesomeIcon className="icon" icon={faTriangleExclamation} />}
      <span className="message">{message}</span>
    </div>
  );
}

export default CustomErrorMessage;

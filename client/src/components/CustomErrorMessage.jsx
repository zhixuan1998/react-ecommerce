import './CustomErrorMessage.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function CustomErrorMessage({ isIconVisible = false, message = '' }) {
  return (
    <div className="error-message-item">
      {isIconVisible && <FontAwesomeIcon className="icon" icon={faTriangleExclamation} />}
      <span className="message">{message}</span>
    </div>
  );
}

export default CustomErrorMessage;

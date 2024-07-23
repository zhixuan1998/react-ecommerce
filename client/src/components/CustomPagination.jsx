import './CustomPagination.scss';

import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';

import { noop } from '@/utils/is';

const PAGE_MOVEMENT = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
  START: 'start',
  END: 'end'
};

const rest = '...';

function CustomPagination({
  currentPage,
  setCurrentPage = noop,
  totalPages = 1,
  beforeUpdate,
  disabled = false
}) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    const newCurrrentPage = currentPage < totalPages && currentPage > 0 ? currentPage : 1;
    setCurrentPage(newCurrrentPage);
  }

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const isFirstThree = currentPage <= 3;
  const isLastThree = totalPages - currentPage < 3;
  const noRest = totalPages <= 5;

  const dynamicButtons = (function () {
    if (noRest) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (isFirstThree && !isLastThree) {
      return [1, 2, 3, 4, rest];
    }

    if (!isFirstThree && isLastThree) {
      return [rest, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [rest, currentPage - 1, currentPage, currentPage + 1, rest];
  })();

  function getNewPage(action) {
    switch (action) {
      case PAGE_MOVEMENT.FORWARD:
        return currentPage + 1;
      case PAGE_MOVEMENT.BACKWARD:
        return currentPage - 1;
      case PAGE_MOVEMENT.START:
        return 1;
      case PAGE_MOVEMENT.END:
        return totalPages;
      default:
        return currentPage;
    }
  }

  async function beforeMove(arg) {
    const page = typeof arg === 'number' ? arg : getNewPage(arg);

    if (page === currentPage) {
      return;
    }

    if (typeof beforeUpdate === 'function') {
      await beforeUpdate(page);
    }

    setCurrentPage(page);
  }

  return (
    <div className={`pagination-indicator-container ${disabled ? 'disabled' : ''}`}>
      <span
        className={`indicator-button ${isFirstThree || noRest ? 'disabled' : ''}`}
        onClick={beforeMove(PAGE_MOVEMENT.START)}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </span>
      <span
        className={`indicator-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={beforeMove(PAGE_MOVEMENT.BACKWARD)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </span>

      {dynamicButtons.map((item, i) => (
        <span
          className={`indicator-button ${item === currentPage ? 'active' : ''} ${
            item === rest ? 'rest' : ''
          }`}
          key={i}
          onClick={beforeMove(item)}
        >
          {item}
        </span>
      ))}

      <span
        className={`indicator-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={beforeMove(PAGE_MOVEMENT.FORWARD)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span
        className={`indicator-button ${isLastThree || noRest ? 'disabled' : ''}`}
        onClick={beforeMove(PAGE_MOVEMENT.END)}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </span>
    </div>
  );
}

export default CustomPagination;

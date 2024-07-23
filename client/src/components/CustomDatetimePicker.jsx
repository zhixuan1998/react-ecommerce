import { useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';

import { noop } from '@/utils/is';

function CustomDatetimePicker({ onValueChange = noop, position = 'auto center', ...pickerConfig }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const config = {
      ...pickerConfig,
      position,
      onChange: (dates, dateStr) =>  onValueChange(dateStr)
    };

    flatpickr(inputRef.current, config);
  }, []);

  return <input ref={inputRef} />;
}

export default CustomDatetimePicker;

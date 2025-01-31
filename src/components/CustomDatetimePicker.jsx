import { useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import { noop } from '@/utils/is';
import { defaultProps } from './defaultProps';

function CustomDatetimePicker(props) {
  const {
    onValueChange = noop,
    position = 'auto center',
    className,
    style,
    ...pickerConfig
  } = { ...defaultProps, ...props };

  const inputRef = useRef(null);

  useEffect(() => {
    const config = {
      ...pickerConfig,
      position,
      onChange: (dates, dateStr) => onValueChange(dateStr)
    };

    flatpickr(inputRef.current, config);
  }, []);

  return <input className={className} style={style} ref={inputRef} />;
}

export default CustomDatetimePicker;

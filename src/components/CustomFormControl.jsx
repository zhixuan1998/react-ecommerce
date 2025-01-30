import './CustomFormControl.scss';
import 'flatpickr/dist/flatpickr.min.css';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { defaultProps } from './defaultProps.js';
import { noop } from '@/utils/is';

import CustomDropdown from './CustomDropdown.jsx';
import CustomDatetimePicker from './CustomDatetimePicker.jsx';

const defaultType = 'text';
const validTypes = [defaultType, 'password', 'number', 'calendar'];

function CustomFormControl(props) {
  const {
    children,
    inputValue,
    setInputValue = noop,
    prependValue,
    setPrependValue = noop,
    actualType = defaultType,
    label = 'Label',
    maxLength = 255,
    prependDropdown = null,
    options = [],
    verticalLayout = false,
    readonly = false,
    className,
    style
  } = { ...defaultProps, ...props };

  const isPassword = useRef(actualType === 'password');
  const isCalendar = useRef(actualType === 'calendar');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validatedActualType = useRef(validTypes.includes(actualType) ? actualType : defaultType);
  const currentType = isPassword.current ? (isPasswordVisible ? 'text' : 'password') : validatedActualType.current;

  function renderInputMainField() {
    if (isCalendar.current === true) {
      return (
        <CustomDatetimePicker
          defaultDate={inputValue}
          onValueChange={setInputValue}
          maxDate={new Date()}
        />
      );
    }

    return (
      <input
        value={inputValue}
        type={currentType}
        maxLength={maxLength}
        readOnly={readonly}
        onInput={(e) => setInputValue(e.target.value)}
      />
    );
  }

  return (
    <div className={`input-container${className ? ` ${className}` : ''}`} style={style}>
      <div className={`main ${verticalLayout ? 'vertical-layout' : ''}`}>
        <label className="label">{label}</label>
        <div className="input-wrapper">
          {prependDropdown && (
            <CustomDropdown
              displayField={prependDropdown.displayField}
              hideDropdownIcon
              relativeParentClass="input-wrapper"
              menu={{
                selectedItem: prependValue,
                setSelectedItem: setPrependValue,
                options,
                keyField: prependDropdown.keyField,
                valueField: prependDropdown.valueField,
                searchable: true
              }}
            />
          )}
          <div className="input-field">
            {renderInputMainField()}
            {isPassword.current && (
              <div className="password-toggler">
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  onClick={() => setIsPasswordVisible((state) => !state)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default CustomFormControl;

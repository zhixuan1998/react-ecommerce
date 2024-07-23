import './CustomFormControl.scss';
import 'flatpickr/dist/flatpickr.min.css';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { noop } from '@/utils/is';

import CustomDropdown from './CustomDropdown.jsx';
import CustomDatetimePicker from './CustomDatetimePicker.jsx';

const defaultType = 'text';
const validTypes = [defaultType, 'password', 'number', 'calendar'];

function CustomFormControl({
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
  searchable = false,
  verticalLayout = false,
  readonly = false,
  className
}) {
  const isPassword = actualType === 'password';
  const isCalendar = actualType === 'calendar';

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const currentType = useRef(validTypes.includes(actualType) ? actualType : defaultType);
  function togglePassword() {
    const newIsPasswordVisible = !isPasswordVisible;
    currentType.current = newIsPasswordVisible ? 'text' : 'password';
    setIsPasswordVisible(newIsPasswordVisible);
  }

  function renderInputMainField() {
    if (isCalendar === true) {
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
        type={currentType.current}
        maxLength={maxLength}
        readOnly={readonly}
        onInput={(e) => setInputValue(e.target.value)}
      />
    );
  }

  return (
    <div className={`input-container ${className ?? ''}`}>
      <div className={`main ${verticalLayout ? 'vertical-layout' : ''}`}>
        <label className="label">{label}</label>
        <div className="input-wrapper">
          {prependDropdown && (
            <CustomDropdown
              displayField={prependDropdown.displayField}
              hideDropdownIcon
              relativeParentClass="input-wrapper"
              menu={{
                visible: isPasswordVisible,
                setVisible: setIsPasswordVisible,
                selectedItem: prependValue,
                setSelectedItem: setPrependValue,
                options,
                keyField: prependDropdown.keyField,
                valueField: prependDropdown.valueField,
                searchable
              }}
            />
          )}
          <div className="input-field">
            {renderInputMainField()}
            {isPassword && (
              <div className="password-toggler">
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  onClick={togglePassword}
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

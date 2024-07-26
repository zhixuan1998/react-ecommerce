import './CustomDropdown.scss';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { noop } from '@/utils/is';
import { defaultMenuProps } from './defaultProps';
import { useClickOutside } from '@/hooks';

import CustomMenu from './CustomMenu.jsx';

function CustomDropdown({
  displayField = 'value',
  menuOnHover = false,
  hideDropdownIcon = false,
  relativeParentClass = 'custom-dropdown',
  menu = defaultMenuProps
}) {
  const dropdownRef = useRef(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useClickOutside(dropdownRef.current, hideDropdown);

  useEffect(() => {
    setRelativeElPosition();
  }, []);

  function openDropdown() {
    setIsDropdownVisible(true);
  }

  function hideDropdown() {
    setIsDropdownVisible(false);
  }

  function toggleDropdown() {
    setIsDropdownVisible((state) => !state);
  }

  const selectedOption = menu.options.find(
    (o) => o[menu.keyField ?? defaultMenuProps.keyField] == menu.selectedItem
  );

  const displayValue = selectedOption ? getDisplayField() : null;

  function getDisplayField() {
    return typeof displayField === 'function'
      ? displayField(selectedOption)
      : selectedOption[displayField];
  }

  function setRelativeElPosition() {
    const el =
      document.querySelector(`.${relativeParentClass}:has( .custom-dropdown)`) ??
      dropdownRef.current;
    el.style.position = 'relative';
  }

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className="dropdown-container"
        onClick={menu.searchable ? openDropdown : toggleDropdown}
        onMouseEnter={menuOnHover ? openDropdown : noop}
      >
        <button className="dropdown-opener">
          <div>{displayValue}</div>
          {!hideDropdownIcon && (
            <FontAwesomeIcon icon={isDropdownVisible ? faAngleUp : faAngleDown} />
          )}
        </button>
      </div>

      <CustomMenu {...menu} visible={isDropdownVisible} setVisible={setIsDropdownVisible} />
    </div>
  );
}

export default CustomDropdown;

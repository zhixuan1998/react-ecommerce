import './CustomDropdown.scss';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { defaultMenuProps } from './defaultProps.js';
import { intersectProps, omitProps } from './utils/props.js';
import { useClickOutside } from '@/hooks';

import CustomMenu from './CustomMenu.jsx';

function CustomDropdown({
  displayField = 'value',
  menuOnHover = false,
  hideDropdownIcon = false,
  relativeParentClass = 'custom-dropdown',
  menu: menuProps = defaultMenuProps
}) {
  const menu = intersectProps(
    { ...menuProps, animation: true },
    omitProps(defaultMenuProps, ['visible', 'setVisible'])
  );

  const dropdownEl = useRef(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useClickOutside(dropdownEl.current, hideDropdown);

  useEffect(() => {
    setRelativeElPosition();
  }, []);

  function openDropdown() {
    console.log('open');
    setIsDropdownVisible(true);
  }

  function hideDropdown() {
    setIsDropdownVisible(false);
  }

  function toggleDropdown() {
    console.log('toogle');
    setIsDropdownVisible((state) => !state);
  }

  const selectedOption = menu.options.find((o) => o[menu.keyField] == menu.selectedItem);

  const displayValue = selectedOption ? getDisplayField() : null;

  function getDisplayField() {
    return typeof displayField === 'function'
      ? displayField(selectedOption)
      : selectedOption[displayField];
  }

  function setRelativeElPosition() {
    const el =
      document.querySelector(`.${relativeParentClass}:has( .custom-dropdown)`) ??
      dropdownEl.current;
    el.style.position = 'relative';
  }

  return (
    <div className="custom-dropdown" ref={dropdownEl}>
      <div
        className="dropdown-container"
        onClick={menu.searchable ? openDropdown : toggleDropdown}
        onMouseEnter={menuOnHover ? openDropdown : () => {}}
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

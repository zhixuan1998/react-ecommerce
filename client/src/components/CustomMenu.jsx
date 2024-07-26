import './CustomMenu.scss';

import { useState, useEffect } from 'react';
import { defaultMenuProps } from './defaultProps.js';

function CustomMenu(props) {
  const { children, ...menuProps } = props;

  const {
    visible,
    setVisible,
    selectedItem,
    setSelectedItem,
    options,
    keyField,
    valueField,
    searchable,
    menuHeight,
    animation
  } = { ...defaultMenuProps, ...menuProps };

  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = options.filter((o) => {
    const escapedInputValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') ?? '';
    const regex = new RegExp(`.*${escapedInputValue}.*`, 'i');
    const value = typeof valueField === 'function' ? valueField(o) : o[valueField];
    return regex.test(value);
  });

  useEffect(() => {
    if (visible === false) {
      setTimeout(() => setSearchValue(''), 150);
    }
  }, [visible]);

  async function selectItem(item) {
    setSelectedItem(await item[keyField]);
    setVisible(false);
    await item.fn?.();
  }

  // JSX
  function renderMenu() {
    return (
      <>
        {searchable && (
          <span className="menu-item">
            <input
              value={searchValue}
              readOnly={!searchable}
              onInput={(e) => setSearchValue(e.target.value)}
            />
          </span>
        )}
        {renderOptions()}
      </>
    );
  }

  function renderOptions() {
    if (!filteredOptions.length) {
      return <span className="menu-item text-center"> No options </span>;
    }

    return filteredOptions.map((item, index) => (
      <span
        className={`menu-item ${selectedItem === item[keyField] ? 'selected' : ''}`}
        key={index}
        onMouseDown={() => selectItem(item)}
      >
        {typeof valueField === 'function' ? valueField(item) ?? item[valueField] : item[valueField]}
      </span>
    ));
  }

  return (
    <div
      className={`menu-container custom-menu ${animation ? 'animation' : ''} ${
        visible ? 'open' : ''
      }`}
      style={{ maxHeight: menuHeight }}
    >
      {children}
      <div className="menu-content">{renderMenu()}</div>
    </div>
  );
}

export default CustomMenu;

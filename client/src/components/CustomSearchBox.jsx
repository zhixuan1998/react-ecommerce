import './CustomSearchBox.scss';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { noop } from '@/utils/is';

import CustomDropdown from './CustomDropdown.jsx';

function CustomSearchBox({
  searchOptions = [],
  searchDropdown,
  onSearch = noop,
  placeholder = 'Search',
  readonly = false,
  width = '100%'
}) {
  const [inputValue, setInputValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [searchParams] = useSearchParams();

  let previousInputValue = '';
  let previousDropdownValue = '';

  useEffect(() => {
    initDropdownValue();
  }, [searchOptions]);

  useEffect(() => {
    initInputValue();
  }, [searchParams.get('search')]);

  function search() {
    const notFunction = typeof onSearch !== 'function';
    const noInputValue = inputValue.length === 0;
    const noValueChange =
      inputValue === previousInputValue && dropdownValue === previousDropdownValue;

    if (notFunction || noInputValue || noValueChange) {
      return;
    }

    onSearch(inputValue, dropdownValue);
    previousInputValue = inputValue;
    previousDropdownValue = dropdownValue;
  }

  function initInputValue() {
    setInputValue(decodeURI(searchParams.get('search') ?? ''));
  }

  function initDropdownValue() {
    if (!searchOptions.length) return setDropdownValue('');

    const newDropdownValue = searchDropdown?.keyField
      ? searchOptions[0][searchDropdown.keyField]
      : searchOptions[0].key;

    setDropdownValue(newDropdownValue);
  }

  useEffect(() => {
    initDropdownValue();
  }, [searchOptions]);

  return (
    <div className="search_box-container" style={{ width }}>
      <input
        className="input"
        value={inputValue}
        readOnly={readonly}
        placeholder={placeholder}
        onKeyUp={(e) => {
          if (e.keyCode === 13) search();
        }}
        onInput={(e) => setInputValue(e.target.value)}
      />
      {!!searchOptions.length && (
        <CustomDropdown
          menu={{
            selectedItem: dropdownValue,
            setSelectedItem: setDropdownValue,
            options: searchOptions,
          }}
        />
      )}
      <div className="icon-wrapper" onClick={search}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}

export default CustomSearchBox;

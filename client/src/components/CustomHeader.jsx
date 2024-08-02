import './CustomHeader.scss';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { defaultProps } from './defaultProps.js';

import IconLogo from './icons/IconLogo.jsx';
import CustomPopover from './CustomPopover.jsx';
import CustomSearchBox from './CustomSearchBox.jsx';

function CustomHeader(props) {
  const {
    children,
    searchBox = false,
    onSearch,
    hasMenu = true,
    searchOptions = [],
    className,
    style
  } = { ...defaultProps, ...props };

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const popoverOptions = [
    {
      key: 'purchase',
      value: 'My purchase',
      fn: () => navigate('/login')
    },
    {
      key: 'purchase',
      value: 'My purchase',
      fn: () => navigate('/login')
    }
  ];

  function openPopover() {
    setIsPopoverVisible(true);
  }

  function closePopover() {
    setIsPopoverVisible(false);
  }

  const renderMenuItems = user ? (
    <>
      <div className="item" onMouseOver={openPopover} onMouseOut={closePopover}>
        <Link to="/user/purchase">
          {user.lastName} {user.firstName}
        </Link>
        <CustomPopover menu={{ options: popoverOptions }} open={isPopoverVisible} />
      </div>

      <div className="item item-cart">
        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
        <span className="item-cart-count">100</span>
      </div>
    </>
  ) : (
    <>
      <div className="item">
        <Link to="/login">LOGIN</Link>
      </div>

      <div className="item">
        <Link to="/signup">SIGNUP</Link>
      </div>
    </>
  );

  return (
    <header
      className={`header-container${searchBox ? ' search_box-enabled' : ''}${
        className ? `${className}` : ''
      }`}
      style={style}
    >
      <div className="logo-container">
        <IconLogo onClick={() => navigate('/home')} />
        {children && <div className="right-content">{children}</div>}
      </div>
      {searchBox && <CustomSearchBox searchOptions={searchOptions} onSearch={onSearch} />}
      {hasMenu && <div className="menu-container me-2">{renderMenuItems}</div>}
    </header>
  );
}

export default CustomHeader;

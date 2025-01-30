import './CustomHeader.scss';

import { useState, useContext } from 'react';
import { RepositoryContext } from '@/utils/context';
import userSlice from '@/features/Auth/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { defaultProps } from './defaultProps.js';

import IconLogo from './icons/IconLogo.jsx';
import CustomPopover from './CustomPopover.jsx';
import CustomSearchBox from './CustomSearchBox.jsx';

function MenuItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const $repositories = useContext(RepositoryContext);

  const user = useSelector((state) => state.user);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const popoverOptions = [
    // {
    //   key: 'purchase',
    //   value: 'My purchase',
    //   fn: () => navigate('/login')
    // },
    {
      key: 'logout',
      value: 'Logout',
      fn: handleLogout
    }
  ];

  function openPopover() {
    setIsPopoverVisible(true);
  }

  function closePopover() {
    setIsPopoverVisible(false);
  }

  async function handleLogout() {
    await $repositories.userRepository.logout();
    localStorage.removeItem('accessToken');
    dispatch(userSlice.reset());
    navigate('/login');
  }

  return (
    <div className="menu-container me-2">
      {user ? (
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
      )}
    </div>
  );
}

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
      {hasMenu && <MenuItems />}
    </header>
  );
}

export default CustomHeader;

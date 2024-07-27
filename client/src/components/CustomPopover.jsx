import './CustomPopover.scss';

import { useEffect } from 'react';

import { defaultMenuProps } from './defaultProps.js';
import { intersectProps } from './utils/props.js';

import CustomMenu from './CustomMenu.jsx';

function CustomPopover({
  // displayField = 'value',
  open = false,
  relativeParentClass,
  direction = 'bottom',
  menu: menuProps = defaultMenuProps
}) {
  const popoverId = `popover-${new Date().getTime()}`;

  const menu = intersectProps({ ...menuProps, visible: true }, defaultMenuProps);

  useEffect(() => {
    setRelativeElPosition();
  }, []);

  function setRelativeElPosition() {
    const el = relativeParentClass
      ? document.querySelector(
          `.${relativeParentClass}:has( .popover-container[popover-id="${popoverId}"])`
        )
      : document.querySelector(`*:has(> .popover-container[popover-id="${popoverId}"])`);

    if (el) {
      el.style.position = 'relative';
    }
  }

  return (
    <div
      className={`popover-container popover-${direction} ${open ? 'd-block' : 'd-none'}`}
      popover-id={popoverId}
    >
      <CustomMenu {...menu} />
    </div>
  );
}

export default CustomPopover;

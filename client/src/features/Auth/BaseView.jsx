import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CustomHeader } from '@/components';

function BaseView() {
  const [title, setTitle] = useState('');

  return (
    <>
      <CustomHeader>{!!title && title}</CustomHeader>
      <Outlet context={{ setTitle }} />
    </>
  );
}

export default BaseView;

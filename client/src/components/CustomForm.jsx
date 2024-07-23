import './CustomForm.scss';

import { useMediaQuery } from '@/hooks';

import CustomSeparator from './CustomSeparator.jsx';

function CustomForm({ children, header, maxWidth = '550px', className }) {
  const [isMobile] = useMediaQuery([{ maxWidth }]);

  return (
    <div
      className={`container form-container ${isMobile ? 'rounded-0' : 'my-auto'} ${className ?? ''}`}
      style={{ maxWidth }}
    >
      {header && (
        <>
          <div className="top-section">
            <div className="title">{header.title}</div>
            <div className="description">{header.description}</div>
          </div>
          <CustomSeparator />
        </>
      )}
      <div className="body-section">{children}</div>
    </div>
  );
}

export default CustomForm;

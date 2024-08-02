import './CustomForm.scss';

import { useMediaQuery } from '@/hooks';
import { defaultProps } from './defaultProps.js';

import CustomSeparator from './CustomSeparator.jsx';

function CustomForm(props) {
  const { children, header, maxWidth = '550px', className, style } = { ...defaultProps, ...props };

  const [isMobile] = useMediaQuery([{ maxWidth }]);

  return (
    <div
      className={`container form-container ${isMobile ? 'rounded-0' : 'my-auto'}${
        className ? ` ${className}` : ''
      }`}
      style={{ ...style, maxWidth }}
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

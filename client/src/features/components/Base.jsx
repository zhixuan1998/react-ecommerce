import { CustomHeader } from '@/components';

function BaseView({ children, title, header = {} }) {
  return (
    <>
      <CustomHeader {...header}>{!!title && title}</CustomHeader>
      {children}
    </>
  );
}

export default BaseView;

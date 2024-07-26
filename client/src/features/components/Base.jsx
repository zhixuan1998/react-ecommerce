import { useSearchParams } from 'react-router-dom';
import { CustomHeader, CustomFooter } from '@/components';

function BaseView({ children, title, header = {} }) {
  const [, setSearchParams] = useSearchParams();

  function handleSearch(value, option) {
    if (typeof header.onSearch === 'function') {
      header.onSearch(value, option);
    }

    setSearchParams({ search: value });
  }

  return (
    <>
      <CustomHeader {...header} onSearch={handleSearch}>
        {!!title && title}
      </CustomHeader>
      <div className="main-content">{children}</div>
      <CustomFooter />
    </>
  );
}

export default BaseView;

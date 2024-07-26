import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';

import Base from '../components/Base';
import ProductListing from './components/ProductListing';

function Component() {
  const { brandId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const searchArea = useRef(null);
  const [, setBrand] = useState(null);
  const [searchAreaOptions, setSearchAreaOptions] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const [searchAreasResult, brandsResult] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.brandRepository.getAll({ brandIds: [brandId] })
    ]);

    setSearchAreaOptions(searchAreasResult.filter((o) => o.key !== 'category'));
    setBrand(brandsResult?.data?.data?.results?.[0] ?? null);
  }

  return (
    <Base
      header={{
        searchBox: true,
        searchOptions: searchAreaOptions,
        onSearch: (value, option) => (searchArea.current = option)
      }}
    >
      <ProductListing searchArea={searchArea.current} />
    </Base>
  );
}

export { Component };

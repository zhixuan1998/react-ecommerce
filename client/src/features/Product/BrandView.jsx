import './product.scss';

import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';

import Base from '../components/Base';
import ProductListing from './components/ProductListing';
import BrandSummary from './components/BrandSummary';

function Component() {
  const { brandId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const searchArea = useRef(null);
  const [brand, setBrand] = useState(null);
  const [searchAreaOptions, setSearchAreaOptions] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const [[, searchAreasResult], [, brandsResult]] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.brandRepository.getAll({ brandIds: [brandId] })
    ]);

    setSearchAreaOptions(searchAreasResult.filter((o) => o.key !== 'category'));

    const brand = brandsResult?.data?.data?.results.find((r) => r.brandId === brandId) ?? null;
    setBrand(brand);
  }

  return (
    <Base
      header={{
        searchBox: true,
        searchOptions: searchAreaOptions,
        onSearch: (value, option) => (searchArea.current = option)
      }}
    >
      {brand && <BrandSummary brand={brand} />}
      <ProductListing searchArea={searchArea.current} />
    </Base>
  );
}

export { Component };

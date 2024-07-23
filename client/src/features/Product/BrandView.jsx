import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';

import ProductListing from './components/ProductListing';

function BrandView() {
  const { brandId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const [, setBrand] = useState(null);
  const [searchAreaOptions, setSearchAreaOptions] = useState([]);

  useEffect(async () => {
    const [searchAreasResult, brandsResult] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.brandRepository.getAll({ brandIds: [brandId] })
    ]);

    setSearchAreaOptions(searchAreasResult.filter((o) => o.key !== 'category'));
    setBrand(brandsResult?.data?.data?.results?.[0] ?? null);
  }, []);

  return (
    <ProductListing searchAreaOptions={searchAreaOptions} />
  )
}

export default BrandView;

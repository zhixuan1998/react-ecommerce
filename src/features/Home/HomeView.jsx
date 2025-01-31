import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';
import messages from '@/models/businessMessages';

import Base from '../components/Base';
import ProductListing from '../Product/components/ProductListing';
import { CustomMiniItemCarousel } from '@/components';

function Component() {
  const navigate = useNavigate();
  const $repositories = useContext(RepositoryContext);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const [{ data: categoriesData }, { data: brandsData }] = await Promise.all([
      $repositories.categoryRepository.getAll({}),
      $repositories.brandRepository.getAll({})
    ]);

    setCategories(categoriesData?.results ?? []);
    setBrands(brandsData?.results ?? []);
  }

  function goToCategory(item) {
    navigate(`/categories/${item.categoryId}`);
  }

  function goToBrand(item) {
    navigate(`/brands/${item.brandId}`);
  }

  return (
    <Base header={{ searchBox: true }}>
      {!!categories.length && (
        <div className="carousel-section">
          <div className="section-title">{messages.title.categories()}</div>
          <CustomMiniItemCarousel
            items={categories}
            labelField="name"
            onSelectItem={goToCategory}
          />
        </div>
      )}
      {!!brands.length && (
        <div className="carousel-section">
          <div className="section-title">{messages.title.brands()}</div>
          <CustomMiniItemCarousel items={brands} labelField="name" onSelectItem={goToBrand} />
        </div>
      )}
      <ProductListing />
    </Base>
  );
}

export { Component };

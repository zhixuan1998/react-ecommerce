import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';
import messages from '@/models/businessMessages';

import Base from '../components/Base';
import ProductListing from './components/ProductListing';
import { CustomMiniItemCarousel } from '@/components';

function Component() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchAreaOptions, setSearchAreaOptions] = useState([]);

  useEffect(async () => {
    const [searchAreasResult, categoriesResult] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.categoryRepository.getAll({})
    ]);

    setSearchAreaOptions(searchAreasResult.filter((o) => o.key !== 'brand'));
    setCategories(categoriesResult?.data?.data?.results ?? []);

    setCategory(categories.value.find((o) => o.categoryId === categoryId) ?? null);
  }, []);

  useEffect(() => {
    setCategory(categories.value.find((o) => o.categoryId === categoryId) ?? null);
  }, [categoryId]);

  function goToCategory(item) {
    navigate(`/categories/${item.categoryId}`);
  }

  return (
    <Base header={{ searchBox: true, searchAreaOptions }}>
      <ProductListing>
        {categories && (
          <>
            <div className="carousel-section">
              <div className="section-title">
                {messages.title.categories()} - {category?.name ?? ''}
              </div>
            </div>
            <CustomMiniItemCarousel
              items={categories}
              labelField="name"
              onSelectItem={goToCategory}
            />
          </>
        )}
      </ProductListing>
    </Base>
  );
}

export { Component };

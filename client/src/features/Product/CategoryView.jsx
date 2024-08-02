import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';
import messages from '@/models/businessMessages';

import Base from '../components/Base';
import ProductListing from './components/ProductListing';
import { CustomMiniItemCarousel } from '@/components';

function Component() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const searchArea = useRef(null);
  const [categories, setCategories] = useState([]);
  const [searchAreaOptions, setSearchAreaOptions] = useState([]);

  const category = categories.find((o) => o.categoryId === categoryId) ?? null;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const [[, searchAreasResult], [, categoriesResult]] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.categoryRepository.getAll({})
    ]);

    setSearchAreaOptions(searchAreasResult.filter((o) => o.key !== 'brand'));
    setCategories(categoriesResult?.data?.data?.results ?? []);
  }

  function goToCategory(item) {
    navigate(`/categories/${item.categoryId}`);
  }

  return (
    <Base
      header={{
        searchBox: true,
        searchOptions: searchAreaOptions,
        onSearch: (value, option) => (searchArea.current = option)
      }}
    >
      {categories && (
        <div className="carousel-section">
          <div className="section-title">
            <Link to={`/categories/${categoryId}`} className="section-title">
              {messages.title.categories()} - {category?.name ?? ''}
            </Link>
          </div>
          <CustomMiniItemCarousel
            items={categories}
            labelField="name"
            onSelectItem={goToCategory}
          />
        </div>
      )}
      <ProductListing searchArea={searchArea.current} />
    </Base>
  );
}

export { Component };

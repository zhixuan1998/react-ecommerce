import '../product.scss';

import { useEffect, useContext, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { RepositoryContext } from '@/utils/context';

import {
  CustomPagination,
  CustomSeparator,
  CustomListingSection,
  CustomDropdown
} from '@/components';

const FALLBACK_IMAGE_URL = 'https://picsum.photos/200';
const initPage = 1;

function ProductListing({ searchArea }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { brandId, categoryId } = useParams();
  const $repositories = useContext(RepositoryContext);

  const pagination = useRef(null);
  const perPageOptions = useRef([]);
  const currentPage = useRef(initPage);
  const [perPage, setPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = searchParams.get('search');

  const previousDeps = useRef({ search, brandId, categoryId, perPage });

  const totalPages = pagination.current?.totalItems
    ? Math.ceil(pagination.current.totalItems / perPage)
    : 0;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const result = await $repositories.lookupRepository.getRecordPerPageOptions();
    perPageOptions.current = result;
  }

  useEffect(() => {
    beforeGetProducts();
  }, [search, brandId, categoryId, perPage]);

  async function beforeGetProducts() {
    const old = previousDeps.current;
    const isSearch =
      old.brandId === brandId && old.categoryId === categoryId && old.perPage === perPage;
    const notSearchFromHomepage = !!(brandId || categoryId);

    previousDeps.current = { search, brandId, categoryId, perPage };

    if (isSearch && notSearchFromHomepage && searchArea === 'all') {
      return navigate(`/home?search=${search}`);
    }

    getProducts();
  }

  async function getProducts() {
    const filter = getProductFilter(...arguments);

    setIsLoading(true);

    const response = await $repositories.productRepository.getAll(filter);

    pagination.current = response?.data?.data?.pagination ?? null;
    setProducts(response?.data?.data?.results ?? []);

    setIsLoading(false);
  }

  function getProductFilter(page = initPage) {
    currentPage.current = initPage;

    return {
      search: search ? encodeURI(search) : '',
      brandIds: brandId ? [brandId] : [],
      categoryIds: categoryId ? [categoryId] : [],
      limit: perPage * 1,
      page
    };
  }

  // JSX
  function renderProducts() {
    return products.map((item) => (
      <div className="item" key={item.productId}>
        <div className="item-image">
          <img
            src={item.logoUrl ?? FALLBACK_IMAGE_URL}
            onError={function () {
              this.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>
        <div className="item-content">
          <span className="item-name">{item.name}</span>
          <span className="item-price">RM{item.unitPrice}</span>
        </div>
      </div>
    ));
  }

  return (
    <>
      {!!products.length && (
        <>
          <div className="pagination-section">
            <CustomSeparator />
            <span className="fw-bold">Items per page</span>
            <CustomDropdown
              menu={{
                selectedItem: perPage,
                setSelectedItem: setPerPage,
                options: perPageOptions.current
              }}
            />
            <CustomSeparator />
          </div>
          <CustomListingSection minItemWidthInPx={132.5} gapWidthInPx={5}>
            {renderProducts()}
          </CustomListingSection>
        </>
      )}

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!!products.length && totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage.current}
          setCurrentPage={(value) => (currentPage.current = value)}
          totalPages={totalPages}
          beforeUpdate={async (page) => await getProducts(page)}
          disabled={isLoading}
        />
      )}
    </>
  );
}

export default ProductListing;

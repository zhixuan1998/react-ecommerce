import './product.scss';

import { useSelector } from 'react-redux';
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import messages from '@/models/businessMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContext, RepositoryContext } from '@/utils/context';
import { convertDateToRelativeTime } from '@/utils/dateFormatter';
import { convertNumberToRelativeNumber } from '@/utils/numberFormatter';
import { faShop, faUsers, faUserCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

import Base from '../components/Base';
import { CustomButton } from '@/components';
import ProductListing from './components/ProductListing';

function OverviewLeft({ brand }) {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const $modal = useContext(ModalContext);
  const $repositories = useContext(RepositoryContext);

  const [isFollowed, setIsFollowed] = useState(brand.isFollowed);

  async function createFollow() {
    if (!user) {
      const fullPath = location.pathname + location.search;
      return navigate(`/login?redirect=${fullPath}`);
    }

    const { error } = await $repositories.followRepository.createFollow({ brandId: brand.brandId });

    if (error) {
      return $modal.open();
    }

    setIsFollowed(true);
  }

  async function deleteFollow() {
    const { error } = await $repositories.followRepository.deleteFollow({ brandId: brand.brandId });

    if (error) {
      return $modal.open();
    }

    setIsFollowed(false);
  }

  const followButtonOnclick = isFollowed ? deleteFollow : createFollow;
  const followButtonText = isFollowed ? messages.button.following() : messages.button.follow();

  return (
    <div className="overview-left">
      <div className="logo rounded-circle">
        <img
          src={brand.logoUrl}
          onError={(e) => (e.target.src = 'https://picsum.photos/200')}
        />
      </div>
      <div className="info">
        <p className="name">{brand.name}</p>
        <p className="status">Active 4 minutes ago</p>
      </div>
      <CustomButton onClick={followButtonOnclick}>
        {!isFollowed && <FontAwesomeIcon icon={faPlus} />}
        <span>{followButtonText}</span>
      </CustomButton>
    </div>
  );
}

function OverviewRight({ brand }) {
  const statistics = useRef([
    {
      label: 'Products',
      icon: faShop,
      value: convertNumberToRelativeNumber(brand.productCount)
    },
    {
      label: 'Followers',
      icon: faUsers,
      value: convertNumberToRelativeNumber(brand.followerCount)
    },
    {
      label: 'Rating',
      icon: faStar,
      value:
        brand.rating.totalCount === 0
          ? 0
          : `${brand.rating.average} (${brand.rating.totalCount} Rating)`
    },
    {
      label: 'Joined',
      icon: faUserCheck,
      value: convertDateToRelativeTime(brand.createdAt)
    }
  ]);

  return (
    <div className="overview-right">
      {statistics.current.map((s, i) => (
        <Statistic statistic={s} key={i} />
      ))}
    </div>
  );
}

function Statistic({ statistic }) {
  return (
    <div className="summary">
      <span className="summary-icon">
        <FontAwesomeIcon icon={statistic.icon} />
      </span>
      <span>{statistic.label}:</span>
      <span className="summary-text">{statistic.value}</span>
    </div>
  );
}

function BrandSummary({ brand }) {
  return (
    <div className="overview-section">
      <OverviewLeft brand={brand} />
      <OverviewRight brand={brand} />
    </div>
  );
}

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
    const [{ data: searchAreasData }, { data: brandsData }] = await Promise.all([
      $repositories.lookupRepository.getSearchProductAreas(),
      $repositories.brandRepository.getAll({ brandIds: [brandId] })
    ]);

    setSearchAreaOptions(searchAreasData.filter((o) => o.key !== 'category'));

    const brand = brandsData?.results.find((r) => r.brandId === brandId) ?? null;
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

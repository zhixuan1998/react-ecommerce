import { useSelector } from 'react-redux';
import { useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContext, RepositoryContext } from '@/utils/context';
import { convertDateToRelativeTime } from '@/utils/dateFormatter';
import { convertNumberToRelativeNumber } from '@/utils/numberFormatter';
import { faShop, faUsers, faUserCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

import { CustomButton } from '@/components';

function BrandSummary({ brand }) {
  const summaries = useRef([
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
      value: 10
    },
    {
      label: 'Joined',
      icon: faUserCheck,
      value: convertDateToRelativeTime(brand.createdAt)
    }
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const $modal = useModal(ModalContext);
  const $repositories = useContext(RepositoryContext);

  const user = useSelector((state) => state.user);

  async function createFollow() {
    if (!user) {
      const fullPath = location.pathname + location.search;
      return navigate(`/login?redirect=${fullPath}`);
    }

    const [error] = await $repositories.followRepository({
      type: 'brand',
      referenceId: brand.brandId
    });

    if (error) {
      $modal.open();
    }
  }

  function renderSummaries() {
    return summaries.current.map((summary, i) => (
      <div className="summary" key={i}>
        <span className="summary-icon">
          <FontAwesomeIcon icon={summary.icon} />
        </span>
        <span>{summary.label}:</span>
        <span className="summary-text">{summary.value}</span>
      </div>
    ));
  }

  return (
    <div className="overview-section">
      <div className="overview-left">
        <div className="logo rounded-circle">
          <img
            src={brand.logoUrl}
            onError={function () {
              this.src = 'https://picsum.photos/200';
            }}
          />
        </div>
        <div className="info">
          <p className="name">{brand.name}</p>
          <p className="status">Active 4 minutes ago</p>
        </div>
        <CustomButton onClick={createFollow}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Follow</span>
        </CustomButton>
      </div>
      <div className="overview-right">{renderSummaries()}</div>
    </div>
  );
}

export default BrandSummary;

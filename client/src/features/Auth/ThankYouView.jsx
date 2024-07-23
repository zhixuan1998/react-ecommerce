import './auth.scss';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '@/hooks';
import messages from '@/models/businessMessages';

import { CustomForm, CustomButton } from '@/components';

function ThankYouView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [changeLayout] = useMediaQuery([{ maxWidth: '576px' }]);


  const redirect = searchParams.get('redirect');
  const query = redirect ? `redirect=${redirect}` : '';

  const buttonText = messages.button[query ? 'continue' : 'backToHomepage']();

  function goToNextPage() {
    navigate(redirect);
  }

  return (
    <div className="main-content">
      <CustomForm
        className={`custom-form ${changeLayout ? 'small-screen-layout' : ''}`}
        maxWidth="700px"
      >
        <div>
          <div className="thank_you-label">Thank You For Registration</div>
          <CustomButton onClick={goToNextPage}>{buttonText}</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
}

export default ThankYouView;

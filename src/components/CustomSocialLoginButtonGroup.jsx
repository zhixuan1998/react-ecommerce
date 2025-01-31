import { useContext } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { useMediaQuery, useFirebaseAuth } from '@/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

import { ModalContext } from '@/utils/context.js';

import CustomButton from './CustomButton.jsx';

const PROVIDER_TYPE = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
};

function CustomSocialLoginButtonGroup() {
  const $modal = useContext(ModalContext);

  const [searchParams] = useSearchParams();
  const matches = useMediaQuery([{ maxWidth: '450px' }]);

  const [isMobile] = matches;

  const providerGroup = useFirebaseAuth(Object.values(PROVIDER_TYPE));

  async function socialLogin(providerType) {
    // facebook login temporarily not working
    if (providerType === PROVIDER_TYPE.FACEBOOK) return;

    const result = await providerGroup[providerType]?.signIn();
    const accessToken = result?.accessToken;

    const success = accessToken ? null : false;

    success ? redirect(searchParams.get('redirect') ?? '/') : $modal.open();
  }

  return (
    <div className={`flex ${isMobile ? 'flex-column' : 'flex-row'}`}>
      <CustomButton onClick={() => socialLogin(PROVIDER_TYPE.GOOGLE)}>
        <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '15px' }} />
      </CustomButton>

      <CustomButton onClick={() => socialLogin(PROVIDER_TYPE.FACEBOOK)} disabled>
        <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '15px' }} />
      </CustomButton>
    </div>
  );
}

export default CustomSocialLoginButtonGroup;

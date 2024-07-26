import './auth.scss';

import { useImmer } from 'use-immer';
import { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { useValidation, useAuth } from '@/hooks';
import messages from '@/models/businessMessages';
import { validators } from '@/hooks/useValidation';
import { ModalContext } from '@/utils/context';
import repositories from '@/../repositories';

import Base from '../components/Base';
import {
  CustomForm,
  CustomButton,
  CustomSeparator,
  CustomFormControl,
  CustomErrorMessage,
  CustomSocialLoginButtonGroup
} from '@/components';

const initUserValue = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCode: '+60',
  phoneNumber: '',
  dob: '',
  password: '',
  confirmPassword: ''
};

const maxWidth = '800px';

async function loader() {
  const $repositories = repositories();
  const response = await $repositories.lookupRepository.getCountryPhoneCodes();

  return { phoneCodes: response?.data?.data?.results ?? [] };
}

function Component() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const $modal = useContext(ModalContext);

  const loader = useLoaderData();
  const [user, setUser] = useImmer(initUserValue);
  const [phoneCodes, setPhoneCodes] = useState([]);

  useEffect(() => {
    setPhoneCodes(loader.phoneCodes);
  }, []);

  function setUserProp(prop, value) {
    if (!Object.prototype.hasOwnProperty.call(user, prop)) return;

    setUser((user) => {
      user[prop] = value;
    });
  }

  async function signup() {
    $v.$touch();

    if ($v.$error) return;

    const success = await auth.register({
      ...user,
      dob: new Date(user.dob).toISOString()
    });

    if (success) {
      const redirect = searchParams.get('redirect');
      const query = redirect ? `?redirect=${redirect}` : '';
      navigate(`/thank-you${query}`);
    } else {
      $modal.open();
    }
  }

  const $v = useValidation(
    {
      firstName: {
        required: validators.required(user.firstName)
      },
      lastName: {
        required: validators.required(user.lastName)
      },
      email: {
        required: validators.required(user.email),
        format: validators.email(user.email)
      },
      phoneNumber: {
        required: validators.required(user.phoneNumber)
      },
      dob: {
        required: validators.required(user.dob)
      },
      password: {
        required: validators.required(user.password),
        format: validators.password(user.password)
      },
      confirmPassword: {
        required: validators.requiredIf(user.confirmPassword, user.password),
        match: validators.match(user.password, user.confirmPassword)
      }
    },
    user
  );

  function renderCustomFormControl(field) {
    if (!Object.prototype.hasOwnProperty.call(user, field)) return <></>;

    const isDob = field === 'dob';
    const isPassword = field === 'password' || field === 'confirmPassword';
    const isPhoneNumber = field === 'phoneNumber';

    const props = {
      inputValue: user[field],
      setInputValue: (value) => setUserProp(field, value),
      label: messages.label[field](),
      verticalLayout: true
    };

    if (isDob) {
      props.actualType = 'calendar';
    } else if (isPassword) {
      props.actualType = 'password';
    }

    if (!isDob) {
      props.className = 'col-sm-6';
    }

    if (isPhoneNumber) {
      props.prependValue = user.phoneCode;
      props.setPrependValue = (value) => setUserProp('phoneCode', value);
      props.options = phoneCodes;
      props.prependDropdown = {
        keyField: 'phoneCode',
        valueField: (item) => `${item.phoneCode} - ${item.name}`,
        displayField: 'phoneCode'
      };
    }

    return <CustomFormControl {...props}>{renderErrorMessage(field)}</CustomFormControl>;
  }

  function renderErrorMessage(field) {
    const message = getErrorMessage(field);
    return message && <CustomErrorMessage message={message} />;
  }

  function getErrorMessage(field) {
    if (!Object.prototype.hasOwnProperty.call($v, field)) return '';
    if ($v[field].required.$error) return messages.validations.required();

    switch (field) {
      case 'email':
        return $v.email.format.$error && messages.validations.invalidFormat('email');
      case 'password':
        return $v.password.format.$error && messages.validations.passwordFormat();
      case 'confirmPassword':
        return $v.confirmPassword.match.$error && messages.validations.passwordNotMatch();
      default:
        return '';
    }
  }

  return (
    <Base title={messages.title.signup()}>
      <CustomForm
        header={{ title: 'Sign Up', description: 'Please fill up the registration form' }}
        maxWidth={maxWidth}
      >
        <div>
          <div className="row">
            {renderCustomFormControl('firstName')}
            {renderCustomFormControl('lastName')}
          </div>

          <div className="row">
            {renderCustomFormControl('email')}
            {renderCustomFormControl('phoneNumber')}
          </div>

          <div className="row">{renderCustomFormControl('dob')}</div>

          <div className="row">
            {renderCustomFormControl('password')}
            {renderCustomFormControl('confirmPassword')}
          </div>

          <CustomButton style={{ marginTop: '15px' }} onClick={signup}>
            {messages.button.signup()}
          </CustomButton>
        </div>
        <CustomSeparator text="OR" />
        <CustomSocialLoginButtonGroup />
      </CustomForm>
    </Base>
  );
}

export { Component, loader };

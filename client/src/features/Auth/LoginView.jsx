import './auth.scss';

import { useImmer } from 'use-immer';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth, useValidation } from '@/hooks';
import { validators } from '@/hooks/useValidation';
import messages from '@/models/businessMessages';
import { ModalContext } from '@/utils/context';

import Base from '../components/Base';
import {
  CustomForm,
  CustomButton,
  CustomSeparator,
  CustomFormControl,
  CustomErrorMessage,
  CustomSocialLoginButtonGroup
} from '@/components';

const initCredentials = {
  email: '',
  password: ''
};

function Component() {
  const $modal = useContext(ModalContext);

  const maxWidth = '450px';
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [credentials, setCredentials] = useImmer(initCredentials);

  const $v = useValidation(
    {
      email: {
        required: validators.required(credentials.email),
        format: validators.email(credentials.email)
      },
      password: {
        required: validators.required(credentials.password),
        format: validators.password(credentials.password)
      }
    },
    credentials
  );

  function setEmail(value) {
    setCredentials((state) => {
      state.email = value;
    });
  }

  function setPassword(value) {
    setCredentials((state) => {
      state.password = value;
    });
  }

  function resetForm() {
    setCredentials(initCredentials);
    $v.$reset();
  }

  async function login() {
    $v.$touch();

    const success = await auth.login(credentials);

    if (success) {
      navigate(searchParams.get('redirect') ?? '/home');
    } else {
      $modal.open({ message: messages.error.message.invalidAuth() });
    }

    success
      ? navigate(searchParams.get('redirect') ?? '/home')
      : $modal.open({ message: messages.error.message.invalidAuth() });

    resetForm();
  }

  function getErrorMessage(field) {
    if (!Object.prototype.hasOwnProperty.call($v, field)) return '';
    if ($v[field].required.$error) return messages.validations.required();

    switch (field) {
      case 'email':
        return $v.email.format.$error && messages.validations.invalidFormat('email');
      case 'password':
        return $v.password.format.$error && messages.validations.passwordFormat();
      default:
        '';
    }
  }

  function renderErrorMessage(field) {
    const message = getErrorMessage(field);
    return message && <CustomErrorMessage message={message} />;
  }

  return (
    <Base title={messages.title.login()}>
      <CustomForm
        header={{ title: 'Log In', description: 'Please enter your credentials' }}
        maxWidth={maxWidth}
      >
        <div className="credential-section">
          <CustomFormControl
            inputValue={credentials.email}
            setInputValue={setEmail}
            label={messages.label.email()}
            verticalLayout
          >
            {renderErrorMessage('email')}
          </CustomFormControl>

          <CustomFormControl
            inputValue={credentials.password}
            setInputValue={setPassword}
            label={messages.label.password()}
            actualType="password"
            maxLength={20}
            verticalLayout
          >
            {renderErrorMessage('password')}
          </CustomFormControl>

          <CustomButton style={{ marginTop: '15px' }} onClick={login}>
            {messages.button.login()}
          </CustomButton>
          <p className="forgot-password">{messages.label.forgotPassword()}</p>
        </div>
        <CustomSeparator text="OR" />
        <CustomSocialLoginButtonGroup />
      </CustomForm>
    </Base>
  );
}

export { Component };

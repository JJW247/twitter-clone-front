import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { FC, FormEvent } from 'react';

import { useInput } from '../../hooks';

const Login: FC = () => {
  const [loginEmail, onChangeLoginEmail] = useInput('');
  const [loginPassword, onChangeLoginPassword] = useInput('');

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users/login`,
        { email: loginEmail, password: loginPassword },
      );

      if (response.statusText === 'Created') {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-auto bg-green-500 flex justify-center items-center">
        <FontAwesomeIcon className="text-white text-20-rem" icon={faTwitter} />
      </div>
      <div className="flex-auto max-w-screen-sm m-8">
        <div className="mb-8">
          <FontAwesomeIcon
            className="text-green-500 text-4xl"
            icon={faTwitter}
          />
        </div>
        <div className="font-black text-6xl mb-4">Happening now</div>
        <div className="mb-8">
          <div className="font-bold text-4xl mb-2">Sign up</div>
          <form>
            <input className="input mb-2 w-96" type="email" />
            <br />
            <input className="input mb-2 w-96" type="text" />
            <br />
            <input className="input mb-2 w-96" type="password" />
            <br />
            <input className="input mb-2 w-96" type="password" />
            <br />
            <input
              className="input w-96 bg-white"
              type="submit"
              value="Sign up"
            />
          </form>
        </div>
        <div>
          <div className="text-xl mb-2">
            Already have an account?{' '}
            <span className="font-bold text-2xl">Log in</span>
          </div>
          <form onSubmit={onSubmitLogin}>
            <input
              className="input mb-2 w-96"
              type="email"
              maxLength={40}
              placeholder="Email"
              value={loginEmail}
              onChange={onChangeLoginEmail}
            />
            <br />
            <input
              className="input mb-2 w-96 auto-password-prevent"
              type="password"
              maxLength={40}
              placeholder="Password"
              value={loginPassword}
              onChange={onChangeLoginPassword}
            />
            <br />
            <input
              className="input w-96 bg-white"
              type="submit"
              value="Log in"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

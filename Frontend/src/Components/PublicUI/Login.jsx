/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../../Styles/PublicUI/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../store/UserSlice';

const Login = () => {
  // to hide login and register page
  function changePage() {
    document.querySelector('.login-p').classList.toggle('hide');
    document.querySelector('.register-p').classList.toggle('hide');
  }

  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // for registeration
  const [avatar, setAvatar] = useState('../../assets/Title_Logo.png');
  const [regDet, setRegDet] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = regDet;

  function regChange(e) {
    if (e.target.name === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegDet({ ...regDet, [e.target.name]: e.target.value });
    }
  }

  function sendRegDet(e) {
    e.preventDefault();
    const form = new FormData();
    form.set('name', name);
    form.set('email', email);
    form.set('password', password);
    form.set('avatar', avatar);
    dispatch(registerUser(form));
  }

  // for login
  const [loginDet, setLoginDet] = useState({
    loginId: '',
    loginPass: ''
  });

  const { loginId, loginPass } = loginDet;

  function updateLoginDet(e) {
    setLoginDet({ ...loginDet, [e.target.name]: e.target.value });
  }

  function sendLoginDet(e) {
    e.preventDefault();
    const form = new FormData();
    form.set('email', loginId);
    form.set('password', loginPass);
    dispatch(loginUser(form));
  }

  // redirect to account if login
  const history = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      history('/account');
    }
  }, [isAuthenticated, history]);

  return (
    <div className="login-page">
      <section className="login login-p">
        <p className="title">Login</p>
        <form onSubmit={sendLoginDet}>
          <input
            type="text"
            className="inputs"
            name="loginId"
            placeholder="Enter Email"
            onChange={updateLoginDet}
          />
          <input
            type="password"
            className="inputs"
            name="loginPass"
            placeholder="Enter Password"
            onChange={updateLoginDet}
          />
          <button className="inputs-submit">Login</button>
        </form>
        <div className="other-options">
          <Link to={'/forgot-password'}>Forgot Password</Link>
          <span onClick={() => changePage()}>Register Here</span>
        </div>
      </section>
      <section className="login register-p hide">
        <p className="title">Registeration</p>
        <form encType="multipart/form-data" onSubmit={sendRegDet}>
          <input
            type="text"
            className="inputs"
            placeholder="Enter Name"
            name="name"
            onChange={regChange}
          />
          <input
            type="text"
            className="inputs"
            name="email"
            placeholder="Enter Email"
            onChange={regChange}
          />
          <input
            type="password"
            className="inputs"
            name="password"
            placeholder="Create Password"
            onChange={regChange}
          />
          <input
            type="file"
            className="inputs"
            accept="image/*"
            name="image"
            onChange={regChange}
          />
          <button className="inputs-submit">Register User</button>
        </form>
        <div className="other-options">
          <span onClick={() => changePage()}>LogIn</span>
        </div>
      </section>
    </div>
  );
};

export default Login;

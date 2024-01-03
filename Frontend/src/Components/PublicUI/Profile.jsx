/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../../Styles/PublicUI/Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data, isAuthenticated } = useSelector(state => state.user);
  const { avatar, name } = data;
  function logout() {
    dispatch(logoutUser());
  }
  useEffect(() => {
    if (isAuthenticated == false) {
      history('/login');
      console.log('logout');
    }
    console.log('done');
  }, [isAuthenticated, history]);

  return (
    <div className="profile_page">
      <img src={avatar.url} alt="dp" />
      <div className="other_section">
        <span>{name}</span>
        <button onClick={() => logout()}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;

/* eslint-disable no-unused-vars */
import React from 'react';
import '../../Styles/PublicUI/Profile.scss';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { data } = useSelector(state => state.user);
  const { avatar, name } = data;
  return (
    <div className="profile_page">
      <img src={avatar.url} alt="dp" />
      <div className="other_section">
        <span>{name}</span>
      </div>
    </div>
  );
};

export default Profile;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBook } from '../../store/BookSlice';
import { useEffect } from 'react';
import '../../Styles/PublicUI/Detail.scss';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.book);
  useEffect(() => {
    dispatch(fetchSingleBook(`${id}`));
  }, [id]);

  return (
    <div className="detail-box">
      <div className="detail-pics"></div>
      <div className="detail-det">
        <p className="det-name">{data.name}</p>
        <p className="det-oth">{data.author}</p>
        <p className="det-oth">{data.description}</p>
        <div className="det-cart-box">
          <button>Cart +</button>
          <span className="det-price">₹ {data.price}</span>
        </div>
        <p className="det-oth">
          {data.stock} {data.type} left
        </p>
      </div>
    </div>
  );
};

export default Detail;

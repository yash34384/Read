/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../../Styles/PublicUI/Card.scss';
import { Link } from 'react-router-dom';

const Card = ({ book }) => {
  return (
    <Link to={`/detail/${book._id}`} className="card-box">
      <section className="card-img-sec">
        <img src={book.images[0].url} alt={book.name} />
      </section>
      <section className="card-det">
        <div className="card-over">
          <p>{book.name}</p>
          <p>₹{book.price}</p>
        </div>
        <button>Cart +</button>
      </section>
    </Link>
  );
};

export default Card;

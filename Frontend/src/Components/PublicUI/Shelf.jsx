/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../../Styles/PublicUI/Shelf.scss';
import { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook } from '../../store/BookSlice';
import Loader from './Loader';

const Shelf = () => {
  const [page, setPage] = useState(1);
  const [currType, setCurrType] = useState('all');
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.book);
  const [book, setBook] = useState([]);
  const [preType, setPreType] = useState('all');

  useEffect(() => {
    if (currType === 'all') {
      dispatch(fetchBook(`?page=${page}`));
    } else {
      const string = `?type=${currType}&page=${page}`;
      dispatch(fetchBook(string));
    }
  }, [currType, page]);

  useEffect(() => {
    if (currType === preType) {
      setBook(previous => [...previous, ...data]);
    } else {
      setBook([...data]);
      setPreType(currType);
    }
  }, [data, currType]);

  function handleScrollEffect() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(previous => previous + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEffect);
    return () => window.addEventListener('scroll', handleScrollEffect);
  }, []);

  function getBookType(e) {
    e.preventDefault();
    setCurrType(e.target.value);
    setPage(1);
  }
  return (
    <>
      <div className="heading">Our Complete Book Shelf</div>
      <div className="category">
        <button className="cate-type" value="all" onClick={getBookType}>
          All
        </button>
        <button className="cate-type" value="course" onClick={getBookType}>
          Course Books
        </button>
        <button className="cate-type" value="novel" onClick={getBookType}>
          Novels
        </button>
        <button className="cate-type" value="notes" onClick={getBookType}>
          Notes
        </button>
      </div>
      <div className="books-box">
        {status === 'pending' ? (
          <Loader />
        ) : (
          <>
            {book.map(book => (
              <Card book={book} key={book.name} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Shelf;

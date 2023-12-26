/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../../Styles/PublicUI/Search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBook } from '../../store/BookSlice';
import { useState } from 'react';
import Loader from './Loader';
import Card from './Card';

const Search = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.book);
  const [book, setBook] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const string = `?page=${page}&name=${text}`;
    dispatch(fetchBook(string));
  }, [text, page]);

  useEffect(() => {
    setBook([...data]);
  }, [data]);

  function handleEvent() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(previous => previous + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleEvent);
    return window.addEventListener('scroll', handleEvent);
  }, []);

  return (
    <div>
      <p className="heading">Search For Books Or Notes</p>
      <section className="search-form">
        <input
          type="text"
          placeholder="Enter Book name..."
          className="search-bar"
          onChange={e => setText(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </section>
      <section className="search-section">
        <div className="books-box">
          {status === 'pending' ? (
            <Loader />
          ) : (
            book.map(book => <Card book={book} key={book.name} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;

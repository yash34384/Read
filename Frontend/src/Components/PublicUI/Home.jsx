/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../../Styles/PublicUI/Home.scss';
import Poster from '../../assets/poster.png';
import { useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState([]);
  const [course, setCourse] = useState([]);
  const [notes, setNotes] = useState([]);

  async function getAllBooks() {
    try {
      const { data } = await axios.get('/api/v1/allbooks');
      const books = data.books;

      // filtering with novels
      const novelBooks = books.filter(ele => ele.type === 'novel');
      const nB = novelBooks.slice(0, 4);
      setNovel([...nB]);

      // filtering with course Books
      const courseBooks = books.filter(ele => ele.type === 'course');
      const cB = courseBooks.slice(0, 4);
      setCourse([...cB]);

      // filtering with notes
      const noteBooks = books.filter(ele => ele.type === 'notes');
      const noB = noteBooks.slice(0, 4);
      setNotes([...noB]);
      setLoading(false);
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <section className="poster-section">
        <img src={Poster} alt="Poster" />
      </section>
      <div className="heading">Hot Deals For You</div>
      <section className="hot-deals">
        <div className="boxes">
          <Box
            svg={'fa-solid fa-truck-fast icon'}
            title={'Free Shipping'}
            desc={'Free!! Ship to your doorstep over an order of Rs.500.'}
          />
          <Box
            svg={'fa-solid fa-coins icon'}
            title={'Save Money'}
            desc={'Exciting offers on your favourtie Books and Notes.'}
          />
          <Box
            svg={'fa-solid fa-comments icon'}
            title={'Contact With Us'}
            desc={
              'Easy to contact us for any help and guidance for Books and Notes.'
            }
          />
        </div>
      </section>
      {novel ? (
        <>
          <div className="heading">A Huge Collection Of Novels</div>
          <div className="books-box">
            {loading ? (
              <Loader />
            ) : (
              <>
                {novel.map(book => (
                  <Card book={book} key={book._id} />
                ))}
                <Link to={'/shelf'}>
                  <i class="fa-solid fa-right-from-bracket gotoicon"></i>
                </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
      {course ? (
        <>
          <div className="heading">A Huge Collection Of Course Books</div>
          <div className="books-box">
            {loading ? (
              <Loader />
            ) : (
              <>
                {course.map(book => (
                  <Card book={book} key={book.name} />
                ))}
                <Link to={'/shelf'}>
                  <i class="fa-solid fa-right-from-bracket gotoicon"></i>
                </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
      {notes ? (
        <>
          <div className="heading">A Huge Collection Of Notes</div>
          <div className="books-box">
            {loading ? (
              <Loader />
            ) : (
              <>
                {notes.map(book => (
                  <Card book={book} key={book.name} />
                ))}
                <Link to={'/shelf'}>
                  <i class="fa-solid fa-right-from-bracket gotoicon"></i>
                </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

const Box = ({ svg, title, desc }) => {
  return (
    <div className="box">
      <i class={svg}></i>
      <p className="title">{title}</p>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Home;

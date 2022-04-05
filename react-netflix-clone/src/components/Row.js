import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal/index';

function Row({title, id, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState([]);

  useEffect(()=>{
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              /* 이미지 클릭 시, 해당 movie 와 관련된 모달 open 제어 해주고, 영화 정보도 저장하기 위해서 */
              onClick={()=> handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>

      {
        // {...movieSelected : 이미지 클릭된 영화 정보가 다 담겨 있다. 이걸 props로 넘겨준다. 어디에 ? MovieModal 컴포넌트에 ! }
        modalOpen &&  (<MovieModal {...movieSelected} setModalOpen={setModalOpen} />)
      }
    </section>
  );
}

export default Row;
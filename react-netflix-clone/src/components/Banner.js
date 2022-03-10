import axios from '../api/axios.js';
import React, {useState, useEffect} from 'react'
import requests from '../api/request.js';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetchData();
  }, []);

  const truncate = (str, n) => {
    if (str){
      if (str.length > n) {
        return str.substr(0, n - 1) + "...";
      } else {
        return str;
      }
    }
    else return;

  }
  const fetchData = async () => {
    //await 걸어주는 이유 : 비동기 처리하는데, 현재상영중 영화들을 받아오는걸 기다리지 않고 request에 넣어주기 때문에 
    // pending 상태가 된다. 
    // await 걸어주면 request 에는 요청 받아온 영화정보들이 promise객체로 반환된다. 
    // 이 객체에서 request.data 안의 results 라는 배열에 내가 원하는 영화 리스트들이 쭉 담기게 된다.
    const request = await axios.get(requests.fetchNowPlaying);
    // 영화리스트들 중 랜덤으로 인덱스를 정해서 한개 영화를 정한다음, 그 영화의 id를 뽑아 movieId에 저장
    const movieId = request.data.results[Math.floor(Math.random()*request.data.results.length)].id;

    const {data : movieDetail} = await axios.get(`movie/${movieId}`, {
      params: {append_to_reponse : "videos"},
    });
    
    setMovie(movieDetail);
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button play"
            // onClick={() => setIsClicked(true)}
          >
            Play
          </button>
          <button className="banner__button info">More Information</button>
        </div>

        <h1 className="banner__description">{truncate(movie.overview,100)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
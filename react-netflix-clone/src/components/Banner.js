import axios from '../api/axios.js';
import React, {useState, useEffect} from 'react'
import requests from '../api/request.js';
import './Banner.css';
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  
 


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
      params: {append_to_response : "videos"},
    });
    
    setMovie(movieDetail);
  };

  if (!isClicked){
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
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
  else{
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
          ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            frameborder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
    );
    
  }
}

// styled Component

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index : -1;
  opacity : 0.65;
  border : none;
  &::after {
    content : "";
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
`;

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items : center;
  flex-direction : column;
  width: 100%;
  height: 100vh;  
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export default Banner;
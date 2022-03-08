import React, {useEffect, useState} from 'react'
import "./Nav.css";

const Nav = () => {
  // 스크롤 내리면 nav 색 바뀌게 
  const [show, setShow] = useState(false);

  useEffect(()=> {
    window.addEventListener("scroll", ()=> {
      if(window.scrollY > 50){
        setShow(true);
      }
      else {
        setShow(false);
      };
    })
    return () => {
      window.removeEventListener("scroll", ()=> {});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()} // 클릭 시 리로드
      ></img>
      <img
        alt="User logged"
        src="https://occ-0-1360-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUCZYfPbupvQjzSa3egePk8TFNDy2A_w15DEAq50IqW8MYmOtmbWwN4Txem7mgNYEMPJ1BY6uasiIJQ8JeFO3EU.png?r=b97"
        className="nav__avatar"
      ></img>
    </nav>
  );
}

export default Nav;
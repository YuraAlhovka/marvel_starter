import { useEffect, useState } from "react";

import setContent from "../../utils/setContent";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * 20) + 1;
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };
  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return "no character data available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const { name, description, thumbnail, wiki, homepage } = data;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{
          objectFit:
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? "contain"
              : "cover",
        }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{truncateText(description, 150)}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

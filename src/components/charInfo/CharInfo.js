import { useState, useEffect, useRef, useCallback } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const prevCharIdRef = useRef();
  const { charId } = props;

  const marvelService = new MarvelService();

  const updateChar = useCallback(() => {
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  }, [charId, marvelService]);

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    if (prevCharIdRef.current !== charId) {
      updateChar();
    }
    prevCharIdRef.current = charId;
  }, [charId, updateChar]);

  const onCharLoading = () => {
    setLoading(true);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const skeleton = char || error || loading ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {content}
      {errorMessage}
      {spinner}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no available comics"}
        {comics.map((item, i) => {
          if (i > 9) {
            return null;
          }
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;

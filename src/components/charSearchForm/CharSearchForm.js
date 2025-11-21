import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const setContent = (process, content, data) => {
  switch (process) {
    case "waiting":
      return null; // Не показываем скелетон при ожидании
    case "loading":
      return;
    case "confirmed":
      return data ? content : null;
    case "error":
      return (
        <div className="char__search-error">Error occurred while searching</div>
      );
    default:
      throw new Error("Unexpected process state");
  }
};

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, clearError, process, setProcess } =
    useMarvelService();

  const validationSchema = Yup.object({
    charName: Yup.string().required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      charName: "",
    },
  });

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();
    setChar(null);
    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"))
      .catch(() => setProcess("error"));
  };

  const onSubmit = (data) => {
    updateChar(data.charName);
    reset();
  };

  const results = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <input
            id="charName"
            type="text"
            placeholder="Enter name"
            {...register("charName")}
            className={errors.charName ? "error" : ""}
          />
          <button
            type="submit"
            className="button button__main"
            disabled={process === "loading" || !isValid}
          >
            <div className="inner">find</div>
          </button>
        </div>
        {errors.charName && (
          <div className="char__search-error">{errors.charName.message}</div>
        )}
      </form>
      {setContent(process, results, char)}
    </div>
  );
};

export default CharSearchForm;

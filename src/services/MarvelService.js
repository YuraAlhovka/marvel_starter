import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = "https://marvel-server-zeta.vercel.app/";
  const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  const _baseOffset = 0;

  const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
    const res = await request(
      `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`
    );

    if (res && res.data && Array.isArray(res.data.results)) {
      return res.data.results.map(_transformCharacter);
    }
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    if (
      res &&
      res.data &&
      Array.isArray(res.data.results) &&
      res.data.results.length > 0
    ) {
      return _transformCharacter(res.data.results[0]);
    }
  };

  const _transformCharacter = (char) => {
    if (!char) {
      return char;
    }

    return {
      id: char.id,
      name: char.name,
      description:
        char.description || "No description available for this character.",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls && char.urls[0] ? char.urls[0].url : "#",
      wiki: char.urls && char.urls[1] ? char.urls[1].url : "#",
      comics: char.comics ? char.comics.items : [],
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
  };
};

export default useMarvelService;

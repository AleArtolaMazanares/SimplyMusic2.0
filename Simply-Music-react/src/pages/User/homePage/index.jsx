import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../homePage/style.css";
import { useMusicContext } from "../../../components/MusicContext/MusicContext"; // Reemplaza con la ubicación correcta
import HandleForFeed from "../../../components/HandleFormFeed";
import FeedContent from "../../../components/FeedContent";

function HomePage() {
  const { state, dispatch } = useMusicContext();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { id } = useParams();

  const fetchArtists = async () => {
    try {
      const url = "http://localhost:3001/users/content_artists";
      const response = await fetch(url);
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error("Error en la solicitud de artistas:", error.message);
    }
  };

  const fetchSongs = async () => {
    try {
      const url = "http://localhost:3001/users/songs";
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error en la solicitud de canciones:", error.message);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchSongs();
    setLoading(false);
  }, []);

  /* Este código filtra las matrices "artistas" y "canciones" según el "término de búsqueda". Crea un
    nueva matriz llamada `combinedResults` combinando las matrices `artistas` y `canciones` usando el
    operador de extensión (`[...artistas,...canciones]`). Luego, filtra esta matriz combinada comprobando si
    el "nombre", "título_canción" o "género" de cada elemento incluye el "término de búsqueda" (ignorando mayúsculas y minúsculas).
    sensibilidad). Si alguna de estas condiciones es cierta, el elemento se incluye en el
    Matriz `combinedResults`. Finalmente, se devuelve la matriz `combinedResults`. */
  const handleSearch = () => {
    const combinedResults = [...artists, ...songs].filter((result) => {
      const includesTerm =
        result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (result.title_song &&
          result.title_song.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (result.genre &&
          result.genre.toLowerCase().includes(searchTerm.toLowerCase()));

      return includesTerm;
    });

    setSearchResults(combinedResults);
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setSearchResults([]);
    } else {
      const combinedResults = [...artists, ...songs].filter((result) => {
        const includesTerm =
          (result.name &&
            result.name.toLowerCase().includes(term.toLowerCase())) ||
          (result.title_song &&
            result.title_song.toLowerCase().includes(term.toLowerCase())) ||
          (result.genre &&
            result.genre.toLowerCase().includes(term.toLowerCase()));

        return includesTerm;
      });

      setSearchResults(combinedResults);
    }
  };



  return (
    <>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar artistas, canciones o géneros..."
            value={searchTerm}
            onChange={handleInputChange}
            className="input-search"
          />
          <button onClick={handleSearch} className="button-search">
            Buscar
          </button>
        </div>

        <div className="search-content">
          {loading ? (
            <p>Cargando artistas y canciones...</p>
          ) : (
            <div className="containerCardsArtist">
              {(searchResults.length > 0 ? searchResults : artists).map(
                (result) => (
                  <div key={result.id} className="">
                    {result.name && (
                      <Link className="linkCards" to={`/artists/${result.id}`}>
                        <div className="artist-card">
                          <h2>{result.name}</h2>
                          <img
                            src={result.image}
                            alt=""
                            id="imgArtistProfile"
                          />
                        </div>
                      </Link>
                    )}

                    {result.title_song && (
                      <div>
                        <Link
                          className="linkCards"
                          to={`/PlaySong/${result.id}`}
                        >
                          <div className="songsCard">
                            <h2>{result.title_song}</h2>
                            <p>{result.genre}</p>
                            <p>{result.song_duration}</p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                )
              )}
              {searchTerm && searchResults.length === 0 && (
                <p>No se encontraron resultados.</p>
              )}
            </div>
          )}
        </div>
        <div className="feedContainer">
          <div className="feedHome">
            <HandleForFeed id={id} />
          </div>
          <div className="feedContent">
            <center>
              <FeedContent />
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

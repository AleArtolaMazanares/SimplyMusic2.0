import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";
import "./style.css";

function NavBar() {
  const { userRole, decryptData } = useSimplyContext();
  const [prueba, setPrueba] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [formSubmit2, setFormSubmit2] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = localStorage.getItem("sessionData");
        if (sessionData) {
          const decryptedData = await decryptData(sessionData);
          setPrueba(decryptedData);
          setUserId(decryptedData.userId);
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llamar a la función para obtener los datos de usuario
    fetchData();
  }, [decryptData]);

  useEffect(() => {
    const getArtistsByUser = async () => {
      try {
        if (userId) {
          setLoading(true); // Inicia el estado de carga antes de la llamada a la API

          // Realizar la llamada a la API para obtener los datos de los artistas por usuario
          const response = await fetch(
            `http://localhost:3001/users/artists/content_artists/get_ids_by_user?user_id=${userId}`
          );
          const data = await response.json();
          setFormSubmit2(data[0].form_submitted);
          // Puedes hacer más cosas con los datos, como actualizar el estado del componente
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga después de la llamada a la API
      }
    };

    // Llamar a la función para obtener los datos cuando userId esté disponible
    if (userId) {
      getArtistsByUser();
    }
  }, [userId]);

  return (
    <>
      <div className={`sidebar ${isNavOpen ? "open" : ""}`}>
        <div className="menu-toggle" onClick={toggleNav}>
          ☰
        </div>
        <div className="logoNavBar">
          <img
            src="https://cdn.discordapp.com/attachments/1110957174655553606/1181636395106836510/simply_Mesa_de_trabajo_1.png?ex=6581c7a6&is=656f52a6&hm=9b51e57aaaf6ff6cbe6a70c9b360e681e08465d18d188c9ac5a82b62902d69c8&"
            alt=""
          />
        </div>
        <div className="menu-items">
          <div>
            <p id="welcomeSession">WELCOME:</p>
          </div>
          {prueba && <p id="nameSession">{prueba.name_users}</p>}
          {userRole === "user" && (
            <>
              <Link to={`/user/${userId}`}>
                <div>
                  <FontAwesomeIcon icon={faHouse} id="iconHome" />
                  Home
                </div>
              </Link>

              {!loading && formSubmit2 !== null && (
                <Link
                  to={`/FormArtist/${userId}`}
                  className={formSubmit2 ? "disabled-link" : ""}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      id="iconHome"
                      className={formSubmit2 ? "disabled-icon" : ""}
                    />
                    {formSubmit2 ? "En revision" : "Artist"}
                  </div>
                </Link>
              )}

              <Link to={"/"}>Logout</Link>
            </>
          )}

          {userRole === "artist" && (
            <>
              <Link to={`/user/${userId}`}>
                <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
                home
              </Link>
              <Link to={`/MainArtist/${userId}`}>
                <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
                main
              </Link>
              <Link to={"/"}>Logout</Link>
            </>
          )}
          {userRole === "admin" && (
            <>
              <Link to={"/admin"}>Home</Link>
              <Link to={"/"}>Logout</Link>
            </>
          )}
        </div>
        <div className="menuHome">
          <h3>MUSIC LIBRARY</h3>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;

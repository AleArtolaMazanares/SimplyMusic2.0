import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";
import "../../../pages/artist/pagesubmitSong/style.css";

function SongSubmit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { decryptData } = useSimplyContext();
  const [userId, SetUserId] = useState([]);

  const [formData, setFormData] = useState({
    title_song: "",
    song_file: null,
    genre: "",
    song_duration: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = localStorage.getItem("sessionData");
        if (sessionData) {
          const decryptedData = await decryptData(sessionData);
          SetUserId(decryptedData.userId);
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
      }
    };

    fetchData();
  }, [decryptData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convertir el valor del campo 'title_song' a minúsculas
    const processedValue = name === "title_song" ? value.toLowerCase() : value;

    // Validar el campo 'image' para aceptar solo imágenes
    if (name === "image") {
      // Crear una nueva imagen
      const img = new Image();

      // Asignar una función de manejo de errores para el caso en que la imagen no sea válida
      img.onerror = function () {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, selecciona una URL de imagen válida.",
        });
      };

      // Asignar la URL de la imagen al src de la imagen creada
      img.src = value;
    }

    // Actualizar el estado del formulario con el nuevo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title_song",
      "song_file",
      "genre",
      "song_duration",
      "image",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Por favor, complete los campos obligatorios: ${emptyFields.join(
          ", "
        )}`,
      });
      return;
    }

    try {
      const formDataForServer = new FormData();
      formDataForServer.append("song[content_artist_id]", id || "");

      for (const key in formData) {
        formDataForServer.append(`song[${key}]`, formData[key]);
      }

      const response = await fetch("http://localhost:3001/users/songs", {
        method: "POST",
        body: formDataForServer,
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(`/MainArtist/${userId}`);
      } else {
        console.error("Error al crear la canción:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Lista de géneros musicales
  const musicGenres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Country",
    "Jazz",
    "Electronic",
    "Classical",
    "Blues",
    "R&B",
    "Reggae",
    "Folk",
    "Indie",
    "Metal",
    "Punk",
    "Soul",
    "Funk",
    "Disco",
    "Gospel",
    "Techno",
    "House",
    "Ambient",
    "Dubstep",
    "Salsa",
    "Bachata",
    "Mariachi",
    "Ska",
    "Trap",
    "Rap",
    "K-pop",
    "J-pop",
    "Reggaeton",
    "Opera",
    "Alternative",
    "Grime",
    "Country Rock",
    "Fusion",
    "Garage",
    "Hard Rock",
    "New Wave",
    "Psychedelic",
    "Surf",
    "Trance",
    "Rancheras",
  ];

  return (
    <div className="containerFormSong">
         <img src={"https://cdn.discordapp.com/attachments/1121084510990245908/1184543561564291182/simply_Mesa_de_trabajo_1.png?ex=658c5b28&is=6579e628&hm=5e13e033abe8789cdb9e68f1440a444c83365cffa90f57d6cdb86db6a6e1e518&  "} alt="Logo" className="logoImage" />
      <h2>Song Submission Form</h2>
      <div className="FormSubmitSong">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.entries(formData).map(
            ([key, value]) =>
              key !== "content_artist_id" && (
                <React.Fragment key={key}>
                  {key === "genre" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Selecciona un ${key.replace(/_/g, " ")}`}
                    >
                      <option value="" disabled>
                        Selecciona un género
                      </option>
                      {musicGenres.map((genre) => (
                        <option key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  ) : key === "song_file" ? (
                    <input
                      type="file"
                      name={key}
                      onChange={handleChange}
                      placeholder={`Selecciona un archivo ${key.replace(
                        /_/g,
                        " "
                      )}`}
                    />
                  ) : key === "image" ? (
                    <>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        placeholder={`Introduce la URL de la ${key.replace(
                          /_/g,
                          " "
                        )}`}
                      />
                      <img
                        src={value}
                        alt="Preview"
                        style={{ maxWidth: "200px" }}
                      />
                    </>
                  ) : (
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Introduce ${key.replace(/_/g, " ")}`}
                    />
                  )}
                  <br />
                </React.Fragment>
              )
          )}
          <button type="submit"  id="button">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default SongSubmit;

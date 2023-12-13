// EditPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../pages/artist//pagePrincipalArtist/edit.css";

function EditPage() {
  const { id } = useParams(); // Obtener el id de la URL
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    genre: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/content_artists/${id}`
        );

        if (response.ok) {
          const artistData = await response.json();
          setFormData({
            name: artistData.name || "",
            image: artistData.image || "",
            description: artistData.description || "",
            genre: artistData.genre || "",
          });
        } else {
          console.error("Error al obtener datos del servidor");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/users/content_artists/${id}`,
        {
          method: "PUT", // Utilizar el método PUT para actualizar la información
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Información del artista actualizada con éxito");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar la información del artista:", errorData);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="containerFormEdit">
      <img
        src="https://cdn.discordapp.com/attachments/1121084510990245908/1184543561564291182/simply_Mesa_de_trabajo_1.png?ex=658c5b28&is=6579e628&hm=5e13e033abe8789cdb9e68f1440a444c83365cffa90f57d6cdb86db6a6e1e518&"
        alt="Logo"
        className="logoImage"
      />
      <h2>Edit Artist Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="inputField"
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="inputField"
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="inputField"
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="inputField"
          />
        </label>
        <br />
        <button type="submit" className="submitButton">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPage;

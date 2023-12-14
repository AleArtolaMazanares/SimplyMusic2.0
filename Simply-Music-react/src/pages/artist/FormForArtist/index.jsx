import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PagePrincipalArtist from "../pagePrincipalArtist";
import "./style.css";
import HandleFormForArtist from "../../../components/FormForArtist";

const FormForArtist = () => {
  const { id } = useParams();
  const [infoArtist, setInfoArtist] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    genre: "",
  });

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
          }
        );

        if (response.ok) {
          const usuario = await response.json();
          setUsuario(usuario);
          // Verificar si el formulario ya ha sido enviado
          const idsResponse = await fetch(
            `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`
          );
          if (idsResponse.ok) {
            const info = await idsResponse.json();
            const saveInfo = info[0].form_submitted;
            setInfoArtist(saveInfo === true);
          }
        } else {
          console.error("Error al obtener la información del usuario.");
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerIdUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Continuar con el envío del formulario
      const response = await fetch(
        "http://localhost:3001/users/content_artists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, user_id: id }),
        }
      );

      if (response.ok) {
        const contentUser = await response.json();
        console.log("Formulario enviado:", contentUser.form_submitted);
        console.log("Formulario enviado con éxito");
        setInfoArtist(true);
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el formulario:", errorData);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {infoArtist ? (
        <PagePrincipalArtist contentUserData={usuario} />
      ) : (
        <HandleFormForArtist
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}
    </>
  );
};

export default FormForArtist;

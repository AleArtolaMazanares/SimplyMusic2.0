import React, { useState } from "react";
import Swal from "sweetalert2";

import "./style.css"

function HandleForFeed({ id }) {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    content: "",
    date: new Date().toISOString().slice(0, 16), // Inicializar con la fecha actual
    user_id: id,
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el contenido no esté en blanco
    if (!formData.content.trim()) {
      alert("El contenido no puede estar en blanco");
      return;
    }

    console.log("formData antes de enviar:", formData);

    try {
      const response = await fetch("http://localhost:3001/users/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      // Limpiar los campos del formulario (excepto user_id)
      setFormData({
        content: "",
        date: new Date().toISOString().slice(0, 16), // Restablecer a la fecha actual
        user_id: id,
      });

      // Mostrar la alerta de éxito
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Comentario enviado",
        showConfirmButton: false,
        timer: 1500,
      });

      // Recargar la página después de un breve tiempo (puedes ajustar el tiempo según tus necesidades)
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      // Aquí puedes manejar la respuesta de tu servidor si es necesario
      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);
    } catch (error) {
      console.error("Error de solicitud:", error.message);
    }
  };

  return (
    <div className="formFeedSubmit">
      <div className="feedInput">
      <img src="https://cdn.discordapp.com/attachments/1121084510990245908/1184543561564291182/simply_Mesa_de_trabajo_1.png?ex=658c5b28&is=6579e628&hm=5e13e033abe8789cdb9e68f1440a444c83365cffa90f57d6cdb86db6a6e1e518&" alt="" />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="user_id" value={formData.user_id} />

        <label>
         
          <input
           placeholder="What do you think today?"
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* No se muestra el campo date pero se llena automáticamente */}
        <input
       
          type="hidden"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <button id="buttonFeed" type="submit">POST</button>
      </form>
      </div>
    </div>
  );
}

export default HandleForFeed;
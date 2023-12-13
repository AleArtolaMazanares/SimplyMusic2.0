import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "../messageArtist/style.css"; // Asegúrate de importar el archivo CSS adecuado

const MessageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getCurrentHour = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    message_content: "",
    sent_hour: getCurrentHour(), // Obtener la hora actual al inicializar el componente
    content_artist_id: id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: formData }),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        navigate(`/user/${id}`)
        
      } else {
        console.log("hubo un problema");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <form className="messageForm" onSubmit={handleSubmit}>
      <label htmlFor="message_content" className="formLabel">
        Message Content:
      </label>
      <input
        type="text"
        id="message_content"
        name="message_content"
        value={formData.message_content}
        onChange={handleChange}
        className="inputField"
      />

      {/* Ocultar el campo sent_hour */}
      <input
        type="hidden"
        id="sent_hour"
        name="sent_hour"
        value={formData.sent_hour}
      />

      <button type="submit" className="submitButton">
        Submit
      </button>
    </form>
  );
};

export default MessageForm;

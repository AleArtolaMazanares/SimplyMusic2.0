import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

function Artist() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name_artist: "",
    email: "",
    password: "",
    password_confirmation: "",
    social: "",
    mp3_file: null,
    description_artist: "",
    tags: "",
    user_id: id,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);


  

  useEffect(() => {
    const checkFormSubmitted = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/artists/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.formSubmitted !== null) {
            setFormSubmitted(data.formSubmitted);
          } else {
            console.error("Null form submission data.");
          }
        } else {
          console.error("Error retrieving form submission information.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    checkFormSubmitted();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }
    try {
      const formDataForServer = new FormData();

      for (const key in formData) {
        formDataForServer.append(`artist[${key}]`, formData[key]);
      }

      const response = await fetch("http://localhost:3001/users/artists", {
        method: "POST",
        body: formDataForServer,
        credentials: "include",
      });

      if (response.ok) {
        setFormSubmitted(true);
        window.location.href = "/home"
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error in the request:", error);
    }
  };

  return (
    <div className="formNewArtist">
      <div id="infoNewArtist">
        <div className="logoFormArtist">
          <img
            src="https://cdn.discordapp.com/attachments/1110957174655553606/1181636395106836510/simply_Mesa_de_trabajo_1.png?ex=6581c7a6&is=656f52a6&hm=9b51e57aaaf6ff6cbe6a70c9b360e681e08465d18d188c9ac5a82b62902d69c8&"
            alt=""
          />
        </div>
        <p>
          Join us in this immersive journey and share your music with others!
        </p>
      </div>
      <div className="contentArtistForm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "user_id") {
              return null;
            }

            return (
              <React.Fragment key={key}>
                <label>
                  {key.replace(/_/g, " ")}:
                  {key === "mp3_file" ? (
                    <input type="file" name={key} onChange={handleChange} />
                  ) : (
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  )}
                </label>
                <br />
              </React.Fragment>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Artist;

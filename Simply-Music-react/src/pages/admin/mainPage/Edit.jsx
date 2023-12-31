import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import HandleFeed from "../../../components/handleFeed";
import "../../admin/mainPage/edit.css"

function EditPageAdmin() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    role: "",
    name_users: "",
    email: "",
  });
  const [contentArtistIds, setContentArtistIds] = useState([]);

  const fetchContentArtistIds = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching content artist IDs: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(data[0]?.id);
      setContentArtistIds(data);
    } catch (error) {
      console.error("Error fetching content artist IDs:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const userData = await response.json();
        setUserData(userData);
        setFormData({
          role: userData.role,
          name_users: userData.name_users,
          email: userData.email,
        });
        setLoading(false);

        // Llamar a la función para obtener los IDs del contenido del artista
        fetchContentArtistIds(id);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar datos bajo la clave 'users'
        body: JSON.stringify({ users: formData }),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await response.json();
        console.error("Error updating user information:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="edit-page-container">
      <h2>Edit User Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <label className="form-label">
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="user">User</option>
              <option value="artist">Artist</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name_users"
              value={formData.name_users}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <HandleFeed id={userData.id} />
          {formData.role === "artist" && (
            <p id="contentID">
              {loading
                ? "Loading..."
                : contentArtistIds.length > 0
                ? `Content Artist IDs: ${contentArtistIds[0]?.id}`
                : "Artist has not uploaded anything yet"}
            </p>
          )}
          {formData.role === "artist" && (
            <Link to={`/editArtistPageAdmin/${contentArtistIds[0]?.id}`}>
              <p>View details artist</p>
            </Link>
          )}
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPageAdmin;

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../../components/ButtonDeleteAdmin";

import "./style.css";

function MainAdmin() {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUsers = await fetch("http://localhost:3001/users/users");
        const usersData = await responseUsers.json();

        const filteredUsers = usersData.filter((user) => user.role === "user");
        const filteredArtists = usersData.filter(
          (user) => user.role === "artist"
        );

        setUsers(filteredUsers);
        setArtists(filteredArtists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Update filteredResults based on users, artists, and searchQuery
    setFilteredResults(
      [...users, ...artists].filter((user) =>
        user.name_users.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users, artists]);

  const handleDeleteUser = async (userId, isArtist) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        if (isArtist) {
          setArtists((prevArtists) =>
            prevArtists.filter((artist) => artist.id !== userId)
          );
        } else {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        }
        console.log(`Usuario con ID ${userId} eliminado correctamente.`);
      } else {
        console.error(`Error al eliminar el usuario con ID ${userId}`);
      }
    } catch (error) {
      console.error("Error al intentar eliminar el usuario:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Only update filteredResults if there is a non-empty search query
    if (query.trim() !== "") {
      setFilteredResults(
        [...users, ...artists].filter((user) =>
          user.name_users.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      // If the search query is empty, reset filteredResults to an empty array
      setFilteredResults([]);
    }
  };

  return (
    <div className="contentMainAdmin">
      <div className="contentAdmin">
        <div className="inputAdmin">
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {searchQuery.trim() !== "" && filteredResults.length > 0 && (
              <div>
                {filteredResults.map((result) => (
                  <div className="containerSearchAdmin">
                    <div key={result.id}>
                      <Link id="linkAdmins" to={`/editPageAdmin/${result.id}`}>
                        {result.username}
                        <p >{result.name_users}</p>
                      </Link>
                      <MyButton
                        onClick={() =>
                          handleDeleteUser(result.id, result.role === "artist")
                        }
                      ></MyButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!searchQuery.trim() && (
              <div className="containerGlobalAdmin">
                <div id="containerUserList">
                  <div id="cardsAdminUser">
                    <h3>User List</h3>
                    {users.map((user) => (
                      <div key={user.id}>
                        <Link id="linkAdmins" to={`/editPageAdmin/${user.id}`}>
                          <p>
                            {user.name_users}
                            <MyButton
                              onClick={() => handleDeleteUser(user.id, false)}
                            ></MyButton>
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="contenArtistList">
                  <div>
                    <div id="cardsAdminArtist">
                      <h3>Artist List</h3>

                      {artists.map((artist) => (
                        <div key={artist.id}>
                          <Link
                            id="linkAdmins"
                            to={`/editPageAdmin/${artist.id}`}
                          >
                            <p>
                              {artist.name_users}{" "}
                              <MyButton
                                onClick={() =>
                                  handleDeleteUser(artist.id, true)
                                }
                              ></MyButton>
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainAdmin;

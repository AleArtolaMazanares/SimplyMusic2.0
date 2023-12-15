import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeatilsAdminArtist() {
  const { id } = useParams();
  const [saveContentSong, setSaveContentSong] = useState([]);
  console.log(id);

  const get_id_song = async () => {
    const url = `http://localhost:3001/users/songs/get_songs_by_content_artist/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setSaveContentSong(data);
  };

  useEffect(() => {
    get_id_song();
  }, [id]);

  const handleDelete = async (songId) => {
    try {
      const url = `http://localhost:3001/users/songs/${songId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted song from the state
        setSaveContentSong((prevSongs) =>
          prevSongs.filter((song) => song.id !== songId)
        );
      } else {
        console.error("Failed to delete the song");
      }
    } catch (error) {
      console.error("Error while deleting the song", error);
    }
  };

  return (
    <div>
      <ul className="songList">
        {saveContentSong.map((song) => (
          <li className="songListItem" key={song.id}>
            <h3>Lista de canciones</h3>
            <div className="songInfo">
              <p>
                Name song: {song.title_song} - genre: {song.genre}
              </p>
            </div>
            <button
              className="deleteButton"
              onClick={() => handleDelete(song.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeatilsAdminArtist;

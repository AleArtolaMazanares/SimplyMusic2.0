// Importaciones necesarias
import React, { useState, useRef } from "react";
import "../handleSong/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

// Función principal del componente
function HandleSong({
  song,
  genre,
  audioKey,
  autoPlay,
  handleEnded,
  isPlaying,
  setIsPlaying,
  playPreviousSong,
  playNextSong,
}) {
  // Estado para almacenar el tiempo actual de reproducción
  const [currentTime, setCurrentTime] = useState(0);
  // Estado para almacenar la duración total de la canción
  const [duration, setDuration] = useState(0);

  /* `const audioRef = useRef();` is creating a reference to the audio element in the component. This
  reference can be used to access and manipulate the audio element directly, such as playing or
  pausing the audio, changing the current time, or accessing other properties and methods of the
  audio element. */
  const audioRef = useRef();

  /* This code block is responsible for playing or pausing the audio when the play/pause button is
   clicked. */
  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Función para pausar la reproducción de la canción
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /* La línea `setCurrentTime(audioRef.current.currentTime);` está actualizando la variable de estado
`currentTime` con el tiempo actual de la reproducción de audio. */
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  /* La línea `setDuration(audioRef.current.duration);` está actualizando la variable de estado `duration` con
la duración total de la canción. */
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  /* El bloque de código que proporcionaste maneja el evento de clic en la barra de progreso del reproductor de audio. */
  const handleProgressBarClick = (e) => {
    const clickedTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    audioRef.current.currentTime = clickedTime;
    setCurrentTime(clickedTime);
  };

  // Función para formatear el tiempo en minutos y segundos
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    // Formatear el tiempo en el formato "mm:ss"
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  // Renderización del componente
  return (
    <div>
      {/* Verificación de existencia de datos de la canción */}
      {song.title_song && (
        <>
          {/* Contenedor de información de la canción */}
          <div className="songsContentContainer">
            <img src={song.image} alt="" id="" />
            <p>{song.title_song}</p>
            {/* Mostrar el género si está disponible */}
            {genre && <p>Genre: {genre}</p>}
          </div>

          {/* Contenedor del reproductor de audio */}
          {song.song_file && (
            <div className="custom-audio-container">
              {/* Elemento de audio */}
              <audio
                key={audioKey}
                controls={false}
                autoPlay={autoPlay}
                onEnded={handleEnded}
                ref={audioRef}
                className="custom-audio-player"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleLoadedData}
              >
                {/* Fuente de audio */}
                <source
                  src={`http://localhost:3001${song.song_file.url}`}
                  type="audio/mp3"
                />
                Tu navegador no soporta la etiqueta de audio.
              </audio>

              {/* Visualización del tiempo de reproducción y duración */}
              <div className="song-duration">
                <p>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>

              {/* Barra de progreso */}
              <div
                className="custom-progress-bar-container"
                onClick={handleProgressBarClick}
              >
                <div
                  className="custom-progress-bar"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Controles de reproducción */}
              <div className="custom-controls">
                {/* Botón para reproducir la canción anterior */}
                <button id="buttonsPlaySongs" onClick={playPreviousSong}>
                  <FontAwesomeIcon icon={faStepBackward} />
                </button>

                {/* Botón para reproducir o pausar la canción */}
                <button
                  id="buttonsPlaySongsPlay"
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} />
                  )}
                </button>

                {/* Botón para reproducir la siguiente canción */}
                <button id="buttonsPlaySongs" onClick={playNextSong}>
                  <FontAwesomeIcon icon={faStepForward} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Exportar el componente HandleSong
export default HandleSong;

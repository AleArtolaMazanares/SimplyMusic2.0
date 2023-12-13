import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function BtnPagination({ setCurrentPage, relatedSongs, songsPerPage }) {
  return (
    <div className="btnPagination">
      <button
        onClick={() =>
          setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
        }
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {/* Este código define un componente de botón con el nombre de clase "btnPagination". Cuando este botón está
      Al hacer clic, llama a la función `setCurrentPage` con una función de devolución de llamada como argumento. */}
      <button
        className="btnPagination"
        onClick={() =>
          setCurrentPage((prevPage) =>
            prevPage < Math.ceil(relatedSongs.length / songsPerPage)
              ? prevPage + 1
              : prevPage
          )
        }
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

export default BtnPagination;

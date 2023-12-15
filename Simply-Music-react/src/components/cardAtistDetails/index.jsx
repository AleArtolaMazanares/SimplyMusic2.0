import React from "react";
import "../cardAtistDetails/style.css"
import Messages from "../messages";

function CardArtistDetail({prueba, messages}) {


  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
            <p>{prueba.name}</p>
            <img src={prueba.image} alt="" id="pruebaImage" />
          </div>
        </div>
        <div className="front">
          <div className="img">
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
            <h1 id="titleCard">Simply Music</h1>
            
           <div id="infoCardArtist"><p >{prueba.description}</p></div> 
          <div id="messagesArtistContent"><Messages messages={messages} /></div> 
          
          </div>


          <div className="front-content">
  
            <small className="badge">{prueba.genre}</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>Artist profile</strong>
                </p>
                <svg
                  fillRule="nonzero"
                  height="15px"
                  width="15px"
                  viewBox="0,0,256,256"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
              </div>
              <p className="card-footer">SIMPLY MUSIC &nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default CardArtistDetail;

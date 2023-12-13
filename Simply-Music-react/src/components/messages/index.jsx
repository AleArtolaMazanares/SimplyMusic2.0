import React from 'react';
import '../messages/style.css';

function Messages({ messages }) {
/* La línea de código está creando una nueva matriz llamada `sortedMessages` al hacer una copia de los `messages`
matriz y luego ordenarla en orden descendente según la propiedad `sent_hour` de cada mensaje. El
La función `sort()` se usa con una función de comparación que compara los valores `sent_hour` de dos
mensajes (`a` y `b`) y devuelve un valor negativo, cero o positivo según la comparación.
Al usar `localeCompare()`, la comparación se realiza en función de los valores de cadena de `sent_hour`
propiedad, asegurando que la clasificación se realice correctamente. */
  const sortedMessages = messages.slice().sort((a, b) => b.sent_hour.localeCompare(a.sent_hour));


/* La línea `const lastMessage = sortedMessages[0];` está asignando el primer elemento del
 matriz `sortedMessages` a la variable `latestMessage`. Esto significa que `latestMessage` se mantendrá
 el mensaje más reciente de la matriz `messages`, ya que es el primer elemento después de ordenar el
 matriz en orden descendente según la propiedad `sent_hour`. */
  const latestMessage = sortedMessages[0];

  return (
    <div className="messagesArtist">
      <h2>Weekly message of the artist:</h2>
      {latestMessage ? (
        <div key={latestMessage.id}>
          {latestMessage.message_content} - {latestMessage.sent_hour}
        </div>
      ) : (
        <p>No messages</p>
      )}
    </div>
  );
}

export default Messages;

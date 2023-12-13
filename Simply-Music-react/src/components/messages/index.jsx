import React from 'react';
import '../messages/style.css';

function Messages({ messages }) {
  const sortedMessages = messages.slice().sort((a, b) => b.sent_hour.localeCompare(a.sent_hour));
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

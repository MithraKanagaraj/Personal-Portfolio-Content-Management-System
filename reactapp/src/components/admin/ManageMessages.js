import React, { useEffect, useState } from "react";
import { deleteMessage, getMessages } from "../../api/messageApi";
import "../../styles/admin/ManageMessages.css";

function ManageMessages() {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      loadMessages();
    } catch (error) {
      console.error(error);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="panel-page">
      <h2>Visitor Messages</h2>

      <div className="messages-grid">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div className="message-card" key={msg.id}>
              <h3>{msg.senderName}</h3>
              <p className="msg-email">{msg.senderEmail}</p>
              <p>{msg.message}</p>
              <button className="danger" onClick={() => handleDelete(msg.id)}>Delete</button>
            </div>
          ))
        ) : (
          <div className="message-card">
            <h3>No messages yet</h3>
            <p className="msg-email">Your contact form submissions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMessages;

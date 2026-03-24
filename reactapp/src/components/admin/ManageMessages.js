import React from "react";
import "../../styles/admin/ManageMessages.css";

function ManageMessages() {
  const messages = [
    {
      name: "Arun",
      email: "arun@gmail.com",
      message: "I liked your portfolio. Let's connect."
    },
    {
      name: "Divya",
      email: "divya@gmail.com",
      message: "Your projects look impressive."
    }
  ];

  return (
    <div className="panel-page">
      <h2>Visitor Messages</h2>

      <div className="messages-grid">
        {messages.map((msg, index) => (
          <div className="message-card" key={index}>
            <h3>{msg.name}</h3>
            <p className="msg-email">{msg.email}</p>
            <p>{msg.message}</p>
            <button className="danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageMessages;
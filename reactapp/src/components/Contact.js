import React, { useState } from "react";
import { sendMessage } from "../api/messageApi";
import SectionTitle from "./SectionTitle";
import "../styles/Contact.css";

function Contact({ username, user, profile }) {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendMessage(username, formData);
      alert("Message sent successfully");
      setFormData({
        senderName: "",
        senderEmail: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <section className="contact section-spacing" id="contact">
      <div className="container">
        <SectionTitle subtitle="Get In Touch" title="Contact Me" />

        <div className="contact__grid">
          <div className="contact__info">
            <h3>Let&apos;s build something impactful</h3>
            <p>Interested in collaboration or opportunities? Send a message.</p>
            <div className="contact__details">
              <p><strong>Email:</strong> {user?.email || "mithra@example.com"}</p>
              <p><strong>Location:</strong> {profile?.location || "Tamil Nadu, India"}</p>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="senderName"
              placeholder="Your Name"
              value={formData.senderName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="senderEmail"
              placeholder="Your Email"
              value={formData.senderEmail}
              onChange={handleChange}
            />
            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

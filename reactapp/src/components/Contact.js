import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Contact.css";

function Contact() {
  return (
    <section className="contact section-spacing" id="contact">
      <div className="container">
        <SectionTitle subtitle="Get In Touch" title="Contact Me" />
        <div className="contact__grid">
          <div className="contact__info">
            <h3>Let's build something impactful</h3>
            <p>
              Interested in collaboration, internship opportunities, or project discussions?
              Feel free to connect through the contact form.
            </p>
            <div className="contact__details">
              <p><strong>Email:</strong> mithra@example.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Location:</strong> Tamil Nadu, India</p>
            </div>
          </div>

          <form className="contact__form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Subject" />
            <textarea rows="6" placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
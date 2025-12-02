import { useState } from "react";
import { notify } from "../Toasts/toast";

const Kontakt = ({ onCreateMessage }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      notify.error("Full Name, Email, Your Message are required.");
      return;
    }

    const newMessage = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    if (onCreateMessage) {
      onCreateMessage(newMessage);
    }

    setFormData({ fullName: "", email: "", phone: "", message: "" });
    notify.success(
      "Your message has been sent successfully. We will get back to you as soon as possible."
    );
  };

  return (
    <section className="kontakt-page">
      <div className="kontakt-container">
        <header className="kontakt-header">
          <h1>Contact</h1>
          <p>
            If you have any questions, collaboration requests, or feedback, feel
            free to reach out to me by filling out the form below.
          </p>
        </header>

        <div className="kontakt-grid">
          {/* Left side: contact info card */}
          <div className="kontakt-info">
            <h2>Contact Information</h2>
            <p>
              I do my best to respond as quickly as possible. I typically reply
              within
              <strong> 24 hours</strong>.
            </p>

            <div className="kontakt-info-list">
              <div className="kontakt-info-item">
                <span className="kontakt-info-icon">📧</span>
                <div>
                  <p className="kontakt-info-label">Email</p>
                  <p className="kontakt-info-value">info@ornekmail.com</p>
                </div>
              </div>

              <div className="kontakt-info-item">
                <span className="kontakt-info-icon">📱</span>
                <div>
                  <p className="kontakt-info-label">Phone</p>
                  <p className="kontakt-info-value">+49 123 456 789</p>
                </div>
              </div>

              <div className="kontakt-info-item">
                <span className="kontakt-info-icon">📍</span>
                <div>
                  <p className="kontakt-info-label">Location</p>
                  <p className="kontakt-info-value">
                    Frankfurt am Main, Germany
                  </p>
                </div>
              </div>
            </div>

            <p className="kontakt-info-hint">
              You can reach me preferably via email or through this contact
              form.
            </p>
          </div>

          {/* Right side: form */}
          <form className="kontakt-form" onSubmit={handleSubmit}>
            <div className="kontakt-input-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="kontakt-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="kontakt-input-group">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+49 ..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="kontakt-input-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="How can I help you?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="kontakt-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;

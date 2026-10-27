import React, { useState } from "react";
import PortfolioNav from "../Portfolio/PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";
import "./ContactPage.css";

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Residential Architecture",
    location: "",
    scope: "",
    message: "",
    preferredMethod: "WhatsApp"
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({ route }, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate deliberate studio confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="contact-page">
      <PortfolioNav onNavigate={handleNav} activeRoute="/contact" />
      <div className="contact-ambient-glow" aria-hidden="true" />

      <div className="contact-container">
        {/* --- Hero Statement --- */}
        <section className="contact-hero">
          <div className="contact-eyebrow">
            <span className="dot" />
            <span>Studio Inquiries & Engagements</span>
          </div>
          <h1 className="contact-title">
            Let's discuss <span className="accent">your space.</span>
          </h1>
          <p className="contact-intro-lead">
            Whether you are planning a new residence, renovating an existing property, or designing a commercial interior in Purnia or nearby regions of Bihar, we welcome your conversation. Tell us about your site, requirements, and timeline.
          </p>
        </section>

        {/* --- Main Two-Column Layout --- */}
        <div className="contact-main-grid">
          {/* Left Column: Architectural Enquiry Form */}
          <div className="enquiry-card">
            <div className="enquiry-card-header">
              <h2>Project Enquiry</h2>
              <p>
                Fill out the details below. Our design team reviews every enquiry and responds within one business day.
              </p>
            </div>

            {submitted ? (
              <div className="submit-success-banner" role="status">
                <h3>Thank you, {formData.name || "Client"}.</h3>
                <p>
                  Your project enquiry has been received by our studio in Purnia. We will review your requirements and reach out via your preferred channel ({formData.preferredMethod}) to schedule an initial consultation.
                </p>
                <button
                  type="button"
                  className="submit-button"
                  style={{ marginTop: "24px" }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      projectType: "Residential Architecture",
                      location: "",
                      scope: "",
                      message: "",
                      preferredMethod: "WhatsApp"
                    });
                  }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">
                      Phone / WhatsApp <span className="req">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="projectType">
                      Project Type <span className="req">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="Residential Architecture">Residential Architecture (New Build)</option>
                      <option value="Interior Design">Interior Design (Home / Apartment)</option>
                      <option value="Renovation">Renovation & Structural Rework</option>
                      <option value="Commercial Space">Commercial / Office Space</option>
                      <option value="Retail Interior">Retail Store / Showroom</option>
                      <option value="Consultation & Planning">Site Consultation & Master Planning</option>
                      <option value="Other">Other Architectural Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="location">
                      Project Location / City <span className="req">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="location"
                      name="location"
                      required
                      placeholder="e.g. Purnia, Katihar, Kishanganj..."
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="scope">
                      Approximate Scope / Area (Optional)
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="scope"
                      name="scope"
                      placeholder="e.g. 2,400 sq ft / 4 BHK / Plot Size"
                      value={formData.scope}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="message">
                    What are you planning? <span className="req">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    required
                    placeholder="Briefly describe your space, family requirements, plot orientation, or commercial goals..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <span className="form-label" id="pref-method-label">
                    Preferred Contact Method
                  </span>
                  <div className="contact-pref-group" role="radiogroup" aria-labelledby="pref-method-label">
                    {["WhatsApp", "Phone Call", "Email"].map((method) => (
                      <label
                        key={method}
                        className={`pref-label ${formData.preferredMethod === method ? "active" : ""}`}
                      >
                        <input
                          type="radio"
                          name="preferredMethod"
                          value={method}
                          checked={formData.preferredMethod === method}
                          onChange={handleChange}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Transmitting..." : "Send Studio Enquiry"}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Presence & Local Positioning */}
          <div className="studio-details-col">
            <div className="studio-info-block">
              <span className="studio-info-label">Studio Location</span>
              <h3 className="studio-info-title">Purnia, Bihar</h3>
              <p className="studio-info-desc">
                Das Architects operates directly from <strong>Purnia</strong>, serving clients across Purnea district, Seemanchal, and nearby districts of Eastern and Northern Bihar.
              </p>

              <ul className="studio-channels-list">
                <li>
                  <span className="term">Direct Email</span>
                  <a className="val" href="mailto:inquiries@dasarchitects.com">
                    inquiries@dasarchitects.com
                  </a>
                </li>
                <li>
                  <span className="term">Practice Focus</span>
                  <span className="val">Residential & Commercial</span>
                </li>
                <li>
                  <span className="term">Studio Hours</span>
                  <span className="val">Mon – Sat, 10:00 AM – 6:30 PM</span>
                </li>
                <li>
                  <span className="term">Consultations</span>
                  <span className="val">By Appointment</span>
                </li>
              </ul>
            </div>

            <div className="studio-info-block regional-coverage-card">
              <h4>Regional Practice Coverage</h4>
              <p>
                We regularly work on site feasibility, architectural planning, and interior detailing for clients in:
              </p>
              <div className="regional-tags">
                <span className="regional-tag">Purnia City</span>
                <span className="regional-tag">Kasba</span>
                <span className="regional-tag">Banmankhi</span>
                <span className="regional-tag">Katihar</span>
                <span className="regional-tag">Kishanganj</span>
                <span className="regional-tag">Araria</span>
                <span className="regional-tag">Saharsa</span>
                <span className="regional-tag">Madhepura</span>
              </div>
            </div>

            <div className="studio-info-block">
              <span className="studio-info-label">Consultation Process</span>
              <h4 style={{ fontSize: "16px", color: "#F7F2EF", margin: "0 0 10px 0" }}>
                Initial Meeting & Site Visit
              </h4>
              <p className="studio-info-desc">
                For new builds and substantial renovations, we begin with a structured consultation to review site topography, access road widths, local municipal guidelines, and your programmatic wishlist.
              </p>
            </div>

            {/* --- Google Maps Interactive Atelier Location --- */}
            <div className="studio-info-block studio-map-block">
              <span className="studio-info-label">Studio Coordinates</span>
              <h4 style={{ fontSize: "16px", color: "#F7F2EF", margin: "0 0 14px 0" }}>
                Das Architects — Purnia, Bihar
              </h4>
              <div className="contact-map-frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.1188152556156!2d87.48042847474304!3d25.76663877734875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff9ba5ae19725%3A0xda510ac14a2b392!2sDAS%20ARCHITECTS!5e0!3m2!1sen!2sin!4v1793107416975!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Das Architects Purnia Studio Location"
                  className="contact-map-iframe"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Global Glassmorphic Signature Footer --- */}
        <GlassmorphicFooter />
      </div>
    </div>
  );
};

export default ContactPage;

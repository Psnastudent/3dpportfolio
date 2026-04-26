import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail, FiSend, FiMapPin, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import MagicCard from '../MagicCard/MagicCard';
import './Contact.css';

// ─── EmailJS Config ───────────────────────────────────
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_z38werk';
const EMAILJS_TEMPLATE_ID = 'template_4qdj5li';
const EMAILJS_PUBLIC_KEY = 'Z40uXn4MGXLFamYrT';
// ──────────────────────────────────────────────────────

const links = [
  {
    icon: <FiLinkedin size={22} />,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/santhosh-kumar-s-48b451297/',
    color: '#0A66C2',
  },
  {
    icon: <FiGithub size={22} />,
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/Psnastudent',
    color: '#f0eef5',
  },
  {
    icon: <FiMail size={22} />,
    label: 'Email',
    value: 'santhoshkumar37937@gmail.com',
    href: 'mailto:santhoshkumar37937@gmail.com',
    color: '#EA4335',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('error', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'santhoshkumar37937@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      showToast('error', 'Failed to send message. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's work together</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__links"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <MagicCard className="contact__card">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact__card-inner"
                  >
                    <div className="contact__card-icon" style={{ color: link.color }}>
                      {link.icon}
                    </div>
                    <div>
                      <div className="contact__card-label">{link.label}</div>
                      <div className="contact__card-value">{link.value}</div>
                    </div>
                    <FiSend className="contact__card-arrow" size={16} />
                  </a>
                </MagicCard>
              </motion.div>
            ))}

            <div className="contact__location">
              <FiMapPin size={16} />
              <span>India</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagicCard className="contact__form">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="contact__form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={sending}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="contact__form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={sending}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__form-label">Message</label>
                  <textarea
                    id="message"
                    className="contact__form-textarea"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={sending}
                  />
                </div>
                <button
                  type="submit"
                  className={`contact__form-btn ${sending ? 'contact__form-btn--sending' : ''}`}
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </MagicCard>
          </motion.div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className={`contact__toast contact__toast--${toast.type}`}
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="contact__toast-icon">
                {toast.type === 'success' ? <FiCheck size={18} /> : <FiX size={18} />}
              </div>
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          className="contact__footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>Designed & Built by <strong>Santhosh Kumar S</strong> with ❤️</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}


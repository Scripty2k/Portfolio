<template>
  <div class="contact">
    <!-- Notification -->
    <div v-if="showNotification" :class="['notification', notificationType]">
      {{ notificationMessage }}
      <button @click="showNotification = false" class="notification-close">×</button>
    </div>

    <section class="hero-section">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1>Contact</h1>
          <p class="hero-subtitle">Let's create something together</p>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="info-block">
              <h2>Get in touch</h2>
              <p>
                I'm always interested in hearing about new opportunities, 
                collaborations, or just having a conversation about design and technology.
              </p>
            </div>

            <div class="contact-methods">
              <div class="contact-method">
                <span class="method-label">Email</span>
                <a href="mailto:your.email@example.com" class="method-value">
                  scripty2k@gmail.com
                </a>
              </div>
              
              <div class="contact-method">
                <span class="method-label">Phone</span>
                <a href="tel:+15551234567" class="method-value">
                  +06 21 87 10 25
                </a>
              </div>
              
              <div class="contact-method">
                <span class="method-label">Location</span>
                <span class="method-value">
                  Nijmegen, The Netherlands
                </span>
              </div>
            </div>

            <div class="social-section">
              <h3>Follow</h3>
              <div class="social-links">
                <a href="https://github.com/Scripty2k" target="_blank" rel="noopener noreferrer" class="social-link">
                  <span>GitHub</span>
                  <span>→</span>
                </a>
                <a href="https://www.linkedin.com/in/amal-rahimli-46971226b/" target="_blank" rel="noopener noreferrer" class="social-link">
                  <span>LinkedIn</span>
                  <span>→</span>
                </a>
                <a href="https://www.youtube.com/@scripty2k" target="_blank" rel="noopener noreferrer" class="social-link">
                  <span>Youtube</span>
                  <span>→</span>
                </a>
                <a href="https://www.instagram.com/scripty2k/" target="_blank" rel="noopener noreferrer" class="social-link">
                  <span>Instagram</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="contact-form-container">
            <form @submit.prevent="submitForm" class="contact-form">
              <h2>Send a message</h2>
              
              <div class="form-group">
                <label for="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  placeholder="Your name"
                >
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  placeholder="your@email.com"
                >
              </div>
              
              <div class="form-group">
                <label for="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="form.company" 
                  placeholder="Your company (optional)"
                >
              </div>
              
              <div class="form-group">
                <label for="subject">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  required 
                  placeholder="Project inquiry"
                >
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="6" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="availability-section">
      <div class="container">
        <div class="availability-content">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span>Current status: Open to collaboration</span>
          </div>
          <p>Currently looking for collabs and jobs in the future!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success'
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        // EmailJS configuration from environment variables
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        
        // Check if all required environment variables are set
        if (!serviceID || !templateID || !publicKey) {
          throw new Error('EmailJS configuration is missing. Please check your environment variables.')
        }
        
        // Prepare template parameters
        const templateParams = {
          from_name: this.form.name,
          from_email: this.form.email,
          company: this.form.company || 'Not specified',
          subject: this.form.subject,
          message: this.form.message,
          to_email: 'amalrahimli06@gmail.com'
        }
        
        // Send email using EmailJS
        await emailjs.send(serviceID, templateID, templateParams, publicKey)
        
        this.showSuccessNotification('Message sent successfully! I\'ll get back to you soon.')
        this.resetForm()
        
      } catch (error) {
        console.error('EmailJS Error:', error)
        this.showErrorNotification('Failed to send message. Please try again or contact me directly.')
      } finally {
        this.isSubmitting = false
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      }
    },
    showSuccessNotification(message) {
      this.notificationMessage = message
      this.notificationType = 'success'
      this.showNotification = true
      setTimeout(() => {
        this.showNotification = false
      }, 5000)
    },
    showErrorNotification(message) {
      this.notificationMessage = message
      this.notificationType = 'error'
      this.showNotification = true
      setTimeout(() => {
        this.showNotification = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
.contact {
  background: #fff0df;
  position: relative;
}

.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background: #22c55e;
}

.notification.error {
  background: #ef4444;
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.hero-section {
  padding: 8rem 0 4rem;
  background: #fff0df;
}

.hero-content h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #292524;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.contact-section {
  padding: 6rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.info-block h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1.5rem;
}

.info-block p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-method {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.method-label {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.method-value {
  font-size: 1.1rem;
  color: #292524;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.method-value:hover {
  opacity: 0.6;
}

.social-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;
  font-weight: 500;
}

.social-link:hover {
  color: #292524;
}

.contact-form-container {
  background: #f5e5d4;
  padding: 3rem;
}

.contact-form h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #292524;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  color: #292524;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  background: #fff0df;
  color: #292524;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #292524;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.btn {
  width: 100%;
  padding: 1.25rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.availability-section {
  padding: 4rem 0;
  background: #fff0df;
  text-align: center;
}

.availability-content {
  max-width: 600px;
  margin: 0 auto;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #292524;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.availability-content p {
  color: #666;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 3rem;
  }

  .contact-section {
    padding: 4rem 0;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-info {
    gap: 3rem;
  }

  .contact-form-container {
    padding: 2rem;
  }

  .availability-section {
    padding: 3rem 0;
  }

  .status-indicator {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
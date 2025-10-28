<template>
  <div class="about">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1>About</h1>
          <p class="hero-subtitle">Developer, Designer, Creative</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="content-grid">
          <div class="content-main">
            <div class="text-block">
              <h2>What I make</h2>
              <p>
                I make digital products like websites, web apps, and interactive experiences. 
                I also create music and videos as a hobby. My goal is to blend creativity with technology
                to deliver engaging and effective solutions.
              </p>
            </div>

            <div class="text-block">
              <h2>My dream</h2>
              <p>
                I aim to innovate at the intersection of technology and creativity. I love putting my mind to 
                projects with not only my coding skills but also my creative skills. 
                Whether it's building a sleek web app or producing a catchy tune, I strive to create work
                that resonates and inspires.
              </p>
            </div>

            <div class="text-block">
              <h2>Approach</h2>
              <p>
                I focus on clean, maintainable code and intuitive user interfaces. 
                Every project starts with understanding the problem deeply, then crafting 
                solutions that are both technically sound and visually compelling.
              </p>
            </div>
          </div>

          <div class="content-sidebar">
            <div class="info-card">
              <h3>What I'm busy with right now</h3>
              <ul>
                <li>Producing my next album</li>
                <li>Musixx project development</li>
              </ul>
            </div>

            <div class="info-card">
              <h3>Experience</h3>
              <div class="experience-item">
                <span class="year">2024 - 2025</span>
                <span class="role">Internship: Odoo Developer</span>
                <span class="company">NHMB Software</span>
              </div>

              <div class="experience-item">
                <span class="year">2023</span>
                <span class="role">Promotional video for Rhion</span>
                <span class="company">Rhion</span>
              </div>
            </div>

            <div class="info-card">
              <h3>Education</h3>
              <div class="education-item">
                <span class="degree">Software Developer MBO Niveau 4 (ENG/NL)</span>
                <span class="school">Sintlucas Eindhoven</span>
                <span class="year">2022 - 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2>Technical Expertise</h2>
        <div class="skills-categories">
          <div class="skill-group">
            <h3>Languages</h3>
            <div class="skill-list">
              <span>JavaScript</span>
              <span>C#</span>
              <span>Python</span>
              <span>HTML/CSS</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Frontend</h3>
            <div class="skill-list">
              <span>Vue.js</span>
              <span>React</span>
              <span>Three.js</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Backend</h3>
            <div class="skill-list">
              <span>Node.js</span>
              <span>PostgreSQL</span>
            </div>
          </div>
          
          <div class="skill-group">
            <h3>Tools</h3>
            <div class="skill-list">
              <span>Git</span>
              <span>Docker</span>
              <span>Figma</span>
              <span>Adobe After Effects</span>
              <span>Premiere Pro</span>
              <span>Touch Designer</span>
              <span>FL Studio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  background: #fff;
}

.hero-section {
  padding: 8rem 0 4rem;
  background: #f8f8f8;
}

.hero-content h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #000;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.content-section {
  padding: 6rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 6rem;
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.text-block h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1.5rem;
}

.text-block p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
}

.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.info-card {
  padding: 2rem;
  background: #f8f8f8;
  border-radius: 0;
}

.info-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-card li {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.experience-item,
.education-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2rem;
}

.experience-item:last-child,
.education-item:last-child {
  margin-bottom: 0;
}

.year {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.role,
.degree {
  font-weight: 600;
  color: #000;
}

.company,
.school {
  color: #666;
  font-size: 0.95rem;
}

.skills-section {
  padding: 6rem 0;
  background: #f8f8f8;
}

.skills-section h2 {
  text-align: center;
  margin-bottom: 4rem;
  color: #000;
}

.skills-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.skill-group h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-list span {
  color: #666;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;
}

.skill-list span:hover {
  color: #000;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 3rem;
  }

  .content-section {
    padding: 4rem 0;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .content-main {
    gap: 3rem;
  }

  .content-sidebar {
    gap: 2rem;
  }

  .info-card {
    padding: 1.5rem;
  }

  .skills-section {
    padding: 4rem 0;
  }

  .skills-categories {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
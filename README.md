# Portfolio Website

A modern, responsive portfolio website built with Vue 3, Vue Router, and Vite.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Single Page Application**: Smooth navigation with Vue Router
- **Modern UI**: Clean and professional design with CSS animations
- **Portfolio Sections**: 
  - Home: Hero section with introduction
  - About: Personal information and skills
  - Projects: Showcase of your work
  - Contact: Contact form and information

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **Vue Router**: Official router for Vue.js
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with flexbox and grid

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

To customize this portfolio for your own use:

1. **Update Personal Information**: 
   - Edit the content in `src/views/Home.vue`, `src/views/About.vue`, and `src/views/Contact.vue`
   - Replace placeholder text with your actual information

2. **Add Your Projects**: 
   - Update the projects array in `src/views/Projects.vue`
   - Add your actual project details, links, and technologies

3. **Styling**: 
   - Modify the CSS in each component to match your preferred design
   - Update colors, fonts, and layouts as needed

4. **Add Images**: 
   - Replace placeholder project images with actual screenshots
   - Add your profile photo to the About section

## Project Structure

```
src/
├── components/
│   └── Navbar.vue          # Navigation component
├── views/
│   ├── Home.vue            # Home page
│   ├── About.vue           # About page
│   ├── Projects.vue        # Projects showcase
│   └── Contact.vue         # Contact page
├── router/
│   └── index.js            # Vue Router configuration
├── App.vue                 # Main application component
└── main.js                 # Application entry point
```

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

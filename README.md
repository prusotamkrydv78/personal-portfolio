# Portfolio Website

A modern portfolio website built with Express.js, EJS, Tailwind CSS, GSAP, and Locomotive Scroll.

## Features

- Responsive design for all devices
- Dark/Light mode toggle
- Smooth scrolling with Locomotive Scroll
- Animations with GSAP
- Contact form
- Project showcase
- Skills section
- About me section

## Technologies Used

- **Backend**: Express.js, Node.js
- **Frontend**: EJS, Tailwind CSS, JavaScript
- **Animations**: GSAP, Locomotive Scroll
- **Deployment**: Vercel/Netlify (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev:all
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio/
├── app.js                # Main Express application
├── package.json          # Project dependencies
├── public/               # Static assets
│   ├── css/              # CSS files
│   ├── js/               # JavaScript files
│   └── images/           # Images
├── views/                # EJS templates
│   ├── layouts/          # Layout templates
│   ├── pages/            # Page templates
│   └── partials/         # Reusable components
└── README.md             # Project documentation
```

## Customization

- Update the content in the EJS files to personalize your portfolio
- Modify the Tailwind CSS configuration in `tailwind.config.js`
- Add your own projects and skills
- Customize the color scheme by changing the primary and secondary colors

## Deployment

This portfolio can be easily deployed to platforms like Vercel or Netlify.

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploying to Netlify

1. Create a `netlify.toml` file:
   ```toml
   [build]
     command = "npm run build"
     publish = "public"
   ```

2. Deploy using Netlify CLI or connect your GitHub repository to Netlify.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const privateCridentials = {
  SERVICE_ID: process.env.SERVICE_ID,
  CONTACT_FORM_TEMPLATE_ID: process.env.CONTACT_FORM_TEMPLATE_ID,
  SUBSCRIBE_FORM_TEMPLATE_ID: process.env.SUBSCRIBE_FORM_TEMPLATE_ID,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
} 
// Single route for the entire portfolio
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Prusotam - Creative Web Developer',
    page: 'home',
    cridentials: {...privateCridentials}
  });
});

// Handle form submission via AJAX
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });

  // Send a JSON response for AJAX handling
  res.json({
    success: true,
    message: 'Your message has been sent successfully!'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

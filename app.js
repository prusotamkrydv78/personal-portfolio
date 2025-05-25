const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./database/dbConnection');
const LinksRouter = require('./Routes/Links.routes');
const AboutsModel = require('./Models/Abouts.model');
const SkillsModel = require('./Models/Skills.model');
const ProjectsRouter = require('./Routes/Projects.routes');
const AboutsRouter = require('./Routes/Abouts.routes');
require('dotenv').config();
connectDB()

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

//Externals route
app.use("/",LinksRouter)
app.use("/",SkillsModel)
app.use("/",ProjectsRouter)
app.use("/",AboutsRouter)
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

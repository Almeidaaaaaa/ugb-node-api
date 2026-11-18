const path = require("path");
const express = require("express");
const sequelize = require("./database/database.js");

const Movie = require("./models/Movie.js");
const Hero = require("./models/Hero.js");
const heroesRoutes = require("./routes/heroes.routes.js")


const app = express(); // express node e api
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

Hero.belongsToMany(Movie,{
    through: "HeroMovies"
})

Movie.belongsToMany(Hero,{
    through: "MoviesHero"
})

app.use("/heroes", heroesRoutes);

sequelize
    .sync()
    .then(()=> {
        console.log("Banco de Dados sincronizado");
        
    })
    .catch((error) => {
        console.log("Erro a sincronizar o Banco", error);
        
    })

module.exports = app;
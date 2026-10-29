const express = require("express");
const sequelize = require("./database/database.js");

const Movie = require("./models/Movie.js");
const Hero = require("./models/Hero.js");
const heroesRoutes = require("./routes/heroes.routes.js")

const app = express(); // express node e api

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
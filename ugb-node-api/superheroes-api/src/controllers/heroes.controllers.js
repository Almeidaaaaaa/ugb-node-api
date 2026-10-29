const Hero = require("../models/Hero.js");

async function list(req, res){  // chamada assincrona, tem que esperar a execução e depois retorna 
    const movies = await Hero.findAll()
    return res.status(200).json(movies);
}

module.exports = {
    list
};
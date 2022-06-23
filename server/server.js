const express = require("express");
const cors = require('cors');
require('dotenv').config();
//console.log(process.env);
// Include Sequelize module.
const PORT = process.env.SERVER_PORT || 4000;
const Sequelize = require('sequelize');

const dbConfig = {
  DB: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
},
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const City = require('./models/cities')(sequelize);
const Country = require('./models/countries')(sequelize);
const app = express();

app.get("/", (req, res) => {
  // res.send("hello");
  Users.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
})
app.get("/countries",getCountries);
app.get("/cities",getCities);
app.post("/cities", createCity);
app.delete('/cities/:id', deleteCity);
function deleteCity(req,res)
{
    const del = "DELETE FROM cities WHERE city_id="+req.params.id;;

    sequelize.query(del,{type:Sequelize.QueryTypes.DELETE})
    .then((resp)=>{
        res.send("inserted");
    });
}
function createCity(req, res)
{
    const name= req.body.name;
    const rating=req.body.rating;
    const countryId = req.body.countryId;

    const insert = 'INSERT INTO public.cities(name, rating, country_id, "createdAt")';
    const values  = `VALUES ('${name}', ${rating}, ${countryId}, NOW());`;
    
    sequelize.query(insert+values,{type:Sequelize.QueryTypes.INSERT})
    .then((resp)=>{
        res.send("inserted");
    });
}
function getCountries(req, res)
{
    sequelize.query("SELECT * FROM countries",{type:Sequelize.QueryTypes.SELECT})
        .then((data)=>{
            res.send(data);
        })
}
function getCities(req, res)
{
    sequelize.query("SELECT * FROM cities",{type:Sequelize.QueryTypes.SELECT})
        .then((data)=>{
            res.send(data);
        })
}
const cities = [
    {name:"Chicago", rating:9, country_id:1},
    {name:"Atlanta", rating:9, country_id:1}
]
app.get("/seed", async (req, res) => {
  // res.send("hello");
  for (let i in cities)
    await City.create(cities[i]);
  res.send("done");
})

console.log("about to start");
app.listen(PORT, () => {
  console.log("ok on port " + PORT);
});

const Users = sequelize.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {

    type: Sequelize.STRING

  },
  password: {

    type: Sequelize.STRING

  },
  email: {

    type: Sequelize.STRING

  },
  status: {

    type: Sequelize.INTEGER

  },
  role_id: {

    type: Sequelize.INTEGER

  }
});
/*
CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  status INT,
  role_id INT,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP
);
*/
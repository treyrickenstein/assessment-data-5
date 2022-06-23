const Sequelize = require('sequelize'); 
module.exports =(sequelize)=>{
    const City= sequelize.define("cities", {
    city_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
  
      type: Sequelize.STRING
  
    },
  
    rating: {
  
      type: Sequelize.INTEGER
  
    },
    country_id: {
  
      type: Sequelize.INTEGER
  
    }
  });
  return City;
}
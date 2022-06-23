const Sequelize = require('sequelize'); 
module.exports =(sequelize)=>{
    const Country= sequelize.define("countries", {
    country_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
  
      type: Sequelize.STRING
  
     }
  });
  return Country;
}
const app = require("./app");
const { PORT } = process.env;

//Lancer l'application
const startApp = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
  });
};

startApp();

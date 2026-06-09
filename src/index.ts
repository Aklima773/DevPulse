
import app from "./app";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

const main = async () =>{
  
    await initDB();
   if (process.env.NODE_ENV !== 'production') {
    app.listen(config.port, () => {
      console.log(`Server is running locally on port ${config.port}`);
    });
  }

};

main();
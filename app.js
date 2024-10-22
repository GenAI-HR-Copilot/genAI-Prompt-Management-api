import express from "express";
import cors from "cors";
import db from "./src/repository/db.js";
import { testAppwriteConnection, initAppwrite } from "./src/repository/appwrite.js";
// import { initDatabase } from "./src/repository/db.js";
import apiRoute from "./src/routes/apiroutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
app.use(cors());

    
const initApp = async () => {
    try {
      // const db = await initDatabase();
      const appwriteClient = initAppwrite();
      const isAppwriteConnected = await testAppwriteConnection(appwriteClient);
      if (!isAppwriteConnected) {
        throw new Error("Failed to connect to Appwrite");
      }
      app.locals.db = db;
      app.locals.appwriteClient = appwriteClient;
      app.use('/api/auth', authRoutes);
      app.use("/api", apiRoute);
      app.use(errorHandler);
  
      const port = 9090;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.error("Failed to initialize the application:", error);
      process.exit(1);
    }
  };
  
  initApp();
  
  export default app;

  
// Import Mongoose
import mongoose from "mongoose";
// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

// Start Import Models

import CourseModel from "../models/Schoolmng_db/CourseModel";
import ExamModel from "../models/Schoolmng_db/ExamModel";
import StudentModel from "../models/Schoolmng_db/StudentModel";
import TeacherModel from "../models/Schoolmng_db/TeacherModel";
import UserModel from "../models/Schoolmng_db/UserModel";

// End Import Models

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info("MongoDB connected at: " + properties.schoolmng_db_dbUrl);

    // Start Init Models

		CourseModel.init();
		ExamModel.init();
		StudentModel.init();
		TeacherModel.init();
		UserModel.init();
 // End Init Models
  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");
    try {
      this.dbConnection_schoolmng_db = await mongoose.connect(
        "mongodb://" + properties.schoolmng_db_dbUrl,
        { useNewUrlParser: true }
      );
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_schoolmng_db;
  }
}

export default new Database();

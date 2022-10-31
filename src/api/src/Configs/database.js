import mongoose from "mongoose";

try {
  await mongoose
    .connect(
      `mongodb+srv://DylanC-Code:${process.env.DB_PASS}@${process.env.DB_NAME}.op9zazd.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("**********************************");
      console.log(
        `Connected to mongo, database name : '${process.env.DB_NAME}'\n\n`
      );
    });
} catch (error) {
  console.error(error);
}

export default mongoose;

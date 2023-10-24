import createServer from "./utils/server";
import dotenv from 'dotenv';
import connect from "./utils/connect";

const app = createServer();
dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect() // Mongoose connection
  console.log(`Server running at http://localhost:${port}`);
});
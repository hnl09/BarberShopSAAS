import createServer from "./util/server";
import dotenv from 'dotenv';

const app = createServer();
dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
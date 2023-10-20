import createServer from "./util/server";

const app = createServer();
const port: number = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const app = require("./app");

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

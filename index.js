// *---------------------- template ---------------------- *\\

const app = require("./src/app");

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

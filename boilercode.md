const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded








app.listen(PORT, () => {
    console.log(`server is running, on port : ${PORT}`)
})
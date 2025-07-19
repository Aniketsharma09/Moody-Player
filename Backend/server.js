require('dotenv').config();
const app = require('./src/app');
const connectT0DB = require('./src/db/db');

connectT0DB();
app.listen(3000,(req, res) => {
    console.log("server is running on port 3000 ");
})
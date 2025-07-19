const mongoose = require('mongoose');

function connectT0DB(){
    mongoose.connect(process.env.MONGODB_KEY)
    .then(() => console.log('connected to database')
    )
    .catch((err) => console.log(err)
    )
}

module.exports = connectT0DB
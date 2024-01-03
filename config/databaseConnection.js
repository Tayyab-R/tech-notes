const mongose = require('mongoose')

const connectDB = async () => {
    try{
        await mongose.connect(process.env.DATABASE_URI)
    }
    catch(err){
        console.log(err)

    }
}

module.exports = connectDB
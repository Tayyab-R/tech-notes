const mongoose = require('mongoose')
const AutoIncreament = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title : {
        type: String,
        required: true,
    },
    
    text: {
        type: String,
        required: true,

    },

    completed: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true

    }
)

noteSchema.plugin(AutoIncreament, {
    inc_feild: 'ticket',
    id: 'ticketnums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
mongoose.connect(url)
const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required:true
  },
})
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Phone = mongoose.model('Phone', phoneSchema)
module.exports = Phone
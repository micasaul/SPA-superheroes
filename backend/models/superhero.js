const mongoose = require('mongoose')

const superheroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  realName: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  house: {
    type: String,
    required: true,
    enum: ['Marvel', 'DC']
  },
  biography: {
    type: String,
    required: true
  },
  equipment: {
    type: String
  },
  images: {
    type: [String],
    validate: {
      validator: (arr) => arr.length >= 1,
      message: 'Debe tener al menos una imagen'
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Superhero', superheroSchema)
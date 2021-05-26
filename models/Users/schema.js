const mongoose = require('mongoose');
const { Schema } = mongoose; 

module.exports = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  surname: {             // not required
    type: Schema.Types.String,
    minLength: 1,
    maxLength: 100,
  },
  login: {
    type: Schema.Types.String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  mail: {
      type: Schema.Types.String,
      minLength: 0,
      maxLength: 255,
    },
  telephone: {
      type: Schema.Types.String, 
      minLength: 5,
      maxLength: 15,
    },
  dateBirthday: {
    type: Schema.Types.String,
    required: true, // нужно для определения возрастной категории при просмотре 
    minLength: 5,
    maxLength: 15,
  },
  status: { // поле для определения мастерства в попугаях
    type: Number,
  }
}, { timestamps: true });

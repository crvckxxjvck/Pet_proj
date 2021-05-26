const mongoose = require('mongoose');
const { Schema } = mongoose; 

module.exports = new Schema({
  filename: {   // имя файла
    type: String,
    required: true,
    minLength: 1,
    maxLength: 250,
  },
  title: {   // название фотографии, придуманное автором
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  author: {  // ид автора
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  loaddate: { // дата загрузки
    required: true,
    type: String,
  }, 
  tags: [{   // теги
    type: String,
    minLength: 1,
    maxLength: 50,
  }],
  exif: {  // exif
    makedate: {
      type: Date,
    },
    hardwarebrend: {
      type: String,
    },
    hardwaremodel: {
      type: String,
    },
  },
  rate: {
    artistic: {
      type: String, // хоть рейтинг и в цифрах, но лучше оставить стрингу. Потом будет меньше мороки в сопровождении типа данных
      minLength: 1,
      maxLength: 3, // значение выбрано для ограничений до 3х символов перед иконкой
    },
    originally: {
      type: String,
      minLength: 1,
      maxLength: 3,
    },
    technical: {
      type: String, 
      minLength: 1,
      maxLength: 3,
    },
    like: {
      type: String, 
      minLength: 1,
      maxLength: 3,
    },
    dislike: {    // stars = art*c1 + orig*c2 + tech*c3 + like*c4 + unlike*c5      // {c1: 0.32, c2:0.56, c3:0.3, c4:0.8, c5:3.4}
      type: String, 
      minLength: 1,
      maxLength: 3,
    },
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    text: {
      type: String,
      minLength: 1,
      maxLength: 3,
    },
    date: {
      type: Date,
    }
  }],
  views: {
    type: Number,
  },
  
}, { timestamps: true });
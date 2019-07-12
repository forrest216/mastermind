let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let scoreSchema = new Schema({
   initials: {
      type: String,
      maxlength: 3,
      required: true
   },
   numGuesses: {
      type: Number,
      required: true
   },
   seconds: {
      type: Number,
      required: true
   }
}, {
   timestamps: true
});

scoreSchema.pre('save', function(next) {
   this.initials = this.initials.substr(0, 3).toUpperCase();
   next();
 });

module.exports = mongoose.model('Score', scoreSchema);
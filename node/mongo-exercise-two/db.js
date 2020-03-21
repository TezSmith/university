const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Successful Connection'))
  .catch(err => console.log(`Connection Failed: ${err}`))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  try {
   const results = await Course 
     .find()
     .and({isPublished: true}, { tags: { $in: ['frontend', 'backend'] }})
     .sort({ price: -1 })
     .select({ name: 1, author: 1, tags: 1})
     console.log(results)
  } catch (err) {
    console.log('Yikes')
  }
}

getCourses()




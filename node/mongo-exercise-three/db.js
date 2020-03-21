const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
.then(res => console.log('Connected to DB...'))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema)

const getCourses = async() => {
  return await Course
  .find({isPublished: true })
  .or([ {price: { $gte: 15}}, { name: /.*by.*/i } ])
  .select({ name: 1, price: 1})
}

const run = async () => {
  const results = await getCourses();
  console.log(results)
}

run()

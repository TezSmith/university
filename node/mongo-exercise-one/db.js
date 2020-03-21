const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(console.log('Connected to DB'))
  .catch(err => console.log(`Problem connecting to MongoDB: ${err}`));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

const getCourses = async () => {
  try {
     const courses = await Course
      .find({ isPublished: true, tags: 'backend' })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
      console.log(courses)
  } 
  catch (err) {
    console.log(`There was an error: ${err}`);
  }
}

getCourses()
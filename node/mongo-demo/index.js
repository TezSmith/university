const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB: ' + err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(() => {
          const result = v && v.length > 0;
          cb(result);
        }, 4000);
      },
      message: 'A course should have at least 1 tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'React Course',
    category: 'web',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }
};

const getCourses = async () => {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: 'Mosh', isPublished: true })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses);
};

const removeCourse = async id => {
  // Takes filter or a query object
  // const result = await Course.deleteOne({ _id: id})
  // If you want to delete multiple documents use .deleteMany
  // To see the course that was deleted:
  const result = await Course.findByIdAndRemove(id);

  console.log(result);
};

createCourse();

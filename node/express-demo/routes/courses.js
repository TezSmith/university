const express = require('express')
const router = express.Router()

const courses = [
  { id: 1, name: 'History' },
  { id: 2, name: 'Math' },
  { id: 3, name: 'Science' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('Course with given id was not found.');
  res.send(course);
});

router.post('/', (req, res) => {
  // Define the schema that Joi should validate
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  // Find the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('Course with given id was not found.');

  // Validate the course
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Update the course
  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  // Find the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('Course with given id was not found.');

  // Remove the course
  const i = courses.indexOf(course);
  courses.splice(i, 1);
  res.send(course);
});

// Validates schema
const validate = body => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(body, schema);
};

module.exports = router;

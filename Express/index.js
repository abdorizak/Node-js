const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Mohamed" },
  { id: 2, name: "Axmed" },
  { id: 3, name: "Cabdi" },
  { id: 4, name: "AbdiRaxim" },
];

app.get("/", (req, res) => {
  res.send("Hellow world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Not Found");
  res.send(course);
});

function validate(c) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return Schema.validate(c);
}

app.post("/api/courses", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // first will look up the course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Not Found");

  // validate
  // if invalid, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Update course
  course.name = req.body.name;
  // return updated corses
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Not Found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`New connection on port ${port}......`);
});

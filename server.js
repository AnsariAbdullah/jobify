import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' }
]

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'data recieved', data: req.body })
})

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json(jobs)
})

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' })
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json(job)
})

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    // throw new Error('no job with that ID') // if we use this we will trigger the error middleware
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ job })
})

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'Job modified', job })
})

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id)
  jobs = newJobs;
  res.status(200).json({ msg: 'Job deleted' });
})

// NOT FOUND
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running on ${port}...`);
})
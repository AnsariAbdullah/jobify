import { StatusCodes } from 'http-status-codes';
import Job from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json(jobs)
}

export const createJob = async (req, res) => {
  // const { company, position } = req.body;
  // const job = await Job.create({ company, position });
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
}

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true
  })

  res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removeJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removeJob });
}
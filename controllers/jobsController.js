import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js";


const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId })
	
	res.status(StatusCodes.OK).json({
		jobs,
		totalJobs: jobs.length,
		numOfPages: 1 
	})
}

const updateJob = async (req, res) => {
	const {id: jobId} = req.params;

	const {company, position} = req.body;

	if(!company || !position){
		throw new BadRequestError('Please Provide All Values')
	}

	const job = await Job.findOne({ _id: jobId });
	
	if(!job){
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	// check permissions
	// console.log(typeof req.user.userId)
  // console.log(typeof job.createdBy)

	checkPermissions(req.user, job.createdBy)

	const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true
	}) 

	// below is the alternate solution to update job
	// job.position = position;
	// job.company = company;
	// await job.save()
	// res.status(StatusCodes.OK).json({ job })

	res.status(StatusCodes.OK).json({ updateJob })
}

const deleteJob = async (req, res) => {
	res.send('delete job')
}

const showStats = async (req, res) => {
	res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }

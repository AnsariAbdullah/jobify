import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		minlength: 3,
		maxlength: 20,
		trim: true
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
		trim: true
	},
	lastName: {
		type: String,
		maxlength: 20,
		trim: true,
		default: 'lastName'
	},
	location: {
		type: String,
		maxlength: 20,
		trim: true,
		default: 'my city'
	},
})

export default mongoose.model('User', UserSchema)
import express from "express";
const app = express();

app.get('/', (req, res)=> {
	res.send('Welcome!')
})

const port = process.env.port || 5000;

app.listen(port, ()=>{
	console.log(`Server is listening at ${port}...`);
})
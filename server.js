import express from "express";
const app = express();


import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";


app.get('/', (req, res)=> {
	throw new Error('error')
	res.send('Welcome!')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000;

app.listen(port, ()=>{
	console.log(`Server is listening at ${port}...`);
})
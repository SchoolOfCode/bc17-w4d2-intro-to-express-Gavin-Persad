import express from 'express';
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
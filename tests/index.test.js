import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send({
		message: 'Hello World!',
		message2: 'Hello World2!',
	});
});

describe('Express Server', () => {
	let server;

	beforeAll((done) => {
		server = app.listen(PORT, done);
	});

	afterAll((done) => {
		server.close(done);
	});

	it('should return a JSON object with message and message2', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message', 'Hello World!');
		expect(response.body).toHaveProperty('message2', 'Hello World2!');
	});

	it('should listen on the correct port', () => {
		const port = server.address().port;
		expect(port).toBe(Number(process.env.PORT) || 3000);
	});
});

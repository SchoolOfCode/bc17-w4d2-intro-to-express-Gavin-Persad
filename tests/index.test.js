import request from 'supertest';
import app from '../index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

describe('Express Server', () => {
	let server;

	beforeAll((done) => {
		server = app.listen(PORT, done);
	});

	afterAll((done) => {
		server.close(done);
	});

	it('should return a JSON object', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toBeInstanceOf(Object);
	});

	it('should return a JSON object with at least one key-value pair', async () => {
		const response = await request(app).get('/');
		expect(Object.keys(response.body).length).toBeGreaterThan(0);
	});

	it('should return 404 for unsupported methods', async () => {
		const response = await request(app).post('/');
		expect(response.status).toBe(404);
	});
});

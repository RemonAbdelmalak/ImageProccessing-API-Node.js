import supertest from 'supertest';
import app from '../server';
import imgprocmodel from '../models/imgproc.models';

const imgprocModel = new imgprocmodel();

const request = supertest(app);

describe('Testint the APIs', () => {
  it('Get API endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  describe('Testing /api/images/', () => {
    it('Get API endpoint', async () => {
      const response = await request.get('/api/images/?filename=1');
      expect(response.status).toBe(200);
    });

    it('gets /api/images/?filename=1&width=100&height=100', async () => {
      const response = await request.get(
        '/api/images/?filename=1&width=100&height=100'
      );
      expect(response.status).toBe(200);
    });

    it('img proccessing ', async () => {
      const imgproc = await imgprocModel.resizeImg({
        filename: '1',
        width: '241',
        height:'314'
      });
      expect(imgproc);
    });

    it('gets /api/listimages', async () => {
      const response = await request.get('/api/listimages');
      expect(response.status).toBe(200);
    });
  });

  describe('Invalid filename', () => {
    it('not found ', async () => {
      const response = await request.get('/7');
      expect(response.status).toBe(404);
    });
  });
});

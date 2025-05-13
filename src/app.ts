import http from 'http';
import dotenv from 'dotenv';
import { router } from './routes/user.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch (error) {
    res.writeHead(500).end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

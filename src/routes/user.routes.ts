import { IncomingMessage, ServerResponse } from 'http';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { isValidUUID, isValidUser } from '../utils/validate';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  const method = req.method || '';
  const idMatch = url.match(/^\/api\/users\/([a-zA-Z0-9-]+)$/);

  if (url === '/api/users' && method === 'GET') {
    const users = getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (idMatch && method === 'GET') {
    const id = idMatch[1];

    if (!isValidUUID(id)) {
      res.writeHead(400).end('Invalid UUID');
      return;
    }

    const user = getUserById(id);

    if (!user) {
      res.writeHead(404).end('User not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  if (url === '/api/users' && method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);

        if (!isValidUser(parsed)) {
          res.writeHead(400).end('Invalid user data');
          return;
        }

        const newUser = createUser(parsed);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch {
        res.writeHead(400).end('Invalid JSON');
      }
    });

    return;
  }

  if (idMatch && method === 'PUT') {
    const id = idMatch[1];

    if (!isValidUUID(id)) {
      res.writeHead(400).end('Invalid UUID');
      return;
    }

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);

        if (!isValidUser(parsed)) {
          res.writeHead(400).end('Invalid user data');
          return;
        }

        const updated = updateUser(id, parsed);

        if (!updated) {
          res.writeHead(404).end('User not found');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updated));
      } catch {
        res.writeHead(400).end('Invalid JSON');
      }
    });

    return;
  }

  if (idMatch && method === 'DELETE') {
    const id = idMatch[1];

    if (!isValidUUID(id)) {
      res.writeHead(400).end('Invalid UUID');
      return;
    }

    const deleted = deleteUser(id);

    if (!deleted) {
      res.writeHead(404).end('User not found');
      return;
    }

    res.writeHead(204).end();
    return;
  }

  res.writeHead(404).end('Route not found');
};

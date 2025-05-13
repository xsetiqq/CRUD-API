import { test } from 'node:test';
import { strictEqual, deepStrictEqual } from 'assert';

const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}`;

let createdId: string;

test('GET /api/users should return array', async () => {
  const res = await fetch(`${BASE}/api/users`);
  strictEqual(res.status, 200);

  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const data = await res.json();
    strictEqual(Array.isArray(data), true);
  } else {
    const text = await res.text();
    throw new Error(`Unexpected response: ${text}`);
  }
});

test('POST /api/users should create a user', async () => {
  const body = {
    username: 'Test User',
    age: 30,
    hobbies: ['reading'],
  };

  const res = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  strictEqual(res.status, 201);
  const data = await res.json();
  strictEqual(data.username, body.username);
  createdId = data.id;
});

test('GET /api/users/:id should return the created user', async () => {
  const res = await fetch(`${BASE}/api/users/${createdId}`);
  strictEqual(res.status, 200);
  const data = await res.json();
  strictEqual(data.id, createdId);
});

test('PUT /api/users/:id should update the user', async () => {
  const updatedBody = {
    username: 'Updated User',
    age: 31,
    hobbies: ['gaming'],
  };

  const res = await fetch(`${BASE}/api/users/${createdId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBody),
  });

  strictEqual(res.status, 200);
  const data = await res.json();
  strictEqual(data.username, updatedBody.username);
});

test('DELETE /api/users/:id should remove the user', async () => {
  const res = await fetch(`${BASE}/api/users/${createdId}`, {
    method: 'DELETE',
  });

  strictEqual(res.status, 204);
});

test('GET /api/users/:id after deletion should return 404', async () => {
  const res = await fetch(`${BASE}/api/users/${createdId}`);
  strictEqual(res.status, 404);
});

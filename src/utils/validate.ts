import { validate as isUUID } from 'uuid';

export function isValidUUID(id: string): boolean {
  return isUUID(id);
}

export function isValidUser(body: any): boolean {
  return (
    typeof body.username === 'string' &&
    typeof body.age === 'number' &&
    Array.isArray(body.hobbies) &&
    body.hobbies.every((hobby: string) => typeof hobby === 'string')
  );
}

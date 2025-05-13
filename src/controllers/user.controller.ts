import { db, User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (): User[] => {
  return db;
};

export const getUserById = (id: string): User | undefined => {
  return db.find((user: User) => user.id === id);
};

export const createUser = (data: Omit<User, 'id'>): User => {
  const newUser: User = { id: uuidv4(), ...data };
  db.push(newUser);
  return newUser;
};

export const updateUser = (id: string, data: Omit<User, 'id'>): User | null => {
  const index = db.findIndex((user: User) => user.id === id);
  if (index === -1) return null;

  const updatedUser: User = { id, ...data };
  db[index] = updatedUser;
  return updatedUser;
};

export const deleteUser = (id: string): boolean => {
  const index = db.findIndex((user: User) => user.id === id);
  if (index === -1) return false;

  db.splice(index, 1);
  return true;
};

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db';

const SECRET_KEY = process.env.JWT_SECRET || 'your-very-secure-secret-key';
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    SECRET_KEY,
    { expiresIn: MAX_AGE }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
}
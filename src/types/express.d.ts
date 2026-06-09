// src/types/express.d.ts
import { RUser } from '../modules/users/user.interface'; // Adjust this import to your actual RUser location

declare global {
  namespace Express {
    interface Request {
      user: RUser & { id: number };
    }
  }
}
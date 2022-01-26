import { Request } from 'express';
import User from '../business_logic/users/user.interface';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;

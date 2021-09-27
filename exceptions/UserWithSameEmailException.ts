import HttpException from './HttpException';

class UserWithSameEmailException extends HttpException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export default UserWithSameEmailException;

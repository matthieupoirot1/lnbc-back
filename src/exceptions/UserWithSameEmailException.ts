import HttpException from './HttpException';

class UserWithSameEmailException extends HttpException {
  constructor(email: string) {
    super(400, `Cet email : ${email} est déjà enregistré.`);
  }
}

export default UserWithSameEmailException;

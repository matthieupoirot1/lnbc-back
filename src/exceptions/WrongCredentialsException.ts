import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'Mauvais email/mot de passe.');
  }
}

export default WrongCredentialsException;

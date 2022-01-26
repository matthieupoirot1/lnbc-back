import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, 'Vous devez vous connecter !');
  }
}

export default AuthenticationTokenMissingException;

import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Il manque l\'email !');
  }
}

export default WrongCredentialsException;

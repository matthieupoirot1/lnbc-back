import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Email needed');
  }
}

export default WrongCredentialsException;

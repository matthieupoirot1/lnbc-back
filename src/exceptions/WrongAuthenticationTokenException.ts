import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor(expired?:boolean) {
    super(expired?498:401, 'Il y a eu un problème, vous devez vous reconnecter.');
  }
}

export default WrongAuthenticationTokenException;

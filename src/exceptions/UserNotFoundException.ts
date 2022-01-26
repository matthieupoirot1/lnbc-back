import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor() {
    super(404, `Ce compte n'existe pas, veuillez vous inscrire.`);
  }
}

export default UserNotFoundException;

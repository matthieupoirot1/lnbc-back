import App from './app';
import UsersController from './BusinessLogic/users/users.controller';
import AuthenticationController from "./authentication/authentication.controller";
import ClientsController from "./BusinessLogic/clients/clients.controller";


const app = new App(
  [
    new ClientsController(),
    //todo authentication and clients controller works. Now check authentication middleware
    new AuthenticationController()
  ],
);

app.listen();

import App from './app';
import AuthenticationController from "./authentication/authentication.controller";
import ClientsController from "./business_logic/clients/clients.controller";
import ClothesController from "./business_logic/clothes/clothes.controller";


const app = new App(
  [
    new ClientsController(),
    new ClothesController(),
    new AuthenticationController()
  ],
);

app.listen();

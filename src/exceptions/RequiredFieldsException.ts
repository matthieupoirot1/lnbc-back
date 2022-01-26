import HttpException from './HttpException';

class RequiredFieldsException extends HttpException {
    constructor(fields: string[]) {
        super(401, "Il manque des éléments dans le formulaire !");
    }
}

export default RequiredFieldsException;

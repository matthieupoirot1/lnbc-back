import HttpException from "../HttpException";

class ClothNotFoundException extends HttpException {
    constructor() {
        super(404, `Ce vêtement n'existe pas.`);
    }
}

export default ClothNotFoundException;

import HttpException from './HttpException';

class AdminReservedException extends HttpException {
    constructor() {
        super(401, 'Vous devez être administrateur pour accéder à cette section.');
    }
}

export default AdminReservedException;

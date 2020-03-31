const bcrypt = require('bcrypt');

const salt = '$2b$10$98kkLiN1rIgvAsbayyd1Be';

module.exports = {
    getSalt(){
        return salt;
    }   
}
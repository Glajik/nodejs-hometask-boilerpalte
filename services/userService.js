const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    create(userData) {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        } = userData;

        // Is user exist?
        const item = this.search({ email });

        if (item) {
            return null;
        }

        return UserRepository.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });
    }
    
    delete(id) {
        return UserRepository.delete(id);
    }

    read() {
        return UserRepository.getAll();
    }

    update(id, userData) {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        } = userData;

        // Is user exist?
        const item = this.search({ id });

        if (!item) {
            return null;
        }

        return UserRepository.update(id, {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();
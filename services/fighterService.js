const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    read() {
        return FighterRepository.getAll();
    }
}

module.exports = new FighterService();
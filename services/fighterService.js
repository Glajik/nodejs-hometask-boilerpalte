const { FighterRepository } = require('../repositories/fighterRepository');

// Methods to work with fighters
class FighterService {
    create(fighterData) {
        const {
            name,
            health,
            power,
            defense,
        } = fighterData;

        // Is fighter exist?
        const item = this.search({ name });

        if (item) {
            return null;
        }

        return FighterRepository.create({
            name,
            health,
            power,
            defense,
        });
    }

    read() {
        return FighterRepository.getAll();
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();
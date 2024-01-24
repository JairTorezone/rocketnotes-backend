const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este e-mail já esta em uso.");
    }

    const hashdPassword = await hash(password, 8);

    await this.userRepository.create({ name, email, password: hashdPassword });
  }
}

module.exports = UserCreateService;

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyExists = this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error("User already exists");
    }

    const newUser = this.usersRepository.create({ name, email });

    return emailAlreadyExists || newUser;
  }
}

export { CreateUserUseCase };

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const verifyIfAdmin = this.usersRepository.findById(user_id);

    if (verifyIfAdmin.admin === false) {
      throw new Error("Only admins can list all users");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

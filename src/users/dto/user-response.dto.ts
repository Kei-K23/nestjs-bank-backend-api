import { AccountEntity } from '../../account/account.entity';
import { UserEntity } from '../user.entity';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  accounts: AccountEntity[];
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.role = userEntity.role;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
    this.accounts = userEntity.accounts;
  }
}

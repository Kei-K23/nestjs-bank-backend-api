import { UserEntity } from '../user.entity';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
  }
}

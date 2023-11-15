import { DocumentType } from '@typegoose/typegoose';
import LoginUserDto from './dto/login-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface UserServiceInterface {
  verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null>;
}

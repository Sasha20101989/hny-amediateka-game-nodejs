import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';

import { UserServiceInterface } from './user-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { UserEntity } from './user.entity.js';
import LoginUserDto from './dto/login-user.dto.js';


@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.UserModel) private readonly userModel: ModelType<UserEntity>,
  ) {}

  public async verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByPassword(dto.password);

    if (! user) {
      return null;
    }

    return user;
  }

  public async findByPassword(password: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({password});
  }
}

import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { UserServiceInterface } from './user-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import LoginUserDto from './dto/login-user.dto.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import UserRdo from './rdo/user.rdo.js';
import { fillDTO } from '../../core/helpers/index.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/login',
      method: HttpMethod.Post,
      handler: this.checkAuthenticate,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
  });
}

  public async checkAuthenticate(
    req: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response
  ) {
    const { body } = req;

    const userData = await this.userService.verifyUser(body);

    if(!userData){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, userData));
  }
}

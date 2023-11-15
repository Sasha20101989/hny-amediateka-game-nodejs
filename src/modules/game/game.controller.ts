import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import NoGameDto from '../game/dto/no-game.dto.js';
import GameRdo from '../game/rdo/gameRdo.js';
import { GameServiceInterface } from '../game/game-service.interface.js';
import { UserServiceInterface } from '../user/user-service.interface.js';

const TOTAL_GIFTS = 3;

@injectable()
export default class GameController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.GameServiceInterface) private readonly gameService: GameServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for GameController...');

    this.addRoute({ path: '/skip',
      method: HttpMethod.Post,
      handler: this.skipGame,
      middlewares: [
        new ValidateDtoMiddleware(NoGameDto)
      ]
    });
  }

  public async skipGame(
    req: Request<UnknownRecord, UnknownRecord, NoGameDto>,
    res: Response
  ){
    const { body } = req;

    const user = await this.userService.verifyUser({...body});

    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    if(user.giftsReceived < TOTAL_GIFTS && !user.hasPlayed) {
      user.hasPlayed = true;

      const result = await this.gameService.receiveGift(user);

      this.ok(res, fillDTO(GameRdo, result));
    }else{
      const result: GameRdo = { message: 'Вы уже получили 1 подарок, но можете пройти 2 и 3 ребус и получить еще подарки' };

      this.ok(res, fillDTO(GameRdo, result));
    }
  }
}

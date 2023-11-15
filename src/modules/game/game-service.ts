import { inject, injectable } from 'inversify';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';

import { GameServiceInterface } from './game-service.interface.js';
import { UserEntity } from '../user/user.entity.js';
import GameRdo from './rdo/gameRdo.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';

const promoCodes = ['promo1', 'promo2', 'promo3'];


@injectable()
export default class GameService implements GameServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) {}

  public async receiveGift(user: DocumentType<UserEntity>): Promise<GameRdo> {
    user.receiveGift();
    user.save();

    const promoCodeIndex = user.giftsReceived - 1;
    const promoCode = promoCodes[promoCodeIndex];

    const result: GameRdo = { message: `Поздравляем! Вы получили подарок ${user.giftsReceived}`, promoCode };

    this.logger.info(`Promo code ${promoCode} issued to the user: ${user.password}`);

    return result;
  }
}

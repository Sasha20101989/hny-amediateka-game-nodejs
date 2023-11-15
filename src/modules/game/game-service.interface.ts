import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import GameRdo from './rdo/gameRdo.js';

export interface GameServiceInterface {
  receiveGift(user: DocumentType<UserEntity>): Promise<GameRdo>;
}

import { Expose } from 'class-transformer';

export default class GameRdo {
  @Expose()
  public message!: string;

  @Expose()
  public promoCode?: string;
}

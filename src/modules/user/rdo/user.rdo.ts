import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose({ name: 'id' })
  public id!: string;

  @Expose()
  public password!: string;

  @Expose()
  public hasPlayed!: boolean;

  @Expose()
  public giftsReceived!: number;

  @Expose()
  public createdAt!: string ;
}

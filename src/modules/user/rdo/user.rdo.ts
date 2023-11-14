import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose({ name: 'id' })
  public id!: string;

  @Expose()
  public password!: string;

  @Expose()
  public createdAt!: string ;
}

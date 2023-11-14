import typegoose, { defaultClasses } from '@typegoose/typegoose';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {
    allowMixed: 0
  }
})

export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public password!: string;

  constructor(password: string) {
    super();

    this.password = password;
  }
}

export const UserModel = getModelForClass(UserEntity);

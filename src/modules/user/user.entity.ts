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
  public password: string;

  @prop({ required: true })
  public hasPlayed: boolean;

  @prop({ required: true })
  public giftsReceived: number;

  constructor(password: string, hasPlayed: boolean, giftsReceived: number) {
    super();

    this.password = password;
    this.hasPlayed = hasPlayed;
    this.giftsReceived = giftsReceived;
  }

  public receiveGift(){
    this.giftsReceived += 1;
  }
}

export const UserModel = getModelForClass(UserEntity);
